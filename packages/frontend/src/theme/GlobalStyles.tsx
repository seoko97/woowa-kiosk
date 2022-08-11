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

        @media (max-width: ${theme.BP.KIOSK}) {
          font-size: 20px;
        }
        @media (max-width: ${theme.BP.TABLET}) {
          font-size: 16px;
        }
        @media (max-width: ${theme.BP.MOBILE}) {
          font-size: 12px;
        }
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
        font-family: "Jua", "Noto Sans", "Quicksand", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
