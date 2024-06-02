import { ThemeOptions, createTheme as createMuiTheme } from '@mui/material';

import { createPalette } from './theme-palette';
import { createComponents } from './theme-component';
import { createShadows } from './theme-shadow';
import { createTypography } from './theme-typography';

const palette = createPalette() as ThemeOptions['palette'];
const components = createComponents({ palette }) as ThemeOptions['components'];
const shadows = createShadows() as ThemeOptions['shadows'];
const typography = createTypography() as ThemeOptions['typography'];

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  components,
  palette,
  shadows,
  shape: {
    borderRadius: 3,
  },
  typography
});
