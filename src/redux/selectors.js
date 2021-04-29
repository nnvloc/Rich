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
      item.key = key;
      item.date = date;
      item.dayOfWeek = date.day();
      results.push(item);
      return [...results];
    }, []);
  });
};
