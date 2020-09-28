const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: { content: ['./**/*.js', './app.css'] },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        xl: '1024px'
      }
    },
    boxShadow: {
      lg: '0 0 5px 0 rgba(0, 0, 0, 0.1)'
    },
    extend: {
      colors: {
        gray: {
          ...defaultTheme.colors.gray,
          500: '#999999'
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}