/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito']
      },
      maxWidth: {
        '1/2': '50%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%'
      },
      spacing: {
        '160px': '160px',
        '190px': '190px',
        '214px': '214px',
        '250px': '250px'
      },
      colors: {
        'blue-charcoal': {
          50: '#ecf2ff',
          100: '#bdcbff',
          200: '#7b95ff',
          300: '#3158ff',
          400: '#003aff',
          500: '#003ded',
          600: '#002cbf',
          700: '#002197',
          800: '#001877',
          900: '#000105'
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
