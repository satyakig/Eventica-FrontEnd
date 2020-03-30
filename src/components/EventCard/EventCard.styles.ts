import { createStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment-timezone';
import { CARD_BG, DARK, PRIMARY, SECONDARY, SUCCESS, WARNING } from 'assets/Styles';

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
      width: '100%',
    },
    badge: {
      height: '100%',
      width: '100%',
      '& .MuiBadge-badge': {
        height: '14px',
        minWidth: '14px',
        backgroundColor: (event: any) => {
          if (event.end < moment.valueOf()) {
            return DARK;
          }

          if (event.isEventPostponed()) {
            return WARNING;
          }

          if (event.isEventCancelled()) {
            return PRIMARY;
          }

          return SUCCESS;
        },
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
