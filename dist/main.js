/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 960:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ init)
/* harmony export */ });
const layout =
[
  "AC", "plusminus", "percent", "op_divide",
  "n7", "n8", "n9", "op_multiply",
  "n4", "n5", "n6", "op_minus",
  "n1", "n2", "n3", "op_plus",
  "n0", "decimal_sep", "equals"
];

const MULT_SIGN = "\u00D7";
const MINUS_SIGN = "\u2212";

const operators = [MULT_SIGN, "÷", "+", MINUS_SIGN];

const buttons = document.querySelector("#main-grid").children;
const display = document.querySelector("#display");

display.style.setProperty('--animate-duration', '0.3s');

// from https://animate.style/
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
});

const expression = () =>
  display.textContent.replace(/\s/g, "").replaceAll(",", ".");

const op_regex = (() => {
  let regex = "";

  operators.forEach((op) => (regex += `\\${op}|`));
  regex = regex.substring(0, regex.length - 1);

  return regex;
})();

const displayIsInitial = () => display.textContent == "0";

function lastIsNumber() {
  if (isNaN(Number(expression().at(-1)))) {
    return false;
  } else {
    return true;
  }
}

function lastIsInteger() {
  return !expression().split(RegExp(op_regex, "g")).at(-1).includes(".");
}

function lastIsOperator() {
  return operators.includes(expression().at(-1));
}

function type_op() {
  if (this.textContent == MINUS_SIGN || this.textContent == "+") {
    if (displayIsInitial()) {
      display.textContent = this.textContent;
      return;
    }
  }

  if (lastIsOperator()) {
    display.textContent = expression().substring(0, expression().length - 1) + this.textContent;
    return;
  }

  if (lastIsNumber()) {
    display.textContent += this.textContent;
  }
}

function type_number() {
  const n = this.textContent.replace(/\s/g, "");

  if (displayIsInitial()) {
    display.textContent = n;
    return;
  }

  display.textContent += n;
}

function type_decimal_sep() {
  if (!lastIsNumber()) {
    return;
  }

  if (!lastIsInteger()) {
    return;
  }

  display.textContent += ",";
}

function type_equals() {
  if (displayIsInitial()) {
    animateCSS(this, "shakeX");
    return;
  }

  if (display.textContent == MINUS_SIGN || display.textContent == "+") {
    animateCSS(this, "shakeX");
    return;
  }

  try {
    animateCSS(display, "backOutLeft").then(() => {
      display.textContent = evaluate(expression())
        .toString()
        .replaceAll(".", ",");
        animateCSS(display, "backInRight");
    });
  } catch (error) {
    animateCSS(this, "shakeX");
  }
}

function evaluate(expr) {
  // remove all whitespace
  expr = expr.replace(/\s/g, "");

  // change decimal seperator to dot
  expr = expr.replace(/,/g, ".");

  expr = expr.replaceAll(MULT_SIGN, "*");
  expr = expr.replaceAll("÷", "/");
  expr = expr.replaceAll(MINUS_SIGN, "-");

  return eval(expr);
}

function type_AC() {
  animateCSS(display, "fadeOut").then(()=>{
    display.textContent = "0";
    animateCSS(display, "fadeIn");
  });
}

function init() {
  buttons[layout.indexOf("AC")].addEventListener("click", type_AC);

  for (let i = 0; i < 10; i++) {
    buttons[layout.indexOf(`n${i}`)].addEventListener("click", type_number);
  }

  let layout_ops = [];

  layout.forEach((el) => {
    if (el.includes("op_")) {
      layout_ops.push(el);
    }
  });

  for (let i = 0; i < layout_ops.length; i++) {
    buttons[layout.indexOf(layout_ops[i])].addEventListener("click", type_op);
  }

  buttons[layout.indexOf("decimal_sep")].addEventListener(
    "click",
    type_decimal_sep
  );

  buttons[layout.indexOf("equals")].addEventListener("click", type_equals);

}


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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _calculator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(960);






console.log("javascript betöltve!");

(0,_calculator_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();

})();

/******/ })()
;