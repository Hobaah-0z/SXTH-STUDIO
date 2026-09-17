/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A08',
        paper: '#F5F3ED',
        white: '#FFFFFF',
        line: 'rgba(10,10,8,0.12)',
        'line-inv': 'rgba(245,243,237,0.16)',
        muted: 'rgba(10,10,8,0.56)',
        'muted-inv': 'rgba(245,243,237,0.6)',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
