import preactCliTypeScript from "preact-cli-plugin-typescript";
import criticalCssPlugin from "preact-cli-plugin-critical-css";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config original webpack config.
 * @param {object} env options passed to CLI.
 * @param {WebpackConfigHelpers} helpers object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  preactCliTypeScript(config);
  criticalCssPlugin(config, env, {});
  env.isProd && env.ssr && config.plugins.push(new BundleAnalyzerPlugin());
}
