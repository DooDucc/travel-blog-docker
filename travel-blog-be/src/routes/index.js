const postsRouter = require("./posts");
const authRouter = require("./auth");

const routes = (app) => {
  app.use("/api/v1/posts", postsRouter);
  app.use("/api/v1/auth", authRouter);
};

module.exports = routes;
