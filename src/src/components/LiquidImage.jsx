import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { TRAIL_COLORS, hexToRgb, sampleRamp } from '../lib/trailPalette'
import ImagePlaceholder from './ImagePlaceholder'

// Fixed-resolution displacement field — independent of how big the image
// renders on screen, since it's just driving a UV offset, not being seen
// directly. Small enough that a handful of these can run at once.
const SIM_SIZE = 128

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

// Ripple state is a single accumulation buffer (not a true two-frame wave
// equation): each pass decays and softly blurs the previous frame, then
// adds a "splat" under the pointer sized by how fast it's moving. Cheap,
// stable, and reads as a spreading liquid bump rather than an oscillating
// wave — which is the calmer of the two for hovering over a photograph.
const SIM_FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform vec2 uPointer;
uniform vec2 uVelocity;
uniform float uHasPointer;
uniform float uDecay;

void main() {
  float h  = texture2D(uPrev, vUv).r;
  float hl = texture2D(uPrev, vUv - vec2(uTexel.x, 0.0)).r;
  float hr = texture2D(uPrev, vUv + vec2(uTexel.x, 0.0)).r;
  float hu = texture2D(uPrev, vUv - vec2(0.0, uTexel.y)).r;
  float hd = texture2D(uPrev, vUv + vec2(0.0, uTexel.y)).r;

  float spread = h * 0.36 + (hl + hr + hu + hd) * 0.16;
  float decayed = spread * uDecay;

  float splat = 0.0;
  if (uHasPointer > 0.5) {
    float d = distance(vUv, uPointer);
    float speed = clamp(length(uVelocity) * 28.0, 0.0, 1.0);
    splat = smoothstep(0.09, 0.0, d) * max(speed, 0.18);
  }

  gl_FragColor = vec4(clamp(decayed + splat, 0.0, 1.0), 0.0, 0.0, 1.0);
}
`

// Reads the ripple height field as a heightmap, uses its gradient to bend
// the image lookup (the "liquid" part), splits R/B slightly along that same
// gradient for a soft chromatic fringe at the distortion's edges, and tints
// with the trail palette in proportion to how distorted each pixel is.
const DISPLAY_FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D uRipple;
uniform vec2 uTexel;
uniform float uStrength;
uniform float uChroma;
uniform float uCanvasAspect;
uniform float uImageAspect;
uniform vec3 uColorA;
uniform vec3 uColorB;

vec2 coverUv(vec2 uv) {
  float rx = min(uCanvasAspect / uImageAspect, 1.0);
  float ry = min(uImageAspect / uCanvasAspect, 1.0);
  return vec2(uv.x * rx + (1.0 - rx) * 0.5, uv.y * ry + (1.0 - ry) * 0.5);
}

void main() {
  float hl = texture2D(uRipple, vUv - vec2(uTexel.x, 0.0)).r;
  float hr = texture2D(uRipple, vUv + vec2(uTexel.x, 0.0)).r;
  float hu = texture2D(uRipple, vUv - vec2(0.0, uTexel.y)).r;
  float hd = texture2D(uRipple, vUv + vec2(0.0, uTexel.y)).r;
  vec2 grad = vec2(hr - hl, hd - hu);

  vec2 uv = coverUv(vUv) + grad * uStrength;
  vec2 uvR = uv + grad * uChroma;
  vec2 uvB = uv - grad * uChroma;

  float r = texture2D(uImage, uvR).r;
  vec4 g = texture2D(uImage, uv);
  float b = texture2D(uImage, uvB).b;
  vec3 col = vec3(r, g.g, b);

  float mag = clamp(length(grad) * 22.0, 0.0, 1.0);
  vec3 tint = mix(uColorA, uColorB, clamp(vUv.y + grad.y * 3.0, 0.0, 1.0));
  col += tint * mag * 0.4;

  gl_FragColor = vec4(col, g.a);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(s)
    gl.deleteShader(s)
    throw new Error(info || 'Shader compile failed')
  }
  return s
}

function link(gl, vertSrc, fragSrc) {
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertSrc))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSrc))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(info || 'Program link failed')
  }
  return program
}

function createFbo(gl, size) {
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return { fbo, tex }
}

// A project image, rendered through WebGL so the cursor pushes a soft
// liquid ripple across it as it moves — tinted with the same colour ramp
// as the page's cursor trail. Falls back to the site's normal
// ImagePlaceholder (missing-asset block or plain <img>) whenever WebGL,
// the image, or a fine pointer isn't available, so nothing ever breaks.
export default function LiquidImage({
  src,
  alt = '',
  label,
  className = '',
  strength = 0.045,
  colors = TRAIL_COLORS,
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setReady(false)
    if (reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const gl =
      canvas.getContext('webgl', { premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { premultipliedAlpha: false })
    if (!gl) return // no WebGL support — the placeholder/img layer stays visible

    let destroyed = false
    let raf = 0

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    let simProgram
    let displayProgram
    try {
      simProgram = link(gl, VERT, SIM_FRAG)
      displayProgram = link(gl, VERT, DISPLAY_FRAG)
    } catch {
      return // shader failed to compile on this device — fall back
    }

    const bufA = createFbo(gl, SIM_SIZE)
    const bufB = createFbo(gl, SIM_SIZE)
    let read = bufA
    let write = bufB

    const imageTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, imageTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    let imageAspect = 1
    const img = new Image()
    img.onload = () => {
      if (destroyed) return
      gl.bindTexture(gl.TEXTURE_2D, imageTex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      imageAspect = img.naturalWidth / img.naturalHeight || 1
      setReady(true)
    }
    img.onerror = () => {} // no image yet — the placeholder block underneath keeps showing
    img.src = src

    const rgbStops = colors.map(hexToRgb)

    const pointer = { x: 0.5, y: 0.5, active: false }
    const prevPointer = { x: 0.5, y: 0.5 }
    const velocity = { x: 0, y: 0 }

    function onMove(e) {
      const rect = wrap.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
      pointer.active = true
    }
    function onLeave() {
      pointer.active = false
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerenter', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr))
      const h = Math.max(1, Math.floor(wrap.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    gl.useProgram(simProgram)
    const simPosLoc = gl.getAttribLocation(simProgram, 'aPos')
    gl.useProgram(displayProgram)
    const dispPosLoc = gl.getAttribLocation(displayProgram, 'aPos')

    let idleFrames = 0

    function frame(now) {
      raf = requestAnimationFrame(frame)
      if (destroyed) return

      velocity.x = pointer.x - prevPointer.x
      velocity.y = pointer.y - prevPointer.y
      prevPointer.x = pointer.x
      prevPointer.y = pointer.y

      const moving = pointer.active && Math.abs(velocity.x) + Math.abs(velocity.y) > 0.0008
      idleFrames = pointer.active ? 0 : idleFrames + 1
      // Fully settled and untouched — stop redrawing until the pointer returns.
      if (idleFrames > 120) return

      // --- simulation pass: write into `write`, reading history from `read` ---
      gl.bindFramebuffer(gl.FRAMEBUFFER, write.fbo)
      gl.viewport(0, 0, SIM_SIZE, SIM_SIZE)
      gl.useProgram(simProgram)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      gl.enableVertexAttribArray(simPosLoc)
      gl.vertexAttribPointer(simPosLoc, 2, gl.FLOAT, false, 0, 0)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, read.tex)
      gl.uniform1i(gl.getUniformLocation(simProgram, 'uPrev'), 0)
      gl.uniform2f(gl.getUniformLocation(simProgram, 'uTexel'), 1 / SIM_SIZE, 1 / SIM_SIZE)
      gl.uniform2f(gl.getUniformLocation(simProgram, 'uPointer'), pointer.x, 1 - pointer.y)
      gl.uniform2f(gl.getUniformLocation(simProgram, 'uVelocity'), velocity.x, velocity.y)
      gl.uniform1f(gl.getUniformLocation(simProgram, 'uHasPointer'), pointer.active && moving ? 1 : 0)
      gl.uniform1f(gl.getUniformLocation(simProgram, 'uDecay'), 0.965)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      const tmp = read
      read = write
      write = tmp

      // --- display pass: distorted image onto the visible canvas ---
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(displayProgram)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      gl.enableVertexAttribArray(dispPosLoc)
      gl.vertexAttribPointer(dispPosLoc, 2, gl.FLOAT, false, 0, 0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, imageTex)
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'uImage'), 0)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, read.tex)
      gl.uniform1i(gl.getUniformLocation(displayProgram, 'uRipple'), 1)

      gl.uniform2f(gl.getUniformLocation(displayProgram, 'uTexel'), 1 / SIM_SIZE, 1 / SIM_SIZE)
      gl.uniform1f(gl.getUniformLocation(displayProgram, 'uStrength'), strength)
      gl.uniform1f(gl.getUniformLocation(displayProgram, 'uChroma'), strength * 0.6)
      gl.uniform1f(gl.getUniformLocation(displayProgram, 'uCanvasAspect'), canvas.width / canvas.height)
      gl.uniform1f(gl.getUniformLocation(displayProgram, 'uImageAspect'), imageAspect)

      const t = now * 0.00008
      const [ar, ag, ab] = sampleRamp(rgbStops, t)
      const [br, bg, bb] = sampleRamp(rgbStops, t + 0.35)
      gl.uniform3f(gl.getUniformLocation(displayProgram, 'uColorA'), ar / 255, ag / 255, ab / 255)
      gl.uniform3f(gl.getUniformLocation(displayProgram, 'uColorB'), br / 255, bg / 255, bb / 255)

      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerenter', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
    // colors is a small fixed array from the shared palette by default;
    // joined so an inline array literal from a caller doesn't restart this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, strength, colors.join(','), reducedMotion])

  return (
    <div className={`overflow-hidden ${className}`}>
      <ImagePlaceholder
        src={src}
        alt={alt}
        label={label}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
