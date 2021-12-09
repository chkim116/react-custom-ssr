import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import serializeJavascript from "serialize-javascript";
import Helmet from "react-helmet";
import App from "../App";

const key = "custom";
const cache = createCache({ key });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

const renderInitPage = (url: string, initialState: any) => {
    const assets = require("../../dist/client/manifest.json");
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <StaticRouter location={url}>
                <App initialState={initialState} />
            </StaticRouter>
        </CacheProvider>
    );

    const headAssets = Helmet.renderStatic();
    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    return `
    <!DOCTYPE html>
        <html lang="ko" ${headAssets.htmlAttributes.toString()}>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                ${headAssets.meta.toString()}
                ${headAssets.title.toString()}
                ${headAssets.link.toString()}
                ${styles}
                <script defer src=/app/${assets["client.js"]}></script>
            </head>
            <body>
            <div id="root">${html}</div>
            <script>${`window.__INITIAL_STATE__ =${serializeJavascript(
                initialState
            )}`}</script>
            </body>
        </html>
`;
};

export default renderInitPage;
