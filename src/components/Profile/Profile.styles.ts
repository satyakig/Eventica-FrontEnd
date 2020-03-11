import { createStyles, Theme } from '@material-ui/core/styles';

export const profileStyles = (theme: Theme) => {
  return createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
};
