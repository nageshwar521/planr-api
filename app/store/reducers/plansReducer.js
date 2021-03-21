import {initialState} from '../initialState';

const plansReducer = (state = initialState.plans, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PLANS_REQUEST:
      state = {...state, isPlansLoading: false, plansError: null};
      break;
    case actionTypes.GET_ALL_PLANS_SUCCESS:
      state = {...state, plans: action.payload, isPlansLoading: false};
      break;
    case actionTypes.GET_ALL_PLANS_ERROR:
      state = {...state, plansError: action.payload, isPlansLoading: false};
      break;

    default:
      break;
  }
  return state;
};

export default plansReducer;
