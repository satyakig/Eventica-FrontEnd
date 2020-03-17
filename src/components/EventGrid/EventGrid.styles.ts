import { createStyles, makeStyles } from '@material-ui/styles';
import { NAV_BAR_HEIGHT } from 'assets/Styles';
import { Theme } from '@material-ui/core';

export const eventGridStyles = makeStyles(({ spacing }: Theme) => {
  return createStyles({
    container: {
      overflow: 'hidden',
      bottom: 0,
      right: 0,
      height: '100%',
      width: '100%',
    },
    drawerContainer: {
      paddingRight: '8px',
      height: `calc(100vh - ${NAV_BAR_HEIGHT} - 5px)`,
      overflowY: 'auto',
    },
    drawer: {
      width: '100%',
      backgroundColor: 'inherit',
    },
    grid: {
      margin: '-8px 0 !important',
      height: `calc(100vh - ${NAV_BAR_HEIGHT})`,
      overflowY: 'auto',
    },
    width100: {
      width: '100%',
    },
    filters: {
      textTransform: 'lowercase',
      letterSpacing: '1.5px',
    },
    priceRange: {
      flexDirection: 'column',
    },
    priceRangeTitle: {
      userSelect: 'none',
    },
    slider: {
      width: '80%',
    },
    fab: {
      position: 'absolute',
      bottom: spacing(2),
      right: spacing(2),
    },
  });
});
