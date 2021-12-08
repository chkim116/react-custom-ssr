import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "routes";
import { GlobalStyles } from "styles/GlobalStyles";

const App = () => {
    return (
        <>
            <GlobalStyles />
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />}
                    ></Route>
                ))}
            </Routes>
        </>
    );
};

export default App;
