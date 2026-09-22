export default function Logo({ variant = 'dark', className = '' }) {
  const src = variant === 'light' ? '/images/Logo light.svg' : '/images/Logo dark.svg'
  return <img src={src} alt="SXTH" className={className} />
}
