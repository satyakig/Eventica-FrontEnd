import { createStyles, makeStyles } from '@material-ui/styles';

export const eventCardStyles = makeStyles(() => {
  return createStyles({
    subtitle: {
      fontSize: 14,
    },
    title: {
      fontSize: 18,
    },
    cardContainer: {
      height: '100%',
      overflowWrap: 'break-word',
    },
    cardClick: {
      height: '100%',
    },
  });
});
