import { createStyles, makeStyles } from '@material-ui/core';

export const notificationPopupStyles = makeStyles(() => {
  return createStyles({
    container: {
      position: 'absolute',
      top: '64px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      maxHeight: '50vh',
      overflow: 'hidden',
    },
    notification: {
      top: 0,
      position: 'relative',
      marginBottom: '10px',
      maxWidth: '75%',
      left: '50%',
      transform: 'translateX(-50%)',
      userSelect: 'none',
    },
  });
});
