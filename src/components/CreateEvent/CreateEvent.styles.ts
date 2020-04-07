import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const createEventStyles = makeStyles(({ spacing }: Theme) => {
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
    closeButton: {
      position: 'absolute',
      right: spacing(1),
      top: spacing(1),
    },
    grid: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    upload: {
      '& input': {
        cursor: 'pointer !important',
      },
    },
    title: {
      textTransform: 'lowercase',
      userSelect: 'none',
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    actions: {
      padding: '25px 0 20px 0',
    },
    submit: {
      margin: '0 auto',
    },
  });
});
