import { IS_LOGGED } from '../Constants';

const inititalState = {
	isLogged: false
}

const loggedReducer = (state = inititalState, action) => {
	switch(action.type) {
		case IS_LOGGED:
			return {
				...state,
				isLogged: !state.isLogged
			};
		default:
			return state;
	}
}
export default loggedReducer;