import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { isFunction, isArray } from './utils';
import creatReducers from './creatReducers';
import creatStore from './creatStore';

class creactReact {
	constructor() {
		this.router = '';
	}

	// 获取路由
	getRouter(router) {
		this.router = router;
	}

	// 创建reducers
	// @creatReducers
	getReducers(params) {
		if (isArray(params)) {
			const reducersArr = [];
			let buildReducers = '';
			params.forEach(item => {
				const {
					namespace,
					state,
					reducers,
				} = item;
				buildReducers = creatReducers(namespace, state, reducers);

				reducersArr.push(buildReducers);
			});
			// 创建store
			const d = creatStore(reducersArr);

			this.store = createStore(d);
		} else {
			const {
				namespace,
				state,
				reducers,
			} = params;
			const buildReducers = creatReducers(namespace, state, reducers);

			// 创建store
			const d = creatStore(buildReducers);

			this.store = createStore(d);
		}
		
	}

	// 创建渲染
	creat(selector) {
		if (isFunction(this.router)) {
			render(<Provider store={this.store}>{this.router()}</Provider>, selector);
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
