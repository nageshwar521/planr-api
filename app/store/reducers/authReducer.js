import {actionTypes} from '../actionTypes';
import {initialState} from '../initialState';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      state = {...state, isLoginLoading: true};
      break;
    case actionTypes.LOGIN_SUCCESS:
      state = {...state, isLoggedIn: true, isLoginLoading: false};
      break;
    case actionTypes.LOGIN_ERROR:
      state = {...state, isLoggedIn: false, isLoginLoading: false};
      break;

    default:
      break;
  }
  return state;
};

export default authReducer;
