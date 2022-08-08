const BP = {
  MOBILE: "480px",
  TABLET: "764px",
  KIOSK: "1500px",
};

export const FONT_SIZE = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
};

const BUTTON_SIZE = {
  sm: "1rem",
  md: "1rem 1.5rem",
  lg: "1.5rem 2rem",
};

export const theme = Object.freeze({
  PRIMARY1: "#2AC1BC",
  PRIMARY2: "#A0E1E0",
  PRIMARY3: "#4CB8B8",
  TITLE_ACTIVE: "#1E2019",
  BODY: "#626666",
  LABEL: "#8D9393",
  PLACEHOLDER: "#C1C5C5",
  LINE: "#CCD3D3",
  BACKGROUND: "#F5F5F5",
  OFF_WHITE: "#FCFCFC",
  ERROR: "#F45452",
  LIGHT_ERROR: "#FFD4D3",
  DARK_ERROR: "#CD6766",
  DARK_GREEN: "#394032",
  WHITE: "#ffffff",
  BP,
  FONT_SIZE,
  BUTTON_SIZE,
});

export type ThemeType = typeof theme;
