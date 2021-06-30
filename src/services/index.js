import {DispatchUnwrapResult} from '../redux/helpers';
import {getResult, addResult} from '../redux/actions';

export const handleGetData = async (params) => {
  try {
    return await DispatchUnwrapResult(getResult, params);
  } catch (err) {
    console.log('err: ', err);
    // Handle err
  }
};
