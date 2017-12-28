import criticalCssPlugin from "preact-cli-plugin-critical-css";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import preactCliLodash from "preact-cli-lodash";
import { resolve } from "path";

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  preactCliLodash(config);
  criticalCssPlugin(config, env, {});

  const { options } = helpers.getLoadersByName(config, "babel-loader")[0].rule;
  options.plugins.push("transform-regenerator");

  config.module.loaders.push({
    enforce: "pre",
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    options: {
      useBabel: true,
      babelOptions: options
    }
  });
  config.resolve.alias["preact-cli-entrypoint"] = env.source("index");

  config.module.loaders.push({
    enforce: "pre",
    test: /\.tsx?$/,
    loader: "tslint-loader",
    options: {}
  });

  if (env.ssr) {
    config.entry["ssr-bundle"] = env.source("index");
    config.plugins.push(new BundleAnalyzerPlugin());
  }
}
