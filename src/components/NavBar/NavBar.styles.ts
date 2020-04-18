import { createStyles, fade, Theme } from '@material-ui/core';
import { BACKGROUND, NAV_BAR_HEIGHT, SECONDARY } from 'assets/Styles';
import { makeStyles } from '@material-ui/styles';

export const navbarStyles = makeStyles(
  ({ spacing, breakpoints, shape, palette, transitions }: Theme) => {
    return createStyles({
      navBar: {
        height: NAV_BAR_HEIGHT,
        background: `linear-gradient(${BACKGROUND}, ${BACKGROUND})`,
        transition: 'all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        alignItems: 'space-evenly',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        [breakpoints.down('xs')]: {
          paddingLeft: '10px',
          paddingRight: '0',
        },
      },
      title: {
        flexBasis: '8ch',
        minWidth: '8ch',
        textTransform: 'uppercase',
        fontWeight: 500,
        color: SECONDARY,
        cursor: 'pointer',
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
        marginLeft: spacing(2),
        [breakpoints.down('sm')]: {
          marginLeft: spacing(1),
        },
        [breakpoints.down('xs')]: {
          marginLeft: spacing(0),
        },
        backgroundColor: fade(palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(palette.common.white, 0.25),
        },
      },
      searchIcon: {
        width: spacing(5),
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
        padding: spacing(1, 1, 1, 5),
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
          paddingRight: '6px',
          paddingLeft: '6px',
        },
      },
      listIcon: {
        minWidth: '40px',
      },
      menuList: {
        textTransform: 'lowercase',
      },
    });
  },
);
