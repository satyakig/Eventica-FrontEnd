import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DARKER } from 'assets/Styles';

export const eventChatStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialog: {
      overflowY: 'auto',
    },
    image: {
      height: '200px',
      cursor: (props: any) => {
        return props.isHost ? 'pointer' : 'auto';
      },
    },
    topGrid: {
      marginTop: '10px',
    },
    typographyTitle: {
      borderRadius: '4px',
      textAlign: 'center',
    },
    tabs: {
      backgroundColor: DARKER,
      borderRadius: '5px',
    },
    tab: {
      flexGrow: 1,
    },
    bottomGrid: {
      marginTop: '10px',
      marginBottom: '12px',
    },
  });
});
