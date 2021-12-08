import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import App from "./App";

const cache = createCache({ key: "custom" });

ReactDOM.hydrate(
    <CacheProvider value={cache}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CacheProvider>,
    document.getElementById("root")
);
