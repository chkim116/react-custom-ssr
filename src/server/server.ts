import express from "express";
import renderInitPage from "./renderInitPage";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import morgan from "morgan";
import config from "../../webpack/webpack.config";
import PATHS from "../../webpack/paths";

const { PORT } = process.env;
const server = express();

const clientWebpackConfig = config({ server: false });
const compiler = webpack(clientWebpackConfig);

if (process.env.NODE_ENV !== "production") {
    server.use(
        WebpackDevMiddleware(compiler, {
            publicPath: clientWebpackConfig.output
                ? (clientWebpackConfig.output.publicPath as string)
                : PATHS.public,
        })
    );
    server.use(
        require("webpack-hot-middleware")(compiler, {
            log: false,
            path: "/__webpack_hmr",
            heartbeat: 2000,
        })
    );
}

server.use(express.static(process.cwd()));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));

server.get("*", (req, res) => {
    const initialState = "initialState";

    res.send(renderInitPage(req.url, initialState));
});

server.listen(PORT || 4000, () =>
    console.log(`server is running http://localhost:${PORT || 4000}`)
);
