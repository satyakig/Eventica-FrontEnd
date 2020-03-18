import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

export const eventModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
    commentField: {
      paddingTop: 8,
    },
    container: {
      paddingTop: 24,
      paddingBottom: 24,
      height: '60vh',
      overflowY: 'auto',
    },
    gridItem: {
      padding: '8px',
    },
    sendButton: {
      height: '100%',
    },
    title: {
      fontSize: 25,
      padding: 8,
    },
  });
});
