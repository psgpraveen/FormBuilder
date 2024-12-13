module.exports = {
  mode: 'jit',
  content: [ "./src/**/*.{html,js}","./index.html",'./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
