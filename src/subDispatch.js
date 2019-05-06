import { prefixType } from './utils';

export default (model, dispatch) => (action) => {
	const { type } = action;
	return dispatch({
		...action,
		type: prefixType(type, model),
	});
};