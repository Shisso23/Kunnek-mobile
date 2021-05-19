import dayjs from 'dayjs';

export const getDefaultDateFormat = () => 'YYYY-MM-DD';

export const getCurrentDate = () => dayjs().format(getDefaultDateFormat());
