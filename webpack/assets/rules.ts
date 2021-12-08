import PATHS from "../paths";

const getModuleRules = (isServer: boolean) => {
    const typescriptRules = {
        test: /.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-typescript",
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        useBuiltIns: "usage",
                        corejs: 3,
                    },
                ],
            ],
            plugins: [
                [
                    "@emotion/babel-plugin",
                    {
                        sourceMap: true,
                        autoLabel: "dev-only",
                        labelFormat: "[filename]-[local]",
                    },
                ],
            ],
        },
    };

    const imgLoader = {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url-loader",
        options: { name: "[hash].[ext]", limit: 10_000, esModule: false },
        include: PATHS.app,
    };

    return isServer ? [typescriptRules] : [typescriptRules, imgLoader];
};

export default getModuleRules;
