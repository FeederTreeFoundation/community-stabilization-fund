import dayjs from 'dayjs';

const defaultFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
dayjs().format(defaultFormat);

export const getDate = (date?: Date|string) => dayjs(date);

export const addDays = (dt: Date | string, days: number, format?: string) => {
  const date = dayjs(dt).add(days, 'day').format(format || defaultFormat);
  return date;
};

export const addWeeks = (dt: Date | string, weeks: number, format?: string) => {
  const date = dayjs(dt).add(weeks, 'week').format(format || defaultFormat);
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