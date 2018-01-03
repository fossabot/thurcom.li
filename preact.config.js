import criticalCssPlugin from "preact-cli-plugin-critical-css";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import preactCliLodash from "preact-cli-lodash";
import { resolve } from "path";
import asyncPlugin from "preact-cli-plugin-async";

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  preactCliLodash(config);
  criticalCssPlugin(config, env, {});
  asyncPlugin(config);

  const { options } = helpers.getLoadersByName(config, "babel-loader")[0].rule;

  config.module.loaders.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
        options
      },
      "ts-loader",
      "tslint-loader"
    ]
  });

  config.resolve.alias["preact-cli-entrypoint"] = env.source("index");

  const cssLoader = helpers.getLoadersByName(config, "css-loader")[0].loader;
  cssLoader.loader = "typings-for-css-modules-loader";
  cssLoader.options.namedExport = true;

  if (env.isProd && !env.ssr) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "../report.html"
      })
    );
  }
  env.ssr && (config.entry["ssr-bundle"] = env.source("index"));
}
