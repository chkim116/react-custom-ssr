import { Configuration } from "webpack";
import dotenv from "dotenv";
dotenv.config();
import PATHS from "./paths";
import nodeExternals from "webpack-node-externals";
import getPlugins from "./assets/plugin";
import getModuleRules from "./assets/rules";

const getWebpackConfig = (target: "node" | "web"): Configuration => {
    const mode =
        (process.env.NODE_ENV as "production" | "development") || "development";
    const hotMiddlewareScript =
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";
    const isServer = target === "node";
    const context = PATHS.app;

    console.log(
        `Running Webpack In ${mode} on ${isServer ? "server" : "client"}`
    );

    const devConfig: Configuration = {
        mode,
        devtool: "eval",
        context,
        target,
        entry: isServer
            ? {
                  server: PATHS.serverEntry,
              }
            : { client: [PATHS.clientEntry, hotMiddlewareScript] },
        resolve: {
            modules: [PATHS.app, PATHS.modules],
            extensions: [".js", ".ts", ".tsx", ".json"],
        },
        module: {
            rules: getModuleRules(isServer),
        },
        plugins: getPlugins(isServer, "development"),
        output: {
            filename: "[name].dev.js",
            path: isServer ? PATHS.serverOutput : PATHS.clientOutput,
            libraryTarget: isServer ? "commonjs2" : "",
            publicPath: PATHS.public,
        },
        externals: isServer ? [nodeExternals()] : [],
    };

    const prodConfig: Configuration = {
        ...devConfig,
        mode: "production",
        devtool: isServer ? "source-map" : "hidden-source-map",
        output: isServer
            ? {
                  path: PATHS.serverOutput,
                  filename: "[name].js",
                  publicPath: PATHS.public,
              }
            : {
                  path: PATHS.clientOutput,
                  filename: "[name].[chunkhash].js",
                  chunkFilename: "[name].[chunkhash:6].js",
                  publicPath: PATHS.public,
              },
        module: {
            rules: getModuleRules(isServer),
        },
        optimization: isServer
            ? {}
            : {
                  splitChunks: {
                      chunks: "all",
                      cacheGroups: {
                          vendor: {
                              test: /node_modules/,
                              name: "vendor",
                              chunks: "initial",
                              enforce: true,
                          },
                      },
                  },
              },
        plugins: getPlugins(isServer, "production"),
    };

    return mode === "production" ? prodConfig : devConfig;
};

export default (env: { server: boolean }) =>
    getWebpackConfig(env.server ? "node" : "web");
