/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        roseNoir: '#21080C',
        deepBurgundy: '#5E0B17',
        velvetRed: '#981B2B',
        richRose: '#B52535',
        antiqueGold: '#C49445',
        champagneGold: '#E2C27C',
        warmIvory: '#FFF8ED',
        softBlush: '#F5E4DF',
        charcoal: '#130F10',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['Allura', 'cursive'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C49445 0%, #E2C27C 50%, #C49445 100%)',
        'velvet-gradient': 'linear-gradient(180deg, #21080C 0%, #5E0B17 50%, #981B2B 100%)',
        'cinematic-radial': 'radial-gradient(ellipse at center, #5E0B17 0%, #21080C 70%)',
      },
    },
  },
  plugins: [],
};
