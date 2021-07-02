import dayjs from 'dayjs';

export const getDefaultDateFormat = () => 'YYYY-MM-DD';

export const getCurrentDate = (format) => dayjs().format(format ? format : getDefaultDateFormat());

export const getTomorrow = (format) =>
  dayjs()
    .add(1, 'day')
    .format(format ? format : getDefaultDateFormat());

export const getCloseOfBusiness = () =>
  dayjs().set('hour', 17).set('minute', 0).format('YYYY-MM-DD:HH:mm');

export const formatDate = (date) => {
  return dayjs(date).format(getDefaultDateFormat());
};
