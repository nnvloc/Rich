import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const calculateAppearPeriod = (date, lastResult) => {
  const dayDiff = date.diff(lastResult.date, 'day');
  const extra = dayDiff % 7;
  const round = (dayDiff - extra) / 7;
  const distance = (round * 3) + Math.floor(extra / 2) - 1;
  return distance || '0';
}

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

export const getAppearanceOfNumber = (dataToSummary, number) => {
  const chart = dataToSummary.reduce((result, item) => {
    const {date, value} = item;
    const data = {
      x: dayjs(date, ['DD-MM-YYYY', 'D-M-YYYY'], true).format('DD-MM-YYYY'),
      y: 0,
      date,
      label: 0,
    }
    if (value.includes(number)) {
      data.y = 1;
    }

    const resultLength = result.length;
    const lastResult = result[resultLength-1];
    if (lastResult && !lastResult.y && !data.y) {
      return result;
    }
    if (lastResult) {
      data.label = calculateAppearPeriod(date, lastResult);
    }

    result.push(data);
    return result;
  }, []);

  // Pretend appearance
  const dataLength = dataToSummary.length;
  const latestResult = dataToSummary[dataLength-1];
  
  if (latestResult) {
    const increaseValue = latestResult.dayOfWeek === 6 ? 3 : 2;
    const nextDate = dayjs(latestResult.date, ['DD-MM-YYYY', 'D-M-YYYY'], true).add(increaseValue, 'd');
    const chartLegnth = chart.length;
    const lastItemChart = chart[chartLegnth - 1];
    const label = calculateAppearPeriod(nextDate, lastItemChart);
    const data = {
      x: nextDate.format('DD-MM-YYYY') + ' Pretend',
      y: 1,
      date: nextDate,
      label: label + '         ',
    }
    chart.push(data);
  }

  return {
    chart,
  };
}

export const sortResultsByDate = (data, type = 0) => {
  if (!type || type === 'asc') {
    return data.sort((a, b) => {
      return a.date.isSameOrBefore(b.date) ? 1 : -1;
    });
  } else {
    return data.sort((a, b) => {
      return a.date.isSameOrBefore(b.date) ? -1 : 1;
    });
  }
}
