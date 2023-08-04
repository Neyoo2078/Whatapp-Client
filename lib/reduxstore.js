import { configureStore } from '@reduxjs/toolkit';
import { compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { applyMiddleware } from '@reduxjs/toolkit';
import chatReducer from '../reduxReducers/Reducers';

export const store = configureStore(
  { reducer: { User: chatReducer } },
  compose(applyMiddleware(thunk))
);
