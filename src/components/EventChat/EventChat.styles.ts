import { createStyles, makeStyles } from '@material-ui/styles';
import { CARD_BG, SECONDARY } from 'assets/Styles';

export const eventChatStyles = makeStyles(() => {
  return createStyles({
    gridContainer: {
      width: '100%',
    },
    gridItem: {
      padding: '8px',
    },
  });
});
