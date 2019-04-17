"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(reducers) {
  if ((0, _utils.isArray)(reducers)) {
    var newObj = {};
    reducers.map(function (item) {
      Object.assign(newObj, item);
    });
    return (0, _redux.combineReducers)(_objectSpread({
      routing: _reactRouterRedux.routerReducer
    }, newObj));
  } else {
    return (0, _redux.combineReducers)(_objectSpread({
      routing: _reactRouterRedux.routerReducer
    }, reducers));
  }
};

exports["default"] = _default;