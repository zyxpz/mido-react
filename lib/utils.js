"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnSelf = exports.loop = exports.isFunction = exports.isArray = void 0;
var isArray = Array.isArray.bind(Array);
exports.isArray = isArray;

var isFunction = function isFunction(o) {
  return typeof o === 'function';
};

exports.isFunction = isFunction;

var loop = function loop() {};

exports.loop = loop;

var returnSelf = function returnSelf(m) {
  return m;
};

exports.returnSelf = returnSelf;