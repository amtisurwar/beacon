import {BUY_ICECREAM} from '../Constants';

const inititalState = {
	numOfIceCream: 20,
}

const iceCreamReducer = (state = inititalState, action) => {
	switch(action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numOfIceCream: state.numOfIceCream - 1
			};
		default:
			return state;
	}
}
export default iceCreamReducer;