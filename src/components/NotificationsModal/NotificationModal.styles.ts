import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { BACKGROUND } from 'assets/Styles';

export const notificationModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialog: {
      overflowY: 'auto',

      '& .MuiDialog-paper': {
        height: 'calc(100% - 64px)',
        minHeight: 'calc(100% - 64px)',
        maxHeight: 'calc(100% - 64px)',

        '@media only screen and (max-height: 650px)': {
          height: '100%',
          minHeight: '100%',
          maxHeight: '100%',
          marginTop: 0,
          marginBottom: 0,
        },
      },

      '& .MuiDialog-paperScrollPaper': {
        '@media only screen and (max-height: 650px)': {
          maxHeight: '100%',
        },
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    gridContainer: {
      marginBottom: '20px',
    },
    title: {
      textTransform: 'lowercase',
      userSelect: 'none',
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    cardContainer: {
      backgroundColor: BACKGROUND,
      borderRadius: '5px',
    },
    body: {
      marginTop: '8px',
    },
    cardAction: {
      paddingTop: 0,
      justifyContent: 'center',
    },
  });
});
