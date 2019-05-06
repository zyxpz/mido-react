import { returnSelf } from './utils';

const handleAction = (actionType, reducer = returnSelf) => (state, action) => {
	const { type } = action;
	if (actionType === type) {
		return reducer(state, action);
	}
	return state;
};

const reduceReducers = (...reducers) => 
	(previous, current) => 
		reducers.reduce((p, r) => r(p, current), previous);

export default (initialState, handlers) => {
	const reducers = Object.keys(handlers).map(type =>
		handleAction(type, handlers[type])
	);
    
	const reducer = reduceReducers(...reducers);
	return (state = initialState, action) => reducer(state, action);
};

