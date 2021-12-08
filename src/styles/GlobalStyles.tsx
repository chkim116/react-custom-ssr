import React from "react";
import { css, Global } from "@emotion/react";

export const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                * {
                    box-sizing: content-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                }
            `}
        />
    );
};
