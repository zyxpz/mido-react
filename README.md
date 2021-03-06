# mido-react

## 优化
- webpack

```vim
externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      'redux': 'Redux',
      'react-redux': 'ReactRedux',
      'react-router-redux': 'ReactRouterRedux',
      'redux-saga': 'ReduxSaga'
    }
```

- 自行搜索cdn资源

## 内置
```vim
import { react, redux, reactRedux, reactRouterDom } from 'mido-react';
```

## app.js
- 单模式
  + mode可以是单对象

```vim
import Mido from 'mido-react';
import App from './App';
const mido = Mido();

 mido.model({
   namespace: 'home',
   state: {
     number: 1
   },
   reducers: {
     add(state, action) {
       return {
         number: state.number + 1
       }
     },
     reduce(state, action) {
       return {
         number: state.number - 1
       }
     }
   },
   effects: {
     asyncAdd: [
      function *({ data: {number} }, { call, put }) {
        yield put({
          type: 'add'
        })
      },
      {
        type: 'throttle',
        ms: 3000
      }
    ],
    *asyncReduce({  }, { call, put }) {
      yield put({
        type: 'reduce'
      })
    }
   }
 })

mido.router(() => <App />);

mido.run(document.getElementById('app'));
```

- 多模式
  + mode可以是数组

```vim
import Mido from 'mido-react';
import App from './App';
const mido = Mido();

mido.model([
  {
    namespace: 'home',
    state: {
      number: 1
    },
    reducers: {
      add(state, action) {
        return {
          number: state.number + 1
        }
      },
      reduce(state, action) {
        return {
          number: state.number - 1
        }
      }
    }
  },
  {
    namespace: 'home2',
    state: {
      number: 1
    },
    reducers: {
      add2(state, action) {
        return {
          number: state.number + 2
        }
      },
      reduce2(state, action) {
        return {
          number: state.number - 2
        }
      }
    },
     effects: {
      *asyncAdd2({ }, { call, put }) {
        yield put({
          type: 'add2'
        })
      },
      *asyncReduce2({  }, { call, put }) {
        yield put({
          type: 'reduce2'
        })
      }
    },
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
          if (pathname === '/home2') {
            dispatch({ type: 'init' });
          }
        });
      }
    }
  }
])

mido.router(() => <App />);

mido.run(document.getElementById('app'));
```

## App.js
```vim
import React from 'react';
import { midoRedux } from 'mido-react';

const {
  connect
} = midoRedux;

@connect(state => ({ number: state.home.number }))

class Home extends React.Component {
  render() {
    return (
      <div>
        home
        数字
        {this.props.number}
        <div onClick={() => { this.props.history.push('/home2') }}>点我跳转</div>
        <div onClick={() => { this.props.dispatch({ type: 'add', data:{number: 1} }) }}>点我+1</div>
        <div onClick={() => { this.props.dispatch({ type: 'reduce' }) }}>点我-1</div>
      </div>
    )
  }
}

export default Home;
```

## Router
- Routers.js
- 导入router文件

```vim
export default [
  {
    path: '/',
    exact: true,
    component: require('../page/home1').default
  },
  {
    path: '/home2',
    component: require('../page/home2').default
  }
]
```
- 自行添加router

```vim
import Mido, { reactRouterDom } from 'mido-react';

import App from './App';

const {
  BrowserRouter,
  Route
} = reactRouterDom;

***省略部分***

mido.router(() => 
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
)
```

[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)

## [example](https://github.com/zyxpz/mido-react-example)