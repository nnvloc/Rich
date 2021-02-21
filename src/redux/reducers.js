import {createSlice} from '@reduxjs/toolkit';

import {getResult, addResult} from './actions';

const initialState = {data: {}};

const rootReducer = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getResult.fulfilled]: (state, action) => {
      const {
        payload: {data},
      } = action;

      console.log('received data: ', data);
    },
    [addResult.fulfilled]: (state, action) => {
      const {
        payload: {data},
      } = action;
      console.log('added result: ', data);
    },
  },
});

export default rootReducer.reducer;
