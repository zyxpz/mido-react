export const isArray = Array.isArray.bind(Array);
export const isFunction = o => typeof o === 'function';
export const loop = () => { };
export const returnSelf = m => m;

// type的类型
export const prefixType = (type, model) => {
	const prefixedType = `${model.namespace}/${type}`;
	const typeWithoutAffix = prefixedType.replace(/\/@@[^/]+?$/, '');
	if ((model.reducers && model.reducers[typeWithoutAffix])
		|| (model.effects && model.effects[typeWithoutAffix])) {
		return prefixedType;
	}
	return type;
};


const prefix = (obj, namespace) => {
	return Object.keys(obj).reduce((memo, key) => {
		const newMemo = memo;
		const newKey = `${namespace}/${key}`;
		newMemo[newKey] = obj[key];
		return newMemo;
	}, {});
};

// 对reducers和effects加上上namespace
export const prefixNamespace = (model) => {
	const {
		namespace,
		reducers,
		effects
	} = model;

	let newModel = model;

	if (reducers) {
		if (isArray(reducers)) {
			newModel.reducers[0] = prefix(reducers[0], namespace);
		} else {
			newModel.reducers = prefix(reducers, namespace);
		}
	}

	if (effects) {
		newModel.effects = prefix(effects, namespace);
	}

	return newModel;
};