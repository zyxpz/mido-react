import { createBrowserHistory } from 'history';

import subDispatch from './subDispatch';

export default (subs, store) => {
	for (const key in subs['subscriptions']) {
		if (Object.hasOwnProperty.call(subs['subscriptions'], key)) {
			const sub = subs['subscriptions'][key];
			sub({
				dispatch: subDispatch(subs, store.dispatch),
				history: createBrowserHistory()
			});
		}
	}
};