import { createStyles, makeStyles } from '@material-ui/styles';
import { CARD_BG, SECONDARY } from 'assets/Styles';

export const eventCardStyles = makeStyles(() => {
  return createStyles({
    cardContainer: {
      height: '100%',
      maxHeight: '375px',
      backgroundColor: CARD_BG,
      textAlign: 'center',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid transparent',
      '&:hover': {
        cursor: 'pointer',
        border: `1px solid ${SECONDARY}`,
      },
    },
    cardMedia: {
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      maxHeight: '200px',
      height: '200px',
      flexBasis: '200px',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',

      '&:last-child': {
        paddingBottom: '16px',
      },
    },
    subtitle: {
      fontSize: 14,
    },
    title: {
      fontSize: 18,
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
    desc: {
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
  });
});
