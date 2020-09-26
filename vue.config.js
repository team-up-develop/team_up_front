module.exports = {
  devServer: {
    port: 9050,
    host: '0.0.0.0',
    disableHostCheck: false,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  }
};