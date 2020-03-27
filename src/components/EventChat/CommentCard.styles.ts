import { createStyles, makeStyles } from '@material-ui/styles';
import { BACKGROUND, DARK } from '../../assets/Styles';

export const commentCardStyles = makeStyles(() => {
  return createStyles({
    root: {
      width: '100%',
      backgroundColor: BACKGROUND,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    textField: {
      width: '100%',
      backgroundColor: DARK,
    },
    listIcon: {
      minWidth: '40px',
    },
  });
});
