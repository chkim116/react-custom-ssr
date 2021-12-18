import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import App from "./App";

const cache = createCache({ key: "custom" });
const initialState = window.__INITIAL_STATE__;

ReactDOM.hydrate(
    <CacheProvider value={cache}>
        <BrowserRouter>
            <App initialState={initialState} />
        </BrowserRouter>
    </CacheProvider>,
    document.getElementById("root")
);

if ((module as any)["hot"]) {
    (module as any)["hot"].accept();
}
