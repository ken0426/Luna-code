import dayjs from 'dayjs';

export const dateFormat = (
  date: Date,
  time = 'YYYY-MM-DD' || 'YYYY-MM-DD HH:mm',
) => {
  return dayjs(date).format(time);
};
