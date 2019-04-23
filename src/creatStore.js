import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { isArray } from './utils';

export default (reducers) => {
	if (isArray(reducers)) {
		let newObj = {};
		reducers.map(item => {
			Object.assign(newObj, item);
		});

		return combineReducers({
			routing: routerReducer,
			...newObj
		});

	} else {
		return combineReducers({
			routing: routerReducer,
			...reducers
		});
	}

};