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

        @media (max-width: ${theme.BP.TABLET}) {
          font-size: 14px;
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

      #root {
        background-color: ${theme.BACKGROUND};
      }

      * {
        font-family: "Jua", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;
