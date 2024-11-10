import dayjs from 'dayjs';

export const dateFormat = (
  date: string,
  time = 'YYYY-MM-DD' || 'YYYY-MM-DD HH:mm',
) => {
  return dayjs(date).format(time);
};
