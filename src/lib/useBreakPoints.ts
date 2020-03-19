import { useMemo } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

/* eslint-disable react-hooks/rules-of-hooks */
export function isSmallDown(): boolean {
  const isSmall = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('sm');
  });

  return useMemo(() => {
    return isSmall;
  }, [isSmall]);
}

export function isExtraSmallDown(): boolean {
  const isXs = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('xs');
  });

  return useMemo(() => {
    return isXs;
  }, [isXs]);
}
