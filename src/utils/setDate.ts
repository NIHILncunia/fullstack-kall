import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Seoul');

export const setDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};
