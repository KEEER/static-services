"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
var transparencyContainer = $('#transparency-container');
var transparencyContainers = [$('#transparency-slider-container-1'), $('#transparency-slider-container-2')];
var blurContainer = $('#blur-container');
var saveStatusEl = $('#save-status');
var styles = [['1-1', '1-2'], ['2-1', '2-2', '2-3'], ['3'], ['4']];

var imageUrl = function imageUrl(id) {
  return "https://keeer-pub.oss-cn-beijing.aliyuncs.com/rdfzgkavt/2022/".concat(id, ".png");
};

var styleBgs = $$('.style__bg');
var blurBgs = $$('.style__bg-blur');
var styleButtons = Array(4).fill(0).map(function (_, i) {
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
var fgSize = 1000;

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

var transparencies = {
  '1-2': 0.7,
  '2-1': 0.6,
  '2-3': 0.7
};
var transparencySliders = {};
var transparentImages = {}; // avoid using Object.fromEntries for compat

var _loop = function _loop(key) {
  transparentImages[key] = $("#cover-".concat(key));
  transparencySliders[key] = new mdc.slider.MDCSlider($("#transparency-slider-".concat(key)));
  transparencySliders[key].listen('MDCSlider:input', debounce(function () {
    var opacity = Math.abs(transparencySliders[key].value - 0.5) < 0.0001 ? 0 : 1 - transparencySliders[key].value;
    transparentImages[key].style.opacity = opacity;
    transparencies[key] = opacity;
  }, 200));
};

for (var key in transparencies) {
  _loop(key);
}

var transparencyControllable = function transparencyControllable(currentStyle) {
  return currentStyle < 2;
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

  if (transparencyControllable(currentStyle)) {
    show(transparencyContainer);

    var _iterator = _createForOfIteratorHelper(transparencyContainers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        hide(el);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    show(transparencyContainers[currentStyle]);
  } else {
    hide(transparencyContainer);
  }

  blurSlider.foundation_.init();

  for (var k in transparencySliders) {
    transparencySliders[k].foundation_.init();
  }

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
  uploadEl.value = '';
  styleBgs.forEach(function (i) {
    return i.src = avatarSrc;
  });
  hide(saveStatusEl);
  focusStep(1);
  chooseStyle(0);
  uploadButton.disabled = false;
});
saveButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var done, setStatus, logSlider, fgImagePromise, imagePromises, canvas, ctx, drawLayer, fgImages, _iterator2, _step2, _transparencies$id, _step2$value, id, image, exportType, resultUrl;

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

          if (transparencyControllable(currentStyle)) {
            logSlider = function logSlider(name) {
              return sendEvent("save-transparency-".concat(name, "-").concat(Math.floor(transparencies[name] * 20) / 20));
            };

            if (currentStyle === 0) logSlider('1-2');else logSlider('2-1'), logSlider('2-3');
          }

          saveButton.disabled = true;

          fgImagePromise = function fgImagePromise(id) {
            return new Promise(function (resolve, reject) {
              var img = new Image();
              img.setAttribute('crossorigin', 'anonymous');
              img.src = imageUrl(id);

              img.onload = function () {
                return resolve([id, img]);
              };

              img.onerror = reject;
            });
          };

          imagePromises = Promise.all(styles[currentStyle].map(fgImagePromise));
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

          drawLayer = function drawLayer(image, opacity) {
            // Values outside that range, including Infinity and NaN, will not be set, and globalAlpha will retain its previous value.
            ctx.globalAlpha = 1;
            ctx.globalAlpha = opacity;
            ctx.drawImage(image, 0, 0, fgSize, fgSize);
            ctx.globalAlpha = 1;
          };

          _context.prev = 18;
          _context.next = 21;
          return imagePromises;

        case 21:
          fgImages = _context.sent;
          setStatus('正在绘制板报……'); // next tick

          _context.next = 25;
          return Promise.resolve();

        case 25:
          _iterator2 = _createForOfIteratorHelper(fgImages);

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _step2$value = _slicedToArray(_step2.value, 2), id = _step2$value[0], image = _step2$value[1];
              drawLayer(image, (_transparencies$id = transparencies[id]) !== null && _transparencies$id !== void 0 ? _transparencies$id : 1);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          _context.next = 36;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](18);
          setStatus('网络错误');
          alert('无法下载蒙版图片，请检查您的互联网连接。');
          console.error(_context.t0);
          saveButton.disabled = false;
          return _context.abrupt("return");

        case 36:
          setStatus('正在拍照……');
          exportType = 'image/jpeg';

          if (!/micromess/i.test(navigator.userAgent)) {
            _context.next = 42;
            break;
          }

          _context.t1 = canvas.toDataURL(exportType);
          _context.next = 47;
          break;

        case 42:
          _context.t2 = URL;
          _context.next = 45;
          return new Promise(function (resolve) {
            return canvas.toBlob(resolve, exportType);
          });

        case 45:
          _context.t3 = _context.sent;
          _context.t1 = _context.t2.createObjectURL.call(_context.t2, _context.t3);

        case 47:
          resultUrl = _context.t1;
          resultImageEl.src = resultUrl;
          focusStep(2);
          saveButton.disabled = false;
          done = true;
          setStatus('');

        case 53:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[18, 29]]);
})));
backButton.addEventListener('click', function () {
  focusStep(0);
});
back1Button.addEventListener('click', function () {
  focusStep(0);
});
var ripples = [].concat(_toConsumableArray(document.querySelectorAll('[data-ripple]')), _toConsumableArray(document.querySelectorAll('.mdc-button')));

var _iterator3 = _createForOfIteratorHelper(ripples),
    _step3;

try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var el = _step3.value;
    mdc.ripple.MDCRipple.attachTo(el);
  } // load lazy-load images

} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}

var errorReported = false,
    imageLoaded = false;
setTimeout(function () {
  return $$('.style__fg').forEach(function (img) {
    img.addEventListener('error', function () {
      if (!errorReported) {
        errorReported = true;
        sendEvent('image-error');
      }
    });
    img.addEventListener('load', function () {
      imageLoaded = true;
    });
    img.src = img.getAttribute('data-src');
  });
}, 100);
setTimeout(function () {
  if (!imageLoaded) sendEvent('image-slow');
}, 3000);
setTimeout(function () {
  if (!imageLoaded) sendEvent('image-timeout');
}, 6000); // some experiments

var search = new URLSearchParams(location.search);

if (search.has('utm_source')) {
  if (!localStorage.gka22counted) {
    var num = Number(search.get('utm_medium'));
    var next = Number.isInteger(num) && num < 1000 ? num + 1 : 1;
    search.set('utm_medium', next);
    localStorage.gka22counted = next;
  } else {
    search.set('utm_medium', localStorage.gka22counted);
  }

  var url = new URL(location.href);
  url.search = search;
  history.replaceState({}, '', url);
}

