"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var $ = function $(s) {
  return document.querySelector(s);
};

var show = function show(el) {
  return el.style.display = '';
};

var hide = function hide(el) {
  return el.style.display = 'none';
};

var uploadEl = $('#image');
var uploadButton = $('#upload-avatar');
var canvasEl = $('#main-canvas');
var editTabBarEl = $('#edit-tab-bar');
var tabs = ['styles', 'positions', 'rotations'];
var tabButtons = tabs.map(function (x) {
  return $("#tab-".concat(x));
});
var tabEls = tabs.map(function (x) {
  return $('#' + x);
});
var saveButton = $('#save');
var resultImageEl = $('#result-image');
var backButton = $('#back');
var back1Button = $('#back-1');
var styles = [0, 1, 2].map(function (i) {
  return "https://keeer-pub.oss-cn-beijing.aliyuncs.com/rdfzgkavt/2020/style".concat(i, ".png");
});
var styleButtons = styles.map(function (_, i) {
  return $("#style-".concat(i));
});
var positions = [[-15, 282, 274], [15, 743, 267], [0, 512, 512], [-15, 284, 738], [15, 743, 738]];
var positionButtons = positions.map(function (_, i) {
  return $("#position-".concat(i));
});
var rotations = [-30, -15, 0, 15, 30];
var rotationButtons = rotations.map(function (_, i) {
  return $("#rotation-".concat(i));
});
var steps = ['select', 'edit', 'save'].map(function (x) {
  return $("#step-".concat(x));
});

var focusStep = function focusStep(i) {
  return steps.forEach(function (el, j) {
    return i === j ? show(el) : hide(el);
  });
};

var focusTab = function focusTab(i) {
  return tabEls.forEach(function (el, j) {
    return i === j ? show(el) : hide(el);
  });
};

focusStep(0);

var debounce = function debounce(func, wait) {
  var lastCallTime = -1;
  var timeoutId = -1;
  return function () {
    var time = Date.now();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastCallTime < time - wait) {
      lastCallTime = time;
      if (timeoutId > -1) clearTimeout(timeoutId);
      timeoutId = -1;
      func.apply(void 0, args);
      return;
    }

    if (timeoutId > -1) return;
    setTimeout.apply(void 0, [func, timeoutId].concat(args));
  };
};

var sendEvent = function sendEvent(name) {
  ga('send', 'event', name);
  if (window.umami) umami(name);
  fetch('https://log.keeer.net/', {
    method: 'post',
    body: name
  }).then(function (r) {
    return r.text();
  });
};

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerSize = 30;
var rotationSlider = new mdc.slider.MDCSlider($('#rotation-slider'));
rotationSlider.listen('MDCSlider:input', debounce(function () {
  if (!canvas || !cover) return;
  cover.rotate(rotationSlider.value);
  canvas.renderAll();
}, 100));
var canvas = null,
    cover = null,
    currentStyle = 0;
uploadButton.addEventListener('click', function () {
  uploadEl.click();
  sendEvent('upload-click');
});
uploadEl.addEventListener('change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _canvas, images, avatar;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          uploadButton.disabled = true;
          sendEvent('upload-done');

          if (canvas) {
            (_canvas = canvas).remove.apply(_canvas, _toConsumableArray(canvas.getObjects()));
          } else {
            show(canvasEl);
            canvas = new fabric.Canvas(canvasEl);
            canvas.setDimensions({
              width: '300px',
              height: '300px'
            }, {
              cssOnly: true
            });
            canvas.on('object:rotating', debounce(function () {
              if (!canvas) return;
              rotationSlider.value = cover.angle > 180 ? cover.angle - 360 : cover.angle;
            }, 100));
          }

          rotationSlider.value = 15;
          _context.next = 6;
          return Promise.all([[URL.createObjectURL(uploadEl.files[0]), 1024, {}], [styles[0], 800, {
            left: 512,
            top: 338,
            angle: 15,
            crossOrigin: 'anonymous'
          }]].map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 3),
                u = _ref3[0],
                h = _ref3[1],
                o = _ref3[2];

            return new Promise(function (r) {
              return fabric.Image.fromURL(u, function (img) {
                return r(img.scaleToHeight(h));
              }, o);
            });
          }));

        case 6:
          images = _context.sent;
          avatar = images[0];
          cover = images[1];
          canvas.setBackgroundImage(avatar, function () {
            return canvas.renderAll();
          }, {
            left: 512,
            top: 512,
            originX: 'center',
            originY: 'center'
          });
          cover.setControlsVisibility({
            mb: false,
            ml: false,
            mr: false,
            mt: false
          });
          canvas.add(cover);
          focusStep(1);
          rotationSlider.foundation_.init();
          uploadButton.disabled = false;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
saveButton.addEventListener('click', function () {
  sendEvent('save-click');
  sendEvent("save-click-".concat(currentStyle));
  saveButton.disabled = true;
  resultImageEl.src = canvas.toDataURL();
  focusStep(2);
  saveButton.disabled = false;
});
mdc.tabBar.MDCTabBar.attachTo(editTabBarEl);
tabButtons.forEach(function (b, i) {
  return b.addEventListener('click', function () {
    focusTab(i);
    sendEvent("tab-".concat(tabs[i], "-click"));
  });
});
tabButtons[2].addEventListener('click', function () {
  return rotationSlider.foundation_.init();
});
styleButtons.forEach(function (b, i) {
  return b.addEventListener('click', function () {
    if (!cover) return;
    sendEvent("style-".concat(i, "-click"));
    currentStyle = i;
    cover.setSrc(styles[i], function () {
      return canvas.renderAll();
    }, {
      crossOrigin: 'anonymous'
    });
  });
});
positionButtons.forEach(function (b, i) {
  return b.addEventListener('click', function () {
    if (!cover) return;
    sendEvent("position-".concat(i, "-click"));
    cover.rotate(positions[i][0]);
    cover.setPositionByOrigin(new fabric.Point(positions[i][1], positions[i][2]), 'center', 'center');
    canvas.renderAll();
  });
});
rotationButtons.forEach(function (b, i) {
  return b.addEventListener('click', function () {
    if (!cover) return;
    sendEvent("rotation-".concat(i, "-click"));
    cover.rotate(rotations[i]);
    rotationSlider.value = rotations[i];
    canvas.renderAll();
  });
});
backButton.addEventListener('click', function () {
  focusStep(0);
  sendEvent('back-click');
});
back1Button.addEventListener('click', function () {
  focusStep(0);
  sendEvent('back-1-click');
});
var ripples = [].concat(_toConsumableArray(document.querySelectorAll('[data-ripple]')), _toConsumableArray(document.querySelectorAll('.mdc-button')));

var _iterator = _createForOfIteratorHelper(ripples),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var el = _step.value;
    mdc.ripple.MDCRipple.attachTo(el);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
