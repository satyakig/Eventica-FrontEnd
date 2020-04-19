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
      height: `calc(${window.innerHeight}px - ${NAV_BAR_HEIGHT})`,
      overflowY: 'auto',
    },
    drawer: {
      width: '100%',
      backgroundColor: 'inherit',
    },
    grid: {
      margin: '0 0 16px 0 !important',
      height: `calc(${window.innerHeight}px - ${NAV_BAR_HEIGHT})`,
      overflowY: 'auto',
    },
    width100: {
      width: '100%',
    },
    title: {
      textTransform: 'lowercase',
      marginLeft: 'auto',
      marginRight: 'auto',
      letterSpacing: '1.5px',
    },
    priceRange: {
      flexDirection: 'column',
    },
    priceRangeTitle: {
      textTransform: 'lowercase',
    },
    slider: {
      width: '80%',
    },
    fab: {
      position: 'absolute',
      bottom: spacing(2),
      right: spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: spacing(1),
      right: spacing(1),
    },
    listItemClose: {
      paddingTop: 0,
      paddingBottom: 0,
      justifyContent: 'flex-end',
      paddingRight: '5px',
    },
  });
});
