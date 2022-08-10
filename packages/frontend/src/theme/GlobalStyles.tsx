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
        font-size: 16px;
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
        font-family: "Noto Sans KR", "Quicksand", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
