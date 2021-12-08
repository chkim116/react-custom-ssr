import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.hydrate(<App />, document.getElementById("root"));

if ((module as any).hot) {
    (module as any).hot.accept();
}
