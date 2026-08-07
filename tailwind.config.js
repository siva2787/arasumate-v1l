/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C4CFF',
        secondary: '#8B6CFF',
        accent: '#B8A8FF',
        ink: '#111111',
      },
      fontFamily: {
        display: ['"Clash Display"', '"General Sans"', 'sans-serif'],
        body: ['"General Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(108,76,255,0.25)',
        glass: '0 8px 32px rgba(108,76,255,0.15)',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg,#6C4CFF 0%,#8B6CFF 50%,#B8A8FF 100%)',
        'grad-radial': 'radial-gradient(circle at 30% 20%, rgba(108,76,255,0.15), transparent 60%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 1.5s',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
      },
    },
  },
  plugins: [],
}
