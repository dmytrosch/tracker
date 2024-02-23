import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StoreContext } from './components/StoreContext';
import RootStore from './stores';

import './styles/main.css';

const store = new RootStore();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
