import config from "../config/config";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackConfig from "./../webpack.config.client";
import WebpackHotMiddleware from "webpack-hot-middleware";

const complie = (app) => {
  if (config.env === "development") {
    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      piublicPath: webpackConfig.output.publicPath,
    });
    app.use(middleware);
    app.use(WebpackHotMiddleware(compiler));
  }
};

export default { compile };
