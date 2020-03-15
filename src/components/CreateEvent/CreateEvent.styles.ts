import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const createEventStyles = makeStyles((theme: Theme) => {
  return createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    gridItem: {
      padding: '12px',
    },
    title: {
      userSelect: 'none',
    },
    email: {
      color: '#ffffff !important',
    },
  });
});
