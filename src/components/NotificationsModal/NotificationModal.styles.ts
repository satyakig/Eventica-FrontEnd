import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { BACKGROUND } from 'assets/Styles';

export const notificationModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
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
