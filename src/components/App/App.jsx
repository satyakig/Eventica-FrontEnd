import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContainer } from '../../containers/AuthContainer';
import { loginWithGoogle } from '../../lib/Firebase';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <AuthContainer />
      <Switch>
        <Route
          path="*"
          component={() => {
            return <div>Hello World</div>;
          }}
        />
      </Switch>
      <button onClick={loginWithGoogle}>Login</button>
    </div>
  );
};

export default App;
