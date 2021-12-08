import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../App";

const renderInitPage = () => {
    const assets = require("../../dist/client/manifest.json");
    const html = ReactDOMServer.renderToString(<App />);

    return `
    <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>자바스크립트 퀴즈</title>
            <script defer src=/web/client/${assets["client.js"]}></script>
            </head>
            <body>
            <div id="root">${html}</div>
            </body>
        </html>
`;
};

export default renderInitPage;
