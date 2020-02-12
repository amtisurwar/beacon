// import loggedReducer from './IsLoggedReducer';
import cakeReducer from './cakeReducer';
import iceCreamReducer from './iceCreamReducer';
// import userReducer from './User';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer
})
export default rootReducer;