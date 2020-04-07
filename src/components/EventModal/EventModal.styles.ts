import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { BACKGROUND, DARKER } from 'assets/Styles';

export const eventModalStyles = makeStyles(({ spacing }: Theme) => {
  return createStyles({
    dialog: {
      overflowY: 'auto',

      '& .MuiDialog-paper': {
        height: 'calc(100% - 64px)',
        minHeight: 'calc(100% - 64px)',
        maxHeight: 'calc(100% - 64px)',

        '@media only screen and (max-width: 500px)': {
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          marginLeft: 0,
          marginRight: 0,
        },

        '@media only screen and (max-height: 650px)': {
          height: '100%',
          minHeight: '100%',
          maxHeight: '100%',
          marginTop: 0,
          marginBottom: 0,
        },
      },

      '& .MuiDialog-paperFullWidth': {
        '@media only screen and (max-width: 500px)': {
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
        },
      },

      '& .MuiDialog-paperScrollPaper': {
        '@media only screen and (max-height: 650px)': {
          maxHeight: '100%',
        },
      },
    },
    expansionPanel: {
      background: BACKGROUND,
    },
    expansionPanelLabel: {
      fontWeight: 600,
    },
    hostCursor: {
      cursor: 'default !important',
    },
    hostCard: {
      width: '100%',
      textAlign: 'center',
    },
    image: {
      maxHeight: '250px',
      height: '250px',
      flexBasis: '250px',
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
      right: spacing(1),
      top: spacing(1),
    },
    commonInputStyles: {
      width: '100%',

      '& .MuiInputBase-input': {
        color: '#ffffff',
      },
      '& .MuiChip-root': {
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
      '& .MuiChip-deleteIcon': {
        display: (props: any) => {
          return props.isHost ? '' : 'none';
        },
      },
    },
    ownerInputStyles: {
      width: '100%',

      '& .MuiInputBase-input': {
        color: '#ffffff',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 0,
      },
    },
    ownerAddButton: {
      width: '100%',
    },
    scanButton: {
      width: '100%',
    },
  });
});
