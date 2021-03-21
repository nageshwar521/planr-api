export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface ResponseObject extends BaseResponse {
  data?: any;
}

const generateSuccessResponse = (data: any): ResponseObject => {
  let result: ResponseObject = {
    success: true,
    message: 'Success',
    data,
  };

  return result;
};

export interface ErrorResponseData {
  message: string;
  error: any;
}

const generateErrorResponse = ({
  message,
  error,
}: ErrorResponseData): ResponseObject => {
  let result: ResponseObject = {
    success: false,
    message: `Error: ${message}`,
    data: JSON.stringify(error),
  };

  return result;
};

export { generateSuccessResponse, generateErrorResponse };
