/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#FFFFFF',
        paper: '#0A0A0A',
        white: '#FFFFFF',
        accent: '#CCCCCC',
        'accent-soft': '#8F8F8F',
        line: 'rgba(255,255,255,0.14)',
        'line-inv': 'rgba(10,10,10,0.18)',
        muted: 'rgba(255,255,255,0.6)',
        'muted-inv': 'rgba(10,10,10,0.6)',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Reserved for large, single-line statement headlines — Instrument
        // Sans only ships up to weight 700, which reads as merely bold, not
        // the heavy condensed impact those moments call for.
        display: ['Anton', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest2: '0.18em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.16,.8,.24,1)',
      },
    },
  },
  plugins: [],
}
