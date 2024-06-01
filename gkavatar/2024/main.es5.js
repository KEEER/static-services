"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
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
var cropButton = $('#crop');
var cropImageEl = $('#crop-image');
var canvasEl = $('#main-canvas');
var saveButton = $('#save');
var resultImageEl = $('#result-image');
var backButton = $('#back');
var back1Button = $('#back-1');
var back2Button = $('#back-2');
var transparencyContainer = $('#transparency-container');
var toggleContainer = $('#toggle-container');
var transparencyContainers = [1, 2, 3].map(function (x) {
  return $("#transparency-slider-container-".concat(x));
});
var filterContainer = $('#filter-container');
var saveStatusEl = $('#save-status');
var styles = [['1-1', '1-2', '1-3', '1-4'], ['2'], ['3-1', '3-2'], ['4-1', '4-2', '4-3', '4-4']];
var imageUrl = function imageUrl(id) {
  return "https://keeer-pub.oss-cn-beijing.aliyuncs.com/rdfzgkavt/2024/".concat(id, ".webp");
};
// const imageUrl = id => `cover/${id}.webp`
var styleBgs = $$('.style__bg');
var filterBgs = $$('.style__bg--filter');
var styleButtons = Array(4).fill(0).map(function (_, i) {
  return $("#style-".concat(i));
});
var steps = ['select', 'crop', 'edit', 'save'].map(function (x) {
  return $("#step-".concat(x));
});
var focusStep = function focusStep(i) {
  return steps.forEach(function (el, j) {
    return i === j ? show(el) : hide(el);
  });
};
focusStep(0);
var debounceTime = /Android|iP/.test(navigator.userAgent) ? 200 : 60;
var fgSize = 1024;
var fgSize3 = 900;
var debounce = function debounce(func, wait) {
  var lastCallTime = -1;
  var timeoutId = -1;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var time = Date.now();
    var diff = wait - (time - lastCallTime);
    if (diff <= 0) {
      lastCallTime = time;
      if (timeoutId > -1) clearTimeout(timeoutId);
      timeoutId = -1;
      func.apply(void 0, args);
      return;
    }
    if (timeoutId > -1) return;
    timeoutId = setTimeout(function () {
      lastCallTime = Date.now();
      func.apply(void 0, args);
      timeoutId = -1;
    }, diff);
  };
};
var blurFactor = 0.05;
var blurSlider = new mdc.slider.MDCSlider($('#blur-slider'));
var brightnessSlider = new mdc.slider.MDCSlider($('#brightness-slider'));
var calculateBrightness = function calculateBrightness() {
  var value = 1 - (1 - brightnessSlider.value) * .4;
  return "brightness(".concat(value, ") saturate(").concat(value, ")");
};
var updateBg = debounce(function () {
  filterBgs.forEach(function (el) {
    var blur = parseInt(window.getComputedStyle(el).width) * blurSlider.value * blurFactor;
    el.style.filter = "blur(".concat(blur, "px) ").concat(calculateBrightness());
  });
}, debounceTime);
blurSlider.listen('MDCSlider:input', updateBg);
brightnessSlider.listen('MDCSlider:input', updateBg);
var filterSupported = function () {
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return 'filter' in canvas.getContext('2d');
}();
var showFilters = function showFilters(currentStyle) {
  return currentStyle < 3 && filterSupported;
};
var exportType = 'image/jpeg';
var exportCanvas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(canvas) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!/micromess/i.test(navigator.userAgent)) {
              _context.next = 4;
              break;
            }
            _context.t0 = canvas.toDataURL(exportType);
            _context.next = 9;
            break;
          case 4:
            _context.t1 = URL;
            _context.next = 7;
            return new Promise(function (resolve) {
              return canvas.toBlob(resolve, exportType);
            });
          case 7:
            _context.t2 = _context.sent;
            _context.t0 = _context.t1.createObjectURL.call(_context.t1, _context.t2);
          case 9:
            return _context.abrupt("return", _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function exportCanvas(_x) {
    return _ref.apply(this, arguments);
  };
}();
var transparencies = {
  '1-1': 1,
  '1-2': 0.7,
  '1-3': 1,
  '1-4': 1,
  '2': 1,
  '3-1': 1,
  '3-2': 1
};
var transparencySliders = {};
var transparentImages = {};
// avoid using Object.fromEntries for compat
var _loop = function _loop(key) {
  transparentImages[key] = $("#cover-".concat(key));
  // 1-3 follows 1-2
  // 1-4 follows 1-1
  if (['1-3', '1-4'].includes(key)) return "continue";
  transparencySliders[key] = new mdc.slider.MDCSlider($("#transparency-slider-".concat(key)));
  transparencySliders[key].listen('MDCSlider:input', debounce(function () {
    var fullyTransparent = Math.abs(transparencySliders[key].value - 0.5) < 0.025 && key !== '2';
    var opacity = fullyTransparent ? 0 : 1 - transparencySliders[key].value;
    transparentImages[key].style.opacity = opacity;
    transparencies[key] = opacity;
    // 1-3 follows 1-2
    // 1-4 follows 1-1
    if (key === '1-1') {
      transparentImages['1-4'].style.opacity = opacity;
      transparencies['1-4'] = opacity;
    }
    if (key === '1-2') {
      // [0.7, 1] |-> 1
      // [0.5, 0.7] |-> [0.5, 1]
      // 0.2 --> 0.5, 2.5x
      var dateOpacity = Math.max(0, Math.min(1, 0.5 + (opacity - 0.5) * 2.5));
      transparentImages['1-3'].style.opacity = dateOpacity;
      transparencies['1-3'] = dateOpacity;
    }
  }, debounceTime));
};
for (var key in transparencies) {
  var _ret = _loop(key);
  if (_ret === "continue") continue;
}
var transparencyControllable = function transparencyControllable(currentStyle) {
  return currentStyle < 3;
};
var toggleControllable = function toggleControllable(currentStyle) {
  return currentStyle === 3;
};
var toggles = {
  '4-2': true,
  '4-4': true
};
var _loop2 = function _loop2(_key2) {
  var image = $("#cover-".concat(_key2));
  var input = $("#toggle-".concat(_key2));
  input.addEventListener('change', function () {
    toggles[_key2] = input.checked;
    if (input.checked) {
      show(image);
    } else {
      hide(image);
    }
  });
};
for (var _key2 in toggles) {
  _loop2(_key2);
}
styleButtons.forEach(function (b, i) {
  return b.addEventListener('click', function (e) {
    e.preventDefault();
    chooseStyle(i);
    document.getSelection().removeAllRanges();
    setTimeout(function () {
      return document.getSelection().removeAllRanges();
    }, 10);
  });
});
var currentStyleClass = 'style__current';
var currentStyle;
var chooseStyle = function chooseStyle(i) {
  currentStyle = i;
  if (showFilters(currentStyle)) show(filterContainer);else hide(filterContainer);
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
  if (toggleControllable(currentStyle)) {
    show(toggleContainer);
  } else {
    hide(toggleContainer);
  }
  blurSlider.foundation_.init();
  brightnessSlider.foundation_.init();
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
var cropperInstance;
uploadButton.addEventListener('click', function () {
  uploadEl.click();
});
uploadEl.addEventListener('change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var avatarSrc, img;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sendEvent('upload-done');
          uploadButton.disabled = true;
          avatarSrc = URL.createObjectURL(uploadEl.files[0]);
          uploadEl.value = '';
          img = new Image();
          _context2.prev = 5;
          _context2.next = 8;
          return new Promise(function (resolve, reject) {
            img.onload = resolve;
            img.onerror = reject;
            setTimeout(function () {
              return reject('超时');
            }, 1000);
            img.src = avatarSrc;
          });
        case 8:
          _context2.next = 17;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](5);
          alert("\u52A0\u8F7D\u56FE\u7247\u51FA\u9519: ".concat(_context2.t0));
          console.error(_context2.t0);
          focusStep(0);
          uploadButton.disabled = false;
          return _context2.abrupt("return");
        case 17:
          hide(saveStatusEl);
          if (img.height != img.width) {
            cropImageEl.src = avatarSrc;
            if (cropperInstance) {
              cropperInstance.replace(avatarSrc);
            } else {
              cropperInstance = new Cropper(cropImageEl, {
                aspectRatio: 1,
                viewMode: 3,
                autoCropArea: 1,
                rotatable: false,
                scalable: false,
                zoomable: false
              });
            }
            focusStep(1);
          } else {
            sendEvent('no-crop');
            styleBgs.forEach(function (i) {
              return i.src = avatarSrc;
            });
            focusStep(2);
            chooseStyle(0);
          }
          uploadButton.disabled = false;
        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[5, 10]]);
})));
cropButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var canvas, url;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          cropButton.disabled = true;
          _context3.next = 3;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 60);
          });
        case 3:
          _context3.prev = 3;
          canvas = cropperInstance.getCroppedCanvas({
            width: fgSize,
            height: fgSize
          });
          _context3.next = 7;
          return exportCanvas(canvas);
        case 7:
          url = _context3.sent;
          styleBgs.forEach(function (i) {
            return i.src = url;
          });
          focusStep(2);
          chooseStyle(0);
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](3);
          alert("\u88C1\u526A\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u9519\u8BEF: ".concat(_context3.t0));
        case 16:
          _context3.prev = 16;
          cropButton.disabled = false;
          return _context3.finish(16);
        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, null, [[3, 13, 16, 19]]);
})));
saveButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var done, setStatus, logSlider, sliders, _iterator2, _step2, slider, fgImagePromise, imagePromises, canvas, ctx, off, drawLayer, fgImages, _iterator3, _step3, _transparencies$id, _step3$value, id, image, resultUrl;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
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
          if (showFilters(currentStyle)) {
            sendEvent("save-blur-".concat(blurSlider.value !== 0));
            sendEvent("save-brightness-".concat(brightnessSlider.value !== 1));
          }
          if (transparencyControllable(currentStyle)) {
            logSlider = function logSlider(name) {
              return sendEvent("save-transparency-".concat(name, "-").concat(Math.floor(transparencies[name] * 20) / 20));
            };
            sliders = [['1-1', '1-2'], ['2'], ['3-1', '3-2']];
            _iterator2 = _createForOfIteratorHelper(sliders[currentStyle]);
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                slider = _step2.value;
                logSlider(slider);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (toggleControllable(currentStyle)) {
            sendEvent("save-toggle-".concat(toggles['4-2'], "-").concat(toggles['4-4']));
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
          if (showFilters(currentStyle)) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, fgSize, fgSize);
            ctx.filter = "blur(".concat(fgSize * blurSlider.value * blurFactor, "px) ").concat(calculateBrightness());
          }
          // FIXME: hack
          if (currentStyle === 3) {
            off = (fgSize - fgSize3) / 2;
            ctx.drawImage(styleBgs[0], off, off, fgSize3, fgSize3);
          } else {
            ctx.drawImage(styleBgs[0], 0, 0, fgSize, fgSize);
          }
          ctx.filter = 'blur(0px) brightness(1) saturate(1)';
          setStatus('正在寻找粉笔……');
          drawLayer = function drawLayer(image, opacity) {
            // Values outside that range, including Infinity and NaN, will not be set, and globalAlpha will retain its previous value.
            ctx.globalAlpha = 1;
            ctx.globalAlpha = opacity;
            ctx.drawImage(image, 0, 0, fgSize, fgSize);
            ctx.globalAlpha = 1;
          };
          _context4.prev = 19;
          _context4.next = 22;
          return imagePromises;
        case 22:
          fgImages = _context4.sent;
          setStatus('正在绘制板报……');
          // next tick
          _context4.next = 26;
          return Promise.resolve();
        case 26:
          _iterator3 = _createForOfIteratorHelper(fgImages);
          _context4.prev = 27;
          _iterator3.s();
        case 29:
          if ((_step3 = _iterator3.n()).done) {
            _context4.next = 36;
            break;
          }
          _step3$value = _slicedToArray(_step3.value, 2), id = _step3$value[0], image = _step3$value[1];
          if (!(id in toggles && !toggles[id])) {
            _context4.next = 33;
            break;
          }
          return _context4.abrupt("continue", 34);
        case 33:
          drawLayer(image, (_transparencies$id = transparencies[id]) !== null && _transparencies$id !== void 0 ? _transparencies$id : 1);
        case 34:
          _context4.next = 29;
          break;
        case 36:
          _context4.next = 41;
          break;
        case 38:
          _context4.prev = 38;
          _context4.t0 = _context4["catch"](27);
          _iterator3.e(_context4.t0);
        case 41:
          _context4.prev = 41;
          _iterator3.f();
          return _context4.finish(41);
        case 44:
          _context4.next = 53;
          break;
        case 46:
          _context4.prev = 46;
          _context4.t1 = _context4["catch"](19);
          setStatus('网络错误');
          alert('无法下载蒙版图片，请检查您的互联网连接。');
          console.error(_context4.t1);
          saveButton.disabled = false;
          return _context4.abrupt("return");
        case 53:
          setStatus('正在拍照……');
          _context4.next = 56;
          return exportCanvas(canvas);
        case 56:
          resultUrl = _context4.sent;
          resultImageEl.src = resultUrl;
          focusStep(3);
          saveButton.disabled = false;
          done = true;
          setStatus('');
        case 62:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, null, [[19, 46], [27, 38, 41, 44]]);
})));
backButton.addEventListener('click', function () {
  focusStep(0);
});
back1Button.addEventListener('click', function () {
  focusStep(0);
});
back2Button.addEventListener('click', function () {
  focusStep(0);
});
var ripples = [].concat(_toConsumableArray(document.querySelectorAll('[data-ripple]')), _toConsumableArray(document.querySelectorAll('.mdc-button')));
var _iterator4 = _createForOfIteratorHelper(ripples),
  _step4;
try {
  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
    var el = _step4.value;
    mdc.ripple.MDCRipple.attachTo(el);
  }
} catch (err) {
  _iterator4.e(err);
} finally {
  _iterator4.f();
}
var checkboxFields = _toConsumableArray(document.querySelectorAll('.mdc-form-field[data-checkbox]'));
var _iterator5 = _createForOfIteratorHelper(checkboxFields),
  _step5;
try {
  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
    var _el = _step5.value;
    var checkboxEl = _el.querySelector('.mdc-checkbox');
    var checkbox = new mdc.checkbox.MDCCheckbox(checkboxEl);
    var formField = new mdc.formField.MDCFormField(_el);
    formField.input = checkbox;
  }

  // load lazy-load images
} catch (err) {
  _iterator5.e(err);
} finally {
  _iterator5.f();
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
}, 6000);

