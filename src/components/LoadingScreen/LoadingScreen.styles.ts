import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const loadingStyles = makeStyles((theme: Theme) => {
  return createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + theme.zIndex.modal,
    },
  });
});
