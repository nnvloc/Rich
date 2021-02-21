import {createAsyncThunk} from '@reduxjs/toolkit';
import HttpLayer from '../httpLayer';

export const getResult = createAsyncThunk(
  'results/getResults',
  async (params, thunkAPI) => {
    const results = await HttpLayer.get('data');
    return {data: results.data};
  },
);

export const addResult = createAsyncThunk(
  'results/addResults',
  async (params, thunkAPI) => {
    const response = await HttpLayer.post('result/add', params);
    console.log('add result response: ', response);
    return {data: response.data};
  },
);
