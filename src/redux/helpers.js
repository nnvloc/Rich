import {unwrapResult} from '@reduxjs/toolkit';
import Store from './store';

// Wrapper for dispatch to use unwrapResult from redux toolkit
export const DispatchUnwrapResult = async (cb, params) => {
  return await Store.dispatch(cb(params)).then(unwrapResult);
};
