import { css, Global } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      body,
      #root {
        width: 100%;
        height: 100%;
      }
      body {
        margin: 0;
        font-size: 16px;
        user-select: none;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
      input,
      textarea,
      button {
        border: 0;
        padding: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
      }

      * {
        font-family: "Noto Sans KR", "Quicksand", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
