import { createStyles, makeStyles } from '@material-ui/styles';
import { BACKGROUND, DARK } from '../../assets/Styles';

export const commentCardStyles = makeStyles(() => {
  return createStyles({
    root: {
      width: '100%',
      backgroundColor: BACKGROUND,
    },
    textField: {
      width: '100%',
      backgroundColor: DARK,
    },
    listIcon: {
      minWidth: '40px',
    },
    image: {
      maxHeight: '400px',
    },
  });
});
