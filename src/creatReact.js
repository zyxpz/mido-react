import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import { isFunction, isArray } from './utils';
import creatReducers from './creatReducers';
import creatStore from './creatStore';
import creatSub from './creatSubscriptions';

class creactReact {
	constructor() {
		this.router = '';
		this.subs = ''; // subscriptions
	}

	// 获取路由
	getRouter(router) {
		this.router = router;
	}

	// 获取model，处理model
	// @creatReducers
	getModel(params) {
		let d = '';
		if (isArray(params)) {
			const reducersArr = [];
			const subArr = [];
			let buildReducers = '';
			params.forEach(item => {
				const {
					namespace,
					state,
					reducers,
					subscriptions,
				} = item;
				buildReducers = creatReducers(namespace, state, reducers);

				// 获取所以reducer
				reducersArr.push(buildReducers);

				const subObj = {
					namespace,
					reducers,
					subscriptions,
				};

				// 获取subscriptions
				subArr.push(subObj);
			});
			// 创建store
			d = creatStore(reducersArr);

			// 存储subscriptions
			this.subs = subArr;

		} else {
			const {
				namespace,
				state,
				reducers,
				subscriptions,
			} = params;
			const buildReducers = creatReducers(namespace, state, reducers);

			// 创建store
			d = creatStore(buildReducers);

			const subObj = {
				namespace,
				reducers,
				subscriptions
			};
			// 存储subscriptions
			this.subs = subObj;
		}

		this.store = createStore(d);
	}

	// 创建渲染
	creat(selector) {

		// 事件订阅
		creatSub(this.subs, this.store);
		
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
								<div key={i}>
									<Route
										key={i}
										exact={item.exact}
										path={item.path}
										component={item.component}
									/>
								</div>

							)
						}

					</Router>
				</Provider>, selector);
		}
	}
}

export default creactReact;