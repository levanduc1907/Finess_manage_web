import {
  filledInputClasses,
  inputLabelClasses,
  paperClasses,
  tableCellClasses,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Used only to create transitions
const muiTheme = createTheme();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComponents = (config: Record<string, any>) => {
  const { palette } = config;

  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow:
              '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: palette.primary.main,
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: '46px',
          borderRadius: '0px',
          '&.Mui-disabled': {
            color: palette.text.secondary,
            backgroundColor: palette.neutral[200],
          }
        },
        input: {
          '&::placeholder': {
            opacity: 0.3,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          '&::placeholder': {
            color: palette.text.secondary,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 4,
          borderStyle: 'solid',
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create([
            'border-color',
            'box-shadow',
          ]),
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
          '&:before': {
            display: 'none',
          },
          '&:after': {
            display: 'none',
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent',
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderColor: palette.primary.main,
            boxShadow: `${palette.primary.main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`,
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          '& fieldset': {
            borderWidth: '1px',
          },
        },
        // root: {
        //   '&:hover': {
        //     backgroundColor: palette.action.hover,
        //     [`& .${outlinedInputClasses.notchedOutline}`]: {
        //       borderColor: palette.neutral[200],
        //     },
        //   },
        //   [`&.${outlinedInputClasses.focused}`]: {
        //     backgroundColor: 'transparent',
        //     [`& .${outlinedInputClasses.notchedOutline}`]: {
        //       borderColor: palette.primary.main,
        //       boxShadow: `${palette.primary.main} 0 0 0 2px`,
        //     },
        //   },
        //   [`&.${filledInputClasses.error}`]: {
        //     [`& .${outlinedInputClasses.notchedOutline}`]: {
        //       borderColor: palette.error.main,
        //       boxShadow: `${palette.error.main} 0 0 0 2px`,
        //     },
        //   },
        // },
        input: {
          // fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        // notchedOutline: {
        //   borderColor: palette.neutral[200],
        //   transition: muiTheme.transitions.create([
        //     'border-color',
        //     'box-shadow',
        //   ]),
        // },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: 'translate(12px, 18px) scale(1)',
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: 'translate(0, -1.5px) scale(0.85)',
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.85)',
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: 'translate(14px, -9px) scale(0.85)',
            },
          },
        },
        asterisk: {
          color: palette.error.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: 'none',
          '& + &': {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: palette.neutral[100],
          borderRadius: 6,
          // overflow: 'hidden',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          padding: '15px 16px',
          // '&:first-of-type': {
          //   paddingLeft: 24,
          // },
          // '&:last-of-type': {
          //   paddingRight: 24,
          // },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          height: '40px',
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
            backgroundColor: palette.neutral[100],
            color: palette.neutral[700],
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  };
};
