import dayjs from 'dayjs';
dayjs().format();

export const addDays = (dt: Date, days: number) => {
  const date = dayjs(dt).add(days, 'day').format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
  return date;
};

export const addWeeks = (dt: Date, weeks: number) => {
  const date = dayjs(dt).add(weeks, 'week').format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');
  return date;
};

export const compareDates = (compare_keyword: string, dt1: string | Date, dt2: string | Date) => {
  if(compare_keyword.toLowerCase() === 'before') {
    return dayjs(dt1).isBefore(dt2);
  }

  if(compare_keyword.toLowerCase() === 'after') {
    return dayjs(dt1).isAfter(dt2);
  }
};