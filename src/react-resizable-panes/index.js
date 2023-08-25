(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/resizable-panes/constant.js":
/*!****************************************************!*\
  !*** ./src/components/resizable-panes/constant.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTIONS: () => (/* binding */ DIRECTIONS),
/* harmony export */   RIGHT_BUTTON_VALUE: () => (/* binding */ RIGHT_BUTTON_VALUE)
/* harmony export */ });
var DIRECTIONS = {
  NONE: 'None',
  UP: 'UP',
  DOWN: 'Down',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
var RIGHT_BUTTON_VALUE = 0;

/***/ }),

/***/ "./src/components/resizable-panes/index.js":
/*!*************************************************!*\
  !*** ./src/components/resizable-panes/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Panes: () => (/* reexport safe */ _pane__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ResizablePanes: () => (/* reexport safe */ _resizable_panes__WEBPACK_IMPORTED_MODULE_0__.ResizablePanes)
/* harmony export */ });
/* harmony import */ var _resizable_panes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resizable-panes */ "./src/components/resizable-panes/resizable-panes.js");
/* harmony import */ var _pane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pane */ "./src/components/resizable-panes/pane.js");



/***/ }),

/***/ "./src/components/resizable-panes/pane-service.js":
/*!********************************************************!*\
  !*** ./src/components/resizable-panes/pane-service.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/components/resizable-panes/constant.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/components/resizable-panes/util.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-unused-vars */


