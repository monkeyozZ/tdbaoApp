import React from 'react';
import { Provider } from 'mobx-react';
import Navigation  from './router'
import store from './store';

export default () => (
  <Provider rootStore={store}>
    <Navigation />
  </Provider>
);
