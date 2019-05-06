import * as sagaEffects from 'redux-saga/effects';
import { prefixType, loop, isArray } from './utils';

const applyOnEffect = (fns = [], effect, model, key) => {
	let newEffect = effect;
	for (const fn of fns) {
		newEffect = fn(effect, sagaEffects, model, key);
	}
	return newEffect;
};

export default (model) => {
	const {
		effects
	} = model;
	return function* () {
		for (const key in effects) {
			if (Object.hasOwnProperty.call(effects, key)) {
				const watcher = getWatcher(key, effects[key], model);
				const task = yield sagaEffects.fork(watcher);
				yield sagaEffects.fork(function* () {
					yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
					yield sagaEffects.cancel(task);
				});
			}
		}
	};
};

function getWatcher(key, _effect, model) {
	let type = 'takeEvery';
	let effect = _effect;
	let ms;

	if (isArray(_effect)) {
		effect = _effect[0];
		const opts = _effect[1];

		if (opts && opts.type) {
			type = opts.type;
			ms = opts.ms;
		}
	}

	function* sagaWithCatch(...args) {
		const { mido_resolve: resolve = loop, mido_reject: reject = loop } =
			args.length > 0 ? args[0] : {};
		try {
			yield sagaEffects.put({ type: `${key}/@@start` });
			const ret = yield effect(...args.concat(createEffects(model)));
			yield sagaEffects.put({ type: `${key}/@@end` });
			resolve(ret);
		} catch (e) {
			console.log(e);
			reject(e);
		}
	}

	const createEffects = (model) => {
		const put = (action) => {
			const { type } = action;
			return sagaEffects.put({
				...action,
				type: prefixType(type, model)
			});
		};

		const putResolve = (action) => {
			const { type } = action;
			return sagaEffects.put.resolve({
				...action,
				type: prefixType(type, model),
			});
		};
		put.resolve = putResolve;

		const take = (type) => {
			if (typeof type === 'string') {
				return sagaEffects.take(prefixType(type, model));
			} else if (Array.isArray(type)) {
				return sagaEffects.take(
					type.map(t => {
						if (typeof t === 'string') {
							return prefixType(t, model);
						}
						return t;
					}),
				);
			} else {
				return sagaEffects.take(type);
			}
		};

		return {
			...sagaEffects,
			put,
			take
		};
	};

	const sagaWithOnEffect = applyOnEffect([], sagaWithCatch, model, key);

	switch (type) {
		case 'watcher':
			return sagaWithCatch;
		case 'takeLatest':
			return function* () {
				yield sagaEffects.takeLatest(key, sagaWithOnEffect);
			};
		case 'throttle':
			return function* () {
				yield sagaEffects.throttle(ms, key, sagaWithOnEffect);
			};

		default:
			return function* () {
				yield sagaEffects.takeEvery(key, sagaWithOnEffect);
			};
	}
}