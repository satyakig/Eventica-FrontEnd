import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const profileModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatarPicture: {
      height: '200px',
      width: '200px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    gridItem: {
      padding: '12px',
    },
    title: {
      textTransform: 'lowercase',
    },
    email: {
      color: '#ffffff !important',
    },
  });
});
