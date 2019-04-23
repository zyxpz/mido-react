import { createBrowserHistory } from 'history';

import subDispatch from './subDispatch';

import { isArray } from './utils';

export default (subs, store) => {
	if (isArray(subs)) {
		subs.forEach(item => {
			for (const key in item['subscriptions']) {
				if (Object.hasOwnProperty.call(item['subscriptions'], key)) {
					const sub = item['subscriptions'][key];
					sub({
						dispatch: subDispatch(item, store.dispatch, true),
						history: createBrowserHistory()
					});
				}
			}
		});
	} else {
		for (const key in subs['subscriptions']) {
			if (Object.hasOwnProperty.call(subs['subscriptions'], key)) {
				const sub = subs['subscriptions'][key];
				sub({
					dispatch: subDispatch(subs, store.dispatch),
					history: createBrowserHistory()
				});
			}
		}
	}
	
};