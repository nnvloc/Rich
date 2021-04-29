import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const duplicates = (arr) => {
  let hash = {};
  arr.forEach((item) => {
    if (!hash[item]) {
      hash[item] = 1;
    } else {
      hash[item]++;
    }
  });

  return Object.keys(hash).reduce(
    (result, key) => [...result, ...(hash[key] >= 2 ? [key] : [])],
    [],
  );
};

export const filterData = ({filter, rootData}) => {
  const {startDate, endDate, dayOfWeek} = filter;
  return rootData.filter((item) => {
    const start = dayjs(startDate, ['DD-MM-YYYY', 'D-M-YYYY'], true);
    const end = dayjs(endDate, ['DD-MM-YYYY', 'D-M-YYYY'], true);
    if (item.date.isSameOrAfter(start) && item.date.isSameOrBefore(end)) {
      if (dayOfWeek) {
        return +item.dayOfWeek === +dayOfWeek;
      } else {
        return item;
      }
    }
  });
};
