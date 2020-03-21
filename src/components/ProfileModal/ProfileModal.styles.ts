import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const profileModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatarPicture: {
      height: '200px',
      width: '200px',
      cursor: 'pointer',
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
      userSelect: 'none',
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    actions: {
      padding: '15px 0 20px 0',
    },
    submit: {
      margin: '0 auto',
    },
  });
});
