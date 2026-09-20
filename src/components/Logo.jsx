export default function Logo({ variant = 'dark', className = '' }) {
  const src = variant === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg'
  return <img src={src} alt="SXTH" className={className} />
}
