import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { loadingStyles } from './LoadingScreen.styles';

const LoadingScreen = () => {
  const classes = loadingStyles();

  const loading = useSelector((state: ReduxState) => {
    return state.appState.requestExecuting;
  });

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingScreen;
