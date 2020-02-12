import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers';
// import cakeReducer from '../Reducers/cakeReducer'
// import {createLogger} from 'redux-logger';

const store = createStore(rootReducer);

export default store;