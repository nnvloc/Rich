import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const useGetFilteredResults = () => {
  return useSelector(({global: {data}}) => {
    return Object.keys(data).reduce((results, key) => {
      const date = dayjs(key, ['D-M-YYYY', 'DD-MM-YYYY'], true);
      const item = {...data[key]};
      const {extra} = item;
      item.extra = +extra;
      item.key = key;
      item.date = date;
      item.dayOfWeek = date.day();
      results.push(item);
      return [...results];
    }, []);
  });
};

export const useGetResultsByValue = () => {
  return useSelector(({global: {data}}) => {
    return Object.keys(data).reduce((results, key) => {
      const date = dayjs(key, ['D-M-YYYY', 'DD-MM-YYYY'], true);
      const item = {...data[key]};
      const {extra} = item;
      item.extra = +extra;
      item.key = key;
      item.date = date;
      item.dayOfWeek = date.day();
      item.valueString = item.value.join(', ');
      if (results[item.valueString]) {
        item.doubleKey = results[item.valueString].key;
      }
      return {...results, [item.valueString]: item};
    }, {});
  });
}
