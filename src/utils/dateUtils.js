const format = require('date-fns');

const formatDate = (dateStr, formatStr = 'yyyy-MM-dd') => {
  return format(new Date(dateStr), formatStr);
};

module.exports = { formatDate };
