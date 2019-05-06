import * as redux from 'redux';

import * as reactRedux from 'react-redux';

import react from 'react';

import * as reactRouterDom from 'react-router-dom';

import { isArray } from './utils';

import CreactReact from './creatReact';

const creatReact = new CreactReact();

// 获取router
export const router = (router) => {
	creatReact.getRouter(router);
};

// 获取saga，action，reducers
export const model = (params) => {
	if (isArray(params)) {
		params.forEach(item => {
			creatReact.getModel(item);
		});
	} else {
		creatReact.getModel(params);
	}
};

// 启动
export const run = (selector) => {
	creatReact.creat(selector);
};

export { react };

export { redux };

export { reactRedux };

export { reactRouterDom };

export default () => (
	{
		namespace: 'mido',
		model,
		router,
		run,
	}
);