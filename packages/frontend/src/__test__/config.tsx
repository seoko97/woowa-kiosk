import { ThemeProvider } from "@emotion/react";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { theme } from "src/theme";

interface Props {
  children: React.ReactNode;
}

export const CustomProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: CustomProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
