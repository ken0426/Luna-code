import dayjs from 'dayjs';

type Format = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm';

export const dateFormat = (date: Date, format: Format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};
