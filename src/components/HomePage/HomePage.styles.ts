import { createStyles, makeStyles } from '@material-ui/styles';
import { BACKGROUND, NAV_BAR_HEIGHT } from 'assets/Styles';

export const homePageStyles = makeStyles(() => {
  return createStyles({
    body: {
      paddingTop: '10px',
      overflowY: 'auto',
      height: `calc(100vh - ${NAV_BAR_HEIGHT})`,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(${BACKGROUND}, ${BACKGROUND})`,
      transition: 'all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    },
  });
});
