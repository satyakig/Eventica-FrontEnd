import { createStyles, makeStyles } from '@material-ui/styles';

export const eventCardStyles = makeStyles(() => {
  return createStyles({
    cardContainer: {
      height: '100%',
    },
    cardClick: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      height: '200px',
      flexBasis: '200px',
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
