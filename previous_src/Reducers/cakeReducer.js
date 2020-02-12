import {BUY_CAKE} from '../Constants';

const inititalState = {
	numOfCakes: 10,
}

const cakeReducer = (state = inititalState, action) => {
	switch(action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1
			};
		default:
			return state;
	}
}
export default cakeReducer;