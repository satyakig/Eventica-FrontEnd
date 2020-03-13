import { createStyles, makeStyles } from '@material-ui/styles';
import { CARD_BG, SECONDARY } from 'assets/Styles';

export const eventCardStyles = makeStyles(() => {
  return createStyles({
    cardContainer: {
      height: '100%',
      backgroundColor: CARD_BG,
      textAlign: 'center',
      borderRadius: '5px',
    },
    cardClick: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
      border: '1px solid transparent',
      '&:hover': {
        border: `1px solid ${SECONDARY}`,
      },
    },
    focusHighlight: {},
    cardMedia: {
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      height: '200px',
      flexBasis: '200px',
      width: 'calc(100% - 2px)',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    subtitle: {
      fontSize: 14,
    },
    title: {
      fontSize: 18,
    },
    desc: {
      flexGrow: 3,
      maxHeight: '80px',
      overflowY: 'auto',
    },
  });
});
