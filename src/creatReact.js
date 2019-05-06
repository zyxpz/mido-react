import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { isFunction, isArray, prefixNamespace } from './utils';
import creatStore, { creatReducerFunc } from './creatStore';
import creatSub from './creatSubscriptions';
import creatSaga from './creatSaga.js';

class creactReact {
	constructor() {
		this.router = '';
		this.subs = ''; // subscriptions
		this.buildReducers = {};
		this.sagas = [];
	}

	// 获取路由
	getRouter(router) {
		this.router = router;
	}

	// 获取effects
	getEffects(model) {
		this.sagas.push(creatSaga(model));
	}

	// 获取model，处理model
	// @creatReducers
	getModel(params) {
		let d = '';
		const newParams = [prefixNamespace(params)];

		for (const m of newParams) {
			this.buildReducers[m.namespace] = creatReducerFunc(m.reducers, m.state);

			// 存储subscriptions
			this.subs = m;

			// effects
			this.getEffects(m);

		}

		// 创建store
		d = creatStore(this.buildReducers);		

		const sagaMiddleware = createSagaMiddleware();

		this.sagaMiddleware = sagaMiddleware;

		this.store = createStore(d, applyMiddleware(sagaMiddleware));

	}

	// 创建渲染
	creat(selector) {

		// 事件订阅
		creatSub(this.subs, this.store);

		this.sagas.forEach(this.sagaMiddleware.run);

		if (isFunction(this.router)) {
			render(
				<Provider store={this.store}>
					{this.router({ history: createBrowserHistory() })}
				</Provider>, selector);
		} else if (isArray(this.router)) {
			render(
				<Provider store={this.store}>
					<Router>
						{
							this.router.map((item, i) =>
								<Route
									key={i}
									exact={item.exact}
									path={item.path}
									component={item.component}
								/>
							)
						}

					</Router>
				</Provider>, selector);
		}
	}
}

export default creactReact;