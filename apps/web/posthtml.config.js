// ISSUE #26: handle prefix route more flexibly and elegantly
module.exports = {
  plugins: {
    "posthtml-head-elements": {
      headElements:
        process.env.NODE_ENV === "production"
          ? "../../../../../apps/web/src/head.production.json"
          : "../../../../../apps/web/src/head.json"
    }
  }
};
