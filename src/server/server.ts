import express from "express";
import renderInitPage from "./renderInitPage";
import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack/webpack.config";
import PATHS from "../../webpack/paths";

const { PORT } = process.env;
const server = express();

const clientWebpackConfig = config({ server: false });
const compiler = webpack(clientWebpackConfig);

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
server.use(express.static(process.cwd()));

server.get("*", (req, res) => {
    res.send(renderInitPage(req.url));
});

server.listen(PORT || 4000, () =>
    console.log(`server is running http://localhost:${PORT || 4000}`)
);
