import {configureStore} from '@reduxjs/toolkit';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

// And use redux-batch as an example of adding enhancers
import {reduxBatch} from '@manaflair/redux-batch';

import globalReducer from './reducers';

const reducer = {
  global: globalReducer,
};

const preloadedState = {
  global: {
    data: {},
  },
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
});

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together

export default store;
