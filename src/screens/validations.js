import dayjs from 'dayjs';
import {duplicates} from '../utils/helpers';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const validateDate = (value) => {
  if (!value) {
    return 'Date is required!';
  }

  const parsedDate = dayjs(value, ['D-M-YYYY', 'DD-MM-YYYY'], true);
  if (!parsedDate.isValid()) {
    return 'Invalid date';
  }

  return null;
};

export const validateResult = (result) => {
  if (!result) {
    return 'Result is required!';
  }

  const arrResult = result.split(',').map((item) => +item.trim());
  const numberOfResult = arrResult.length;

  if (numberOfResult !== 6) {
    return 'Result must includes 6 digital number';
  }

  const isOutOfRange = result
    .split(',')
    .map((item) => +item)
    .some((item) => item <= 0 || item > 55);

  if (isOutOfRange) {
    return 'Result include invalid value';
  }

  const duplicateNumbers = duplicates(arrResult);

  if (duplicateNumbers.length) {
    return 'REsult include duplicate numbers';
  }

  return null;
};
