import { createMuiTheme } from '@material-ui/core';

export const PRIMARY = '#ff165d';
export const SECONDARY = '#f4f5f7';
export const DANGER = '#fd5d93';
export const WARNING = '#ffa600';
export const INFO = '#1d8cf8';
export const SUCCESS = '#00f2c3';

export const LIGHT = '#adb5bd';
export const DARK = '#212529';
export const DEFAULT = '#344675';
export const WHITE = '#ffffff';
export const DARKER = '#000000';

export const BACKGROUND = '#1e1e2f';
export const CARD_BG = '#27293d';

export const NAV_BAR_HEIGHT = '64px';

export const THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    error: {
      main: DANGER,
    },
    warning: {
      main: WARNING,
    },
    info: {
      main: INFO,
    },
    success: {
      main: SUCCESS,
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
