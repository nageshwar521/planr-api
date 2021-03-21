import {combineReducers} from 'redux';
import authReducer from './authReducer';
import plansReducer from './plansReducer';

const rootReducer = combineReducers({auth: authReducer, plans: plansReducer});

export default rootReducer;
