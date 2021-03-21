import {loginApi} from 'app/services/ApiService';

const {createAction} = require('@reduxjs/toolkit');
const {actionTypes} = require('../actionTypes');

const loginRequest = createAction(actionTypes.LOGIN_REQUEST);
const loginSuccess = createAction(actionTypes.LOGIN_SUCCESS);
const loginError = createAction(actionTypes.LOGIN_ERROR);

export const login = (payload) => {
  return async (dispatch, getState) => {
    dispatch(loginRequest());

    try {
      const response = await loginApi(payload);
      console.log('login response');
      console.log(response);
    } catch (error) {
      console.log('login error');
      console.log(error);
    }
  };
};
