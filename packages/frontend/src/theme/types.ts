import { ThemeType, FONT_SIZE } from ".";

export type IColor = keyof Omit<Partial<ThemeType>, "BP" | "FONT_SIZE" | "BUTTON_SIZE">;
export type ISize = keyof typeof FONT_SIZE;
