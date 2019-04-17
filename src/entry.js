import * as redux from 'redux';

import * as reactRedux from 'react-redux';

import react from 'react';

import CreactReact from './creatReact';

const creatReact = new CreactReact();

// 获取router
export const router = (router) => {
	creatReact.getRouter(router);
};

// 获取saga，action，reducers
export const model = (params) => {
	creatReact.getReducers(params);
};

// 启动
export const run = (selector) => {
	creatReact.creat(selector);
};

export { react };

export { redux };

export { reactRedux };

export default () => (
	{
		namespace: 'mido',
		model,
		router,
		run,
	}
);
