// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      common: CommonColors;
      mode: PaletteMode;
      contrastThreshold: number;
      tonalOffset: PaletteTonalOffset;
      primary: PaletteColor;
      secondary: PaletteColor;
      error: PaletteColor;
      warning: PaletteColor;
      info: PaletteColor;
      success: PaletteColor;
      grey: Color;
      text: TypeText;
      divider: TypeDivider;
      action: TypeAction;
      background: TypeBackground;
      getContrastText: (background: string) => string;
      augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
      neutral: PaletteColor;
    };
  }

  interface ThemeOptions {}
}
