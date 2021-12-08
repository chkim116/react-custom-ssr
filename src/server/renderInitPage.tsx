import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../App";

const key = "custom";
const cache = createCache({ key });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

const renderInitPage = (url: string) => {
    const assets = require("../../dist/client/manifest.json");
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </CacheProvider>
    );

    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    return `
    <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>자바스크립트 퀴즈</title>
                ${styles}
                <script defer src=/web/client/${assets["client.js"]}></script>
            </head>
            <body>
            <div id="root">${html}</div>
            </body>
        </html>
`;
};

export default renderInitPage;
