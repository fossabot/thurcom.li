import criticalCssPlugin from "preact-cli-plugin-critical-css";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import preactCliLodash from "preact-cli-lodash";
import asyncPlugin from "preact-cli-plugin-async";

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  // maybe let typescript handle this later
  asyncPlugin(config);
  preactCliLodash(config);
  criticalCssPlugin(config, env, {});

  const { options } = helpers.getLoadersByName(config, "babel-loader")[0].rule;

  config.module.loaders.push({
    enforce: "pre",
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    options: {
      useBabel: true,
      babelOptions: options
    }
  });

  env.isProd && env.ssr && config.plugins.push(new BundleAnalyzerPlugin());
}
