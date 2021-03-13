module.exports = {
  transpileDependencies: ['vuetify'],

  css: {
    sourceMap: true
  },
  pages: {
    index: {
      entry: "./src/main.js",
      template: "./src/index.pug"
    }
  }
};
