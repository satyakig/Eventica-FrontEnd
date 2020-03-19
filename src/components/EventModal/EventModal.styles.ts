import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DARKER } from 'assets/Styles';

export const eventModalStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialog: {
      overflowY: 'auto',
    },
    image: {
      height: '200px',
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
    bottomGrid: {
      marginTop: '10px',
      marginBottom: '12px',
    },
    commentField: {
      paddingTop: 8,
    },
    sendButton: {
      height: '100%',
    },
    userEventButtons: {
      height: '100%',
    },
    updateButton: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    disabledCheck: {
      '& .Mui-disabled': {
        color: '#ffffff',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: (props: any) => {
          return props.isHost ? '' : 0;
        },
      },
      '& .MuiAutocomplete-endAdornment': {
        display: (props: any) => {
          return props.isHost ? '' : 'none';
        },
      },
    },
  });
});
