"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "react", {
  enumerable: true,
  get: function get() {
    return _react["default"];
  }
});
exports.reactRedux = exports.redux = exports["default"] = exports.run = exports.model = exports.router = void 0;

var redux = _interopRequireWildcard(require("redux"));

exports.redux = redux;

var reactRedux = _interopRequireWildcard(require("react-redux"));

exports.reactRedux = reactRedux;

var _react = _interopRequireDefault(require("react"));

var _creatReact = _interopRequireDefault(require("./creatReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var creatReact = new _creatReact["default"](); // 获取router

var router = function router(_router) {
  creatReact.getRouter(_router);
}; // 获取saga，action，reducers


exports.router = router;

var model = function model(params) {
  creatReact.getReducers(params);
}; // 启动


exports.model = model;

var run = function run(selector) {
  creatReact.creat(selector);
};

exports.run = run;

var _default = function _default() {
  return {
    namespace: 'mido',
    model: model,
    router: router,
    run: run
  };
};

exports["default"] = _default;