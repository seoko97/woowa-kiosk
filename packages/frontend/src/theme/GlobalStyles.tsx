import { css, Global } from "@emotion/react";

import { ThemeType } from ".";
import { reset } from "./reset";

interface Props {
  theme: ThemeType;
}

const GlobalStyle = ({ theme }: Props) => (
  <Global
    styles={css`
      ${reset}
      html {
        -ms-overflow-style: none;
        scrollbar-width: none;
        background-color: ${theme.BACKGROUND};
        font-size: 20px;
      }

      body,
      #root {
        width: 100%;
        height: 100%;
      }

      body {
        margin: 0;
        user-select: none;
      }

      * {
        font-family: "Jua", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
