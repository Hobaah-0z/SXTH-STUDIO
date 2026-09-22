// Shared colour ramp used by the cursor trail and the liquid-distortion
// imagery, so both read as one accent system rather than two unrelated
// colour choices layered on an otherwise monochrome site.
export const TRAIL_COLORS = ['#FF5F3D', '#FFB23D', '#4DE0C0', '#5B8CFF', '#B45BFF']

// #rrggbb -> [r, g, b], each 0-255
export function hexToRgb(hex) {
  const v = hex.replace('#', '')
  const full = v.length === 3 ? v.split('').map((c) => c + c).join('') : v
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Samples a looping gradient built from the palette at position t (0 -> 1).
// Stops are [r,g,b] 0-255 triples; returns the same.
export function sampleRamp(rgbStops, t) {
  const n = rgbStops.length
  const scaled = (((t % 1) + 1) % 1) * n
  const i = Math.floor(scaled)
  const f = scaled - i
  const a = rgbStops[i % n]
  const b = rgbStops[(i + 1) % n]
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ]
}
