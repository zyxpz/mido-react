// 当是数组的时候，返回type应该带上namespace
const prefixType = (type, model, array) => {
	const prefixedType = `${model.namespace}/${type}`;
	const typeWithoutAffix = prefixedType.replace(/\/@@[^/]+?$/, '');
	if (array) {
		return typeWithoutAffix;
	}
	return type;
};

export default (model, dispatch, array) => (action) => {
	const { type } = action;
	return dispatch({
		...action,
		type: prefixType(type, model, array),
	});
};