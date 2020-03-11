import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const eventCardStyles = makeStyles((theme: Theme) => {
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
