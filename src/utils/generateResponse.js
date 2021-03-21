const generateSuccessResponse = (data) => {
  let result = {
    success: true,
    message: 'Success',
    data,
  };

  return result;
};

const generateErrorResponse = ({ message, error }) => {
  let result = {
    success: false,
    message: `Error: ${message}`,
    data: JSON.stringify(error),
  };

  return result;
};

export { generateSuccessResponse, generateErrorResponse };