var noSelectedResizerIndex = -1;
var PanesService = /*#__PURE__*/function () {
  function PanesService() {
    _classCallCheck(this, PanesService);
    _defineProperty(this, "activeIndex", noSelectedResizerIndex);
    _defineProperty(this, "initialPanesRect", []);
    _defineProperty(this, "split", 'vertical');
    _defineProperty(this, "containerRef", void 0);
    _defineProperty(this, "panesRefs", []);
    _defineProperty(this, "resizerSize", 5);
    _defineProperty(this, "containerRect", void 0);
    _defineProperty(this, "sizesList", []);
  }
  _createClass(PanesService, [{
    key: "panes",
    get: function get() {
      return this.panesRefs.current;
    }
  }, {
    key: "activePane",
    get: function get() {
      return this.panesRefs.current[this.activeIndex].current;
    }
  }, {
    key: "initPanesService",
    value: function initPanesService(containerRef, panesRefs, resizerSize) {
      this.containerRef = containerRef;
      this.panesRefs = panesRefs;
      this.resizerSize = resizerSize;
      this.setInitialSizesForPanes();
      this.setMaxLimitingSize();
    }
  }, {
    key: "setInitialSizesForPanes",
    value: function setInitialSizesForPanes() {
      var _this = this;
      this.sizesList = [];
      this.panes.forEach(function (pane) {
        var _pane$current$getBoun = pane.current.getBoundingClientRect(),
          height = _pane$current$getBoun.height;
        _this.sizesList.push(height);
      });
    }
  }, {
    key: "setMaxLimitingSize",
    value: function setMaxLimitingSize() {
      this.containerRect = this.containerRef.current.getBoundingClientRect();
      this.maxSize = this.containerRect.height - (this.panes.length - 1) * this.resizerSize;
    }
  }, {
    key: "setCurrentLimitingLengthUpword",
    value: function setCurrentLimitingLengthUpword(e) {
      if (this.activeIndex + 1 === this.panes.length) {
        this.currentMaxSize = this.maxSize;
        return;
      }
      var sizeOfBellowElements = 0;
      for (var i = this.activeIndex + 1; i < this.panes.length; i += 1) {
        sizeOfBellowElements += this.sizesList[i];
      }
      this.currentMaxSize = this.maxSize - sizeOfBellowElements;
    }
  }, {
    key: "setCurrentLimitingLengthDownword",
    value: function setCurrentLimitingLengthDownword(e) {
      if (this.activeIndex === 0) {
        this.currentMaxSize = this.maxSize;
        return;
      }
      var sizeOfAboveElements = 0;
      for (var i = this.activeIndex - 1; i > -1; i -= 1) {
        sizeOfAboveElements += this.sizesList[i];
      }
      this.currentMaxSize = this.maxSize - sizeOfAboveElements;
    }
  }, {
    key: "preserveBoundingClientRect",
    value: function preserveBoundingClientRect() {
      this.initialPanesRect = this.panes.map(function (ref) {
        return ref.current.getBoundingClientRect();
      });
      this.preservedActiveElementRect = this.initialPanesRect[this.activeIndex];
    }
  }, {
    key: "getNewSizeDownword",
    value: function getNewSizeDownword(e) {
      var clientX = e.clientX,
        clientY = e.clientY;
      var _this$preservedActive = this.preservedActiveElementRect,
        bottom = _this$preservedActive.bottom,
        top = _this$preservedActive.top;
      var newCalculatedHeight = clientY - top - this.mousedownAndPaneTopDiffDownword;
      return newCalculatedHeight;
    }
  }, {
    key: "setActiveIndex",
    value: function setActiveIndex(index) {
      this.activeIndex = index;
      this.currentIndex = index;
    }
  }, {
    key: "calculateAndSetHeight",
    value: function calculateAndSetHeight(e) {
      this.goingUpLogic(e);
      this.goingDownLogic(e);
      this.setPaneSizes();
    }
  }, {
    key: "setSizeOfOtherElementsDownword",
    value: function setSizeOfOtherElementsDownword(previousActiveElementSize, e) {
      var newChangeInSize = this.sizesList[this.activeIndex] - previousActiveElementSize;
      console.log('v-- newChangeInSize', newChangeInSize);
      if (newChangeInSize === 0) {
        return;
      }
      for (var i = this.activeIndex + 1; i < this.sizesList.length; i += 1) {
        var changeInSizeOfNextElement = this.sizesList[i] - newChangeInSize;
        if (changeInSizeOfNextElement < 0) {
          this.sizesList[i] = 0;
          newChangeInSize = Math.abs(changeInSizeOfNextElement);
        } else {
          this.sizesList[i] = changeInSizeOfNextElement;
          break;
        }
      }
    }
  }, {
    key: "setHeightOfOtherElementsUpword",
    value: function setHeightOfOtherElementsUpword(previousActiveElementSize) {
      var newChangeInSize = Math.abs(this.sizesList[this.activeIndex] - previousActiveElementSize);
      console.log('v-- newChangeInSize', newChangeInSize);
      if (newChangeInSize === 0) {
        return;
      }
      for (var i = this.activeIndex - 1; i > -1; i -= 1) {
        var changeInSizeOfNextElement = this.sizesList[i] - newChangeInSize;
        if (changeInSizeOfNextElement < 0) {
          this.sizesList[i] = 0;
          newChangeInSize = Math.abs(changeInSizeOfNextElement);
        } else {
          this.sizesList[i] = changeInSizeOfNextElement;
          break;
        }
      }
    }
  }, {
    key: "goingDownLogic",
    value: function goingDownLogic(e) {
      if (e.movementY < 0) {
        return;
      }
      this.activeIndex = this.currentIndex;
      var newSize = this.getNewSizeDownword(e);
      this.setCurrentLimitingLengthDownword(e);
      console.log('v-- goingDownLogic', this.currentMaxSize, newSize, this.sizesList[this.activeIndex]);
      var previousActiveElementSize = this.sizesList[this.activeIndex];
      this.getNewSizeWithLimits(newSize);
      this.setSizeOfOtherElementsDownword(previousActiveElementSize);
    }
  }, {
    key: "getNewSizeWithLimits",
    value: function getNewSizeWithLimits(size) {
      var newSize = 0;
      if (size <= 0) {
        // no change required
      } else if (size >= this.currentMaxSize) {
        newSize = this.currentMaxSize;
      } else {
        newSize = size;
      }
      this.sizesList[this.activeIndex] = newSize;
    }
  }, {
    key: "goingUpLogic",
    value: function goingUpLogic(e) {
      if (e.movementY > 0) {
        return;
      }
      this.activeIndex = this.currentIndex + 1;
      var newCalculatedHeight = this.sizesList[this.activeIndex] - e.movementY;
      this.setCurrentLimitingLengthUpword(e);
      console.log('v-- goingUpLogic', this.currentMaxSize, newCalculatedHeight, this.sizesList[this.activeIndex]);
      var previousActiveElementSize = this.sizesList[this.activeIndex];
      this.getNewSizeWithLimits(newCalculatedHeight);
      this.setHeightOfOtherElementsUpword(previousActiveElementSize);
    }
  }, {
    key: "setPaneSizes",
    value: function setPaneSizes() {
      var _this2 = this;
      this.panes.forEach(function (pane, i) {
        // eslint-disable-next-line no-param-reassign
        pane.current.style.height = _this2.sizesList[i] + 'px';
        console.log('v-- height', pane.current.style.height, _this2.sizesList[i]);
      });
      console.log(this.sizesList, this.sizesList.reduce(function (p, c) {
        return p + c;
      }, 0));
    }
  }, {
    key: "setMouseDownAndPaneAxisDetails",
    value: function setMouseDownAndPaneAxisDetails(e, resizerElement) {
      var clientX = e.clientX,
        clientY = e.clientY;
      var _resizerElement$getBo = resizerElement.getBoundingClientRect(),
        top = _resizerElement$getBo.top,
        bottom = _resizerElement$getBo.bottom;
      this.mousedownAndPaneTopDiffDownword = clientY - top;
      this.mousedownAndPaneTopDiffUpword = bottom - clientY;
    }
  }]);
  return PanesService;
}();
var panesService = new PanesService();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (panesService);

