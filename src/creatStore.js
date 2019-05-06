import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import handleActions from './creatReducers';

export const creatReducerFunc = (reducers, state) => {
	if (Array.isArray(reducers)) {
		return reducers[1](
			handleActions(state, reducers[0])
		);
	} else {
		return handleActions(state, reducers || {});
	}
};


export default (reducers) => {
	return combineReducers({
		routing: routerReducer,
		...reducers
	});

};