import { HotModuleReplacementPlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

const getPlugins = (isServer: boolean, mode: "production" | "development") => {
    const defaultPlugins: any[] = [];

    if (mode === "production") {
        return isServer
            ? [...defaultPlugins]
            : [
                  ...defaultPlugins,
                  new WebpackManifestPlugin({
                      fileName: "manifest.json",
                      publicPath: "",
                  }),
              ];
    }

    if (mode === "development") {
        return isServer
            ? [...defaultPlugins]
            : [
                  ...defaultPlugins,
                  new HotModuleReplacementPlugin(),
                  new WebpackManifestPlugin({
                      fileName: "manifest.json",
                      publicPath: "",
                  }),
              ];
    }
};

export default getPlugins;
