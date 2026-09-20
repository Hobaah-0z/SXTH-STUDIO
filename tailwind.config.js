/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141210',
        paper: '#F7F2E7',
        white: '#FFFFFF',
        accent: '#D97706',
        'accent-soft': '#F0C879',
        line: 'rgba(20,18,16,0.12)',
        'line-inv': 'rgba(247,242,231,0.16)',
        muted: 'rgba(20,18,16,0.56)',
        'muted-inv': 'rgba(247,242,231,0.6)',
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
