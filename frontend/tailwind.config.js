/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // ConnecFit brand colors (Updated Palette)
        coral: {
          DEFAULT: '#FF6B6B', // Softer coral
          50: '#FFF3F3',
          100: '#FFE5E5',
          200: '#FFC7C7',
          300: '#FFA9A9',
          400: '#FF8B8B',
          500: '#FF6B6B',
          600: '#E65252',
          700: '#CC3939',
          800: '#B32020',
          900: '#990707',
        },
        purple: {
          DEFAULT: '#4D1D95', // Vibrant purple
          50: '#F4F0F9',
          100: '#E9E0F4',
          200: '#D3C2E8',
          300: '#BDA3DD',
          400: '#A785D1',
          500: '#9166C6',
          600: '#7447A8',
          700: '#5A328A',
          800: '#4D1D95',
          900: '#3A1570',
        },
        beige: {
          DEFAULT: '#FFF8F0', // Light beige
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF8F0',
          300: '#F2E9DE',
          400: '#E5D9CC',
          500: '#D8CABE',
          600: '#C2B4A8',
          700: '#A1968D',
          800: '#807873',
          900: '#605A58',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 107, 0.6)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      fontFamily: {
        'urbane': ['Urbane', 'sans-serif'],
        'neue': ['Neue Haas Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};