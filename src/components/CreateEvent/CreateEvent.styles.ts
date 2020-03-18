import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const createEventStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialog: {
      overflowY: 'auto',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    grid: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    upload: {
      '& input': {
        cursor: 'pointer !important',
      },
    },
    title: {
      textTransform: 'lowercase',
      userSelect: 'none',
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    actions: {
      padding: '25px 0 20px 0',
    },
    submit: {
      margin: '0 auto',
    },
  });
});
