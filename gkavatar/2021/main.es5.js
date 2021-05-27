"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var $ = function $(s) {
  return document.querySelector(s);
};

var $$ = function $$(s) {
  return Array.from(document.querySelectorAll(s));
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
var saveButton = $('#save');
var resultImageEl = $('#result-image');
var backButton = $('#back');
var back1Button = $('#back-1');
var blurContainer = $('#blur-container');
var saveStatusEl = $('#save-status');
var styles = [0, 1, 2, 3].map(function (i) {
  return "https://keeer-pub.oss-cn-beijing.aliyuncs.com/rdfzgkavt/2021/".concat(i, ".png");
});
var styleBgs = $$('.style__bg');
var blurBgs = $$('.style__bg-blur');
var styleButtons = styles.map(function (_, i) {
  return $("#style-".concat(i));
});
var steps = ['select', 'edit', 'save'].map(function (x) {
  return $("#step-".concat(x));
});

var focusStep = function focusStep(i) {
  return steps.forEach(function (el, j) {
    return i === j ? show(el) : hide(el);
  });
};

focusStep(0);
var fgSize = 1008;

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

var blurFactor = 0.05;
var blurSlider = new mdc.slider.MDCSlider($('#blur-slider'));
blurSlider.listen('MDCSlider:input', debounce(function () {
  blurBgs.forEach(function (el) {
    return el.style.filter = "blur(".concat(parseInt(window.getComputedStyle(el).width) * blurSlider.value * blurFactor, "px)");
  });
}, 200));

var blurSupported = function () {
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return 'filter' in canvas.getContext('2d');
}();

var blurrable = function blurrable(currentStyle) {
  return currentStyle < 2 && blurSupported;
};

styleButtons.forEach(function (b, i) {
  return b.addEventListener('click', function (e) {
    e.preventDefault();
    chooseStyle(i);
    document.getSelection().removeAllRanges();
  });
});
var currentStyleClass = 'style__current';
var currentStyle;

var chooseStyle = function chooseStyle(i) {
  currentStyle = i;
  if (blurrable(currentStyle)) show(blurContainer);else hide(blurContainer);
  blurSlider.foundation_.init();
  styleButtons.forEach(function (el, j) {
    return i === j ? el.classList.add(currentStyleClass) : el.classList.remove(currentStyleClass);
  });
};

var sendEvent = function sendEvent(name) {
  window.umami && umami(name);
};

uploadButton.addEventListener('click', function () {
  uploadEl.click();
});
uploadEl.addEventListener('change', function () {
  sendEvent('upload-done');
  uploadButton.disabled = true;
  var avatarSrc = URL.createObjectURL(uploadEl.files[0]);
  styleBgs.forEach(function (i) {
    return i.src = avatarSrc;
  });
  hide(saveStatusEl);
  focusStep(1);
  chooseStyle(0);
  uploadButton.disabled = false;
});
saveButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var done, setStatus, fgImagePromise, canvas, ctx, fgImage, exportType, resultUrl;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          done = false;
          setTimeout(function () {
            if (done) return;
            show(saveStatusEl);
          }, 1000);

          setStatus = function setStatus(status) {
            return saveStatusEl.innerText = status;
          };

          sendEvent("save-".concat(currentStyle));
          if (blurrable(currentStyle)) sendEvent("save-blur-".concat(blurSlider.value !== 0));
          saveButton.disabled = true;
          fgImagePromise = new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = styles[currentStyle];
            img.setAttribute('crossorigin', 'anonymous');

            img.onload = function () {
              return resolve(img);
            };

            img.onerror = reject;
          });
          setStatus('正在擦拭黑板……');
          canvas = document.createElement('canvas');
          canvas.width = canvas.height = fgSize;
          ctx = canvas.getContext('2d');

          if (blurrable(currentStyle)) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, fgSize, fgSize);
            ctx.filter = "blur(".concat(fgSize * blurSlider.value * blurFactor, "px)");
          }

          ctx.drawImage(styleBgs[0], 0, 0, fgSize, fgSize);
          ctx.filter = 'blur(0px)';
          setStatus('正在寻找粉笔……');
          _context.prev = 15;
          _context.next = 18;
          return fgImagePromise;

        case 18:
          fgImage = _context.sent;
          setStatus('正在绘制板报……'); // next tick

          _context.next = 22;
          return Promise.resolve();

        case 22:
          ctx.drawImage(fgImage, 0, 0, fgSize, fgSize);
          _context.next = 32;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](15);
          setStatus('网络错误');
          alert('无法下载蒙版图片，请检查您的互联网连接。');
          console.error(_context.t0);
          saveButton.disabled = false;
          return _context.abrupt("return");

        case 32:
          setStatus('正在拍照……');
          exportType = 'image/jpeg';

          if (!/micromess/i.test(navigator.userAgent)) {
            _context.next = 38;
            break;
          }

          _context.t1 = canvas.toDataURL(exportType);
          _context.next = 43;
          break;

        case 38:
          _context.t2 = URL;
          _context.next = 41;
          return new Promise(function (resolve) {
            return canvas.toBlob(resolve, exportType);
          });

        case 41:
          _context.t3 = _context.sent;
          _context.t1 = _context.t2.createObjectURL.call(_context.t2, _context.t3);

        case 43:
          resultUrl = _context.t1;
          resultImageEl.src = resultUrl;
          focusStep(2);
          saveButton.disabled = false;
          done = true;
          setStatus('');

        case 49:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[15, 25]]);
})));
backButton.addEventListener('click', function () {
  focusStep(0);
});
back1Button.addEventListener('click', function () {
  focusStep(0);
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

