"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _utils = require("./utils");

var _creatReducers = _interopRequireDefault(require("./creatReducers"));

var _creatStore = _interopRequireDefault(require("./creatStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var creactReact =
/*#__PURE__*/
function () {
  function creactReact() {
    _classCallCheck(this, creactReact);

    this.router = '';
  } // 获取路由


  _createClass(creactReact, [{
    key: "getRouter",
    value: function getRouter(router) {
      this.router = router;
    } // 创建reducers
    // @creatReducers

  }, {
    key: "getReducers",
    value: function getReducers(params) {
      if ((0, _utils.isArray)(params)) {
        var reducersArr = [];
        var buildReducers = '';
        params.forEach(function (item) {
          var namespace = item.namespace,
              state = item.state,
              reducers = item.reducers;
          buildReducers = (0, _creatReducers["default"])(namespace, state, reducers);
          reducersArr.push(buildReducers);
        }); // 创建store

        var d = (0, _creatStore["default"])(reducersArr);
        this.store = (0, _redux.createStore)(d);
      } else {
        var namespace = params.namespace,
            state = params.state,
            reducers = params.reducers;

        var _buildReducers = (0, _creatReducers["default"])(namespace, state, reducers); // 创建store


        var _d = (0, _creatStore["default"])(_buildReducers);

        this.store = (0, _redux.createStore)(_d);
      }
    } // 创建渲染

  }, {
    key: "creat",
    value: function creat(selector) {
      if ((0, _utils.isFunction)(this.router)) {
        (0, _reactDom.render)(_react["default"].createElement(_reactRedux.Provider, {
          store: this.store
        }, this.router()), selector);
      } else if ((0, _utils.isArray)(this.router)) {
        (0, _reactDom.render)(_react["default"].createElement(_reactRedux.Provider, {
          store: this.store
        }, _react["default"].createElement(_reactRouterDom.BrowserRouter, null, this.router.map(function (item, i) {
          return _react["default"].createElement("div", {
            key: i
          }, _react["default"].createElement(_reactRouterDom.Route, {
            key: i,
            exact: item.exact,
            path: item.path,
            component: item.component
          }));
        }))), selector);
      }
    }
  }]);

  return creactReact;
}();

var _default = creactReact;
exports["default"] = _default;