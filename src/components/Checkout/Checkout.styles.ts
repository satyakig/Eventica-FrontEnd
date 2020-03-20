import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const checkoutStyles = makeStyles((theme: Theme) => {
  return createStyles({
    title: {
      textAlign: 'center',
    },
    error: {
      textTransform: 'lowercase',
      textAlign: 'center',
    },
    actions: {
      justifyContent: 'center',
    },
    pay: {
      fontFamily: '"Source Code Pro", monospace',
      fontWeight: 600,
      fontSize: '16px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  });
});
