import dayjs from 'dayjs';

export const getDefaultDateFormat = () => 'YYYY-MM-DD';

export const getCurrentDate = () => dayjs().format(getDefaultDateFormat());

export const formatDate = (date) => {
  return dayjs(date).format(getDefaultDateFormat());
};
