import { createStyles, fade, Theme } from '@material-ui/core';

export const navbarStyles = ({ spacing, breakpoints, shape, palette, transitions }: Theme) => {
  return createStyles({
    navBar: {
      alignItems: 'space-evenly',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      [breakpoints.down('xs')]: {
        paddingLeft: '10px',
        paddingRight: '0',
      },
    },
    title: {
      flexBasis: '11ch',
      minWidth: '11ch',
      userSelect: 'none',
      textTransform: 'uppercase',
    },
    search: {
      position: 'relative',
      flexGrow: 1,
      maxWidth: '500px',
      [breakpoints.up('sm')]: {
        maxWidth: '70%',
      },
      [breakpoints.up('md')]: {
        maxWidth: '60%',
      },
      borderRadius: shape.borderRadius,
      marginRight: 0,
      marginLeft: spacing(3),
      [breakpoints.down('sm')]: {
        marginLeft: spacing(2),
      },
      [breakpoints.down('xs')]: {
        marginLeft: spacing(1),
      },
      backgroundColor: fade(palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(palette.common.white, 0.25),
      },
    },
    searchIcon: {
      width: spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      flexGrow: 1,
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: spacing(1, 1, 1, 7),
      transition: transitions.create('width'),
    },
    end: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    button: {
      margin: spacing(1),
    },
    small: {
      width: spacing(4),
      height: spacing(4),
    },
    smallEvent: {
      [breakpoints.down('xs')]: {
        paddingRight: 0,
      },
    },
    listIcon: {
      minWidth: '40px',
    },
  });
};