/***/ }),

/***/ "./src/components/resizable-panes/pane.js":
/*!************************************************!*\
  !*** ./src/components/resizable-panes/pane.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


function Pane(props, ref) {
  // eslint-disable-next-line react/prop-types
  var className = props.className,
    children = props.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: className,
    ref: ref
  }, children);
}
Pane.prototypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().element)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Pane));

/***/ }),

/***/ "./src/components/resizable-panes/resizable-panes.js":
/*!***********************************************************!*\
  !*** ./src/components/resizable-panes/resizable-panes.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizablePanes: () => (/* binding */ ResizablePanes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/components/resizable-panes/style.css");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pane_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pane-service */ "./src/components/resizable-panes/pane-service.js");
/* harmony import */ var _resizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resizer */ "./src/components/resizable-panes/resizer.js");





var ResizablePanes = function ResizablePanes(props) {
  console.log('rerender');
  var children = props.children,
    resizerSize = props.resizerSize;
  var containerRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  var panesRefs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  panesRefs.current = children.map(function (_element, i) {
    var _panesRefs$current$i;
    return (_panesRefs$current$i = panesRefs.current[i]) !== null && _panesRefs$current$i !== void 0 ? _panesRefs$current$i : /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  });
  var resizerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  resizerRef.current = children.map(function (_element, i) {
    var _resizerRef$current$i;
    return (_resizerRef$current$i = resizerRef.current[i]) !== null && _resizerRef$current$i !== void 0 ? _resizerRef$current$i : /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    _pane_service__WEBPACK_IMPORTED_MODULE_3__["default"].initPanesService(containerRef, panesRefs, resizerSize);
  }, []);
  var onMouseMove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    _pane_service__WEBPACK_IMPORTED_MODULE_3__["default"].calculateAndSetHeight(e);
  }, []);
  var onMouseUp = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    document.removeEventListener('mousemove', onMouseMove);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    document.addEventListener('mouseup', onMouseUp);
    return function () {
      return document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  var _onMouseDown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e, index) {
    console.log(index);
    _pane_service__WEBPACK_IMPORTED_MODULE_3__["default"].setMouseDownAndPaneAxisDetails(e, resizerRef.current[index].current);
    _pane_service__WEBPACK_IMPORTED_MODULE_3__["default"].setActiveIndex(index);
    _pane_service__WEBPACK_IMPORTED_MODULE_3__["default"].preserveBoundingClientRect();
    document.addEventListener('mousemove', onMouseMove);
  }, []);
  var onMouseLeave = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {}, []);
  var onMouseEnter = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {}, []);
  var contentJsx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var content = [];
    // eslint-disable-next-line no-var
    var i = 0;
    var key;
    var _loop = function _loop() {
      var iCopy = i;
      key = children[iCopy].props.id;
      content.push( /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children[iCopy], {
        key: key,
        ref: panesRefs.current[iCopy]
      }));
      content.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_resizer__WEBPACK_IMPORTED_MODULE_4__.Resizer, {
        key: "".concat(key, "-resizer"),
        resizerSize: resizerSize,
        onMouseDown: function onMouseDown(e) {
          return _onMouseDown(e, iCopy);
        },
        ref: resizerRef.current[iCopy]
      }));
    };
    for (; i < children.length - 1; i += 1) {
      _loop();
    }
    content.push( /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children[i], {
      key: children[i].props.id,
      ref: panesRefs.current[i]
    }));
    return content;
  }, children);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pane-container bg-lightblue",
    ref: containerRef,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, contentJsx);
};
ResizablePanes.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any).isRequired,
  resizerSize: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number).isRequired
};

