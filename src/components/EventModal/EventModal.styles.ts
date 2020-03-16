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
    heading: {
      fontSize: 18,
      paddingTop: 8,
      fontWeight: 'bold',
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
