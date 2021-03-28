import {format} from 'date-fns';

const formatDate = (dateStr, formatStr = 'yyyy-MM-dd') => {
  return format(new Date(dateStr), formatStr);
};

export {formatDate};
