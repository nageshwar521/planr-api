import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import monitorReducerEnhancer from './monitorReducerEnhancer';
import rootReducer from './reducers';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(monitorReducerEnhancer, middlewareEnhancer);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