/***/ }),

/***/ "./src/components/resizable-panes/resizer.js":
/*!***************************************************!*\
  !*** ./src/components/resizable-panes/resizer.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Resizer: () => (/* binding */ Resizer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


var Resizer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
  var onMouseDown = props.onMouseDown,
    resizerSize = props.resizerSize;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      height: "".concat(resizerSize, "px")
    },
    className: "resizer vertical-cursur",
    onMouseDown: onMouseDown,
    ref: ref
  });
});
Resizer.propTypes = {
  resizerSize: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number).isRequired,
  onMouseDown: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
};

/***/ }),

/***/ "./src/components/resizable-panes/util.js":
/*!************************************************!*\
  !*** ./src/components/resizable-panes/util.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMovementDirection: () => (/* binding */ getMovementDirection),
/* harmony export */   isDirectionDown: () => (/* binding */ isDirectionDown),
/* harmony export */   isDirectionUpFn: () => (/* binding */ isDirectionUpFn),
/* harmony export */   isNotRightButtonPressed: () => (/* binding */ isNotRightButtonPressed)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/components/resizable-panes/constant.js");
/* eslint-disable no-unused-vars */

var isNotRightButtonPressed = function isNotRightButtonPressed(e) {
  return e.button !== _constant__WEBPACK_IMPORTED_MODULE_0__.RIGHT_BUTTON_VALUE;
};
var getMovementDirection = function getMovementDirection(e) {
  var movementX = e.movementX,
    movementY = e.movementY;
  var direction = movementY < 0 ? _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.UP : _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.DOWN;
  return direction;
};
var isDirectionUpFn = function isDirectionUpFn(e) {
  return e.movementY < 0;
};
var isDirectionDown = function isDirectionDown(e) {
  return e.movementY > 0;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/resizable-panes/style.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/resizable-panes/style.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.h-100p {
    height: 100%;
}

.bg-lightblue {
    background-color: lightblue;
}

.pane1 {
    background-color: red;
    height: 204px;
}

.pane2 {
    background-color: greenyellow;
    height: 203px;
}

.pane3 {
    background-color: orange;
    height: 203px;
}


.pane-container {
    height: 822px;
}

.resizer {
    background-color: darkblue;
}

.vertical-cursur:hover {
    cursor: n-resize;
}

.horizontal-cursur:hover {
    cursor: e-resize;
}`, "",{"version":3,"sources":["webpack://./src/components/resizable-panes/style.css"],"names":[],"mappings":"AAAA;IACI,YAAY;AAChB;;AAEA;IACI,2BAA2B;AAC/B;;AAEA;IACI,qBAAqB;IACrB,aAAa;AACjB;;AAEA;IACI,6BAA6B;IAC7B,aAAa;AACjB;;AAEA;IACI,wBAAwB;IACxB,aAAa;AACjB;;;AAGA;IACI,aAAa;AACjB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":[".h-100p {\r\n    height: 100%;\r\n}\r\n\r\n.bg-lightblue {\r\n    background-color: lightblue;\r\n}\r\n\r\n.pane1 {\r\n    background-color: red;\r\n    height: 204px;\r\n}\r\n\r\n.pane2 {\r\n    background-color: greenyellow;\r\n    height: 203px;\r\n}\r\n\r\n.pane3 {\r\n    background-color: orange;\r\n    height: 203px;\r\n}\r\n\r\n\r\n.pane-container {\r\n    height: 822px;\r\n}\r\n\r\n.resizer {\r\n    background-color: darkblue;\r\n}\r\n\r\n.vertical-cursur:hover {\r\n    cursor: n-resize;\r\n}\r\n\r\n.horizontal-cursur:hover {\r\n    cursor: e-resize;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/components/resizable-panes/style.css":
/*!**************************************************!*\
  !*** ./src/components/resizable-panes/style.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js */ "./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/components/resizable-panes/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

;
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js":
/*!************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js ***!
  \************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join("\n");
  };
}();

/* istanbul ignore next  */
function apply(styleElement, index, remove, obj) {
  var css;
  if (remove) {
    css = "";
  } else {
    css = "";
    if (obj.supports) {
      css += "@supports (".concat(obj.supports, ") {");
    }
    if (obj.media) {
      css += "@media ".concat(obj.media, " {");
    }
    var needLayer = typeof obj.layer !== "undefined";
    if (needLayer) {
      css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
    }
    css += obj.css;
    if (needLayer) {
      css += "}";
    }
    if (obj.media) {
      css += "}";
    }
    if (obj.supports) {
      css += "}";
    }
  }

  // For old IE
  /* istanbul ignore if  */
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = styleElement.childNodes;
    if (childNodes[index]) {
      styleElement.removeChild(childNodes[index]);
    }
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index]);
    } else {
      styleElement.appendChild(cssNode);
    }
  }
}
var singletonData = {
  singleton: null,
  singletonCounter: 0
};

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") return {
    update: function update() {},
    remove: function remove() {}
  };

  // eslint-disable-next-line no-undef,no-use-before-define
  var styleIndex = singletonData.singletonCounter++;
  var styleElement =
  // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton || (
  // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton = options.insertStyleElement(options));
  return {
    update: function update(obj) {
      apply(styleElement, styleIndex, false, obj);
    },
    remove: function remove(obj) {
      apply(styleElement, styleIndex, true, obj);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Panes: () => (/* reexport safe */ _components_resizable_panes__WEBPACK_IMPORTED_MODULE_0__.Panes),
/* harmony export */   ResizablePanes: () => (/* reexport safe */ _components_resizable_panes__WEBPACK_IMPORTED_MODULE_0__.ResizablePanes)
/* harmony export */ });
/* harmony import */ var _components_resizable_panes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/resizable-panes */ "./src/components/resizable-panes/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Name = /*#__PURE__*/function () {
  function Name() {
    _classCallCheck(this, Name);
    _defineProperty(this, "name", 'vim');
  }
  _createClass(Name, [{
    key: "method1",
    value: function method1() {
      var _this = this;
      var list = [1, 2, 3];
      list.forEach(function (item, i) {
        _this.name = item;
      });
    }
  }]);
  return Name;
}();
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map