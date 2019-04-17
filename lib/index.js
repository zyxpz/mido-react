"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _entry["default"];
  }
});
Object.defineProperty(exports, "router", {
  enumerable: true,
  get: function get() {
    return _entry.router;
  }
});
Object.defineProperty(exports, "model", {
  enumerable: true,
  get: function get() {
    return _entry.model;
  }
});
Object.defineProperty(exports, "run", {
  enumerable: true,
  get: function get() {
    return _entry.run;
  }
});
Object.defineProperty(exports, "react", {
  enumerable: true,
  get: function get() {
    return _entry.react;
  }
});
Object.defineProperty(exports, "redux", {
  enumerable: true,
  get: function get() {
    return _entry.redux;
  }
});
Object.defineProperty(exports, "reactRedux", {
  enumerable: true,
  get: function get() {
    return _entry.reactRedux;
  }
});

var _entry = _interopRequireWildcard(require("./entry"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }