/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/color-generators/accent-palette-generator.ts":
/*!**********************************************************!*\
  !*** ./src/color-generators/accent-palette-generator.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultAccentColors: () => (/* reexport safe */ _defaults__WEBPACK_IMPORTED_MODULE_2__.defaultAccentHUEs),
/* harmony export */   generateGlobalAccentPalette: () => (/* binding */ generateGlobalAccentPalette),
/* harmony export */   generateSystemAccentPalette: () => (/* binding */ generateSystemAccentPalette),
/* harmony export */   getGlobalAccent: () => (/* binding */ getGlobalAccent),
/* harmony export */   getShadesTemplate: () => (/* binding */ getShadesTemplate)
/* harmony export */ });
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chroma-js */ "./node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_token_references__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/token-references */ "./src/utils/token-references.ts");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaults */ "./src/defaults.ts");



function getShadesTemplate(theme, colorName) {
    if (theme == 'light') {
        return {
            "100": {
                "$value": "rgba({200}, 0.125)",
                "$type": "color",
                "description": `Subtle semitransparent accent`
            },
            "200": {
                "$value": "rgba({200}, 0.33)",
                "$type": "color",
                "description": `Light semitransparent accent`
            },
            "300": {
                "$value": "{300}",
                "$type": "color",
                "description": `Non textual elements`
            },
            "400": {
                "$value": "{400}",
                "$type": "color",
                "description": `Base background color`
            },
            "500": {
                "$value": "{500}",
                "$type": "color",
                "description": `Text on light surface`
            },
            "600": {
                "$value": "{100}",
                "$type": "color",
                "description": `Text on dark surface`
            }
        };
    }
    if (theme == 'dark') {
        return {
            "100": {
                "$value": "rgba({200}, 0.20)",
                "$type": "color",
                "description": `Subtle semitransparent accent`
            },
            "200": {
                "$value": "rgba({200}, 0.45)",
                "$type": "color",
                "description": `Light semitransparent accent`
            },
            "300": {
                "$value": "{300}",
                "$type": "color",
                "description": `Non textual elements`
            },
            "400": {
                "$value": "{400}",
                "$type": "color",
                "description": `Base background color`
            },
            "500": {
                "$value": "{100}",
                "$type": "color",
                "description": `Text on light surface`
            },
            "600": {
                "$value": "{100}",
                "$type": "color",
                "description": `Text on dark surface`
            }
        };
    }
    throw new Error(`Theme: ${theme} is invalid`);
}
function getColorParams(theme, params) {
    let colorParams = {
        saturation: params.accentSaturation,
        minLuminance: params.accentMinLuminance,
        midLuminance: params.accentMidLuminance,
        maxLuminance: params.accentMaxLuminance,
    };
    if (theme == 'dark') {
        colorParams.saturation = params.accentSaturation * 0.85;
        // colorParams.maxLuminance = params.accentMaxLuminance * 0.85;
    }
    return colorParams;
}
function generateSystemAccentPalette(theme, params) {
    const { saturation, minLuminance, midLuminance, maxLuminance } = getColorParams(theme, params);
    let accents = {
        red: getShadesTemplate(theme, 'red'),
        amber: getShadesTemplate(theme, 'amber'),
        brown: getShadesTemplate(theme, 'brown'),
        green: getShadesTemplate(theme, 'green'),
        teal: getShadesTemplate(theme, 'teal'),
        blue: getShadesTemplate(theme, 'blue'),
        indigo: getShadesTemplate(theme, 'indigo'),
        violet: getShadesTemplate(theme, 'violet'),
        purple: getShadesTemplate(theme, 'purple'),
        pink: getShadesTemplate(theme, 'pink')
    };
    for (const [name, scale] of Object.entries(accents)) {
        const hue = params[name];
        const shades = getGlobalAccent(hue, saturation, minLuminance, midLuminance, maxLuminance);
        accents[name] = getThemeScale(scale, shades);
    }
    return accents;
}
function generateGlobalAccentPalette(theme, params) {
    const { saturation, minLuminance, midLuminance, maxLuminance } = getColorParams(theme, params);
    let accents = {};
    _defaults__WEBPACK_IMPORTED_MODULE_2__.systemAccentList.forEach(name => {
        const hue = params[name];
        accents[name] = getGlobalAccent(hue, saturation, minLuminance, midLuminance, maxLuminance);
    });
    return accents;
}
function getGlobalAccent(hue, saturation, minLuminance, midLiminance, maxLuminance, steps = 7) {
    const range = getRangeOfThree({
        hue,
        saturation,
        minLuminance,
        midLiminance,
        maxLuminance
    });
    const shades = getScale(range, steps);
    return shades;
}
function getThemeScale(input, dictionary) {
    let output = {};
    Object.entries(input).forEach(([shadeNumber, token]) => {
        token.$value = (0,_utils_token_references__WEBPACK_IMPORTED_MODULE_1__.parseReferenceGlobal)(token.$value, dictionary);
        output[shadeNumber] = token;
    });
    return output;
}
/*
    colors: getRangeOfThree()
*/
function getScale(colors, count = 9) {
    let tokens = {};
    // chroma scale returns array of hex values
    const scale = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().scale(colors).colors(count, 'hex');
    scale.forEach((color, index) => {
        tokens[`${index + 1}00`] = {
            $value: color,
            $type: 'color',
            private: true
        };
    });
    return tokens;
}
function getRangeOfThree({ hue, saturation, minLuminance = 0.1, midLiminance = 0.18, maxLuminance = 0.29 }) {
    let color1 = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().hsl([hue * 0.96, saturation * 0.95, 0.5])
        .luminance(maxLuminance);
    // this one always 4.5 : 1 contrast ratio
    let color2 = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().hsl([hue, saturation * 1, 0.5])
        .luminance(midLiminance);
    let color3 = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().hsl([hue * 1.04, saturation * 0.95, 0.5])
        .luminance(minLuminance);
    return [color1, color2, color3];
}



/***/ }),

/***/ "./src/color-generators/neutrals-palette-generator.ts":
/*!************************************************************!*\
  !*** ./src/color-generators/neutrals-palette-generator.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateNeutrals: () => (/* binding */ generateNeutrals),
/* harmony export */   renderNeutrals: () => (/* binding */ renderNeutrals)
/* harmony export */ });
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chroma-js */ "./node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _swatches_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swatches-generator */ "./src/color-generators/swatches-generator.ts");


function getSaturationModifier(lightness) {
    // visual representation
    // https://www.desmos.com/calculator/02ufrfsuzy
    const offset = 50; // ligthness range is [0, 100], for saturation we need to offset the curve to make [-50, 50] range 
    const magnitude = 70; // sets how much to modify, higher values outputs smaller modifier
    const saturationModifier = 1 + (Math.pow(lightness - offset, 2) / magnitude - Math.pow(offset, 2) / magnitude) / 100;
    return saturationModifier;
}
function generateNeutrals(params) {
    const { hue = 200, saturation = 0.1, min = 4, max = 100, distance } = params || {};
    let tokens = {};
    let value = min;
    while (value <= max) {
        const sMod = 1 / Math.pow(1.3, (max - value) / 100);
        const color = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().hsl(hue, saturation * getSaturationModifier(value), value / 100);
        tokens[`grey-${value}`] = {
            '$value': color.hex(),
            '$type': 'color',
            'private': true
        };
        value++;
    }
    tokens["grey-100"] = {
        "$value": "#FFFFFF",
        '$type': 'color',
        'private': true
    };
    return tokens;
}
function renderNeutrals(colors, name) {
    const existingNode = figma.currentPage.findChild((node) => node.name.startsWith('Global Neutrals'));
    existingNode === null || existingNode === void 0 ? void 0 : existingNode.remove();
    let frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.counterAxisSizingMode = "AUTO";
    frame.primaryAxisSizingMode = "AUTO";
    frame.itemSpacing = 0;
    frame.name = name || 'Global Neutrals';
    frame.x = 0;
    frame.y = -156;
    for (const [name, color] of Object.entries(colors)) {
        (0,_swatches_generator__WEBPACK_IMPORTED_MODULE_1__.renderColor)(frame, name, color, colors);
    }
    return frame;
}


/***/ }),

/***/ "./src/color-generators/render-accents.ts":
/*!************************************************!*\
  !*** ./src/color-generators/render-accents.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderAccents: () => (/* binding */ renderAccents)
/* harmony export */ });
/* harmony import */ var _swatches_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./swatches-generator */ "./src/color-generators/swatches-generator.ts");

function renderAccents(colors, name) {
    const existingNode = figma.currentPage.findChild((node) => node.name == (name || 'Accent Colours'));
    existingNode === null || existingNode === void 0 ? void 0 : existingNode.remove();
    let frame = figma.createFrame();
    frame.layoutMode = 'HORIZONTAL';
    frame.counterAxisSizingMode = "AUTO";
    frame.primaryAxisSizingMode = "AUTO";
    frame.itemSpacing = 16;
    frame.fills = [];
    frame.name = name || 'Accent Colours';
    frame.x = 0;
    frame.y = 0;
    for (const [name, shades] of Object.entries(colors)) {
        (0,_swatches_generator__WEBPACK_IMPORTED_MODULE_0__.renderShades)(frame, name, shades, colors);
    }
    return frame;
}


/***/ }),

/***/ "./src/color-generators/swatches-generator.ts":
/*!****************************************************!*\
  !*** ./src/color-generators/swatches-generator.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   outputHSL: () => (/* binding */ outputHSL),
/* harmony export */   renderColor: () => (/* binding */ renderColor),
/* harmony export */   renderShades: () => (/* binding */ renderShades)
/* harmony export */ });
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chroma-js */ "./node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/round-two-digits */ "./src/utils/round-two-digits.ts");
/* harmony import */ var _utils_figma_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/figma-colors */ "./src/utils/figma-colors.ts");



function getBoundVariables(node) {
    const boundVariables = Object.entries(node.boundVariables);
    for (const [propName, propValue] of boundVariables) {
        const isArray = Array.isArray(propValue);
        if (isArray) {
            propValue.forEach((alias, i) => {
                processBoundVariable(figma.variables.getVariableById(alias.id));
            });
        }
        else {
            let varId = propValue.id;
            if (typeof varId != 'string') { // it is 
                varId = varId.id;
            }
            processBoundVariable(figma.variables.getVariableById(varId));
        }
    }
}
function processBoundVariable(variable) {
}
function renderShades(parentNode, name, shades, colors) {
    let frame = figma.createFrame();
    frame.resizeWithoutConstraints(320, frame.height);
    frame.layoutMode = "VERTICAL";
    frame.counterAxisSizingMode = "AUTO";
    frame.primaryAxisSizingMode = "AUTO";
    frame.name = name;
    frame.fills = [];
    getBoundVariables(frame);
    for (const [shadeName, color] of Object.entries(shades)) {
        renderColor(frame, `accent/${name}/${shadeName}`, color, colors);
    }
    parentNode.appendChild(frame);
    return parentNode;
}
function renderColor(parentNode, name, color, colors) {
    let frame = figma.createFrame();
    frame.layoutMode = "VERTICAL";
    frame.layoutAlign = 'STRETCH';
    frame.itemSpacing = 4;
    frame.name = name;
    frame.verticalPadding = 16;
    frame.horizontalPadding = 20;
    const { r, g, b, a } = (0,_utils_figma_colors__WEBPACK_IMPORTED_MODULE_2__.parseColorToken)(color, colors);
    const chromaColor = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().gl(r, g, b, a);
    frame.fills = [{ type: 'SOLID', color: { r, g, b }, opacity: a }];
    const opaqueColor = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().gl(r, g, b, 1);
    const mixedColor = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().mix(opaqueColor, "white", 1 - a);
    console.log(name, mixedColor.rgba());
    let contrast = [
        chroma_js__WEBPACK_IMPORTED_MODULE_0___default().contrast("white", mixedColor),
        chroma_js__WEBPACK_IMPORTED_MODULE_0___default().contrast(chroma_js__WEBPACK_IMPORTED_MODULE_0___default().hsl([0, 0, 0.22]), mixedColor)
    ];
    let nameRow = getRow(frame, contrast[0] > 2.5);
    let contrastWhiteRow = getRow(frame, contrast[0] > 2.5);
    let contrastBlackRow = getRow(frame, contrast[0] > 2.5);
    let hslRow = getRow(frame, contrast[0] > 2.5);
    let luminanceRow = getRow(frame, contrast[0] > 2.5);
    // await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    nameRow.root.name = "nameRow";
    contrastWhiteRow.root.name = "contrastWhiteRow";
    contrastBlackRow.root.name = "contrastBlackRow";
    hslRow.root.name = "hslRow";
    luminanceRow.root.name = "luminanceRow";
    contrastWhiteRow.labelNode.characters = "vs white";
    contrastWhiteRow.valueNode.characters = `${(0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__.roundTwoDigits)(contrast[0])}`;
    contrastBlackRow.labelNode.characters = "vs black";
    contrastBlackRow.valueNode.characters = `${(0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__.roundTwoDigits)(contrast[1])}`;
    nameRow.labelNode.characters = `{global.${name.replace(/\//g, ".")}}`;
    nameRow.valueNode.characters = ` `;
    hslRow.labelNode.characters = "hsl";
    hslRow.valueNode.characters = `${outputHSL(chromaColor).join(" ")}`;
    luminanceRow.labelNode.characters = "luminance";
    luminanceRow.valueNode.characters = `${Math.round((0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__.roundTwoDigits)(chromaColor.luminance()) * 100)}%`;
    parentNode.appendChild(frame);
    frame.resize(240, frame.height);
    return parentNode;
}
function getRow(parentNode, isWhite) {
    const textNode = figma.createText();
    const frame = figma.createFrame();
    frame.name = "row";
    frame.layoutMode = "HORIZONTAL";
    frame.layoutAlign = "STRETCH";
    frame.primaryAxisSizingMode = "FIXED";
    frame.primaryAxisAlignItems = "SPACE_BETWEEN";
    frame.counterAxisSizingMode = "AUTO";
    frame.fills = [];
    textNode.name = "label";
    const valueLabel = textNode.clone();
    valueLabel.name = "value-label";
    frame.appendChild(textNode);
    frame.appendChild(valueLabel);
    const color = isWhite ? {
        r: 1, g: 1, b: 1
    } : {
        r: 0, g: 0, b: 0
    };
    textNode.fills = [{ type: 'SOLID', color, opacity: 0.8 }];
    valueLabel.fills = [{ type: 'SOLID', color }];
    parentNode.appendChild(frame);
    return {
        labelNode: textNode, valueNode: valueLabel, root: frame
    };
}
function outputHSL(chromaColor) {
    const [h, s, l] = chromaColor.hsl();
    return [`${Math.round(h) || 0}deg`, `${Math.round((0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__.roundTwoDigits)(s) * 100)}%`, `${Math.round((0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_1__.roundTwoDigits)(l) * 100)}%`];
}


/***/ }),

/***/ "./src/color-tokens.ts":
/*!*****************************!*\
  !*** ./src/color-tokens.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBrandColors: () => (/* binding */ getBrandColors),
/* harmony export */   getComponentColors: () => (/* binding */ getComponentColors),
/* harmony export */   getGlobalNeutrals: () => (/* binding */ getGlobalNeutrals),
/* harmony export */   getSemanticAccentSettings: () => (/* binding */ getSemanticAccentSettings),
/* harmony export */   getThemeColors: () => (/* binding */ getThemeColors)
/* harmony export */ });
/* harmony import */ var _tokens_colors_components_component_tokens_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/colors/components/component-tokens.json */ "./src/tokens/colors/components/component-tokens.json");
/* harmony import */ var _tokens_colors_system_light_common_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/colors/system/light-common.json */ "./src/tokens/colors/system/light-common.json");
/* harmony import */ var _tokens_colors_system_light_2_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens/colors/system/light-2.json */ "./src/tokens/colors/system/light-2.json");
/* harmony import */ var _tokens_colors_system_light_3_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens/colors/system/light-3.json */ "./src/tokens/colors/system/light-3.json");
/* harmony import */ var _tokens_colors_system_light_4_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens/colors/system/light-4.json */ "./src/tokens/colors/system/light-4.json");
/* harmony import */ var _tokens_colors_system_dark_common_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens/colors/system/dark-common.json */ "./src/tokens/colors/system/dark-common.json");
/* harmony import */ var _tokens_colors_system_dark_elevated_2_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokens/colors/system/dark-elevated-2.json */ "./src/tokens/colors/system/dark-elevated-2.json");
/* harmony import */ var _tokens_colors_system_dark_elevated_3_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tokens/colors/system/dark-elevated-3.json */ "./src/tokens/colors/system/dark-elevated-3.json");
/* harmony import */ var _tokens_colors_system_dark_elevated_4_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokens/colors/system/dark-elevated-4.json */ "./src/tokens/colors/system/dark-elevated-4.json");
/* harmony import */ var _tokens_colors_system_dark_base_2_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tokens/colors/system/dark-base-2.json */ "./src/tokens/colors/system/dark-base-2.json");
/* harmony import */ var _tokens_colors_system_dark_base_3_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tokens/colors/system/dark-base-3.json */ "./src/tokens/colors/system/dark-base-3.json");
/* harmony import */ var _tokens_colors_system_dark_base_4_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tokens/colors/system/dark-base-4.json */ "./src/tokens/colors/system/dark-base-4.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");
/* harmony import */ var _color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./color-generators/accent-palette-generator */ "./src/color-generators/accent-palette-generator.ts");
/* harmony import */ var _color_generators_neutrals_palette_generator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./color-generators/neutrals-palette-generator */ "./src/color-generators/neutrals-palette-generator.ts");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./defaults */ "./src/defaults.ts");
















let GlobalNeutrals;
function getSemanticAccentSettings() {
    return _defaults__WEBPACK_IMPORTED_MODULE_15__.defaultSemanticAccents;
}
function getGlobalNeutrals() {
    return GlobalNeutrals;
}
function getComponentColors() {
    return (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_components_component_tokens_json__WEBPACK_IMPORTED_MODULE_0__);
}
function getBrandColors(name, accentShades, flat) {
    const palette = {
        primary: generateSemanticShades(name, accentShades)
    };
    return flat ? (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(palette) : palette;
}
function getThemeColors(theme, formData) {
    let params = Object.assign({}, formData);
    GlobalNeutrals = (0,_color_generators_neutrals_palette_generator__WEBPACK_IMPORTED_MODULE_14__.generateNeutrals)({
        hue: params.hue,
        saturation: params.saturation,
        distance: params.distance
    });
    const semanticAccents = {
        primary: params.primary,
        info: params.info,
        success: params.success,
        warning: params.warning,
        danger: params.danger,
    };
    let lightAccentTokens = (0,_color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__.generateSystemAccentPalette)('light', params);
    let darkAccentTokens = (0,_color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__.generateSystemAccentPalette)('dark', params);
    const lightSemanticTokens = generateSemanticPalette(semanticAccents, lightAccentTokens);
    const darkSemanticTokens = generateSemanticPalette(semanticAccents, darkAccentTokens);
    const lightCommonTokens = Object.assign(Object.assign({ accent: lightAccentTokens }, _tokens_colors_system_light_common_json__WEBPACK_IMPORTED_MODULE_1__), lightSemanticTokens);
    const darkCommonTokens = Object.assign(Object.assign({ accent: darkAccentTokens }, _tokens_colors_system_dark_common_json__WEBPACK_IMPORTED_MODULE_5__), darkSemanticTokens);
    let commonColors = {};
    let themeColors = {};
    if (theme === "lightBase") {
        commonColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(lightCommonTokens);
        if (params.distance === 0.02) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_light_2_json__WEBPACK_IMPORTED_MODULE_2__);
        }
        if (params.distance === 0.03) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_light_3_json__WEBPACK_IMPORTED_MODULE_3__);
        }
        if (params.distance === 0.04) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_light_4_json__WEBPACK_IMPORTED_MODULE_4__);
        }
    }
    if (theme === "darkElevated") {
        commonColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(darkCommonTokens);
        if (params.distance === 0.02) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_elevated_2_json__WEBPACK_IMPORTED_MODULE_6__);
        }
        if (params.distance === 0.03) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_elevated_3_json__WEBPACK_IMPORTED_MODULE_7__);
        }
        if (params.distance === 0.04) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_elevated_4_json__WEBPACK_IMPORTED_MODULE_8__);
        }
    }
    if (theme === "darkBase") {
        commonColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(darkCommonTokens);
        if (params.distance === 0.02) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_base_2_json__WEBPACK_IMPORTED_MODULE_9__);
        }
        if (params.distance === 0.03) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_base_3_json__WEBPACK_IMPORTED_MODULE_10__);
        }
        if (params.distance === 0.04) {
            themeColors = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_12__.flattenObject)(_tokens_colors_system_dark_base_4_json__WEBPACK_IMPORTED_MODULE_11__);
        }
    }
    return Object.assign(Object.assign({}, commonColors), themeColors);
}
function generateSemanticShades(aliasName, accentShades) {
    let output = {};
    for (var a = 1, b = 7; a < b; a++) {
        output[`${a}00`] = {
            "$value": `{accent.${aliasName}.${a}00}`,
            "$type": "color",
            "description": accentShades[`${a}00`].description
        };
    }
    return output;
}
function generateSemanticPalette(accents, palette) {
    let result = {};
    Object.entries(accents).forEach(([name, alias]) => {
        result[name] = generateSemanticShades(alias, palette[alias]);
    });
    return result;
}


/***/ }),

/***/ "./src/defaults.ts":
/*!*************************!*\
  !*** ./src/defaults.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultAccentHUEs: () => (/* binding */ defaultAccentHUEs),
/* harmony export */   defaultSemanticAccents: () => (/* binding */ defaultSemanticAccents),
/* harmony export */   defaultSettings: () => (/* binding */ defaultSettings),
/* harmony export */   iconSizeName: () => (/* binding */ iconSizeName),
/* harmony export */   iconSizeValues: () => (/* binding */ iconSizeValues),
/* harmony export */   radiiSizeName: () => (/* binding */ radiiSizeName),
/* harmony export */   radiiSizeValues: () => (/* binding */ radiiSizeValues),
/* harmony export */   spacingSizeName: () => (/* binding */ spacingSizeName),
/* harmony export */   systemAccentList: () => (/* binding */ systemAccentList),
/* harmony export */   themes: () => (/* binding */ themes),
/* harmony export */   typographySizeName: () => (/* binding */ typographySizeName),
/* harmony export */   typographySizeValues: () => (/* binding */ typographySizeValues)
/* harmony export */ });
const themes = [
    'lightBase',
    'darkBase',
    'darkElevated'
];
const radiiSizeName = [
    "compact",
    "base",
    "large",
];
const radiiSizeValues = [
    4,
    6,
    8,
];
const spacingSizeName = [
    "compact",
    "base",
    "large",
    "touch",
];
const typographySizeName = [
    "compact",
    "base",
    "large",
];
const typographySizeValues = [
    "13/16",
    "15/20",
    "17/24",
];
const iconSizeName = [
    "base",
    "touch"
];
const iconSizeValues = [
    "16",
    "24",
];
const systemAccentList = [
    "red",
    "amber",
    "brown",
    "green",
    "teal",
    "blue",
    "indigo",
    "violet",
    "purple",
    "pink"
];
const defaultAccentHUEs = {
    "red": 4,
    "amber": 25,
    "brown": 33,
    "green": 150,
    "teal": 180,
    "blue": 210,
    "indigo": 240,
    "violet": 260,
    "purple": 280,
    "pink": 340
};
const defaultSettings = {
    type: 'IMPORT',
    theme: 'light',
    hue: 190,
    saturation: 0.2,
    distance: 0.02,
    primary: 'blue',
    info: 'teal',
    success: 'green',
    warning: 'amber',
    danger: 'red',
    red: 4,
    amber: 25,
    brown: 33,
    green: 150,
    teal: 185,
    blue: 210,
    indigo: 240,
    violet: 260,
    purple: 280,
    pink: 340,
    baseFontSize: 'base',
    typeScale: 'minorThird',
    createStyles: true,
    accentSaturation: 0.9,
    accentMaxLuminance: 0.45,
    accentMidLuminance: 0.18,
    accentMinLuminance: 0.10,
    radii: 'base',
    spacing: 'base',
    singleCollection: false
};
const defaultSemanticAccents = {
    primary: 'blue',
    info: 'teal',
    success: 'green',
    warning: 'amber',
    danger: 'red'
};


/***/ }),

/***/ "./src/effect-tokens.ts":
/*!******************************!*\
  !*** ./src/effect-tokens.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   elevation: () => (/* binding */ elevation),
/* harmony export */   getElevationTokens: () => (/* binding */ getElevationTokens)
/* harmony export */ });
/* harmony import */ var _tokens_effects_elevation_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/effects/elevation.json */ "./src/tokens/effects/elevation.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");


const elevation = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_1__.flattenObject)(_tokens_effects_elevation_json__WEBPACK_IMPORTED_MODULE_0__);
function getElevationTokens() {
    return _tokens_effects_elevation_json__WEBPACK_IMPORTED_MODULE_0__;
}


/***/ }),

/***/ "./src/fix-layers.ts":
/*!***************************!*\
  !*** ./src/fix-layers.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processComponents: () => (/* binding */ processComponents)
/* harmony export */ });
/* harmony import */ var _utils_delay_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/delay-async */ "./src/utils/delay-async.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function processComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        figma.skipInvisibleInstanceChildren = true;
        let pageComponents = [];
        debugger;
        if (figma.currentPage.selection.length) {
            figma.currentPage.selection.forEach((node) => {
                if (node.type == 'COMPONENT') {
                    pageComponents = pageComponents.concat(node);
                }
                else if (node.findAllWithCriteria) {
                    const components = node.findAllWithCriteria({ types: ['COMPONENT'] });
                    pageComponents = pageComponents.concat(components);
                }
            });
        }
        else {
            pageComponents = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT'] });
        }
        const size = pageComponents.length;
        let count = 0;
        while (pageComponents.length) {
            const componentFrame = pageComponents.shift();
            if (componentFrame.name == 'state=:focus, style=default, selected=false') {
                debugger;
            }
            figma.skipInvisibleInstanceChildren = false;
            const children = componentFrame.findAll((n) => {
                if (n.layoutPositioning == 'ABSOLUTE' && !n.constraints)
                    debugger;
                return n.layoutPositioning == 'ABSOLUTE'
                    && n.width > 0
                    && n.height > 0
                    && n.constraints.horizontal === 'STRETCH'
                    && n.constraints.vertical === 'STRETCH';
            });
            yield fixLayers(children, componentFrame);
            console.log(`%cComponent ${count++} / ${size}`, `color: #0773DF; font-weight: bold;`);
        }
    });
}
function fixLayers(nodes, component) {
    return __awaiter(this, void 0, void 0, function* () {
        let node, parent, offsetX, offsetY, height, width;
        let updated = 0, skipped = 0, failed = 0;
        console.log(`Working on ${component.name}`);
        try {
            while (nodes.length) {
                console.log(`Remaining nodes: ${nodes.length}`);
                node = nodes.shift();
                if (checkInstance(node, component)) {
                    skipped++;
                    continue;
                }
                parent = node.parent;
                offsetX = node.x;
                offsetY = node.y;
                height = parent.height - 2 * offsetY;
                width = parent.width - 2 * offsetX;
                node.resize(width * 0.8, height * 0.8);
                yield (0,_utils_delay_async__WEBPACK_IMPORTED_MODULE_0__.delayAsync)(10);
                node.resize(width, height);
                updated++;
                yield (0,_utils_delay_async__WEBPACK_IMPORTED_MODULE_0__.delayAsync)(50);
            }
            console.log(`Resized: ${updated}, Skipped: ${skipped}`);
        }
        catch (e) {
            failed++;
            debugger;
        }
    });
}
function checkInstance(targetFrame, componentFrame) {
    let node = targetFrame.parent;
    while (node != componentFrame) {
        if (node.type == 'INSTANCE') {
            return true;
        }
        node = node.parent;
    }
    return false;
}


/***/ }),

/***/ "./src/radii-tokens.ts":
/*!*****************************!*\
  !*** ./src/radii-tokens.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   compact: () => (/* binding */ compact),
/* harmony export */   large: () => (/* binding */ large)
/* harmony export */ });
/* harmony import */ var _tokens_radii_base_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/radii/base.json */ "./src/tokens/radii/base.json");
/* harmony import */ var _tokens_radii_compact_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/radii/compact.json */ "./src/tokens/radii/compact.json");
/* harmony import */ var _tokens_radii_large_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens/radii/large.json */ "./src/tokens/radii/large.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");




const base = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_3__.flattenObject)(_tokens_radii_base_json__WEBPACK_IMPORTED_MODULE_0__);
const compact = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_3__.flattenObject)(_tokens_radii_compact_json__WEBPACK_IMPORTED_MODULE_1__);
const large = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_3__.flattenObject)(_tokens_radii_large_json__WEBPACK_IMPORTED_MODULE_2__);


/***/ }),

/***/ "./src/sizing-tokens.ts":
/*!******************************!*\
  !*** ./src/sizing-tokens.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   touch: () => (/* binding */ touch)
/* harmony export */ });
/* harmony import */ var _tokens_sizing_base_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/sizing/base.json */ "./src/tokens/sizing/base.json");
/* harmony import */ var _tokens_sizing_touch_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/sizing/touch.json */ "./src/tokens/sizing/touch.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");



const base = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_2__.flattenObject)(_tokens_sizing_base_json__WEBPACK_IMPORTED_MODULE_0__);
const touch = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_2__.flattenObject)(_tokens_sizing_touch_json__WEBPACK_IMPORTED_MODULE_1__);


/***/ }),

/***/ "./src/spacing-tokens.ts":
/*!*******************************!*\
  !*** ./src/spacing-tokens.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   compact: () => (/* binding */ compact),
/* harmony export */   large: () => (/* binding */ large),
/* harmony export */   touch: () => (/* binding */ touch)
/* harmony export */ });
/* harmony import */ var _tokens_spacing_base_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/spacing/base.json */ "./src/tokens/spacing/base.json");
/* harmony import */ var _tokens_spacing_compact_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/spacing/compact.json */ "./src/tokens/spacing/compact.json");
/* harmony import */ var _tokens_spacing_large_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens/spacing/large.json */ "./src/tokens/spacing/large.json");
/* harmony import */ var _tokens_spacing_touch_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens/spacing/touch.json */ "./src/tokens/spacing/touch.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");





const base = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_4__.flattenObject)(_tokens_spacing_base_json__WEBPACK_IMPORTED_MODULE_0__);
const compact = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_4__.flattenObject)(_tokens_spacing_compact_json__WEBPACK_IMPORTED_MODULE_1__);
const large = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_4__.flattenObject)(_tokens_spacing_large_json__WEBPACK_IMPORTED_MODULE_2__);
const touch = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_4__.flattenObject)(_tokens_spacing_touch_json__WEBPACK_IMPORTED_MODULE_3__);


/***/ }),

/***/ "./src/typescale-tokens.ts":
/*!*********************************!*\
  !*** ./src/typescale-tokens.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   compact: () => (/* binding */ compact),
/* harmony export */   getFontDetails: () => (/* binding */ getFontDetails),
/* harmony export */   getTypograohyTokens: () => (/* binding */ getTypograohyTokens),
/* harmony export */   large: () => (/* binding */ large)
/* harmony export */ });
/* harmony import */ var _tokens_typography_styles_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens/typography/styles.json */ "./src/tokens/typography/styles.json");
/* harmony import */ var _tokens_typography_typeface_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/typography/typeface.json */ "./src/tokens/typography/typeface.json");
/* harmony import */ var _tokens_typography_major_third_typescale_base_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens/typography/major-third/typescale-base.json */ "./src/tokens/typography/major-third/typescale-base.json");
/* harmony import */ var _tokens_typography_major_third_typescale_compact_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens/typography/major-third/typescale-compact.json */ "./src/tokens/typography/major-third/typescale-compact.json");
/* harmony import */ var _tokens_typography_major_third_typescale_large_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens/typography/major-third/typescale-large.json */ "./src/tokens/typography/major-third/typescale-large.json");
/* harmony import */ var _tokens_typography_minor_third_typescale_base_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens/typography/minor-third/typescale-base.json */ "./src/tokens/typography/minor-third/typescale-base.json");
/* harmony import */ var _tokens_typography_minor_third_typescale_compact_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokens/typography/minor-third/typescale-compact.json */ "./src/tokens/typography/minor-third/typescale-compact.json");
/* harmony import */ var _tokens_typography_minor_third_typescale_large_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tokens/typography/minor-third/typescale-large.json */ "./src/tokens/typography/minor-third/typescale-large.json");
/* harmony import */ var _tokens_typography_major_second_typescale_base_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokens/typography/major-second/typescale-base.json */ "./src/tokens/typography/major-second/typescale-base.json");
/* harmony import */ var _tokens_typography_major_second_typescale_compact_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tokens/typography/major-second/typescale-compact.json */ "./src/tokens/typography/major-second/typescale-compact.json");
/* harmony import */ var _tokens_typography_major_second_typescale_large_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tokens/typography/major-second/typescale-large.json */ "./src/tokens/typography/major-second/typescale-large.json");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");












const base = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_base_json__WEBPACK_IMPORTED_MODULE_5__);
const compact = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_compact_json__WEBPACK_IMPORTED_MODULE_6__);
const large = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_large_json__WEBPACK_IMPORTED_MODULE_7__);
const styles = (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_styles_json__WEBPACK_IMPORTED_MODULE_0__);
const tokens = {
    majorThird: {
        base: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_third_typescale_base_json__WEBPACK_IMPORTED_MODULE_2__),
        compact: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_third_typescale_compact_json__WEBPACK_IMPORTED_MODULE_3__),
        large: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_third_typescale_large_json__WEBPACK_IMPORTED_MODULE_4__),
    },
    minorThird: {
        base: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_base_json__WEBPACK_IMPORTED_MODULE_5__),
        compact: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_compact_json__WEBPACK_IMPORTED_MODULE_6__),
        large: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_minor_third_typescale_large_json__WEBPACK_IMPORTED_MODULE_7__),
    },
    majorSecond: {
        base: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_second_typescale_base_json__WEBPACK_IMPORTED_MODULE_8__),
        compact: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_second_typescale_compact_json__WEBPACK_IMPORTED_MODULE_9__),
        large: (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_major_second_typescale_large_json__WEBPACK_IMPORTED_MODULE_10__),
    },
};
function getTypograohyTokens(size, scale = "minorThird") {
    let scaleTokens = tokens[scale][size];
    return Object.assign(Object.assign(Object.assign({}, (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_11__.flattenObject)(_tokens_typography_typeface_json__WEBPACK_IMPORTED_MODULE_1__)), scaleTokens), styles);
}
function getFontDetails() {
    let names = [];
    const tokens = _tokens_typography_typeface_json__WEBPACK_IMPORTED_MODULE_1__;
    const family = _tokens_typography_typeface_json__WEBPACK_IMPORTED_MODULE_1__["font-family"].primary.$value;
    for (let [name, fontWeight] of Object.entries(_tokens_typography_typeface_json__WEBPACK_IMPORTED_MODULE_1__["font-weight"])) {
        names.push({ family, style: fontWeight.$value });
    }
    return names;
}


/***/ }),

/***/ "./src/utils/clone.ts":
/*!****************************!*\
  !*** ./src/utils/clone.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _clone: () => (/* binding */ _clone)
/* harmony export */ });
function _clone(val) {
    const type = typeof val;
    if (val === null) {
        return null;
    }
    else if (type === 'undefined' || type === 'number' ||
        type === 'string' || type === 'boolean') {
        return val;
    }
    else if (type === 'object') {
        if (val instanceof Array) {
            return val.map(x => _clone(x));
        }
        else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
        }
        else {
            let o = {};
            for (const key in val) {
                o[key] = _clone(val[key]);
            }
            return o;
        }
    }
    throw 'unknown';
}


/***/ }),

/***/ "./src/utils/delay-async.ts":
/*!**********************************!*\
  !*** ./src/utils/delay-async.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delayAsync: () => (/* binding */ delayAsync)
/* harmony export */ });
function delayAsync(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


/***/ }),

/***/ "./src/utils/export-style-templates.ts":
/*!*********************************************!*\
  !*** ./src/utils/export-style-templates.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportStyleTemplates: () => (/* binding */ exportStyleTemplates)
/* harmony export */ });
/* harmony import */ var _delay_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delay-async */ "./src/utils/delay-async.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let totalLayersCount = 0;
let reboundLayersCount = 0;
let skippedLayersCount = 0;
let missingLayersCount = 0;
function exportStyleTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        totalLayersCount = 0;
        reboundLayersCount = 0;
        skippedLayersCount = 0;
        let _nodes = [];
        figma.skipInvisibleInstanceChildren = false;
        if (figma.currentPage.selection.length == 0) {
            figma.notify("Select at least one layer and try again");
            return false;
        }
        figma.currentPage.selection.forEach((node) => {
            if ('findAllWithCriteria' in node) {
                const componentNodes = node.findAllWithCriteria({ types: ["COMPONENT"] });
                _nodes = _nodes.concat(componentNodes);
            }
        });
        const containerFrame = createFrameNode();
        containerFrame.fills = [
            figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", figma.variables.getLocalVariables().find(n => n.name == 'fill/base/300'))
        ];
        containerFrame.layoutMode = 'VERTICAL';
        containerFrame.layoutSizingHorizontal = 'HUG';
        containerFrame.layoutSizingVertical = 'HUG';
        containerFrame.paddingBottom = 80;
        containerFrame.paddingLeft = 96;
        containerFrame.paddingRight = 96;
        containerFrame.paddingTop = 0;
        containerFrame.setBoundVariable('topLeftRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl2').id);
        containerFrame.setBoundVariable('topRightRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl2').id);
        containerFrame.setBoundVariable('bottomLeftRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl2').id);
        containerFrame.setBoundVariable('bottomRightRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl2').id);
        console.log(_nodes);
        const total = _nodes.length;
        totalLayersCount = total;
        while (_nodes.length) {
            const componentNode = _nodes.shift();
            // (70 - 44) / 70
            const percent = Math.round(((total - _nodes.length) / total) * 100);
            const msg = `${percent}% done. Working on layer ${total - _nodes.length} out of ${total}`;
            console.log(msg);
            containerFrame.appendChild(checkNode(componentNode));
            yield (0,_delay_async__WEBPACK_IMPORTED_MODULE_0__.delayAsync)(10);
        }
        figma.currentPage.selection = [containerFrame];
        return total;
    });
}
function checkNode(node) {
    let parent;
    if (node.parent.type == 'COMPONENT_SET') {
        parent = getFrame(node.parent);
    }
    const frame = processComponentNode(node);
    if (parent) {
        parent.appendChild(frame);
        frame.x = node.x;
        frame.y = node.y;
        return parent;
    }
    return frame;
}
function processComponentNode(node) {
    const instance = node.createInstance();
    const frame = instance.detachInstance();
    frame.name = node.name;
    const instances = frame.findAllWithCriteria({ types: ['INSTANCE'] });
    instances.forEach(i => {
        i.mainComponent.name;
    });
    return frame;
}
const componentSetFramesCache = new Map();
function getFrame(cmpSet) {
    const chachedFrame = componentSetFramesCache.get(cmpSet.name);
    if (chachedFrame) {
        return chachedFrame;
    }
    const frame = createFrameNode();
    frame.name = cmpSet.name;
    frame.resize(cmpSet.width, cmpSet.height);
    componentSetFramesCache.set(cmpSet.name, frame);
    figma.currentPage.selection = [frame];
    return frame;
}
function createFrameNode() {
    const frame = figma.createFrame();
    frame.fills = [
        figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", figma.variables.getLocalVariables().find(n => n.name == 'card/bg/primary'))
    ];
    frame.strokes = [
        figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", figma.variables.getLocalVariables().find(n => n.name == 'card/border/outer'))
    ];
    frame.setBoundVariable('topLeftRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl').id);
    frame.setBoundVariable('topRightRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl').id);
    frame.setBoundVariable('bottomLeftRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl').id);
    frame.setBoundVariable('bottomRightRadius', figma.variables.getLocalVariables().find(n => n.name == 'radii/xl').id);
    frame.x = -10000;
    frame.y = -10000;
    return frame;
}


/***/ }),

/***/ "./src/utils/figma-colors.ts":
/*!***********************************!*\
  !*** ./src/utils/figma-colors.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertFigmaColorToRgb: () => (/* binding */ convertFigmaColorToRgb),
/* harmony export */   parseColorToken: () => (/* binding */ parseColorToken),
/* harmony export */   parseColorValue: () => (/* binding */ parseColorValue)
/* harmony export */ });
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chroma-js */ "./node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _token_references__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token-references */ "./src/utils/token-references.ts");


const hexColorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
function convertFigmaColorToRgb(input, format) {
    const { r, g, b, a } = input;
    //figma uses float 0...1 vs standard 0...255
    const figmaColorTransformed = {
        r: input.r * 255,
        g: input.g * 255,
        b: input.b * 255,
        a: input.a
    };
    let color = chroma_js__WEBPACK_IMPORTED_MODULE_0___default().gl(r, g, b, a);
    debugger;
    switch (format) {
        case 'hex': {
            return color.hex();
        }
        case 'hsl': {
            return color.css('hsl');
        }
        default: {
            return color.css();
        }
    }
}
function parseColorValue(input, adjustments) {
    let color;
    try {
        if (input.startsWith('rgb')) {
            const rgbValues = input.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
            if (hexColorRegex.test(rgbValues[0])) {
                color = chroma_js__WEBPACK_IMPORTED_MODULE_0___default()(rgbValues[0]); // hexToFigmaRGB(rgbValues[0]);
                const alpha = parseFloat(rgbValues[1]);
                color = color.alpha(alpha);
            }
            else {
                color = chroma_js__WEBPACK_IMPORTED_MODULE_0___default()(input);
            }
        }
        else {
            color = chroma_js__WEBPACK_IMPORTED_MODULE_0___default()(input);
        }
    }
    catch (e) {
        console.error(e);
        debugger;
        return null;
    }
    if (adjustments) {
        if (adjustments.h) {
            color = color.set('hsl.h', `${adjustments.h}`);
        }
        if (adjustments.s) {
            color = color.set('hsl.s', `${adjustments.s}`);
        }
        if (adjustments.l) {
            color = color.set('hsl.l', `${adjustments.l}`);
        }
        if (adjustments.a) {
            color = color.set('hsl.a', `${adjustments.a}`);
        }
    }
    const [r, g, b, a] = color.gl();
    return {
        gl: { r, g, b, a },
        rgb: color.css(),
        hsl: color.css('hsl'),
        hex: color.hex()
    };
}
function parseColorToken(token, dictionary, output = 'gl') {
    let color = token.$value;
    color = (0,_token_references__WEBPACK_IMPORTED_MODULE_1__.parseReferenceGlobal)(color.trim(), dictionary);
    const result = parseColorValue(color, token.adjustments);
    if (result) {
        return result[output];
    }
    else {
        debugger;
        throw new Error("Invalid color format");
    }
}


/***/ }),

/***/ "./src/utils/figma-effect-styles.ts":
/*!******************************************!*\
  !*** ./src/utils/figma-effect-styles.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   importEffectStyles: () => (/* binding */ importEffectStyles)
/* harmony export */ });
/* harmony import */ var _token_references__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token-references */ "./src/utils/token-references.ts");

/*
    This method reads shadow color values directly from Figma Variables
*/
function importEffectStyles(tokens) {
    Object.entries(tokens).forEach(([name, tokenData]) => {
        let token = tokenData;
        if (token.$type == 'boxShadow') {
            let figmaStyle = getStyleByName(name) || figma.createEffectStyle();
            const values = token.$value;
            const effects = values.map(value => {
                const figmaVariable = (0,_token_references__WEBPACK_IMPORTED_MODULE_0__.findVariableByReferences)(value.color);
                const collectionID = figmaVariable.variableCollectionId;
                const collection = figma.variables.getVariableCollectionById(collectionID);
                const defaultMode = collection.modes[0].modeId;
                const figmaEffect = Object.assign({}, value, {
                    color: figmaVariable.valuesByMode[defaultMode]
                });
                const effect = convertEffectStyleToFigma(figmaEffect);
                const effectVar = figma.variables.setBoundVariableForEffect(effect, 'color', figmaVariable);
                effectVar.spread = effect.spread;
                return effectVar;
            });
            figmaStyle.name = name;
            figmaStyle.effects = effects;
            figmaStyle.description = token.description || figmaStyle.description;
            // figmaStyle.documentationLinks = token.documentationLink ? [token.documentationLink] : figmaStyle.documentationLinks;
        }
    });
}
function getLocalStyles() {
    return figma.getLocalEffectStyles();
}
;
function getStyleByName(name) {
    const stylesByType = getLocalStyles();
    const match = stylesByType.find((style) => style.name === name);
    if (match) {
        return match;
    }
    else {
        return null;
    }
}
;
function parseBoolean(val) {
    return val !== "false";
}
function convertEffectStyleToFigma(value) {
    return {
        type: "DROP_SHADOW",
        color: value.color,
        offset: {
            x: parseFloat(value.x),
            y: parseFloat(value.y)
        },
        radius: parseFloat(value.blur),
        spread: parseFloat(value.spread),
        visible: true,
        blendMode: "NORMAL",
        showShadowBehindNode: parseBoolean(value.showShadowBehindNode)
    };
}


/***/ }),

/***/ "./src/utils/figma-text-styles.ts":
/*!****************************************!*\
  !*** ./src/utils/figma-text-styles.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertTextStyleToFigma: () => (/* binding */ convertTextStyleToFigma),
/* harmony export */   importTextStyles: () => (/* binding */ importTextStyles)
/* harmony export */ });
/* harmony import */ var _token_references__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token-references */ "./src/utils/token-references.ts");

function importTextStyles(tokens) {
    Object.entries(tokens).forEach(([name, token]) => {
        if (token.$type == 'typography') {
            let textStyle = getStyleByName(name) || figma.createTextStyle();
            const resolved = parseValues(token.$value, tokens);
            const normalized = convertTextStyleToFigma(name, resolved);
            Object.keys(normalized).forEach(key => {
                textStyle[key] = normalized[key];
            });
        }
    });
}
function parseValues(value, dictionary) {
    let output = {};
    Object.entries(value).forEach(([key, value]) => {
        const resolvedValue = (0,_token_references__WEBPACK_IMPORTED_MODULE_0__.parseReferenceGlobal)(value, dictionary);
        output[key] = resolvedValue;
    });
    return output;
}
function getLocalStyles() {
    return figma.getLocalTextStyles();
}
;
function getStyleByName(name) {
    const stylesByType = getLocalStyles();
    const match = stylesByType.find((style) => style.name === name);
    if (match) {
        return match;
    }
    else {
        return null;
    }
}
;
function convertTextCaseToFigma(value) {
    switch (value.toLowerCase()) {
        case 'uppercase':
        case 'upper':
            return 'UPPER';
        case 'lowercase':
        case 'lower':
            return 'LOWER';
        case 'capitalize':
        case 'title':
            return 'TITLE';
        case 'small-caps':
        case 'small_caps':
            return 'SMALL_CAPS';
        case 'all-small-caps':
        case 'small_caps_forced':
            return 'SMALL_CAPS_FORCED';
        default:
            return 'ORIGINAL';
    }
}
function convertTextDecorationToFigma(value) {
    switch (value.toLowerCase()) {
        case 'underline':
            return 'UNDERLINE';
        case 'line-through':
        case 'strikethrough':
            return 'STRIKETHROUGH';
        default:
            return 'NONE';
    }
}
function convertTextStyleToFigma(name, values) {
    let textStyle = {
        'name': name,
        'fontSize': parseFloat(values.fontSize),
        'textDecoration': convertTextDecorationToFigma(values.textDecoration),
        'fontName': {
            family: values.fontFamily,
            style: values.fontWeight
        },
        'letterSpacing': {
            unit: values.letterSpacing.includes('%') ? "PERCENT" : "PIXELS",
            value: parseInt(values.letterSpacing)
        },
        'lineHeight': {
            unit: values.lineHeight.includes('%') ? "PERCENT" : "PIXELS",
            value: parseFloat(values.lineHeight)
        },
        leadingTrim: "NONE",
        paragraphIndent: 0,
        'paragraphSpacing': parseInt(values.paragraphSpacing),
        listSpacing: 0,
        hangingPunctuation: false,
        hangingList: false,
        'textCase': convertTextCaseToFigma(values.textCase)
    };
    return textStyle;
}


/***/ }),

/***/ "./src/utils/figma-variables.ts":
/*!**************************************!*\
  !*** ./src/utils/figma-variables.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findFigmaVariableByName: () => (/* binding */ findFigmaVariableByName),
/* harmony export */   getFigmaCollection: () => (/* binding */ getFigmaCollection),
/* harmony export */   resolveVariableType: () => (/* binding */ resolveVariableType),
/* harmony export */   setFigmaVariable: () => (/* binding */ setFigmaVariable)
/* harmony export */ });
function findVariableInCollection(variableName, collectionName) {
    const figmaCollections = figma.variables.getLocalVariableCollections();
    const collection = figmaCollections.find(collection => collection.name === collectionName);
    let figmaVirable;
    if (collection) {
        collection.variableIds.forEach(id => {
            const figmaVariableInColleciton = figma.variables.getVariableById(id);
            const match = figmaVariableInColleciton.name === variableName;
            if (match) {
                figmaVirable = figmaVariableInColleciton;
                return true;
            }
            return false;
        });
    }
    return figmaVirable;
}
function findFigmaVariableByName(variableName, collectionName) {
    if (collectionName) {
        return findVariableInCollection(variableName, collectionName);
    }
    else {
        const figmaVariables = figma.variables.getLocalVariables();
        return figmaVariables.find(variable => variable.name === variableName);
    }
}
function getFigmaCollection(name) {
    const figmaCollections = figma.variables.getLocalVariableCollections();
    let isNew = false;
    let collection = figmaCollections.find(collection => collection.name === name);
    if (!collection) {
        isNew = true;
        collection = figma.variables.createVariableCollection(name);
    }
    return { collection, isNew };
}
function resolveVariableType(typeName) {
    switch (typeName) {
        case 'color': return 'COLOR';
        case 'boolean': return 'BOOLEAN';
        case 'number': return 'FLOAT';
        default: return 'STRING';
    }
}
function setFigmaVariable(collection, modeId, type, variableName, value = null, scopes = ['ALL_SCOPES'], description = null) {
    let figmaVariable = findFigmaVariableByName(variableName, collection.name);
    if (!figmaVariable) {
        try {
            figmaVariable = figma.variables.createVariable(variableName, collection.id, type);
        }
        catch (e) {
            debugger;
        }
    }
    if (type != figmaVariable.resolvedType) {
        debugger;
    }
    if (value) {
        figmaVariable.setValueForMode(modeId, value);
    }
    figmaVariable.scopes = scopes;
    if (description != null) {
        figmaVariable.description = description;
    }
    return figmaVariable;
}


/***/ }),

/***/ "./src/utils/flatten-object.ts":
/*!*************************************!*\
  !*** ./src/utils/flatten-object.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject)
/* harmony export */ });
function flattenObject(data) {
    const tokens = {};
    Object.entries(data).forEach(([key, object]) => {
        traverseToken({
            key,
            object,
            tokens,
        });
    });
    return tokens;
}
function traverseToken({ key, object, tokens, }) {
    if (!object)
        debugger;
    // if key is a meta field, move on
    if (key.charAt(0) === "$") {
        return;
    }
    if (object.$value !== undefined) {
        tokens[key] = Object.assign({}, object);
    }
    else {
        Object.entries(object).forEach(([key2, object2]) => {
            if (key2.charAt(0) !== "$") {
                traverseToken({
                    key: `${key}/${key2}`,
                    object: object2,
                    tokens
                });
            }
        });
    }
}


/***/ }),

/***/ "./src/utils/import-style-templates.ts":
/*!*********************************************!*\
  !*** ./src/utils/import-style-templates.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   importStyleTemplates: () => (/* binding */ importStyleTemplates)
/* harmony export */ });
/* harmony import */ var _delay_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delay-async */ "./src/utils/delay-async.ts");
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone */ "./src/utils/clone.ts");
/* harmony import */ var _swap_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./swap-variables */ "./src/utils/swap-variables.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let totalLayersCount = 0;
let reboundLayersCount = 0;
let skippedLayersCount = 0;
let missingLayersCount = 0;
//cache all component sets to speed up the process
let componentSets;
function getComponentSets() {
    if (!componentSets) {
        console.log(`First time look up, running slow...`);
        figma.skipInvisibleInstanceChildren = true;
        componentSets = figma.currentPage.findAllWithCriteria({
            types: ['COMPONENT', 'COMPONENT_SET']
        });
    }
    return componentSets;
}
function findComponent(cmpName) {
    let masterComponent = getComponentSets().find(item => item.name === cmpName);
    return masterComponent || null;
}
function importStyleTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        totalLayersCount = 0;
        reboundLayersCount = 0;
        skippedLayersCount = 0;
        let _nodes = [];
        if (figma.currentPage.selection.length == 0) {
            figma.notify("Select at least one layer and try again");
            return false;
        }
        figma.currentPage.selection.forEach((node) => {
            if ('children' in node) {
                _nodes = _nodes.concat(node.children);
            }
        });
        console.log(_nodes);
        let matches = [];
        _nodes.forEach(node => {
            if (node.type != 'FRAME') {
                return; // skip everyting that is not a regular frame
            }
            const componentNode = findComponent(node.name);
            if (componentNode) {
                matches.push({
                    source: node,
                    target: componentNode
                });
            }
        });
        const total = matches.length;
        totalLayersCount = total;
        while (matches.length) {
            const matchData = matches.shift();
            const percent = Math.round(((total - matches.length) / total) * 100);
            const msg = `${percent}% done. Working on layer ${total - matches.length} out of ${total}`;
            console.log(msg);
            if (matchData.target.type == 'COMPONENT_SET') {
                matchData.source.children.forEach((sourceFrame) => __awaiter(this, void 0, void 0, function* () {
                    const target = matchData.target.findChild(n => n.name === sourceFrame.name);
                    if ((target === null || target === void 0 ? void 0 : target.type) == 'COMPONENT' && sourceFrame.type == 'FRAME') {
                        yield processNode(sourceFrame, target);
                    }
                }));
            }
            else {
                yield processNode(matchData.source, matchData.target);
            }
        }
        return total;
    });
}
function processNode(sourceFrame, targetComponent) {
    return __awaiter(this, void 0, void 0, function* () {
        let targetFrames = [];
        copyStyles(sourceFrame, targetComponent);
        bindVairables(sourceFrame, targetComponent);
        figma.skipInvisibleInstanceChildren = true;
        const instances = sourceFrame.findAllWithCriteria({ types: ['INSTANCE'] });
        instances.forEach(instanceNode => {
            let targetNode = targetComponent.findOne(n => n.name === instanceNode.name);
            if (targetNode) {
                copyOverrides(instanceNode, targetNode, targetComponent);
            }
        });
        sourceFrame.children.forEach((sourceNode, index) => {
            let targetNode = targetComponent.findOne(n => n.name === sourceNode.name);
            if (!targetNode) {
                debugger;
                // copy a component and insert it into the same position as it is in sourceFrame
                const clone = sourceNode.clone();
                targetComponent.insertChild(index, clone);
                return;
            }
            resizeAndReposition(sourceNode, targetNode);
            if (sourceNode.type == 'FRAME' && targetNode.type == 'FRAME' ||
                sourceNode.type == 'INSTANCE' && targetNode.type == 'INSTANCE' ||
                sourceNode.type == 'BOOLEAN_OPERATION' && targetNode.type == 'BOOLEAN_OPERATION') {
                targetFrames.push({ sourceNode, targetNode });
            }
        });
        targetFrames.forEach(data => {
            data.targetNode.fills = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.fills);
            data.targetNode.effects = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.effects);
            data.targetNode.strokes = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokes);
            data.targetNode.opacity = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.opacity);
            data.targetNode.visible = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.visible);
            data.targetNode.isMask = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.isMask);
            data.targetNode.strokeAlign = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeAlign);
            data.targetNode.strokeAlign = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeAlign);
            data.targetNode.strokeCap = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeCap);
            data.targetNode.strokeJoin = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeJoin);
            data.targetNode.strokeMiterLimit = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeMiterLimit);
            data.targetNode.strokeStyleId = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeStyleId);
            data.targetNode.strokeWeight = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeWeight);
            if (data.sourceNode.type == 'FRAME' && data.targetNode.type == 'FRAME') {
                data.targetNode.constraints = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.constraints);
                data.targetNode.layoutGrids = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.layoutGrids);
                data.targetNode.strokeBottomWeight = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeBottomWeight);
                data.targetNode.strokeLeftWeight = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeLeftWeight);
                data.targetNode.strokeRightWeight = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeRightWeight);
                data.targetNode.strokeTopWeight = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(data.sourceNode.strokeTopWeight);
            }
            copyStyles(data.sourceNode, data.targetNode);
            bindVairables(data.sourceNode, data.targetNode);
        });
        yield (0,_delay_async__WEBPACK_IMPORTED_MODULE_0__.delayAsync)(10);
    });
}
function bindVairables(sourceFrame, targetComponent) {
    const boundVairables = Object.entries(sourceFrame.boundVariables);
    boundVairables.forEach(([propName, varBinding]) => {
        bindVariable(sourceFrame, targetComponent, propName, varBinding);
    });
}
function resizeAndReposition(sourceNode, targetNode) {
    if (targetNode == null) {
        return;
    }
    if (sourceNode.type == 'BOOLEAN_OPERATION') {
        sourceNode.children.forEach(source => {
            if ('findOne' in targetNode) {
                const target = targetNode.findOne(n => n.name === source.name);
                resizeAndReposition(source, target);
            }
        });
    }
    else {
        targetNode.x = sourceNode.x;
        targetNode.y = sourceNode.y;
        if ('resize' in targetNode) {
            targetNode.resize(sourceNode.width, sourceNode.height);
        }
    }
}
function copyOverrides(sourceNode, targetNode, targetComponent) {
    if (targetNode.type == 'INSTANCE') {
        // SWAP INSTANCES ---------------------
        const doSwap = sourceNode.mainComponent.id !== targetNode.mainComponent.id;
        if (doSwap) {
            targetNode.swapComponent(sourceNode.mainComponent);
        }
        // COPY COMPONENT PROPS ----------------
        const sourceComponentProps = sourceNode.componentProperties;
        const propsCopy = {};
        Object.keys(sourceComponentProps).forEach(key => {
            propsCopy[key] = sourceComponentProps[key].value;
        });
        targetNode.setProperties(propsCopy);
    }
    sourceNode.overrides.forEach(prop => {
        const type = targetNode.type;
        if (type != 'FRAME' &&
            type != 'BOOLEAN_OPERATION' &&
            type != 'COMPONENT_SET' &&
            type != 'COMPONENT' &&
            type != 'INSTANCE' &&
            type != 'GROUP' &&
            type != 'SECTION') {
            return;
        }
        const source = figma.getNodeById(prop.id);
        const fields = prop.overriddenFields;
        const target = prop.id == targetNode.id ? targetNode : targetNode.findOne(n => n.name === source.name);
        if (target != null) {
            fields.forEach(field => {
                let propName = field;
                if (field == 'stokeTopWeight') {
                    propName = 'strokeTopWeight';
                }
                if (field == 'componentProperties' && source.type == 'INSTANCE' && target.type == 'INSTANCE') {
                    // COPY COMPONENT PROPS ----------------
                    const sourceComponentProps = source.componentProperties;
                    const propsCopy = {};
                    Object.keys(sourceComponentProps).forEach(key => {
                        propsCopy[key] = sourceComponentProps[key].value;
                    });
                    target.setProperties(propsCopy);
                }
                else if (propName != 'componentPropertyDefinitions' &&
                    propName != 'height' &&
                    propName != 'overlayBackground' &&
                    propName != 'overlayBackgroundInteraction' &&
                    propName != 'overlayPositionType' &&
                    propName != 'parent' &&
                    propName != 'type' &&
                    propName != 'width' &&
                    propName != 'boundVariables') {
                    console.log(`applying ${propName}:${source[propName]} to ${source.name}`);
                    target[propName] = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(source[propName]);
                }
            });
            bindVairables(source, target);
        }
    });
}
function copyStyles(sourceFrame, targetComponent) {
    if ('effectStyleId' in sourceFrame && 'effectStyleId' in targetComponent) {
        targetComponent.effectStyleId = sourceFrame.effectStyleId;
    }
    if ('gridStyleId' in sourceFrame && 'gridStyleId' in targetComponent) {
        targetComponent.gridStyleId = sourceFrame.gridStyleId;
    }
    if ('fillStyleId' in sourceFrame && 'fillStyleId' in targetComponent) {
        targetComponent.fillStyleId = sourceFrame.fillStyleId;
    }
    if ('strokeStyleId' in sourceFrame && 'strokeStyleId' in targetComponent) {
        targetComponent.strokeStyleId = sourceFrame.strokeStyleId;
    }
}
function bindVariable(sourceFrame, targetComponent, propName, variableBinding) {
    if (propName == 'fills' && 'fills' in sourceFrame && 'fills' in targetComponent && !targetComponent['fillStyleId']) {
        targetComponent.fills = (0,_swap_variables__WEBPACK_IMPORTED_MODULE_2__.bindPropertyVariables)(sourceFrame.fills, figma.variables.setBoundVariableForPaint);
    }
    else if (propName == 'strokes' && 'strokes' in sourceFrame && 'strokes' in targetComponent && !targetComponent['strokeStyleId']) {
        targetComponent.strokes = (0,_swap_variables__WEBPACK_IMPORTED_MODULE_2__.bindPropertyVariables)(sourceFrame.strokes, figma.variables.setBoundVariableForPaint);
    }
    else if (propName == 'effects' && 'effects' in sourceFrame && 'effects' in targetComponent && !targetComponent['effectStyleId']) {
        targetComponent.effects = (0,_swap_variables__WEBPACK_IMPORTED_MODULE_2__.bindPropertyVariables)(sourceFrame.effects, figma.variables.setBoundVariableForEffect);
    }
    else if (propName == 'layoutGrids' && 'layoutGrids' in sourceFrame && 'layoutGrids' in targetComponent) {
        targetComponent.layoutGrids = (0,_swap_variables__WEBPACK_IMPORTED_MODULE_2__.bindPropertyVariables)(sourceFrame.layoutGrids, figma.variables.setBoundVariableForLayoutGrid);
    }
    else if (propName == 'componentProperties' || propName == 'textRangeFills') {
        console.warn(`Swap does not work for ${propName}, skipping node`);
    }
    else {
        const variable = (0,_swap_variables__WEBPACK_IMPORTED_MODULE_2__.findVariableMatch)(variableBinding.id);
        if (variable) {
            targetComponent.setBoundVariable(propName, null);
            targetComponent.setBoundVariable(propName, variable.id);
        }
    }
    return targetComponent;
}


/***/ }),

/***/ "./src/utils/round-two-digits.ts":
/*!***************************************!*\
  !*** ./src/utils/round-two-digits.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   roundTwoDigits: () => (/* binding */ roundTwoDigits)
/* harmony export */ });
function roundTwoDigits(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}


/***/ }),

/***/ "./src/utils/sort-palette.ts":
/*!***********************************!*\
  !*** ./src/utils/sort-palette.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sortColorTokens: () => (/* binding */ sortColorTokens)
/* harmony export */ });
const paletteOrder = [
    'primary',
    'brand',
    'fill/base',
    'fill/contrast',
    'text/base/600',
    'text/base/500',
    'text/base/400',
    'text/base/action',
    'text/base/info',
    'text/base/success',
    'text/base/warning',
    'text/base/danger',
    'text/contrast/600',
    'text/contrast/500',
    'text/contrast/400',
    'text/contrast/action',
    'text/contrast/info',
    'text/contrast/success',
    'text/contrast/warning',
    'text/contrast/danger',
    'stroke/base',
    'stroke/contrast',
    'info',
    'success',
    'warning',
    'danger',
    'alt/base',
    'alt/contrast',
    'utility',
    'accent/red',
    'accent/amber',
    'accent/brown',
    'accent/green',
    'accent/teal',
    'accent/cyan',
    'accent/blue',
    'accent/indigo',
    'accent/violet',
    'accent/purple',
    'accent/pink',
    'ui-element/bg/rest',
    'ui-element/bg/hover',
    'ui-element/bg/active',
    'ui-element/bg/selected',
    'ui-element/bg/disabled',
    'ui-element/border/rest',
    'ui-element/border/hover',
    'ui-element/border/active',
    'ui-element/border/selected',
    'ui-element/border/disabled',
    'ui-element/text',
    'button/bg/rest',
    'button/bg/hover',
    'button/bg/active',
    'button/primary',
    'button/success',
    'button/danger',
    'button/border/rest',
    'button/border/hover',
    'button/border/active',
    'form-element/bg/rest',
    'form-element/bg/readonly',
    'form-element/bg/hover',
    'form-element/border/rest',
    'form-element/border/readonly',
    'form-element/border/hover',
    'card/bg/primary',
    'card/bg/secondary',
    'card/border/inner',
    'card/border/outer',
    'overlay/bg',
    'overlay/border',
];
function sortColorTokens(firstEl, secondEl) {
    var resultFirst = paletteOrder.findIndex(item => {
        return firstEl.name.startsWith(item);
    });
    var resultSecond = paletteOrder.findIndex(item => {
        return secondEl.name.startsWith(item);
    });
    if (resultFirst < resultSecond) {
        return -1; // firstEl goes first
    }
    if (resultFirst > resultSecond) {
        return 1; // secondEl goes first
    }
    if (resultFirst === resultSecond) {
        let name1 = firstEl.name;
        let name2 = secondEl.name;
        if (name1 < name2) {
            return 1; // firstEl goes first
        }
        if (name1 > name2) {
            return -1; // secondEl goes first
        }
        return 0;
    }
    return 0; // keep original order    
}


/***/ }),

/***/ "./src/utils/sort-sizes.ts":
/*!*********************************!*\
  !*** ./src/utils/sort-sizes.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sortSizeTokens: () => (/* binding */ sortSizeTokens)
/* harmony export */ });
const paletteOrder = [
    'none',
    'xs5',
    'xs5',
    'xs3',
    'xs2',
    'xs',
    'sm',
    'base',
    'md',
    'lg',
    'xl',
    'xl2',
    'xl3',
    'xl4',
    'xl5',
    'xl6',
    'xl7',
    'round'
];
function sortSizeTokens(firstEl, secondEl) {
    var resultFirst = paletteOrder.findIndex(item => {
        return firstEl.name.endsWith(item);
    });
    var resultSecond = paletteOrder.findIndex(item => {
        return secondEl.name.endsWith(item);
    });
    if (resultFirst < resultSecond) {
        return -1; // firstEl goes first
    }
    if (resultFirst > resultSecond) {
        return 1; // secondEl goes first
    }
    if (resultFirst === resultSecond) {
        let name1 = firstEl.name;
        let name2 = secondEl.name;
        if (name1 < name2) {
            return -1; // firstEl goes first
        }
        if (name1 > name2) {
            return 1; // secondEl goes first
        }
        return 0;
    }
    return 0; // keep original order    
}


/***/ }),

/***/ "./src/utils/swap-variables.ts":
/*!*************************************!*\
  !*** ./src/utils/swap-variables.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindPropertyVariables: () => (/* binding */ bindPropertyVariables),
/* harmony export */   findVariableMatch: () => (/* binding */ findVariableMatch),
/* harmony export */   swapVariables: () => (/* binding */ swapVariables)
/* harmony export */ });
/* harmony import */ var _delay_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delay-async */ "./src/utils/delay-async.ts");
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone */ "./src/utils/clone.ts");
/* harmony import */ var _figma_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./figma-variables */ "./src/utils/figma-variables.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let totalLayersCount = 0;
let reboundLayersCount = 0;
let skippedLayersCount = 0;
let missingLayersCount = 0;
function swapVariables() {
    return __awaiter(this, void 0, void 0, function* () {
        totalLayersCount = 0;
        reboundLayersCount = 0;
        skippedLayersCount = 0;
        let _nodes = [];
        figma.skipInvisibleInstanceChildren = false;
        if (figma.currentPage.selection.length == 0) {
            figma.notify("Select at least one layer and try again");
            return false;
        }
        figma.currentPage.selection.forEach((node) => {
            if ('boundVariables' in node && Object.keys(node.boundVariables).length > 0) {
                _nodes.push(node);
            }
            if ('findAll' in node) {
                const nodes = node.findAll((n) => {
                    if ('boundVariables' in n) {
                        return Object.keys(n.boundVariables).length > 0;
                    }
                    else {
                        return false;
                    }
                });
                _nodes = _nodes.concat(nodes);
            }
        });
        console.log(_nodes);
        const total = _nodes.length;
        totalLayersCount = total;
        while (_nodes.length) {
            const node = _nodes.shift();
            // (70 - 44) / 70
            const percent = Math.round(((total - _nodes.length) / total) * 100);
            const msg = `${percent}% done. Working on layer ${total - _nodes.length} out of ${total}`;
            console.log(msg);
            yield processLayer(node).catch(err => {
                throw (err);
            });
        }
        return total;
    });
}
function traverse(node) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Node: ${node.name}`);
        debugger;
        yield processLayer(node);
        if ("children" in node && node.children.length) {
            console.log(`Traversing "${node.name}" children`);
            for (const child of node.children) {
                yield traverse(child);
            }
        }
    });
}
function getVariableName(variable) {
    const name = variable.name;
    return name.replaceAll('sx', 'spacing').replaceAll('sy', 'spacing/minor');
}
function findVariableMatch(varId) {
    const variable = figma.variables.getVariableById(varId);
    if (!variable) {
        return null;
    }
    let collectionId = null;
    let collection = null;
    collectionId = variable.variableCollectionId;
    collection = figma.variables.getVariableCollectionById(collectionId);
    const name = getVariableName(variable);
    const targetVariable = (0,_figma_variables__WEBPACK_IMPORTED_MODULE_2__.findFigmaVariableByName)(name, collection.name);
    if (!targetVariable) {
        console.warn(`Cannot find ${collection.name} > ${variable.name}`);
        return null;
    }
    ;
    // if (targetVariable.id == variable.id) {
    //     console.warn(`${variable.name} is a local variable`);
    //     skippedLayersCount++;
    //     return null;
    // }
    return targetVariable;
}
function processLayer(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const boundVairables = Object.entries(node.boundVariables);
        boundVairables.forEach(([propName, boundVar]) => {
            bindVariable(node, propName, boundVar);
        });
        yield (0,_delay_async__WEBPACK_IMPORTED_MODULE_0__.delayAsync)(2);
    });
}
function bindPropertyVariables(props, figmaFn) {
    const propsCopy = (0,_clone__WEBPACK_IMPORTED_MODULE_1__._clone)(props).map(prop => {
        Object.keys(prop.boundVariables).forEach((field) => {
            const alias = prop.boundVariables[field];
            const variable = findVariableMatch(alias.id);
            const spread = prop['spread']; //workaround Figma bug. It resets spread after calling figma.variables.setBoundVariableForEffect
            if (variable) {
                // prop.boundVariables = {};
                prop = figmaFn(prop, field, null);
                prop = figmaFn(prop, field, variable);
            }
            if (typeof spread != 'undefined') {
                prop['spread'] = spread;
            }
        });
        return prop;
    });
    return propsCopy;
}
function bindEffectVariables(props, figmaFn) {
}
function bindVariable(node, propName, variableBinding) {
    if (node.type == 'TEXT') {
        const textStyle = figma.getStyleById(node.textStyleId);
        if (textStyle) {
            const localTextStyle = figma.getLocalTextStyles().find(style => style.name === textStyle.name);
            if (localTextStyle) {
                node.textStyleId = localTextStyle.id;
            }
        }
    }
    if (propName == 'fills' && 'fills' in node) {
        node.fills = bindPropertyVariables(node.fills, figma.variables.setBoundVariableForPaint);
    }
    else if (propName == 'strokes' && 'strokes' in node) {
        node.strokes = bindPropertyVariables(node.strokes, figma.variables.setBoundVariableForPaint);
    }
    else if (propName == 'effects' && 'effects' in node) {
        if (node.effectStyleId !== '') {
            const style = figma.getStyleById(node.effectStyleId);
            const styleName = style.name;
            const localStyle = figma.getLocalEffectStyles().find(style => {
                return style.name === styleName;
            });
            node.effects = [];
            node.effectStyleId = "";
            node.effectStyleId = localStyle ? localStyle.id : "";
            return node;
        }
        node.effects = bindPropertyVariables(node.effects, figma.variables.setBoundVariableForEffect);
    }
    else if (propName == 'layoutGrids' && 'layoutGrids' in node) {
        node.layoutGrids = bindPropertyVariables(node.layoutGrids, figma.variables.setBoundVariableForLayoutGrid);
    }
    else if (propName == 'componentProperties' || propName == 'textRangeFills') {
        console.warn(`Swap does not work for ${propName}, skipping node`);
    }
    else {
        const variable = findVariableMatch(variableBinding.id);
        if (variable) {
            node.setBoundVariable(propName, null);
            node.setBoundVariable(propName, variable.id);
        }
    }
    return node;
}


/***/ }),

/***/ "./src/utils/text-to-title-case.ts":
/*!*****************************************!*\
  !*** ./src/utils/text-to-title-case.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelToTitle: () => (/* binding */ camelToTitle),
/* harmony export */   toTitleCase: () => (/* binding */ toTitleCase)
/* harmony export */ });
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function camelToTitle(camelCase) {
    // no side-effects
    return camelCase
        // inject space before the upper case letters
        .replace(/([A-Z])/g, function (match) {
        return " " + match;
    })
        // replace first char with upper case
        .replace(/^./, function (match) {
        return match.toUpperCase();
    });
}


/***/ }),

/***/ "./src/utils/token-references.ts":
/*!***************************************!*\
  !*** ./src/utils/token-references.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findTokenReferences: () => (/* binding */ findTokenReferences),
/* harmony export */   findVariableByReferences: () => (/* binding */ findVariableByReferences),
/* harmony export */   getReferenceName: () => (/* binding */ getReferenceName),
/* harmony export */   parseReferenceGlobal: () => (/* binding */ parseReferenceGlobal)
/* harmony export */ });
/* harmony import */ var _figma_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figma-variables */ "./src/utils/figma-variables.ts");

const aliasRegex = /\{(.+?)(.+?)\}/g;
function findTokenReferences(tokenValue) {
    return tokenValue === null || tokenValue === void 0 ? void 0 : tokenValue.toString().match(aliasRegex);
}
;
function getReferenceName(reference) {
    let name = reference.replace(/{/g, "");
    name = name.replace(/}/g, "");
    return name;
}
function findVariableByReferences(value) {
    let references = findTokenReferences(value);
    let results = [];
    references === null || references === void 0 ? void 0 : references.forEach(reference => {
        let name = getReferenceName(reference);
        name = name.replace(/\./g, "/");
        const figmaVariable = (0,_figma_variables__WEBPACK_IMPORTED_MODULE_0__.findFigmaVariableByName)(name);
        if (figmaVariable) {
            results.push(figmaVariable);
        }
        else {
            console.warn(`findVariableByReferences() call failed -> cannot find value for ${reference}`);
        }
    });
    return results[0];
}
function findGlobalTokenByName(name, dictionary) {
    name = name.replace(/\./g, "/");
    const token = dictionary[name];
    if (!token)
        debugger;
    return token;
}
function parseReferenceGlobal(value, dictionary) {
    let references = findTokenReferences(value);
    let result = value;
    references === null || references === void 0 ? void 0 : references.forEach(reference => {
        let name = getReferenceName(reference);
        const globalToken = findGlobalTokenByName(name, dictionary);
        if (globalToken) {
            result = result.replace(reference, globalToken.$value);
        }
        else {
            debugger;
            console.warn(`parseReferenceGlobal() call failed -> cannot find reference for ${value}`);
        }
    });
    const check = findTokenReferences(result);
    if (check != null) {
        return parseReferenceGlobal(result, dictionary);
    }
    else {
        return result;
    }
}


/***/ }),

/***/ "./src/utils/update-elevation-components.ts":
/*!**************************************************!*\
  !*** ./src/utils/update-elevation-components.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateElevationComponents: () => (/* binding */ updateElevationComponents)
/* harmony export */ });
function updateElevationComponents(tokens) {
    figma.skipInvisibleInstanceChildren = true;
    const pageComponents = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT'] });
    const elevationComponents = pageComponents.filter(node => {
        const name = node.name.toLocaleLowerCase();
        return name.startsWith('shadow');
    });
    if (elevationComponents.length == 0) {
        return console.warn('No elevation components has been found');
    }
    Object.keys(tokens).forEach(name => {
        const variants = tokens[name];
        const [shade, token] = Object.entries(variants)[0];
        const settings = token['$value'];
        const elevationComponent = elevationComponents.find(node => {
            const nameNormalized = name.toLocaleLowerCase().replace(/-/g, " ");
            const nodeNameNormalized = node.name.toLocaleLowerCase().replace(/-/g, " ");
            console.log(nameNormalized, nodeNameNormalized);
            return nodeNameNormalized.indexOf(nameNormalized) > -1;
        });
        processComponent(settings, elevationComponent);
    });
}
function clone(val) {
    const type = typeof val;
    if (val === null) {
        return null;
    }
    else if (type === 'undefined' || type === 'number' ||
        type === 'string' || type === 'boolean') {
        return val;
    }
    else if (type === 'object') {
        if (val instanceof Array) {
            return val.map(x => clone(x));
        }
        else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
        }
        else {
            let o = {};
            for (const key in val) {
                o[key] = clone(val[key]);
            }
            return o;
        }
    }
    throw 'unknown';
}
function processComponent(effects, component) {
    if (!component) {
        throw ('Elevation component was not found');
    }
    const shadowLayers = component.findChildren(node => {
        const name = node.name.toLocaleLowerCase();
        return name.startsWith('shadow');
    });
    const maskLayer = component.findChild(node => {
        return node.name.toLocaleLowerCase() === 'mask';
    });
    maskLayer.visible = false;
    debugger;
    effects.forEach((shadowSettings, index) => {
        const shadowLayer = shadowLayers[index];
        const x = parseFloat(shadowSettings.x);
        const y = parseFloat(shadowSettings.y);
        const radius = parseFloat(shadowSettings.blur);
        const spread = parseFloat(shadowSettings.spread);
        const width = component.width + (2 * spread);
        const height = component.height + (2 * spread);
        const left = x - spread;
        const top = y - spread;
        const blur = {
            type: "LAYER_BLUR",
            radius: radius,
            visible: true
        };
        shadowLayer.effects = [blur];
        shadowLayer.resize(width, height);
        shadowLayer.x = left;
        shadowLayer.y = top;
    });
    const absoluteBoundingBox = component.absoluteBoundingBox;
    const absoluteRenderBounds = component.absoluteRenderBounds;
    const maskWidth = absoluteRenderBounds.width;
    const maskHeight = absoluteRenderBounds.height;
    const maskLeft = (absoluteRenderBounds.x - absoluteBoundingBox.x);
    const maskTop = (absoluteRenderBounds.y - absoluteBoundingBox.y);
    const innerLayer = maskLayer.findChild(node => node.name === 'inner');
    const outerLayer = maskLayer.findChild(node => node.name === 'outer');
    outerLayer.resize(maskWidth, maskHeight);
    outerLayer.x = maskLeft;
    outerLayer.y = maskTop;
    innerLayer.resize(component.width, component.height);
    innerLayer.x = 0;
    innerLayer.y = 0;
    maskLayer.visible = true;
}


/***/ }),

/***/ "./src/utils/variables-to-styles.ts":
/*!******************************************!*\
  !*** ./src/utils/variables-to-styles.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindVariablesAndStyles: () => (/* binding */ bindVariablesAndStyles)
/* harmony export */ });
console.clear();
const styles = figma.getLocalPaintStyles();
const variables = figma.variables.getLocalVariables();
let count = 0;
function getStyleByName(name) {
    return styles.find((style) => style.name === name);
}
;
function getFigmaColor() {
    return {
        type: "SOLID",
        visible: true,
        blendMode: "NORMAL",
        color: {
            r: 1,
            g: 1,
            b: 1
        },
        opacity: 1
    };
}
;
function bindVariablesAndStyles() {
    count = 0;
    variables.forEach(variable => {
        const name = variable.name;
        let style = getStyleByName(name);
        if (variable.resolvedType !== 'COLOR') {
            return;
        }
        if (!style) {
            count++;
            style = figma.createPaintStyle();
            style.name = name;
            style.paints = [
                getFigmaColor()
            ];
        }
        let newPaints = style.paints.map((paint) => {
            return figma.variables.setBoundVariableForPaint(paint, 'color', variable);
        });
        style.paints = newPaints;
    });
    figma.notify(`✅ Variables and styles are now connected. ${count} styles created`);
}


/***/ }),

/***/ "./node_modules/chroma-js/chroma.js":
/*!******************************************!*\
  !*** ./node_modules/chroma-js/chroma.js ***!
  \******************************************/
/***/ (function(module) {

/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
     true ? module.exports = factory() :
    0;
})(this, (function () { 'use strict';

    var limit$2 = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var limit$1 = limit$2;

    var clip_rgb$3 = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit$1(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit$1(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i$1 = 0, list$1 = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i$1 < list$1.length; i$1 += 1) {
        var name = list$1[i$1];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var type$o = type$p;

    var unpack$B = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type$o(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var type$n = type$p;

    var last$4 = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type$n(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI$2 = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb$3,
    	limit: limit$2,
    	type: type$p,
    	unpack: unpack$B,
    	last: last$4,
    	PI: PI$2,
    	TWOPI: PI$2*2,
    	PITHIRD: PI$2/3,
    	DEG2RAD: PI$2 / 180,
    	RAD2DEG: 180 / PI$2
    };

    var input$h = {
    	format: {},
    	autodetect: []
    };

    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;

    var Color$D = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$m(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$3(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function (a,b) { return b.p - a.p; });
                _input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = _input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$2(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color$D.prototype.toString = function toString () {
        if (type$m(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color$D;

    var chroma$k = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma$k.Color, [ null ].concat( args) ));
    };

    chroma$k.Color = Color_1;
    chroma$k.version = '2.4.2';

    var chroma_1 = chroma$k;

    var unpack$A = utils.unpack;
    var max$2 = Math.max;

    var rgb2cmyk$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$A(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r,max$2(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk$1;

    var unpack$z = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$z(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;

    var rgb2cmyk = rgb2cmyk_1;

    Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
    };

    chroma$j.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$C, [ null ].concat( args, ['cmyk']) ));
    };

    input$g.format.cmyk = cmyk2rgb_1;

    input$g.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$y(args, 'cmyk');
            if (type$l(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$x(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css$1;

    var unpack$w = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl$3 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$w(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl$3;

    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$v(args, 'rgba');
        var mode = last$1(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css(rgb2hsl$2(rgba), mode);
        }
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css$1;

    var unpack$u = utils.unpack;
    var round$5 = Math.round;

    var hsl2rgb$1 = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$u(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$5(c[0]*255),round$5(c[1]*255),round$5(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb$1;

    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$4 = Math.round;

    var css2rgb$1 = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input$f.format.named) {
            try {
                return input$f.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb$1.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb$1;

    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;

    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;

    Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };

    chroma$i.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$B, [ null ].concat( args, ['css']) ));
    };

    input$e.format.css = css2rgb;

    input$e.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$k(h) === 'string' && css2rgb.test(h)) {
                return 'css';
            }
        }
    });

    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;

    input$d.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$t(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma$h.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$A, [ null ].concat( args, ['gl']) ));
    };

    Color$A.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$s = utils.unpack;

    var rgb2hcg$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$s(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg$1;

    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$r(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor$3(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;

    var rgb2hcg = rgb2hcg_1;

    Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
    };

    chroma$g.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$z, [ null ].concat( args, ['hcg']) ));
    };

    input$c.format.hcg = hcg2rgb_1;

    input$c.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$q(args, 'hcg');
            if (type$j(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;

    var rgb2hex$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$p(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex$2;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb$1 = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb$1;

    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;

    var rgb2hex$1 = rgb2hex_1;

    Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
    };

    chroma$f.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$y, [ null ].concat( args, ['hex']) ));
    };

    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$i(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt$4((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI$2 - h;
            }
            h /= TWOPI$2;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi$1;

    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$n(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos$4(TWOPI$1*h)/cos$4(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit(i*r*3);
        g = limit(i*g*3);
        b = limit(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;

    var rgb2hsi = rgb2hsi_1;

    Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
    };

    chroma$e.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$x, [ null ].concat( args, ['hsi']) ));
    };

    input$a.format.hsi = hsi2rgb_1;

    input$a.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'hsi');
            if (type$h(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;

    var rgb2hsl$1 = rgb2hsl_1;

    Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
    };

    chroma$d.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$w, [ null ].concat( args, ['hsl']) ));
    };

    input$9.format.hsl = hsl2rgb_1;

    input$9.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$l(args, 'hsl');
            if (type$g(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$k(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv$1 = rgb2hsl;

    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$j(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$2(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;

    var rgb2hsv = rgb2hsv$1;

    Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma$c.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$v, [ null ].concat( args, ['hsv']) ));
    };

    input$8.format.hsv = hsv2rgb_1;

    input$8.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$i(args, 'hsv');
            if (type$f(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;

    var rgb2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$h(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow$a((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > LAB_CONSTANTS$3.t3) { return pow$a(t, 1 / 3); }
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab$2;

    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$g(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0)
    };

    var lab2rgb_1 = lab2rgb$1;

    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;

    var rgb2lab$1 = rgb2lab_1;

    Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
    };

    chroma$b.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$u, [ null ].concat( args, ['lab']) ));
    };

    input$7.format.lab = lab2rgb_1;

    input$7.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'lab');
            if (type$e(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;

    var lab2lch$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$e(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch$2;

    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;

    var rgb2lch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch$1;

    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;

    var lch2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$c(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$3(h) * c, sin$3(h) * c]
    };

    var lch2lab_1 = lch2lab$2;

    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;

    var lch2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$b(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb$1;

    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;

    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$a(args, 'hcl').reverse();
        return lch2rgb.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;

    var rgb2lch = rgb2lch_1;

    Color$t.prototype.lch = function() { return rgb2lch(this._rgb); };
    Color$t.prototype.hcl = function() { return rgb2lch(this._rgb).reverse(); };

    chroma$a.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['lch']) ));
    };
    chroma$a.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$t, [ null ].concat( args, ['hcl']) ));
    };

    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input$6.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$9(args, m);
            if (type$d(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11$1 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11$1;

    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;

    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;

    Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input$5.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11[name]) { return hex2rgb(w3cx11[name]); }
        throw new Error('unknown color name: '+name);
    };

    input$5.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$c(h) === 'string' && w3cx11[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$8 = utils.unpack;

    var rgb2num$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$8(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num$1;

    var type$b = utils.type;

    var num2rgb = function (num) {
        if (type$b(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;

    var rgb2num = rgb2num_1;

    Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
    };

    chroma$9.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$r, [ null ].concat( args, ['num']) ));
    };

    input$4.format.num = num2rgb_1;

    input$4.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$a(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;

    Color$q.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$1);
    };

    Color$q.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$1(v)) : v;
        });
    };

    chroma$8.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$q, [ null ].concat( args, ['rgb']) ));
    };

    input$3.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$7(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input$3.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$7(args, 'rgba');
            if (type$9(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$9(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log$1 = Math.log;

    var temperature2rgb$1 = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log$1(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log$1(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log$1(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log$1(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb$1;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/

    var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round = Math.round;

    var rgb2temperature$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$6(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round(temp);
    };

    var rgb2temperature_1 = rgb2temperature$1;

    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;

    var rgb2temperature = rgb2temperature_1;

    Color$p.prototype.temp =
    Color$p.prototype.kelvin =
    Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
    };

    chroma$7.temp =
    chroma$7.kelvin =
    chroma$7.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$p, [ null ].concat( args, ['temp']) ));
    };

    input$2.format.temp =
    input$2.format.kelvin =
    input$2.format.temperature = temperature2rgb_1;

    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;

    var rgb2oklab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$5(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };

    var rgb2oklab_1 = rgb2oklab$2;

    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) {
            return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$8((abs + 0.055) / 1.055, 2.4);
    }

    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var oklab2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$4(args, 'lab');
        var L = args[0];
        var a = args[1];
        var b = args[2];

        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);

        return [
            255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };

    var oklab2rgb_1 = oklab2rgb$1;

    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) {
            return (sign(c) || 1) * (1.055 * pow$7(abs, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
    }

    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;

    var rgb2oklab$1 = rgb2oklab_1;

    Color$o.prototype.oklab = function () {
        return rgb2oklab$1(this._rgb);
    };

    chroma$6.oklab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$o, [ null ].concat( args, ['oklab']) ));
    };

    input$1.format.oklab = oklab2rgb_1;

    input$1.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'oklab');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'oklab';
            }
        }
    });

    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;

    var rgb2oklch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$2(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };

    var rgb2oklch_1 = rgb2oklch$1;

    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;

    var oklch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$1(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var oklch2rgb_1 = oklch2rgb;

    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;

    var rgb2oklch = rgb2oklch_1;

    Color$n.prototype.oklch = function () {
        return rgb2oklch(this._rgb);
    };

    chroma$5.oklch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$n, [ null ].concat( args, ['oklch']) ));
    };

    input.format.oklch = oklch2rgb_1;

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack(args, 'oklch');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'oklch';
            }
        }
    });

    var Color$m = Color_1;
    var type$6 = utils.type;

    Color$m.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$6(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    var Color$l = Color_1;

    Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;

    Color$k.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= LAB_CONSTANTS$1.Kn * amount;
    	return new Color$k(lab, 'lab').alpha(me.alpha(), true);
    };

    Color$k.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;

    var Color$j = Color_1;

    Color$j.prototype.get = function (mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color$i.prototype.luminance = function(lum) {
        if (lum !== undefined && type$5(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color$i([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color$i([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color$i([0,0,0]), this) : test(this, new Color$i([255,255,255]))).rgb();
            return new Color$i(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$6((x+0.055)/1.055, 2.4);
    };

    var interpolator$1 = {};

    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;

    var mix$1 = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$4(col1) !== 'object') { col1 = new Color$h(col1); }
        if (type$4(col2) !== 'object') { col2 = new Color$h(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    var Color$g = Color_1;
    var mix = mix$1;

    Color$g.prototype.mix =
    Color$g.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    var Color$f = Color_1;

    Color$f.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color$f([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;

    Color$e.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += LAB_CONSTANTS.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color$e(lch, 'lch').alpha(me.alpha(), true);
    };

    Color$e.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var Color$d = Color_1;
    var type$3 = utils.type;

    Color$d.prototype.set = function (mc, value, mutate) {
        if ( mutate === void 0 ) mutate = false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) {
                if (type$3(value) == 'string') {
                    switch (value.charAt(0)) {
                        case '+':
                            src[i] += +value;
                            break;
                        case '-':
                            src[i] += +value;
                            break;
                        case '*':
                            src[i] *= +value.substr(1);
                            break;
                        case '/':
                            src[i] /= +value.substr(1);
                            break;
                        default:
                            src[i] = +value;
                    }
                } else if (type$3(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color$d(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color$c = Color_1;

    var rgb = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.rgb = rgb;

    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(
            sqrt$2(pow$5(x1,2) * (1-f) + pow$5(x2,2) * f),
            sqrt$2(pow$5(y1,2) * (1-f) + pow$5(y2,2) * f),
            sqrt$2(pow$5(z1,2) * (1-f) + pow$5(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator$1.lrgb = lrgb;

    var Color$a = Color_1;

    var lab = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator$1.lab = lab;

    var Color$9 = Color_1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        } else if (m === 'oklch') {
            xyz0 = col1.oklch().reverse();
            xyz1 = col2.oklch().reverse();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h' || m === 'oklch') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1 - (hue0 + 360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1 + 360 - hue0;
            } else {
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === 'oklch' ? new Color$9([lbv, sat, hue], m) : new Color$9([hue, sat, lbv], m);
    };

    var interpolate_hsx$5 = _hsx;

    var lch = function (col1, col2, f) {
    	return interpolate_hsx$5(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;

    var Color$8 = Color_1;

    var num = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator$1.num = num;

    var interpolate_hsx$4 = _hsx;

    var hcg = function (col1, col2, f) {
    	return interpolate_hsx$4(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator$1.hcg = hcg;

    var interpolate_hsx$3 = _hsx;

    var hsi = function (col1, col2, f) {
    	return interpolate_hsx$3(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator$1.hsi = hsi;

    var interpolate_hsx$2 = _hsx;

    var hsl = function (col1, col2, f) {
    	return interpolate_hsx$2(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator$1.hsl = hsl;

    var interpolate_hsx$1 = _hsx;

    var hsv = function (col1, col2, f) {
    	return interpolate_hsx$1(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator$1.hsv = hsv;

    var Color$7 = Color_1;

    var oklab = function (col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(
            xyz0[0] + f * (xyz1[0] - xyz0[0]),
            xyz0[1] + f * (xyz1[1] - xyz0[1]),
            xyz0[2] + f * (xyz1[2] - xyz0[2]),
            'oklab'
        );
    };

    // register interpolator
    interpolator$1.oklab = oklab;

    var interpolate_hsx = _hsx;

    var oklch = function (col1, col2, f) {
        return interpolate_hsx(col1, col2, f, 'oklch');
    };

    // register interpolator
    interpolator$1.oklch = oklch;

    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color$6(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$2(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$2(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color$6(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color$6(clip_rgb$1(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze

    var chroma$4 = chroma_1;
    var type$2 = utils.type;

    var pow$3 = Math.pow;

    var scale$2 = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma$4('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$2(colors) === 'string' && chroma$4.brewer &&
                chroma$4.brewer[colors.toLowerCase()]) {
                colors = chroma$4.brewer[colors.toLowerCase()];
            }
            if (type$2(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma$4(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$3(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$2(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma$4.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$2(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma$4(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$2(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma$4.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma$4.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$2(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma$4[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma$4(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab
    var Color$5 = Color_1;

    var scale$1 = scale$2;

    // nth row of the pascal triangle
    var binom_row = function(n) {
        var row = [1, 1];
        for (var i = 1; i < n; i++) {
            var newrow = [1];
            for (var j = 1; j <= row.length; j++) {
                newrow[j] = (row[j] || 0) + row[j - 1];
            }
            row = newrow;
        }
        return row;
    };

    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color$5(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color$5(lab, 'lab');
            };
        } else if (colors.length >= 5) {
            // general case (degree n bezier)
            var labs, row, n;
            labs = colors.map(function (c) { return c.lab(); });
            n = colors.length - 1;
            row = binom_row(n);
            I = function (t) {
                var u = 1 - t;
                var lab = ([0, 1, 2].map(function (i) { return labs.reduce(function (sum, el, j) { return (sum + row[j] * Math.pow( u, (n - j) ) * Math.pow( t, j ) * el[i]); }, 0); }));
                return new Color$5(lab, 'lab');
            };
        } else {
            throw new RangeError("No point in running bezier with only one color.")
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale$1(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */

    var chroma$3 = chroma_1;

    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma$3(top).rgb();
            var c1 = chroma$3(bottom).rgb();
            return chroma$3.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;

    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$1(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI * (((start+120)/360) + (rotations * fract));
            var l = pow$2(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$1(a);
            var sin_a = sin$1(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma$2(clip_rgb([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$1(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$1(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma$2.scale(f); };

        f.hue(hue);

        return f;
    };

    var Color$4 = Color_1;
    var digits = '0123456789abcdef';

    var floor$1 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$1(random() * 16));
        }
        return new Color$4(code, 'hex');
    };

    var type = type$p;
    var log = Math.log;
    var pow$1 = Math.pow;
    var floor = Math.floor;
    var abs$1 = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log(min);
            var max_log = Math.LOG10E * log(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$1(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs$1(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var Color$3 = Color_1;


    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min = Math.min;
    var max = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;

    var deltaE = function(a, b, Kl, Kc, Kh) {
        if ( Kl === void 0 ) Kl=1;
        if ( Kc === void 0 ) Kc=1;
        if ( Kh === void 0 ) Kh=1;

        // Delta E (CIE 2000)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
        var rad2deg = function(rad) {
            return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
            return (2 * PI * deg) / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2)/2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2)/2;
        var G = 0.5*(1-sqrt(pow(avgC, 7)/(pow(avgC, 7) + pow(25, 7))));
        var a1p = a1*(1+G);
        var a2p = a2*(1+G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p)/2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360)/2 : (h1p + h2p)/2;
        var T = 1 - 0.17*cos(deg2rad(avgHp - 30)) + 0.24*cos(deg2rad(2*avgHp)) + 0.32*cos(deg2rad(3*avgHp + 6)) - 0.2*cos(deg2rad(4*avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2*sqrt(C1p*C2p)*sin(deg2rad(deltaHp)/2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;    
        var sl = 1 + (0.015*pow(avgL - 50, 2))/sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045*avgCp;
        var sh = 1 + 0.015*avgCp*T;
        var deltaTheta = 30*exp(-pow((avgHp - 275)/25, 2));
        var Rc = 2*sqrt(pow(avgCp, 7)/(pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc*sin(2*deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL/(Kl*sl), 2) + pow(deltaCp/(Kc*sc), 2) + pow(deltaHp/(Kh*sh), 2) + Rt*(deltaCp/(Kc*sc))*(deltaHp/(Kh*sh)));
        return max(0, min(100, result));
    };

    var Color$1 = Color_1;

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var Color = Color_1;

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:
    var chroma$1 = chroma_1;

    var scale = scale$2;

    var scales = {
    	cool: function cool() { return scale([chroma$1.hsl(180,1,.9), chroma$1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff']).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1) {
        var key = list[i];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    var chroma = chroma_1;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors

















    // operators --> modify existing Colors










    // interpolators












    // generators -- > create new colors
    chroma.average = average;
    chroma.bezier = bezier_1;
    chroma.blend = blend_1;
    chroma.cubehelix = cubehelix;
    chroma.mix = chroma.interpolate = mix$1;
    chroma.random = random_1;
    chroma.scale = scale$2;

    // other utility methods
    chroma.analyze = analyze_1.analyze;
    chroma.contrast = contrast;
    chroma.deltaE = deltaE;
    chroma.distance = distance;
    chroma.limits = analyze_1.limits;
    chroma.valid = valid;

    // scale
    chroma.scales = scales;

    // colors
    chroma.colors = w3cx11_1;
    chroma.brewer = colorbrewer_1;

    var chroma_js = chroma;

    return chroma_js;

}));


/***/ }),

/***/ "./src/tokens/colors/components/component-tokens.json":
/*!************************************************************!*\
  !*** ./src/tokens/colors/components/component-tokens.json ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"button":{"bg":{"rest":{"$value":"{utility.tint.300}","$type":"color"},"hover":{"$value":"{alt.base.100}","$type":"color"},"active":{"$value":"{utility.tint.200}","$type":"color"}},"border":{"rest":{"$value":"{stroke.base.400}","$type":"color"},"hover":{"$value":"{stroke.base.500}","$type":"color"},"active":{"$value":"{stroke.base.400}","$type":"color"}}},"ui-element":{"bg":{"rest":{"$value":"{utility.transparent}","$type":"color"},"hover":{"$value":"{alt.base.100}","$type":"color"},"active":{"$value":"{alt.base.200}","$type":"color"},"selected":{"$value":"{primary.400}","$type":"color"},"disabled":{"$value":"{alt.base.600}","$type":"color"}},"border":{"rest":{"$value":"{alt.base.100}","$type":"color"},"hover":{"$value":"{alt.base.200}","$type":"color"},"active":{"$value":"{alt.base.300}","$type":"color"},"selected":{"$value":"{primary.500}","$type":"color"},"disabled":{"$value":"{alt.base.600}","$type":"color"}}},"form-element":{"bg":{"rest":{"$value":"{fill.base.100}","$type":"color"},"hover":{"$value":"{fill.base.100}","$type":"color"},"readonly":{"$value":"{fill.base.200}","$type":"color"}},"border":{"rest":{"$value":"{stroke.base.400}","$type":"color"},"hover":{"$value":"{stroke.base.500}","$type":"color"},"readonly":{"$value":"{stroke.base.400}","$type":"color"}}},"card":{"bg":{"primary":{"$value":"{fill.base.100}","$type":"color"},"secondary":{"$value":"{fill.base.200}","$type":"color"}},"border":{"inner":{"$value":"{stroke.base.100}","$type":"color"},"outer":{"$value":"{stroke.base.200}","$type":"color"}}},"overlay":{"bg":{"$value":"{card.bg.primary}","$type":"color"},"border":{"$value":"{alt.base.400}","$type":"color"}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-base-2.json":
/*!***************************************************!*\
  !*** ./src/tokens/colors/system/dark-base-2.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-6}","$type":"color"},"200":{"$value":"{grey-8}","$type":"color"},"300":{"$value":"{grey-10}","$type":"color"},"400":{"$value":"{grey-12}","$type":"color"},"500":{"$value":"{grey-14}","$type":"color"},"600":{"$value":"{grey-16}","$type":"color"}},"contrast":{"100":{"$value":"{grey-16}","$type":"color"},"200":{"$value":"{grey-18}","$type":"color"},"300":{"$value":"{grey-20}","$type":"color"},"400":{"$value":"{grey-22}","$type":"color"},"500":{"$value":"{grey-24}","$type":"color"},"600":{"$value":"{grey-26}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-16}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-20}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-24}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-28}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-34}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-26}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-30}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-34}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-38}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-44}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-50}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-base-3.json":
/*!***************************************************!*\
  !*** ./src/tokens/colors/system/dark-base-3.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-6}","$type":"color"},"200":{"$value":"{grey-9}","$type":"color"},"300":{"$value":"{grey-12}","$type":"color"},"400":{"$value":"{grey-15}","$type":"color"},"500":{"$value":"{grey-18}","$type":"color"},"600":{"$value":"{grey-21}","$type":"color"}},"contrast":{"100":{"$value":"{grey-16}","$type":"color"},"200":{"$value":"{grey-19}","$type":"color"},"300":{"$value":"{grey-22}","$type":"color"},"400":{"$value":"{grey-25}","$type":"color"},"500":{"$value":"{grey-28}","$type":"color"},"600":{"$value":"{grey-31}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-16}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-21}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-26}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-31}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-37}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-43}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-26}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-31}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-36}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-41}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-47}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-53}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-base-4.json":
/*!***************************************************!*\
  !*** ./src/tokens/colors/system/dark-base-4.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-6}","$type":"color"},"200":{"$value":"{grey-10}","$type":"color"},"300":{"$value":"{grey-14}","$type":"color"},"400":{"$value":"{grey-18}","$type":"color"},"500":{"$value":"{grey-22}","$type":"color"},"600":{"$value":"{grey-26}","$type":"color"}},"contrast":{"100":{"$value":"{grey-16}","$type":"color"},"200":{"$value":"{grey-20}","$type":"color"},"300":{"$value":"{grey-24}","$type":"color"},"400":{"$value":"{grey-28}","$type":"color"},"500":{"$value":"{grey-32}","$type":"color"},"600":{"$value":"{grey-36}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-16}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-22}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-28}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-34}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-46}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-28}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-32}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-36}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-48}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-56}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-common.json":
/*!***************************************************!*\
  !*** ./src/tokens/colors/system/dark-common.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"text":{"base":{"400":{"$value":"rgba(#FFFFFF, 0.45)","$type":"color"},"500":{"$value":"rgba(#FFFFFF, 0.70)","$type":"color"},"600":{"$value":"#FFFFFF","$type":"color"},"action":{"$value":"{primary.500}","$type":"color"},"info":{"$value":"{info.500}","$type":"color"},"success":{"$value":"{success.500}","$type":"color"},"warning":{"$value":"{warning.500}","$type":"color"},"danger":{"$value":"{danger.500}","$type":"color"}},"contrast":{"400":{"$value":"rgba(#FFFFFF, 0.45)","$type":"color"},"500":{"$value":"rgba(#FFFFFF, 0.70)","$type":"color"},"600":{"$value":"#FFFFFF","$type":"color"},"action":{"$value":"{primary.600}","$type":"color"},"info":{"$value":"{info.600}","$type":"color"},"success":{"$value":"{success.600}","$type":"color"},"warning":{"$value":"{warning.600}","$type":"color"},"danger":{"$value":"{danger.600}","$type":"color"}}},"alt":{"base":{"100":{"$value":"rgba({grey-78}, 0.04)","$type":"color","adjustments":{"s":"*2"}},"200":{"$value":"rgba({grey-78}, 0.08)","$type":"color","adjustments":{"s":"*2"}},"300":{"$value":"rgba({grey-78}, 0.16)","$type":"color","adjustments":{"s":"*2"}},"400":{"$value":"rgba({grey-78}, 0.24)","$type":"color","adjustments":{"s":"*2"}},"500":{"$value":"rgba({grey-78}, 0.32)","$type":"color","adjustments":{"s":"*2"}},"600":{"$value":"rgba({grey-78}, 0.44)","$type":"color","adjustments":{"s":"*2"}}},"contrast":{"100":{"$value":"rgba({grey-78}, 0.04)","$type":"color","adjustments":{"s":"*2"}},"200":{"$value":"rgba({grey-78}, 0.08)","$type":"color","adjustments":{"s":"*2"}},"300":{"$value":"rgba({grey-78}, 0.16)","$type":"color","adjustments":{"s":"*2"}},"400":{"$value":"rgba({grey-78}, 0.24)","$type":"color","adjustments":{"s":"*2"}},"500":{"$value":"rgba({grey-78}, 0.32)","$type":"color","adjustments":{"s":"*2"}},"600":{"$value":"rgba({grey-78}, 0.44)","$type":"color","adjustments":{"s":"*2"}}}},"utility":{"white":{"$value":"{grey-100}","$type":"color"},"black":{"$value":"{grey-4}","$type":"color"},"transparent":{"$value":"rgba(0, 0, 0, 0)","$type":"color"},"shade":{"100":{"$value":"rgba(#000000, 0.10)","$type":"color"},"200":{"$value":"rgba(#000000, 0.20)","$type":"color"},"300":{"$value":"rgba(#000000, 0.30)","$type":"color"},"400":{"$value":"rgba(#000000, 0.40)","$type":"color"},"500":{"$value":"rgba(#000000, 0.50)","$type":"color"},"600":{"$value":"rgba(#000000, 0.60)","$type":"color"}},"tint":{"100":{"$value":"rgba({grey-78}, 0.04)","$type":"color","adjustments":{"s":"*2"}},"200":{"$value":"rgba({grey-78}, 0.08)","$type":"color","adjustments":{"s":"*2"}},"300":{"$value":"rgba({grey-78}, 0.16)","$type":"color","adjustments":{"s":"*2"}},"400":{"$value":"rgba({grey-78}, 0.24)","$type":"color","adjustments":{"s":"*2"}},"500":{"$value":"rgba({grey-78}, 0.32)","$type":"color","adjustments":{"s":"*2"}},"600":{"$value":"rgba({grey-78}, 0.44)","$type":"color","adjustments":{"s":"*2"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-elevated-2.json":
/*!*******************************************************!*\
  !*** ./src/tokens/colors/system/dark-elevated-2.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-14}","$type":"color"},"200":{"$value":"{grey-12}","$type":"color"},"300":{"$value":"{grey-10}","$type":"color"},"400":{"$value":"{grey-8}","$type":"color"},"500":{"$value":"{grey-6}","$type":"color"},"600":{"$value":"{grey-4}","$type":"color"}},"contrast":{"100":{"$value":"{grey-24}","$type":"color"},"200":{"$value":"{grey-22}","$type":"color"},"300":{"$value":"{grey-20}","$type":"color"},"400":{"$value":"{grey-18}","$type":"color"},"500":{"$value":"{grey-16}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-22}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-25}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-29}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-34}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-47}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-28}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-30}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-33}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-36}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-39}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-45}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-elevated-3.json":
/*!*******************************************************!*\
  !*** ./src/tokens/colors/system/dark-elevated-3.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-19}","$type":"color"},"200":{"$value":"{grey-16}","$type":"color"},"300":{"$value":"{grey-13}","$type":"color"},"400":{"$value":"{grey-10}","$type":"color"},"500":{"$value":"{grey-7}","$type":"color"},"600":{"$value":"{grey-4}","$type":"color"}},"contrast":{"100":{"$value":"{grey-29}","$type":"color"},"200":{"$value":"{grey-26}","$type":"color"},"300":{"$value":"{grey-23}","$type":"color"},"400":{"$value":"{grey-20}","$type":"color"},"500":{"$value":"{grey-17}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-29}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-30}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-32}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-36}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-41}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-49}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-39}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-42}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-46}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-51}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-61}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/dark-elevated-4.json":
/*!*******************************************************!*\
  !*** ./src/tokens/colors/system/dark-elevated-4.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-24}","$type":"color"},"200":{"$value":"{grey-20}","$type":"color"},"300":{"$value":"{grey-16}","$type":"color"},"400":{"$value":"{grey-12}","$type":"color"},"500":{"$value":"{grey-8}","$type":"color"},"600":{"$value":"{grey-4}","$type":"color"}},"contrast":{"100":{"$value":"{grey-34}","$type":"color"},"200":{"$value":"{grey-30}","$type":"color"},"300":{"$value":"{grey-26}","$type":"color"},"400":{"$value":"{grey-22}","$type":"color"},"500":{"$value":"{grey-18}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-34}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-35}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-38}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-42}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-47}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-55}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-44}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-45}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-48}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-52}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-57}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-65}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/light-2.json":
/*!***********************************************!*\
  !*** ./src/tokens/colors/system/light-2.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-100}","$type":"color"},"200":{"$value":"{grey-98}","$type":"color"},"300":{"$value":"{grey-96}","$type":"color"},"400":{"$value":"{grey-94}","$type":"color"},"500":{"$value":"{grey-92}","$type":"color"},"600":{"$value":"{grey-88}","$type":"color"}},"contrast":{"100":{"$value":"{grey-24}","$type":"color"},"200":{"$value":"{grey-22}","$type":"color"},"300":{"$value":"{grey-20}","$type":"color"},"400":{"$value":"{grey-18}","$type":"color"},"500":{"$value":"{grey-16}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-93}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-88}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-85}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-80}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-70}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-54}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-28}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-30}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-33}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-36}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-39}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-45}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/light-3.json":
/*!***********************************************!*\
  !*** ./src/tokens/colors/system/light-3.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-100}","$type":"color"},"200":{"$value":"{grey-97}","$type":"color"},"300":{"$value":"{grey-94}","$type":"color"},"400":{"$value":"{grey-91}","$type":"color"},"500":{"$value":"{grey-88}","$type":"color"},"600":{"$value":"{grey-84}","$type":"color"}},"contrast":{"100":{"$value":"{grey-29}","$type":"color"},"200":{"$value":"{grey-26}","$type":"color"},"300":{"$value":"{grey-23}","$type":"color"},"400":{"$value":"{grey-20}","$type":"color"},"500":{"$value":"{grey-17}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-92}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-87}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-83}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-79}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-67}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-55}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-39}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-40}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-42}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-46}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-51}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-61}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/light-4.json":
/*!***********************************************!*\
  !*** ./src/tokens/colors/system/light-4.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"fill":{"base":{"100":{"$value":"{grey-100}","$type":"color"},"200":{"$value":"{grey-96}","$type":"color"},"300":{"$value":"{grey-92}","$type":"color"},"400":{"$value":"{grey-88}","$type":"color"},"500":{"$value":"{grey-84}","$type":"color"},"600":{"$value":"{grey-80}","$type":"color"}},"contrast":{"100":{"$value":"{grey-34}","$type":"color"},"200":{"$value":"{grey-30}","$type":"color"},"300":{"$value":"{grey-26}","$type":"color"},"400":{"$value":"{grey-22}","$type":"color"},"500":{"$value":"{grey-18}","$type":"color"},"600":{"$value":"{grey-14}","$type":"color"}}},"stroke":{"base":{"100":{"$value":"{grey-91}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-86}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-81}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-76}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-64}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-54}","$type":"color","adjustments":{"s":"*0.7"}}},"contrast":{"100":{"$value":"{grey-44}","$type":"color","adjustments":{"s":"*0.7"}},"200":{"$value":"{grey-45}","$type":"color","adjustments":{"s":"*0.7"}},"300":{"$value":"{grey-48}","$type":"color","adjustments":{"s":"*0.7"}},"400":{"$value":"{grey-52}","$type":"color","adjustments":{"s":"*0.7"}},"500":{"$value":"{grey-57}","$type":"color","adjustments":{"s":"*0.7"}},"600":{"$value":"{grey-65}","$type":"color","adjustments":{"s":"*0.7"}}}}}');

/***/ }),

/***/ "./src/tokens/colors/system/light-common.json":
/*!****************************************************!*\
  !*** ./src/tokens/colors/system/light-common.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"text":{"base":{"400":{"$value":"rgba({grey-6}, 0.45)","$type":"color"},"500":{"$value":"rgba({grey-6}, 0.65)","$type":"color"},"600":{"$value":"{grey-6}","$type":"color"},"action":{"$value":"{primary.500}","$type":"color"},"info":{"$value":"{info.500}","$type":"color"},"success":{"$value":"{success.500}","$type":"color"},"warning":{"$value":"{warning.500}","$type":"color"},"danger":{"$value":"{danger.500}","$type":"color"}},"contrast":{"400":{"$value":"rgba(#FFFFFF, 0.45)","$type":"color"},"500":{"$value":"rgba(255, 255, 255, 0.70)","$type":"color"},"600":{"$value":"#ffffff","$type":"color"},"action":{"$value":"{primary.600}","$type":"color"},"info":{"$value":"{info.600}","$type":"color"},"success":{"$value":"{success.600}","$type":"color"},"warning":{"$value":"{warning.600}","$type":"color"},"danger":{"$value":"{danger.600}","$type":"color"}}},"alt":{"base":{"100":{"$value":"rgba({grey-14}, 0.04)","$type":"color","adjustments":{"s":"1"}},"200":{"$value":"rgba({grey-14}, 0.08)","$type":"color","adjustments":{"s":"1"}},"300":{"$value":"rgba({grey-14}, 0.16)","$type":"color","adjustments":{"s":"1"}},"400":{"$value":"rgba({grey-14}, 0.24)","$type":"color","adjustments":{"s":"1"}},"500":{"$value":"rgba({grey-14}, 0.32)","$type":"color","adjustments":{"s":"1"}},"600":{"$value":"rgba({grey-14}, 0.44)","$type":"color","adjustments":{"s":"1"}}},"contrast":{"100":{"$value":"rgba(#FFFFFF, 0.04)","$type":"color"},"200":{"$value":"rgba(#FFFFFF, 0.08)","$type":"color"},"300":{"$value":"rgba(#FFFFFF, 0.12)","$type":"color"},"400":{"$value":"rgba(#FFFFFF, 0.16)","$type":"color"},"500":{"$value":"rgba(#FFFFFF, 0.24)","$type":"color"},"600":{"$value":"rgba(#FFFFFF, 0.32)","$type":"color"}}},"utility":{"white":{"$value":"{grey-100}","$type":"color"},"black":{"$value":"{grey-4}","$type":"color"},"transparent":{"$value":"rgba(255, 255, 255, 0)","$type":"color"},"shade":{"100":{"$value":"rgba({grey-8}, 0.04)","$type":"color","adjustments":{"s":"1"}},"200":{"$value":"rgba({grey-8}, 0.08)","$type":"color","adjustments":{"s":"1"}},"300":{"$value":"rgba({grey-8}, 0.16)","$type":"color","adjustments":{"s":"1"}},"400":{"$value":"rgba({grey-8}, 0.24)","$type":"color","adjustments":{"s":"1"}},"500":{"$value":"rgba({grey-8}, 0.32)","$type":"color","adjustments":{"s":"1"}},"600":{"$value":"rgba({grey-8}, 0.44)","$type":"color","adjustments":{"s":"1"}}},"tint":{"100":{"$value":"rgba({grey-100}, 0.5)","$type":"color"},"200":{"$value":"rgba({grey-100}, 0.6)","$type":"color"},"300":{"$value":"rgba({grey-100}, 0.7)","$type":"color"},"400":{"$value":"rgba({grey-100}, 0.8)","$type":"color"},"500":{"$value":"rgba({grey-100}, 0.9)","$type":"color"},"600":{"$value":"{grey-100}","$type":"color"}}}}');

/***/ }),

/***/ "./src/tokens/effects/elevation.json":
/*!*******************************************!*\
  !*** ./src/tokens/effects/elevation.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"shadow-1":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"0.75","blur":"0.5","spread":"0"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-1 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"0.75","blur":"0.5","spread":"0"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-1 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"0.75","blur":"0.5","spread":"0"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-1 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"0.75","blur":"0.5","spread":"0"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow- shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"0.75","blur":"0.5","spread":"0"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-1 shadow-utility-shade-500"}},"shadow-2":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"2","spread":"-1"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-1"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-2 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"2","spread":"-1"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"4","spread":"-1"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-2 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"2","spread":"-1"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"4","spread":"-1"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-2 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"2","spread":"-1"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"4","spread":"-1"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-2 shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"2","spread":"-1"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"1","blur":"4","spread":"-1"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-2 shadow-utility-shade-500"}},"shadow-3":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-2"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-2"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-3 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-2"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-2"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-3 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-2"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-2"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-3 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-2"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-2"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-3 shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"2","blur":"4","spread":"-2"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-2"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-3 shadow-utility-shade-500"}},"shadow-4":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-4"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"10","blur":"15","spread":"-3"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-4 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-4"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"10","blur":"15","spread":"-3"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-4 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-4"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"10","blur":"15","spread":"-3"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-4 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-4"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"10","blur":"15","spread":"-3"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-4 shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"4","blur":"6","spread":"-4"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"10","blur":"15","spread":"-3"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-4 shadow-utility-shade-500"}},"shadow-5":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"12","blur":"10","spread":"-6"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"20","blur":"25","spread":"-5"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"12","blur":"10","spread":"-6"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"20","blur":"25","spread":"-5"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"12","blur":"10","spread":"-6"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"20","blur":"25","spread":"-5"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"12","blur":"10","spread":"-6"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"20","blur":"25","spread":"-5"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"12","blur":"10","spread":"-6"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"20","blur":"25","spread":"-5"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-500"}},"shadow-6":{"100":{"$value":[{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"23","blur":"28","spread":"-7"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"16","blur":"10","spread":"-7"},{"color":"{utility.shade.100}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"24","blur":"48","spread":"-10"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-100"},"200":{"$value":[{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"23","blur":"28","spread":"-7"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"16","blur":"10","spread":"-7"},{"color":"{utility.shade.200}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"24","blur":"48","spread":"-10"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-200"},"300":{"$value":[{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"23","blur":"28","spread":"-7"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"16","blur":"10","spread":"-7"},{"color":"{utility.shade.300}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"24","blur":"48","spread":"-10"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-300"},"400":{"$value":[{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"23","blur":"28","spread":"-7"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"16","blur":"10","spread":"-7"},{"color":"{utility.shade.400}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"24","blur":"48","spread":"-10"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-400"},"500":{"$value":[{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"23","blur":"28","spread":"-7"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"16","blur":"10","spread":"-7"},{"color":"{utility.shade.500}","showShadowBehindNode":"false","type":"dropShadow","x":"0","y":"24","blur":"48","spread":"-10"}],"$type":"boxShadow","documentationLink":"https://namad.github.io/source-foundation-docs/#drop-shadows","description":"shadow-5 shadow-utility-shade-500"}}}');

/***/ }),

/***/ "./src/tokens/radii/base.json":
/*!************************************!*\
  !*** ./src/tokens/radii/base.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"radii":{"none":{"$value":"0","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"sm":{"$value":"4.5","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"base":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"md":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"lg":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl2":{"$value":"22","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"round":{"$value":"999","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]}}}');

/***/ }),

/***/ "./src/tokens/radii/compact.json":
/*!***************************************!*\
  !*** ./src/tokens/radii/compact.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"radii":{"none":{"$value":"0","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"sm":{"$value":"3","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"base":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"md":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"lg":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl2":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"round":{"$value":"999","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]}}}');

/***/ }),

/***/ "./src/tokens/radii/large.json":
/*!*************************************!*\
  !*** ./src/tokens/radii/large.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"radii":{"none":{"$value":"0","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"sm":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"base":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"md":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"lg":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"xl2":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]},"round":{"$value":"999","$type":"number","scopes":["TEXT_CONTENT","CORNER_RADIUS"]}}}');

/***/ }),

/***/ "./src/tokens/sizing/base.json":
/*!*************************************!*\
  !*** ./src/tokens/sizing/base.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"icon-size":{"sm":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"96","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"128","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"256","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}}}');

/***/ }),

/***/ "./src/tokens/sizing/touch.json":
/*!**************************************!*\
  !*** ./src/tokens/sizing/touch.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"icon-size":{"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"96","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"128","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"256","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"512","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}}}');

/***/ }),

/***/ "./src/tokens/spacing/base.json":
/*!**************************************!*\
  !*** ./src/tokens/spacing/base.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"spacing":{"xs4":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl4":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl5":{"$value":"72","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"minor":{"xs4":{"$value":"2","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl4":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl5":{"$value":"68","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]}}}}');

/***/ }),

/***/ "./src/tokens/spacing/compact.json":
/*!*****************************************!*\
  !*** ./src/tokens/spacing/compact.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"spacing":{"xs4":{"$value":"2","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl4":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl5":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"minor":{"xs4":{"$value":"1","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"2","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl4":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl5":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]}}}}');

/***/ }),

/***/ "./src/tokens/spacing/large.json":
/*!***************************************!*\
  !*** ./src/tokens/spacing/large.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"spacing":{"xs4":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"52","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"minor":{"xs4":{"$value":"2","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl2":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl3":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]}}}}');

/***/ }),

/***/ "./src/tokens/spacing/touch.json":
/*!***************************************!*\
  !*** ./src/tokens/spacing/touch.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"spacing":{"xs4":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"minor":{"xs4":{"$value":"2","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs3":{"$value":"4","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs2":{"$value":"6","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xs":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"sm":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"base":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"md":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"lg":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]},"xl":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT","GAP","STROKE_FLOAT"]}}}}');

/***/ }),

/***/ "./src/tokens/typography/major-second/typescale-base.json":
/*!****************************************************************!*\
  !*** ./src/tokens/typography/major-second/typescale-base.json ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"15","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"17","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"19","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"21","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"27","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"30","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"34","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"38","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"43","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"34","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"38","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"42","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"52","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/major-second/typescale-compact.json":
/*!*******************************************************************!*\
  !*** ./src/tokens/typography/major-second/typescale-compact.json ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"15","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"19","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"21","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"27","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"30","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"33","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"38","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"26","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"46","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/major-second/typescale-large.json":
/*!*****************************************************************!*\
  !*** ./src/tokens/typography/major-second/typescale-large.json ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"15","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"17","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"19","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"22","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"27","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"31","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"34","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"39","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"49","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"34","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"38","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"62","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"68","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/major-third/typescale-base.json":
/*!***************************************************************!*\
  !*** ./src/tokens/typography/major-third/typescale-base.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"15","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"19","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"23","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"29","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"37","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"46","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"57","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"72","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"89","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"112","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"80","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"100","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"124","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/major-third/typescale-compact.json":
/*!******************************************************************!*\
  !*** ./src/tokens/typography/major-third/typescale-compact.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"25","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"50","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"62","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"77","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"97","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"84","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"106","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/major-third/typescale-large.json":
/*!****************************************************************!*\
  !*** ./src/tokens/typography/major-third/typescale-large.json ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"9","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"17","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"21","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"27","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"33","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"42","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"52","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"65","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"81","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"101","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"127","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"72","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"88","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"112","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"140","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/minor-third/typescale-base.json":
/*!***************************************************************!*\
  !*** ./src/tokens/typography/minor-third/typescale-base.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"15","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"18","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"22","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"26","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"31","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"37","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"45","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"54","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"64","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"77","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"36","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"48","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"72","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"86","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/minor-third/typescale-compact.json":
/*!******************************************************************!*\
  !*** ./src/tokens/typography/minor-third/typescale-compact.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"13","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"19","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"22","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"27","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"39","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"47","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"67","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"10","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"44","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"52","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"60","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"78","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"8","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/minor-third/typescale-large.json":
/*!****************************************************************!*\
  !*** ./src/tokens/typography/minor-third/typescale-large.json ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-size":{"xs2":{"$value":"11","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"14","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"17","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"29","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"35","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"42","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"51","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"61","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"73","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"88","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"line-height":{"xs2":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xs":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"sm":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"base":{"$value":"24","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"md":{"$value":"28","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"lg":{"$value":"32","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl":{"$value":"34","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl2":{"$value":"40","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl3":{"$value":"52","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl4":{"$value":"56","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl5":{"$value":"68","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl6":{"$value":"80","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]},"xl7":{"$value":"96","$type":"number","scopes":["TEXT_CONTENT","WIDTH_HEIGHT"]}},"letter-spacing":{"0":{"$value":"0%","$type":"letterSpacing","scopes":["TEXT_CONTENT"]}},"paragraph-spacing":{"label":{"$value":"12","$type":"number","scopes":["TEXT_CONTENT"]},"paragraph":{"$value":"16","$type":"number","scopes":["TEXT_CONTENT"]},"display":{"$value":"20","$type":"number","scopes":["TEXT_CONTENT"]}}}');

/***/ }),

/***/ "./src/tokens/typography/styles.json":
/*!*******************************************!*\
  !*** ./src/tokens/typography/styles.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"body":{"base":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"medium":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"small":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.sm}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"x-small":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"x-small2":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xs2}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"large":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"semi-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","base":"[object Object]","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"},"uppercase":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"uppercase-bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.uppercase}","textDecoration":"{text-decoration.none}"},"$type":"typography"}}},"paragraph":{"base":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.md}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.md}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}},"medium":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.lg}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.lg}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}},"small":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.base}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.base}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.sm}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}},"x-small":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.sm}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.sm}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.sm}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.sm}","fontSize":"{font-size.xs}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}},"x-small2":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xs}","fontSize":"{font-size.xs2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}},"large":{"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xl}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"italic":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.italic}","lineHeight":"{line-height.xl}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"underline":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.paragraph}","textCase":"{text-case.none}","textDecoration":"{text-decoration.underline}"},"$type":"typography"}}},"heading":{"h1":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xl3}","fontSize":"{font-size.xl3}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl3}","fontSize":"{font-size.xl3}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"h2":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xl2}","fontSize":"{font-size.xl2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl2}","fontSize":"{font-size.xl2}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"h3":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.xl}","fontSize":"{font-size.xl}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl}","fontSize":"{font-size.xl}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"h4":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.lg}","fontSize":"{font-size.lg}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"h5":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.md}","fontSize":"{font-size.md}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"h6":{"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.bold}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.base}","fontSize":"{font-size.base}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.label}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}}},"display":{"d4":{"light":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.light}","lineHeight":"{line-height.xl4}","fontSize":"{font-size.xl4}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl4}","fontSize":"{font-size.xl4}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xl4}","fontSize":"{font-size.xl4}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"d3":{"light":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.light}","lineHeight":"{line-height.xl5}","fontSize":"{font-size.xl5}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl5}","fontSize":"{font-size.xl5}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xl5}","fontSize":"{font-size.xl5}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"d2":{"light":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.light}","lineHeight":"{line-height.xl6}","fontSize":"{font-size.xl6}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl6}","fontSize":"{font-size.xl6}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xl6}","fontSize":"{font-size.xl6}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}},"d1":{"light":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.light}","lineHeight":"{line-height.xl7}","fontSize":"{font-size.xl7}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"normal":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.regular}","lineHeight":"{line-height.xl7}","fontSize":"{font-size.xl7}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"},"bold":{"$value":{"fontFamily":"{font-family.primary}","fontWeight":"{font-weight.semibold}","lineHeight":"{line-height.xl7}","fontSize":"{font-size.xl7}","letterSpacing":"{letter-spacing.0}","paragraphSpacing":"{paragraph-spacing.display}","textCase":"{text-case.none}","textDecoration":"{text-decoration.none}"},"$type":"typography"}}}}');

/***/ }),

/***/ "./src/tokens/typography/typeface.json":
/*!*********************************************!*\
  !*** ./src/tokens/typography/typeface.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"font-family":{"primary":{"$value":"Inter","$type":"fontFamilies"}},"font-weight":{"regular":{"$value":"Regular","$type":"fontWeights"},"bold":{"$value":"Bold","$type":"fontWeights"},"semibold":{"$value":"Semi Bold","$type":"fontWeights"},"light":{"$value":"Light","$type":"fontWeights"},"italic":{"$value":"Italic","$type":"fontWeights"}},"text-case":{"none":{"$value":"none","$type":"textCase"},"uppercase":{"$value":"uppercase","$type":"textCase"}},"text-decoration":{"none":{"$value":"none","$type":"textDecoration"},"underline":{"$value":"underline","$type":"textDecoration"}}}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_figma_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/figma-colors */ "./src/utils/figma-colors.ts");
/* harmony import */ var _color_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-tokens */ "./src/color-tokens.ts");
/* harmony import */ var _utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/figma-variables */ "./src/utils/figma-variables.ts");
/* harmony import */ var _utils_sort_palette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/sort-palette */ "./src/utils/sort-palette.ts");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chroma-js */ "./node_modules/chroma-js/chroma.js");
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _spacing_tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./spacing-tokens */ "./src/spacing-tokens.ts");
/* harmony import */ var _radii_tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./radii-tokens */ "./src/radii-tokens.ts");
/* harmony import */ var _typescale_tokens__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./typescale-tokens */ "./src/typescale-tokens.ts");
/* harmony import */ var _sizing_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sizing-tokens */ "./src/sizing-tokens.ts");
/* harmony import */ var _effect_tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./effect-tokens */ "./src/effect-tokens.ts");
/* harmony import */ var _utils_sort_sizes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/sort-sizes */ "./src/utils/sort-sizes.ts");
/* harmony import */ var _utils_figma_text_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/figma-text-styles */ "./src/utils/figma-text-styles.ts");
/* harmony import */ var _color_generators_render_accents__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./color-generators/render-accents */ "./src/color-generators/render-accents.ts");
/* harmony import */ var _color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./color-generators/accent-palette-generator */ "./src/color-generators/accent-palette-generator.ts");
/* harmony import */ var _color_generators_neutrals_palette_generator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./color-generators/neutrals-palette-generator */ "./src/color-generators/neutrals-palette-generator.ts");
/* harmony import */ var _utils_variables_to_styles__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/variables-to-styles */ "./src/utils/variables-to-styles.ts");
/* harmony import */ var _utils_token_references__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/token-references */ "./src/utils/token-references.ts");
/* harmony import */ var _utils_text_to_title_case__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/text-to-title-case */ "./src/utils/text-to-title-case.ts");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./defaults */ "./src/defaults.ts");
/* harmony import */ var _fix_layers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./fix-layers */ "./src/fix-layers.ts");
/* harmony import */ var _utils_figma_effect_styles__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/figma-effect-styles */ "./src/utils/figma-effect-styles.ts");
/* harmony import */ var _utils_update_elevation_components__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/update-elevation-components */ "./src/utils/update-elevation-components.ts");
/* harmony import */ var _utils_flatten_object__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./utils/flatten-object */ "./src/utils/flatten-object.ts");
/* harmony import */ var _utils_round_two_digits__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./utils/round-two-digits */ "./src/utils/round-two-digits.ts");
/* harmony import */ var _utils_swap_variables__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./utils/swap-variables */ "./src/utils/swap-variables.ts");
/* harmony import */ var _utils_export_style_templates__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./utils/export-style-templates */ "./src/utils/export-style-templates.ts");
/* harmony import */ var _utils_import_style_templates__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./utils/import-style-templates */ "./src/utils/import-style-templates.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



























console.clear();
let globalTokens;
const collectionNames = new Map([
    ["brandColors", "Color Theme" /*"Brand Color"*/],
    ["themeColors", "Color Theme"],
    ["componentColors", "Component Tokens"],
    ["spacing", "Spacing"],
    ["radii", "Radii"],
    ["iconScale", "Icon Scale"],
]);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(_typescale_tokens__WEBPACK_IMPORTED_MODULE_7__.getFontDetails().map((item) => __awaiter(void 0, void 0, void 0, function* () { return yield figma.loadFontAsync(item); })));
    if (figma.command === "import") {
        figma.showUI(__uiFiles__["import"], {
            width: 560,
            height: 720,
            themeColors: true,
        });
    }
    if (figma.command === "export") {
        figma.showUI(__uiFiles__["export"], {
            width: 500,
            height: 500,
            themeColors: true,
        });
    }
    if (figma.command == "bindToStyles") {
        (0,_utils_variables_to_styles__WEBPACK_IMPORTED_MODULE_15__.bindVariablesAndStyles)();
        figma.closePlugin();
    }
    if (figma.command == "updateElevationComponents") {
        (0,_utils_update_elevation_components__WEBPACK_IMPORTED_MODULE_21__.updateElevationComponents)(_effect_tokens__WEBPACK_IMPORTED_MODULE_9__.getElevationTokens());
        figma.closePlugin();
    }
    if (figma.command == "setPlayground") {
        const isPlayground = figma.root.getPluginData('SDSPlayground') !== '';
        figma.root.setPluginData('SDSPlayground', isPlayground ? '' : 'true');
        figma.notify(`${isPlayground ? '❎' : '✅'} Playground is ${isPlayground ? 'disabled' : 'enabled'}`);
        figma.closePlugin();
    }
    if (figma.command == "fixLayers") {
        yield (0,_fix_layers__WEBPACK_IMPORTED_MODULE_19__.processComponents)();
        figma.closePlugin();
    }
    if (figma.command == "exportStyleTemplates") {
        yield (0,_utils_export_style_templates__WEBPACK_IMPORTED_MODULE_25__.exportStyleTemplates)();
        figma.closePlugin('Style templates exported');
    }
    if (figma.command == "importStyleTemplates") {
        yield (0,_utils_import_style_templates__WEBPACK_IMPORTED_MODULE_26__.importStyleTemplates)();
        figma.closePlugin('Style templates imported');
    }
    if (figma.command == "swapVariables") {
        const layersCount = yield (0,_utils_swap_variables__WEBPACK_IMPORTED_MODULE_24__.swapVariables)().catch(err => {
            console.error(err);
            figma.notify(err, { error: true });
            throw err;
        });
        figma.closePlugin(`${layersCount} layer(s) processed. `);
    }
}))();
figma.ui.onmessage = (eventData) => {
    console.log("code received message", eventData);
    const params = eventData.params;
    if (eventData.type === "IMPORT") {
        initiateImport(params);
        importAllTokens(params);
    }
    else if (eventData.type === "EXPORT") {
        // exportToJSON(eventData.format);
    }
    else if (eventData.type === "ALERT") {
        figma.notify(`${eventData.params}`);
    }
    else if (eventData.type === "RENDER_ACCENTS") {
        const lightAccentTokens = (0,_color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__.generateGlobalAccentPalette)('light', params);
        const darkAccentTokens = (0,_color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__.generateGlobalAccentPalette)('dark', params);
        const frameLightPalette = (0,_color_generators_render_accents__WEBPACK_IMPORTED_MODULE_12__.renderAccents)(lightAccentTokens, 'Light Mode Accents');
        const frameDarkPalette = (0,_color_generators_render_accents__WEBPACK_IMPORTED_MODULE_12__.renderAccents)(darkAccentTokens, 'Dark Mode Accents');
        frameDarkPalette.y = frameLightPalette.height + 64;
    }
    else if (eventData.type === "RENDER_NEUTRALS") {
        const neutralTokens = (0,_color_generators_neutrals_palette_generator__WEBPACK_IMPORTED_MODULE_14__.generateNeutrals)(params);
        (0,_color_generators_neutrals_palette_generator__WEBPACK_IMPORTED_MODULE_14__.renderNeutrals)(neutralTokens, `Global Neutrals`);
    }
    else if (eventData.type === "LOADED") {
        try {
            const pluginData = figma.root.getPluginData('SDS');
            const data = JSON.parse(pluginData);
            figma.ui.postMessage(data);
        }
        catch (e) {
            console.warn('failed to read plugin data', e);
        }
    }
    else if (eventData.type == 'RESIZE') {
        switch (params.baseFontSize) {
            default: {
                figma.ui.resize(500, 800);
                break;
            }
            case 'large': {
                figma.ui.resize(560, 800);
                break;
            }
        }
    }
};
function initiateImport(params) {
    getCollectionAndPrepareTokens({
        collectionName: collectionNames.get('componentColors'),
        modeName: "Default",
        data: (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getComponentColors)(),
        sortFn: _utils_sort_palette__WEBPACK_IMPORTED_MODULE_3__.sortColorTokens
    });
    getCollectionAndPrepareTokens({
        collectionName: collectionNames.get('themeColors'),
        modeName: "Light Base",
        data: (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getThemeColors)('lightBase', params),
        sortFn: _utils_sort_palette__WEBPACK_IMPORTED_MODULE_3__.sortColorTokens
    });
    // getCollectionAndPrepareTokens({
    //     collectionName: collectionNames.get('brandColors'),
    //     modeName: toTitleCase(params.primary),
    //     data: getBrandColors(params.primary),
    //     sortFn: sortColorTokens
    // });
    getCollectionAndPrepareTokens({
        collectionName: collectionNames.get('spacing'),
        modeName: (0,_utils_text_to_title_case__WEBPACK_IMPORTED_MODULE_17__.toTitleCase)(params.spacing),
        data: _spacing_tokens__WEBPACK_IMPORTED_MODULE_5__[params.spacing],
        sortFn: _utils_sort_sizes__WEBPACK_IMPORTED_MODULE_10__.sortSizeTokens,
    });
    getCollectionAndPrepareTokens({
        collectionName: collectionNames.get('radii'),
        modeName: (0,_utils_text_to_title_case__WEBPACK_IMPORTED_MODULE_17__.toTitleCase)(params.radii),
        data: _radii_tokens__WEBPACK_IMPORTED_MODULE_6__[params.radii],
        sortFn: _utils_sort_sizes__WEBPACK_IMPORTED_MODULE_10__.sortSizeTokens,
    });
    getCollectionAndPrepareTokens({
        collectionName: collectionNames.get('iconScale'),
        modeName: (0,_utils_text_to_title_case__WEBPACK_IMPORTED_MODULE_17__.toTitleCase)("base"),
        data: _sizing_tokens__WEBPACK_IMPORTED_MODULE_8__.base,
        sortFn: _utils_sort_sizes__WEBPACK_IMPORTED_MODULE_10__.sortSizeTokens,
    });
}
function generateVariablesForPlayground(data, isPlayground = false) {
    if (isPlayground === false) {
        return;
    }
    ;
    const contrastRatios = {};
    const primaryColorHUE = data.primary;
    const shades = (0,_color_generators_accent_palette_generator__WEBPACK_IMPORTED_MODULE_13__.getGlobalAccent)(data[primaryColorHUE], data.accentSaturation, data.accentMinLuminance, data.accentMidLuminance, data.accentMaxLuminance);
    Object.entries(shades).forEach(([name, token]) => {
        token.scopes = [];
        let chromaColor = chroma_js__WEBPACK_IMPORTED_MODULE_4___default()(token.$value);
        const contrast1 = (0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_23__.roundTwoDigits)(chroma_js__WEBPACK_IMPORTED_MODULE_4___default().contrast(chroma_js__WEBPACK_IMPORTED_MODULE_4___default().hsl([0, 0, 1]), chromaColor));
        const contrast2 = (0,_utils_round_two_digits__WEBPACK_IMPORTED_MODULE_23__.roundTwoDigits)(chroma_js__WEBPACK_IMPORTED_MODULE_4___default().contrast(chroma_js__WEBPACK_IMPORTED_MODULE_4___default().hsl([0, 0, 0.22]), chromaColor));
        contrastRatios[`_accent_${name}_vs_light`] = {
            "$value": contrast1.toString(),
            "$type": "string",
            "scopes": []
        };
        contrastRatios[`_accent_${name}_vs_dark`] = {
            "$value": contrast2.toString(),
            "$type": "string",
            "scopes": []
        };
    });
    importVariables({
        collectionName: "_Playground",
        modeName: "Default",
        data: Object.assign(Object.assign(Object.assign({}, (0,_utils_flatten_object__WEBPACK_IMPORTED_MODULE_22__.flattenObject)({ '_global-accent': shades })), contrastRatios), { '_primary-color-hue': {
                "$value": data[data.primary].toString(),
                "$type": "string",
                "scopes": []
            }, '_primary-color': {
                "$value": data.primary,
                "$type": "string",
                "scopes": []
            }, '_success-color': {
                "$value": data.success,
                "$type": "string",
                "scopes": []
            }, '_warning-color': {
                "$value": data.warning,
                "$type": "string",
                "scopes": []
            }, '_danger-color': {
                "$value": data.danger,
                "$type": "string",
                "scopes": []
            }, '_info-color': {
                "$value": data.info,
                "$type": "string",
                "scopes": []
            } })
    });
}
function importAllTokens(params) {
    figma.root.setPluginData('SDS', JSON.stringify(params));
    const isPlayground = figma.root.getPluginData('SDSPlayground') !== '';
    generateVariablesForPlayground(params, isPlayground);
    importColorTheme(params);
    // importVariables({
    //     collectionName: collectionNames.get('brandColors'),
    //     modeName: toTitleCase(params.primary),
    //     data: getBrandColors(params.primary)
    // });
    importVariables({
        collectionName: collectionNames.get('componentColors'),
        modeName: "Default",
        data: (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getComponentColors)()
    });
    importSizeTokens({
        type: 'spacing',
        collectionName: collectionNames.get('spacing'),
        params: params,
        defaultMode: params.spacing,
        defaultOrder: _defaults__WEBPACK_IMPORTED_MODULE_18__.spacingSizeName,
        tokens: _spacing_tokens__WEBPACK_IMPORTED_MODULE_5__
    });
    importSizeTokens({
        type: 'radii',
        collectionName: collectionNames.get('radii'),
        params: params,
        defaultMode: params.radii,
        defaultOrder: _defaults__WEBPACK_IMPORTED_MODULE_18__.radiiSizeName,
        tokens: _radii_tokens__WEBPACK_IMPORTED_MODULE_6__
    });
    importSizeTokens({
        type: 'typeScale',
        collectionName: 'Type Scale',
        params: params,
        defaultMode: params.baseFontSize,
        defaultOrder: _defaults__WEBPACK_IMPORTED_MODULE_18__.typographySizeName,
        tokens: _typescale_tokens__WEBPACK_IMPORTED_MODULE_7__,
        isSingleMode: true
    });
    // ICONS SCALE
    importSizeTokens({
        type: 'iconScale',
        collectionName: collectionNames.get('iconScale'),
        params: params,
        defaultMode: 'base',
        defaultOrder: _defaults__WEBPACK_IMPORTED_MODULE_18__.iconSizeName,
        tokens: _sizing_tokens__WEBPACK_IMPORTED_MODULE_8__
    });
    globalTokens = Object.assign(Object.assign({}, globalTokens), _typescale_tokens__WEBPACK_IMPORTED_MODULE_7__.getTypograohyTokens(params.baseFontSize, params.typeScale));
    (0,_utils_figma_text_styles__WEBPACK_IMPORTED_MODULE_11__.importTextStyles)(_typescale_tokens__WEBPACK_IMPORTED_MODULE_7__.getTypograohyTokens(params.baseFontSize, params.typeScale));
    importEffects();
    figma.notify("Figma variables has been imported");
    figma.ui.postMessage("importCompleted");
}
function importEffects() {
    // import effects for default theme which is light one
    (0,_utils_figma_effect_styles__WEBPACK_IMPORTED_MODULE_20__.importEffectStyles)(_effect_tokens__WEBPACK_IMPORTED_MODULE_9__.elevation);
    (0,_utils_update_elevation_components__WEBPACK_IMPORTED_MODULE_21__.updateElevationComponents)(_effect_tokens__WEBPACK_IMPORTED_MODULE_9__.getElevationTokens());
}
function importColorTheme(params) {
    let themeColors = (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getThemeColors)('lightBase', params);
    globalTokens = Object.assign(Object.assign(Object.assign({}, (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getGlobalNeutrals)()), (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getComponentColors)()), themeColors);
    console.log('Importing Light Base', themeColors);
    importVariables({
        collectionName: collectionNames.get('themeColors'),
        modeName: "Light Base",
        data: themeColors,
        sortFn: _utils_sort_palette__WEBPACK_IMPORTED_MODULE_3__.sortColorTokens
    });
    themeColors = (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getThemeColors)('darkBase', params);
    globalTokens = Object.assign(globalTokens, themeColors);
    console.log('Importing Dark Base', themeColors);
    importVariables({
        collectionName: collectionNames.get('themeColors'),
        modeName: "Dark Base",
        data: themeColors
    });
    themeColors = (0,_color_tokens__WEBPACK_IMPORTED_MODULE_1__.getThemeColors)('darkElevated', params);
    globalTokens = Object.assign(globalTokens, themeColors);
    console.log('Importing Dark Elevated', themeColors);
    importVariables({
        collectionName: collectionNames.get('themeColors'),
        modeName: "Dark Elevated",
        data: themeColors
    });
}
function importSizeTokens(data) {
    const tokens = data.tokens;
    const isSingleMode = data.isSingleMode || false;
    const singleCollection = data.params.singleCollection;
    const defaultMode = data.defaultMode;
    const defaultOrder = data.defaultOrder.filter(item => item != defaultMode);
    defaultOrder.splice(0, 0, defaultMode);
    defaultOrder.length = isSingleMode ? 1 : defaultOrder.length;
    defaultOrder.forEach((modeName, index) => {
        importVariables({
            collectionName: singleCollection ? "UI Scale" : data.collectionName,
            modeName: (0,_utils_text_to_title_case__WEBPACK_IMPORTED_MODULE_17__.toTitleCase)(modeName),
            modeIndex: index,
            data: tokens[modeName],
            isSingleMode: isSingleMode
        });
    });
}
function getCollectionAndPrepareTokens({ collectionName, modeName, modeIndex = -1, data, sortFn = null, isSingleMode = false }) {
    let modeId;
    const { collection, isNew } = (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.getFigmaCollection)(collectionName);
    if (isNew || isSingleMode) {
        modeId = collection.modes[0].modeId;
        collection.renameMode(modeId, modeName);
    }
    else {
        const mode = modeIndex < 0 ? collection.modes.find(mode => mode.name === modeName) : collection.modes[modeIndex];
        if (!mode) {
            try {
                modeId = collection.addMode(modeName);
            }
            catch (e) {
                figma.notify("Cannot create more than one mode. Is your file under Pro team or org plan?");
                console.error(e);
                figma.closePlugin();
            }
        }
        else {
            modeId = mode.modeId;
            collection.renameMode(modeId, modeName);
        }
    }
    let transformedTokens = Object.entries(data).map(([key, object]) => {
        return Object.assign({ name: key }, object);
    });
    let sortedTokens = transformedTokens;
    if (sortFn != null) {
        sortedTokens = transformedTokens.sort(sortFn);
    }
    if (isNew) {
        // create variables straight away so there is a way to make 
        // references / aliases without additional pass
        sortedTokens.forEach(token => {
            const type = (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.resolveVariableType)(token.$type);
            (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.setFigmaVariable)(collection, modeId, type, token.name);
        });
    }
    return {
        tokens: sortedTokens,
        collection,
        modeId,
        type: data.$type
    };
}
function importVariables({ collectionName, modeName, modeIndex = -1, data, sortFn = null, isSingleMode = false }) {
    const { tokens, collection, modeId, type } = getCollectionAndPrepareTokens({ collectionName, modeName, modeIndex, data, sortFn, isSingleMode });
    return tokens.map((token) => {
        return processToken({
            collection,
            modeId,
            type: token.$type,
            variableName: token.name,
            token: token
        });
    });
}
function processToken({ collection, modeId, type, variableName, token }) {
    type = type || token.$type;
    // if key is a meta field, move on
    if (variableName.charAt(0) === "$") {
        return;
    }
    if (token.$value !== undefined) {
        if (type === "color") {
            let colorValue = (0,_utils_figma_colors__WEBPACK_IMPORTED_MODULE_0__.parseColorToken)(token, globalTokens);
            let referenceVar = (0,_utils_token_references__WEBPACK_IMPORTED_MODULE_16__.findVariableByReferences)(token.$value.trim());
            if (referenceVar) {
                colorValue = {
                    type: "VARIABLE_ALIAS",
                    id: referenceVar.id,
                };
            }
            return (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.setFigmaVariable)(collection, modeId, "COLOR", variableName, colorValue, token.scopes || ['ALL_SCOPES'], token.description || null);
        }
        if (type === "number") {
            return (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.setFigmaVariable)(collection, modeId, "FLOAT", variableName, parseInt(token.$value), token.scopes, token.description || null);
        }
        try {
            return (0,_utils_figma_variables__WEBPACK_IMPORTED_MODULE_2__.setFigmaVariable)(collection, modeId, "STRING", variableName, (0,_utils_token_references__WEBPACK_IMPORTED_MODULE_16__.parseReferenceGlobal)(token.$value, globalTokens), token.scopes, token.description || null);
        }
        catch (e) {
            console.error("unsupported type", type, token);
        }
    }
    else {
        console.warn('recursion in ', token);
    }
}
function exportToJSON(colorFormat) {
    const collections = figma.variables.getLocalVariableCollections();
    const files = [];
    collections.forEach((collection) => files.push(...exportCollection(collection, colorFormat)));
    figma.ui.postMessage({ type: "EXPORT_RESULT", files });
}
function exportCollection({ name, modes, variableIds }, colorFormat) {
    const files = [];
    modes.forEach((mode) => {
        const file = { fileName: `${name}.${mode.name}.tokens.json`, body: {} };
        variableIds.sort().forEach((variableId) => {
            const { name, resolvedType, valuesByMode } = figma.variables.getVariableById(variableId);
            console.log(name);
            const value = valuesByMode[mode.modeId];
            if (value !== undefined && ["COLOR", "FLOAT"].includes(resolvedType)) {
                let obj = file.body;
                name.split("/").forEach((groupName) => {
                    obj[groupName] = obj[groupName] || {};
                    obj = obj[groupName];
                });
                obj.$type = resolvedType === "COLOR" ? "color" : "number";
                if (value.type === "VARIABLE_ALIAS") {
                    obj.$value = `{${figma.variables
                        .getVariableById(value.id)
                        .name.replace(/\//g, ".")}}`;
                }
                else {
                    obj.$value = resolvedType === "COLOR" ? (0,_utils_figma_colors__WEBPACK_IMPORTED_MODULE_0__.convertFigmaColorToRgb)(value, colorFormat) : value;
                }
            }
        });
        files.push(file);
    });
    return files;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlEMEQ7QUFDbkQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix1RUFBb0I7QUFDbEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4QjtBQUNBLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkZBQTJGO0FBQzNGLG1HQUFtRztBQUNuRyxtR0FBbUc7QUFDbkcsbUdBQW1HO0FBQ25HLG1HQUFtRztBQUNuRyxtR0FBbUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUVBQXFFO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEseUNBQXlDO0FBQ3pDLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFOztBQUVBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsMERBQTBEO0FBQzFELFVBQVU7QUFDVjtBQUNBLDBEQUEwRDtBQUMxRCxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IscURBQXFELFdBQVc7QUFDeEY7QUFDQSxvREFBb0QsZUFBZTtBQUNuRSx5Q0FBeUMsa0JBQWtCO0FBQzNEO0FBQ0EsMkNBQTJDLHdCQUF3QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGNBQWM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMscUNBQXFDO0FBQ3JDO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaUJBQWlCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0Msd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0dBQW9HO0FBQ3BHLHdHQUF3RztBQUN4RztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUEsZ0NBQWdDOztBQUVoQzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDOztBQUV2Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLG9CQUFvQixPQUFPO0FBQzlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxpQkFBaUI7QUFDNUU7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZCw4QkFBOEIsS0FBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCw2QkFBNkI7QUFDeEYsNERBQTRELG9DQUFvQztBQUNoRywyREFBMkQseUJBQXlCO0FBQ3BGO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBLGNBQWM7QUFDZDs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLDJFQUEyRSw0Q0FBNEM7O0FBRXZILGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUseUJBQXlCO0FBQ3BHO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLG9EQUFvRCxjQUFjO0FBQ2xFOztBQUVBO0FBQ0EsbURBQW1ELGtCQUFrQjtBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrQkFBK0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLHdCQUF3QjtBQUNuRTtBQUNBO0FBQ0EsZ0RBQWdELGlCQUFpQjtBQUNqRTtBQUNBLHdEQUF3RCw2Q0FBNkM7QUFDckc7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGtEQUFrRCxpQkFBaUI7QUFDbkU7QUFDQSx3REFBd0QsaUZBQWlGO0FBQ3pJO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLGtEQUFrRCxpQkFBaUI7QUFDbkU7QUFDQSx3REFBd0QsK0hBQStIO0FBQ3ZMO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsMkNBQTJDLDRFQUE0RSxPQUFPO0FBQ3RMO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0M7QUFDaEMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxnQ0FBZ0M7QUFDaEM7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0M7O0FBRWhDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGFBQWE7O0FBRXBFLHlCQUF5Qjs7QUFFekI7O0FBRUEsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEM7QUFDQSwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQTZDO0FBQzdDO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxTQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsYUFBYTtBQUNoRjtBQUNBLDRCQUE0Qiw4QkFBOEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw2QkFBNkIsaUVBQWlFO0FBQzlGLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRCxpQkFBaUI7QUFDdEU7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFGQUFxRjtBQUNoSCxZQUFZLG1DQUFtQyxrQ0FBa0MsaUVBQWlFO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLHdCQUF3QiwrQ0FBK0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0VBQWU7QUFDNUMsK0JBQStCLGtGQUF3QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0VBQWdCO0FBQ25DO0FBQ0E7QUFDQSxtQkFBbUIsd0VBQWdCO0FBQ25DO0FBQ0E7QUFDQSxtQkFBbUIsd0VBQWdCLDZDQUE2Qyw4RUFBb0I7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsOEJBQThCO0FBQ3pEO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBO0FBQ0EsdUJBQXVCLGFBQWEsS0FBSyxHQUFHLFVBQVU7QUFDdEQ7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRTtBQUNyQztBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0EsNERBQTRELDJFQUFzQjtBQUNsRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL2NvbG9yLWdlbmVyYXRvcnMvYWNjZW50LXBhbGV0dGUtZ2VuZXJhdG9yLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvY29sb3ItZ2VuZXJhdG9ycy9uZXV0cmFscy1wYWxldHRlLWdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL2NvbG9yLWdlbmVyYXRvcnMvcmVuZGVyLWFjY2VudHMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy9jb2xvci1nZW5lcmF0b3JzL3N3YXRjaGVzLWdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL2NvbG9yLXRva2Vucy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL2RlZmF1bHRzLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvZWZmZWN0LXRva2Vucy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL2ZpeC1sYXllcnMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy9yYWRpaS10b2tlbnMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy9zaXppbmctdG9rZW5zLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvc3BhY2luZy10b2tlbnMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy90eXBlc2NhbGUtdG9rZW5zLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvY2xvbmUudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9kZWxheS1hc3luYy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL3V0aWxzL2V4cG9ydC1zdHlsZS10ZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9maWdtYS1jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9maWdtYS1lZmZlY3Qtc3R5bGVzLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvZmlnbWEtdGV4dC1zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9maWdtYS12YXJpYWJsZXMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9mbGF0dGVuLW9iamVjdC50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL3V0aWxzL2ltcG9ydC1zdHlsZS10ZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL3NyYy91dGlscy9yb3VuZC10d28tZGlnaXRzLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvc29ydC1wYWxldHRlLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvc29ydC1zaXplcy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL3V0aWxzL3N3YXAtdmFyaWFibGVzLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvdGV4dC10by10aXRsZS1jYXNlLnRzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvdXRpbHMvdG9rZW4tcmVmZXJlbmNlcy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL3V0aWxzL3VwZGF0ZS1lbGV2YXRpb24tY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyLy4vc3JjL3V0aWxzL3ZhcmlhYmxlcy10by1zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci8uL25vZGVfbW9kdWxlcy9jaHJvbWEtanMvY2hyb21hLmpzIiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS1kcy1idWlsZGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtZHMtYnVpbGRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLWRzLWJ1aWxkZXIvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hyb21hIGZyb20gXCJjaHJvbWEtanNcIjtcbmltcG9ydCB7IHBhcnNlUmVmZXJlbmNlR2xvYmFsIH0gZnJvbSBcIi4uL3V0aWxzL3Rva2VuLXJlZmVyZW5jZXNcIjtcbmltcG9ydCB7IGRlZmF1bHRBY2NlbnRIVUVzLCBzeXN0ZW1BY2NlbnRMaXN0IH0gZnJvbSBcIi4uL2RlZmF1bHRzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsIGNvbG9yTmFtZSkge1xuICAgIGlmICh0aGVtZSA9PSAnbGlnaHQnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcIjEwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJyZ2JhKHsyMDB9LCAwLjEyNSlcIixcbiAgICAgICAgICAgICAgICBcIiR0eXBlXCI6IFwiY29sb3JcIixcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGBTdWJ0bGUgc2VtaXRyYW5zcGFyZW50IGFjY2VudGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIjIwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJyZ2JhKHsyMDB9LCAwLjMzKVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYExpZ2h0IHNlbWl0cmFuc3BhcmVudCBhY2NlbnRgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIzMDBcIjoge1xuICAgICAgICAgICAgICAgIFwiJHZhbHVlXCI6IFwiezMwMH1cIixcbiAgICAgICAgICAgICAgICBcIiR0eXBlXCI6IFwiY29sb3JcIixcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGBOb24gdGV4dHVhbCBlbGVtZW50c2BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIjQwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJ7NDAwfVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYEJhc2UgYmFja2dyb3VuZCBjb2xvcmBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIjUwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJ7NTAwfVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYFRleHQgb24gbGlnaHQgc3VyZmFjZWBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIjYwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJ7MTAwfVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYFRleHQgb24gZGFyayBzdXJmYWNlYFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhlbWUgPT0gJ2RhcmsnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcIjEwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJyZ2JhKHsyMDB9LCAwLjIwKVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYFN1YnRsZSBzZW1pdHJhbnNwYXJlbnQgYWNjZW50YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiMjAwXCI6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBcInJnYmEoezIwMH0sIDAuNDUpXCIsXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBgTGlnaHQgc2VtaXRyYW5zcGFyZW50IGFjY2VudGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIjMwMFwiOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogXCJ7MzAwfVwiLFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJjb2xvclwiLFxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogYE5vbiB0ZXh0dWFsIGVsZW1lbnRzYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiNDAwXCI6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBcIns0MDB9XCIsXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBgQmFzZSBiYWNrZ3JvdW5kIGNvbG9yYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiNTAwXCI6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBcInsxMDB9XCIsXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBgVGV4dCBvbiBsaWdodCBzdXJmYWNlYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiNjAwXCI6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBcInsxMDB9XCIsXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBgVGV4dCBvbiBkYXJrIHN1cmZhY2VgXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlbWU6ICR7dGhlbWV9IGlzIGludmFsaWRgKTtcbn1cbmZ1bmN0aW9uIGdldENvbG9yUGFyYW1zKHRoZW1lLCBwYXJhbXMpIHtcbiAgICBsZXQgY29sb3JQYXJhbXMgPSB7XG4gICAgICAgIHNhdHVyYXRpb246IHBhcmFtcy5hY2NlbnRTYXR1cmF0aW9uLFxuICAgICAgICBtaW5MdW1pbmFuY2U6IHBhcmFtcy5hY2NlbnRNaW5MdW1pbmFuY2UsXG4gICAgICAgIG1pZEx1bWluYW5jZTogcGFyYW1zLmFjY2VudE1pZEx1bWluYW5jZSxcbiAgICAgICAgbWF4THVtaW5hbmNlOiBwYXJhbXMuYWNjZW50TWF4THVtaW5hbmNlLFxuICAgIH07XG4gICAgaWYgKHRoZW1lID09ICdkYXJrJykge1xuICAgICAgICBjb2xvclBhcmFtcy5zYXR1cmF0aW9uID0gcGFyYW1zLmFjY2VudFNhdHVyYXRpb24gKiAwLjg1O1xuICAgICAgICAvLyBjb2xvclBhcmFtcy5tYXhMdW1pbmFuY2UgPSBwYXJhbXMuYWNjZW50TWF4THVtaW5hbmNlICogMC44NTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yUGFyYW1zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU3lzdGVtQWNjZW50UGFsZXR0ZSh0aGVtZSwgcGFyYW1zKSB7XG4gICAgY29uc3QgeyBzYXR1cmF0aW9uLCBtaW5MdW1pbmFuY2UsIG1pZEx1bWluYW5jZSwgbWF4THVtaW5hbmNlIH0gPSBnZXRDb2xvclBhcmFtcyh0aGVtZSwgcGFyYW1zKTtcbiAgICBsZXQgYWNjZW50cyA9IHtcbiAgICAgICAgcmVkOiBnZXRTaGFkZXNUZW1wbGF0ZSh0aGVtZSwgJ3JlZCcpLFxuICAgICAgICBhbWJlcjogZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsICdhbWJlcicpLFxuICAgICAgICBicm93bjogZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsICdicm93bicpLFxuICAgICAgICBncmVlbjogZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsICdncmVlbicpLFxuICAgICAgICB0ZWFsOiBnZXRTaGFkZXNUZW1wbGF0ZSh0aGVtZSwgJ3RlYWwnKSxcbiAgICAgICAgYmx1ZTogZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsICdibHVlJyksXG4gICAgICAgIGluZGlnbzogZ2V0U2hhZGVzVGVtcGxhdGUodGhlbWUsICdpbmRpZ28nKSxcbiAgICAgICAgdmlvbGV0OiBnZXRTaGFkZXNUZW1wbGF0ZSh0aGVtZSwgJ3Zpb2xldCcpLFxuICAgICAgICBwdXJwbGU6IGdldFNoYWRlc1RlbXBsYXRlKHRoZW1lLCAncHVycGxlJyksXG4gICAgICAgIHBpbms6IGdldFNoYWRlc1RlbXBsYXRlKHRoZW1lLCAncGluaycpXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBzY2FsZV0gb2YgT2JqZWN0LmVudHJpZXMoYWNjZW50cykpIHtcbiAgICAgICAgY29uc3QgaHVlID0gcGFyYW1zW25hbWVdO1xuICAgICAgICBjb25zdCBzaGFkZXMgPSBnZXRHbG9iYWxBY2NlbnQoaHVlLCBzYXR1cmF0aW9uLCBtaW5MdW1pbmFuY2UsIG1pZEx1bWluYW5jZSwgbWF4THVtaW5hbmNlKTtcbiAgICAgICAgYWNjZW50c1tuYW1lXSA9IGdldFRoZW1lU2NhbGUoc2NhbGUsIHNoYWRlcyk7XG4gICAgfVxuICAgIHJldHVybiBhY2NlbnRzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR2xvYmFsQWNjZW50UGFsZXR0ZSh0aGVtZSwgcGFyYW1zKSB7XG4gICAgY29uc3QgeyBzYXR1cmF0aW9uLCBtaW5MdW1pbmFuY2UsIG1pZEx1bWluYW5jZSwgbWF4THVtaW5hbmNlIH0gPSBnZXRDb2xvclBhcmFtcyh0aGVtZSwgcGFyYW1zKTtcbiAgICBsZXQgYWNjZW50cyA9IHt9O1xuICAgIHN5c3RlbUFjY2VudExpc3QuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgaHVlID0gcGFyYW1zW25hbWVdO1xuICAgICAgICBhY2NlbnRzW25hbWVdID0gZ2V0R2xvYmFsQWNjZW50KGh1ZSwgc2F0dXJhdGlvbiwgbWluTHVtaW5hbmNlLCBtaWRMdW1pbmFuY2UsIG1heEx1bWluYW5jZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFjY2VudHM7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsQWNjZW50KGh1ZSwgc2F0dXJhdGlvbiwgbWluTHVtaW5hbmNlLCBtaWRMaW1pbmFuY2UsIG1heEx1bWluYW5jZSwgc3RlcHMgPSA3KSB7XG4gICAgY29uc3QgcmFuZ2UgPSBnZXRSYW5nZU9mVGhyZWUoe1xuICAgICAgICBodWUsXG4gICAgICAgIHNhdHVyYXRpb24sXG4gICAgICAgIG1pbkx1bWluYW5jZSxcbiAgICAgICAgbWlkTGltaW5hbmNlLFxuICAgICAgICBtYXhMdW1pbmFuY2VcbiAgICB9KTtcbiAgICBjb25zdCBzaGFkZXMgPSBnZXRTY2FsZShyYW5nZSwgc3RlcHMpO1xuICAgIHJldHVybiBzaGFkZXM7XG59XG5mdW5jdGlvbiBnZXRUaGVtZVNjYWxlKGlucHV0LCBkaWN0aW9uYXJ5KSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5lbnRyaWVzKGlucHV0KS5mb3JFYWNoKChbc2hhZGVOdW1iZXIsIHRva2VuXSkgPT4ge1xuICAgICAgICB0b2tlbi4kdmFsdWUgPSBwYXJzZVJlZmVyZW5jZUdsb2JhbCh0b2tlbi4kdmFsdWUsIGRpY3Rpb25hcnkpO1xuICAgICAgICBvdXRwdXRbc2hhZGVOdW1iZXJdID0gdG9rZW47XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbi8qXG4gICAgY29sb3JzOiBnZXRSYW5nZU9mVGhyZWUoKVxuKi9cbmZ1bmN0aW9uIGdldFNjYWxlKGNvbG9ycywgY291bnQgPSA5KSB7XG4gICAgbGV0IHRva2VucyA9IHt9O1xuICAgIC8vIGNocm9tYSBzY2FsZSByZXR1cm5zIGFycmF5IG9mIGhleCB2YWx1ZXNcbiAgICBjb25zdCBzY2FsZSA9IGNocm9tYS5zY2FsZShjb2xvcnMpLmNvbG9ycyhjb3VudCwgJ2hleCcpO1xuICAgIHNjYWxlLmZvckVhY2goKGNvbG9yLCBpbmRleCkgPT4ge1xuICAgICAgICB0b2tlbnNbYCR7aW5kZXggKyAxfTAwYF0gPSB7XG4gICAgICAgICAgICAkdmFsdWU6IGNvbG9yLFxuICAgICAgICAgICAgJHR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICBwcml2YXRlOiB0cnVlXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2Vucztcbn1cbmZ1bmN0aW9uIGdldFJhbmdlT2ZUaHJlZSh7IGh1ZSwgc2F0dXJhdGlvbiwgbWluTHVtaW5hbmNlID0gMC4xLCBtaWRMaW1pbmFuY2UgPSAwLjE4LCBtYXhMdW1pbmFuY2UgPSAwLjI5IH0pIHtcbiAgICBsZXQgY29sb3IxID0gY2hyb21hLmhzbChbaHVlICogMC45Niwgc2F0dXJhdGlvbiAqIDAuOTUsIDAuNV0pXG4gICAgICAgIC5sdW1pbmFuY2UobWF4THVtaW5hbmNlKTtcbiAgICAvLyB0aGlzIG9uZSBhbHdheXMgNC41IDogMSBjb250cmFzdCByYXRpb1xuICAgIGxldCBjb2xvcjIgPSBjaHJvbWEuaHNsKFtodWUsIHNhdHVyYXRpb24gKiAxLCAwLjVdKVxuICAgICAgICAubHVtaW5hbmNlKG1pZExpbWluYW5jZSk7XG4gICAgbGV0IGNvbG9yMyA9IGNocm9tYS5oc2woW2h1ZSAqIDEuMDQsIHNhdHVyYXRpb24gKiAwLjk1LCAwLjVdKVxuICAgICAgICAubHVtaW5hbmNlKG1pbkx1bWluYW5jZSk7XG4gICAgcmV0dXJuIFtjb2xvcjEsIGNvbG9yMiwgY29sb3IzXTtcbn1cbmV4cG9ydCB7IGRlZmF1bHRBY2NlbnRIVUVzIGFzIGRlZmF1bHRBY2NlbnRDb2xvcnMgfTtcbiIsImltcG9ydCBjaHJvbWEgZnJvbSBcImNocm9tYS1qc1wiO1xuaW1wb3J0IHsgcmVuZGVyQ29sb3IgfSBmcm9tIFwiLi9zd2F0Y2hlcy1nZW5lcmF0b3JcIjtcbmZ1bmN0aW9uIGdldFNhdHVyYXRpb25Nb2RpZmllcihsaWdodG5lc3MpIHtcbiAgICAvLyB2aXN1YWwgcmVwcmVzZW50YXRpb25cbiAgICAvLyBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvMDJ1ZnJmc3V6eVxuICAgIGNvbnN0IG9mZnNldCA9IDUwOyAvLyBsaWd0aG5lc3MgcmFuZ2UgaXMgWzAsIDEwMF0sIGZvciBzYXR1cmF0aW9uIHdlIG5lZWQgdG8gb2Zmc2V0IHRoZSBjdXJ2ZSB0byBtYWtlIFstNTAsIDUwXSByYW5nZSBcbiAgICBjb25zdCBtYWduaXR1ZGUgPSA3MDsgLy8gc2V0cyBob3cgbXVjaCB0byBtb2RpZnksIGhpZ2hlciB2YWx1ZXMgb3V0cHV0cyBzbWFsbGVyIG1vZGlmaWVyXG4gICAgY29uc3Qgc2F0dXJhdGlvbk1vZGlmaWVyID0gMSArIChNYXRoLnBvdyhsaWdodG5lc3MgLSBvZmZzZXQsIDIpIC8gbWFnbml0dWRlIC0gTWF0aC5wb3cob2Zmc2V0LCAyKSAvIG1hZ25pdHVkZSkgLyAxMDA7XG4gICAgcmV0dXJuIHNhdHVyYXRpb25Nb2RpZmllcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU5ldXRyYWxzKHBhcmFtcykge1xuICAgIGNvbnN0IHsgaHVlID0gMjAwLCBzYXR1cmF0aW9uID0gMC4xLCBtaW4gPSA0LCBtYXggPSAxMDAsIGRpc3RhbmNlIH0gPSBwYXJhbXMgfHwge307XG4gICAgbGV0IHRva2VucyA9IHt9O1xuICAgIGxldCB2YWx1ZSA9IG1pbjtcbiAgICB3aGlsZSAodmFsdWUgPD0gbWF4KSB7XG4gICAgICAgIGNvbnN0IHNNb2QgPSAxIC8gTWF0aC5wb3coMS4zLCAobWF4IC0gdmFsdWUpIC8gMTAwKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSBjaHJvbWEuaHNsKGh1ZSwgc2F0dXJhdGlvbiAqIGdldFNhdHVyYXRpb25Nb2RpZmllcih2YWx1ZSksIHZhbHVlIC8gMTAwKTtcbiAgICAgICAgdG9rZW5zW2BncmV5LSR7dmFsdWV9YF0gPSB7XG4gICAgICAgICAgICAnJHZhbHVlJzogY29sb3IuaGV4KCksXG4gICAgICAgICAgICAnJHR5cGUnOiAnY29sb3InLFxuICAgICAgICAgICAgJ3ByaXZhdGUnOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHZhbHVlKys7XG4gICAgfVxuICAgIHRva2Vuc1tcImdyZXktMTAwXCJdID0ge1xuICAgICAgICBcIiR2YWx1ZVwiOiBcIiNGRkZGRkZcIixcbiAgICAgICAgJyR0eXBlJzogJ2NvbG9yJyxcbiAgICAgICAgJ3ByaXZhdGUnOiB0cnVlXG4gICAgfTtcbiAgICByZXR1cm4gdG9rZW5zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck5ldXRyYWxzKGNvbG9ycywgbmFtZSkge1xuICAgIGNvbnN0IGV4aXN0aW5nTm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRDaGlsZCgobm9kZSkgPT4gbm9kZS5uYW1lLnN0YXJ0c1dpdGgoJ0dsb2JhbCBOZXV0cmFscycpKTtcbiAgICBleGlzdGluZ05vZGUgPT09IG51bGwgfHwgZXhpc3RpbmdOb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBleGlzdGluZ05vZGUucmVtb3ZlKCk7XG4gICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICBmcmFtZS5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gMDtcbiAgICBmcmFtZS5uYW1lID0gbmFtZSB8fCAnR2xvYmFsIE5ldXRyYWxzJztcbiAgICBmcmFtZS54ID0gMDtcbiAgICBmcmFtZS55ID0gLTE1NjtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBjb2xvcl0gb2YgT2JqZWN0LmVudHJpZXMoY29sb3JzKSkge1xuICAgICAgICByZW5kZXJDb2xvcihmcmFtZSwgbmFtZSwgY29sb3IsIGNvbG9ycyk7XG4gICAgfVxuICAgIHJldHVybiBmcmFtZTtcbn1cbiIsImltcG9ydCB7IHJlbmRlclNoYWRlcyB9IGZyb20gXCIuL3N3YXRjaGVzLWdlbmVyYXRvclwiO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFjY2VudHMoY29sb3JzLCBuYW1lKSB7XG4gICAgY29uc3QgZXhpc3RpbmdOb2RlID0gZmlnbWEuY3VycmVudFBhZ2UuZmluZENoaWxkKChub2RlKSA9PiBub2RlLm5hbWUgPT0gKG5hbWUgfHwgJ0FjY2VudCBDb2xvdXJzJykpO1xuICAgIGV4aXN0aW5nTm9kZSA9PT0gbnVsbCB8fCBleGlzdGluZ05vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4aXN0aW5nTm9kZS5yZW1vdmUoKTtcbiAgICBsZXQgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgIGZyYW1lLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCc7XG4gICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgZnJhbWUuaXRlbVNwYWNpbmcgPSAxNjtcbiAgICBmcmFtZS5maWxscyA9IFtdO1xuICAgIGZyYW1lLm5hbWUgPSBuYW1lIHx8ICdBY2NlbnQgQ29sb3Vycyc7XG4gICAgZnJhbWUueCA9IDA7XG4gICAgZnJhbWUueSA9IDA7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgc2hhZGVzXSBvZiBPYmplY3QuZW50cmllcyhjb2xvcnMpKSB7XG4gICAgICAgIHJlbmRlclNoYWRlcyhmcmFtZSwgbmFtZSwgc2hhZGVzLCBjb2xvcnMpO1xuICAgIH1cbiAgICByZXR1cm4gZnJhbWU7XG59XG4iLCJpbXBvcnQgY2hyb21hIGZyb20gXCJjaHJvbWEtanNcIjtcbmltcG9ydCB7IHJvdW5kVHdvRGlnaXRzIH0gZnJvbSBcIi4uL3V0aWxzL3JvdW5kLXR3by1kaWdpdHNcIjtcbmltcG9ydCB7IHBhcnNlQ29sb3JUb2tlbiB9IGZyb20gXCIuLi91dGlscy9maWdtYS1jb2xvcnNcIjtcbmZ1bmN0aW9uIGdldEJvdW5kVmFyaWFibGVzKG5vZGUpIHtcbiAgICBjb25zdCBib3VuZFZhcmlhYmxlcyA9IE9iamVjdC5lbnRyaWVzKG5vZGUuYm91bmRWYXJpYWJsZXMpO1xuICAgIGZvciAoY29uc3QgW3Byb3BOYW1lLCBwcm9wVmFsdWVdIG9mIGJvdW5kVmFyaWFibGVzKSB7XG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgICBwcm9wVmFsdWUuZm9yRWFjaCgoYWxpYXMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzQm91bmRWYXJpYWJsZShmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkKGFsaWFzLmlkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB2YXJJZCA9IHByb3BWYWx1ZS5pZDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFySWQgIT0gJ3N0cmluZycpIHsgLy8gaXQgaXMgXG4gICAgICAgICAgICAgICAgdmFySWQgPSB2YXJJZC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2Nlc3NCb3VuZFZhcmlhYmxlKGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUJ5SWQodmFySWQpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHByb2Nlc3NCb3VuZFZhcmlhYmxlKHZhcmlhYmxlKSB7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2hhZGVzKHBhcmVudE5vZGUsIG5hbWUsIHNoYWRlcywgY29sb3JzKSB7XG4gICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICBmcmFtZS5yZXNpemVXaXRob3V0Q29uc3RyYWludHMoMzIwLCBmcmFtZS5oZWlnaHQpO1xuICAgIGZyYW1lLmxheW91dE1vZGUgPSBcIlZFUlRJQ0FMXCI7XG4gICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgZnJhbWUubmFtZSA9IG5hbWU7XG4gICAgZnJhbWUuZmlsbHMgPSBbXTtcbiAgICBnZXRCb3VuZFZhcmlhYmxlcyhmcmFtZSk7XG4gICAgZm9yIChjb25zdCBbc2hhZGVOYW1lLCBjb2xvcl0gb2YgT2JqZWN0LmVudHJpZXMoc2hhZGVzKSkge1xuICAgICAgICByZW5kZXJDb2xvcihmcmFtZSwgYGFjY2VudC8ke25hbWV9LyR7c2hhZGVOYW1lfWAsIGNvbG9yLCBjb2xvcnMpO1xuICAgIH1cbiAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICByZXR1cm4gcGFyZW50Tm9kZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDb2xvcihwYXJlbnROb2RlLCBuYW1lLCBjb2xvciwgY29sb3JzKSB7XG4gICAgbGV0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICBmcmFtZS5sYXlvdXRNb2RlID0gXCJWRVJUSUNBTFwiO1xuICAgIGZyYW1lLmxheW91dEFsaWduID0gJ1NUUkVUQ0gnO1xuICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gNDtcbiAgICBmcmFtZS5uYW1lID0gbmFtZTtcbiAgICBmcmFtZS52ZXJ0aWNhbFBhZGRpbmcgPSAxNjtcbiAgICBmcmFtZS5ob3Jpem9udGFsUGFkZGluZyA9IDIwO1xuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gcGFyc2VDb2xvclRva2VuKGNvbG9yLCBjb2xvcnMpO1xuICAgIGNvbnN0IGNocm9tYUNvbG9yID0gY2hyb21hLmdsKHIsIGcsIGIsIGEpO1xuICAgIGZyYW1lLmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgciwgZywgYiB9LCBvcGFjaXR5OiBhIH1dO1xuICAgIGNvbnN0IG9wYXF1ZUNvbG9yID0gY2hyb21hLmdsKHIsIGcsIGIsIDEpO1xuICAgIGNvbnN0IG1peGVkQ29sb3IgPSBjaHJvbWEubWl4KG9wYXF1ZUNvbG9yLCBcIndoaXRlXCIsIDEgLSBhKTtcbiAgICBjb25zb2xlLmxvZyhuYW1lLCBtaXhlZENvbG9yLnJnYmEoKSk7XG4gICAgbGV0IGNvbnRyYXN0ID0gW1xuICAgICAgICBjaHJvbWEuY29udHJhc3QoXCJ3aGl0ZVwiLCBtaXhlZENvbG9yKSxcbiAgICAgICAgY2hyb21hLmNvbnRyYXN0KGNocm9tYS5oc2woWzAsIDAsIDAuMjJdKSwgbWl4ZWRDb2xvcilcbiAgICBdO1xuICAgIGxldCBuYW1lUm93ID0gZ2V0Um93KGZyYW1lLCBjb250cmFzdFswXSA+IDIuNSk7XG4gICAgbGV0IGNvbnRyYXN0V2hpdGVSb3cgPSBnZXRSb3coZnJhbWUsIGNvbnRyYXN0WzBdID4gMi41KTtcbiAgICBsZXQgY29udHJhc3RCbGFja1JvdyA9IGdldFJvdyhmcmFtZSwgY29udHJhc3RbMF0gPiAyLjUpO1xuICAgIGxldCBoc2xSb3cgPSBnZXRSb3coZnJhbWUsIGNvbnRyYXN0WzBdID4gMi41KTtcbiAgICBsZXQgbHVtaW5hbmNlUm93ID0gZ2V0Um93KGZyYW1lLCBjb250cmFzdFswXSA+IDIuNSk7XG4gICAgLy8gYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJSZWd1bGFyXCIgfSk7XG4gICAgbmFtZVJvdy5yb290Lm5hbWUgPSBcIm5hbWVSb3dcIjtcbiAgICBjb250cmFzdFdoaXRlUm93LnJvb3QubmFtZSA9IFwiY29udHJhc3RXaGl0ZVJvd1wiO1xuICAgIGNvbnRyYXN0QmxhY2tSb3cucm9vdC5uYW1lID0gXCJjb250cmFzdEJsYWNrUm93XCI7XG4gICAgaHNsUm93LnJvb3QubmFtZSA9IFwiaHNsUm93XCI7XG4gICAgbHVtaW5hbmNlUm93LnJvb3QubmFtZSA9IFwibHVtaW5hbmNlUm93XCI7XG4gICAgY29udHJhc3RXaGl0ZVJvdy5sYWJlbE5vZGUuY2hhcmFjdGVycyA9IFwidnMgd2hpdGVcIjtcbiAgICBjb250cmFzdFdoaXRlUm93LnZhbHVlTm9kZS5jaGFyYWN0ZXJzID0gYCR7cm91bmRUd29EaWdpdHMoY29udHJhc3RbMF0pfWA7XG4gICAgY29udHJhc3RCbGFja1Jvdy5sYWJlbE5vZGUuY2hhcmFjdGVycyA9IFwidnMgYmxhY2tcIjtcbiAgICBjb250cmFzdEJsYWNrUm93LnZhbHVlTm9kZS5jaGFyYWN0ZXJzID0gYCR7cm91bmRUd29EaWdpdHMoY29udHJhc3RbMV0pfWA7XG4gICAgbmFtZVJvdy5sYWJlbE5vZGUuY2hhcmFjdGVycyA9IGB7Z2xvYmFsLiR7bmFtZS5yZXBsYWNlKC9cXC8vZywgXCIuXCIpfX1gO1xuICAgIG5hbWVSb3cudmFsdWVOb2RlLmNoYXJhY3RlcnMgPSBgIGA7XG4gICAgaHNsUm93LmxhYmVsTm9kZS5jaGFyYWN0ZXJzID0gXCJoc2xcIjtcbiAgICBoc2xSb3cudmFsdWVOb2RlLmNoYXJhY3RlcnMgPSBgJHtvdXRwdXRIU0woY2hyb21hQ29sb3IpLmpvaW4oXCIgXCIpfWA7XG4gICAgbHVtaW5hbmNlUm93LmxhYmVsTm9kZS5jaGFyYWN0ZXJzID0gXCJsdW1pbmFuY2VcIjtcbiAgICBsdW1pbmFuY2VSb3cudmFsdWVOb2RlLmNoYXJhY3RlcnMgPSBgJHtNYXRoLnJvdW5kKHJvdW5kVHdvRGlnaXRzKGNocm9tYUNvbG9yLmx1bWluYW5jZSgpKSAqIDEwMCl9JWA7XG4gICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgZnJhbWUucmVzaXplKDI0MCwgZnJhbWUuaGVpZ2h0KTtcbiAgICByZXR1cm4gcGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIGdldFJvdyhwYXJlbnROb2RlLCBpc1doaXRlKSB7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgIGZyYW1lLm5hbWUgPSBcInJvd1wiO1xuICAgIGZyYW1lLmxheW91dE1vZGUgPSBcIkhPUklaT05UQUxcIjtcbiAgICBmcmFtZS5sYXlvdXRBbGlnbiA9IFwiU1RSRVRDSFwiO1xuICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiRklYRURcIjtcbiAgICBmcmFtZS5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSBcIlNQQUNFX0JFVFdFRU5cIjtcbiAgICBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICBmcmFtZS5maWxscyA9IFtdO1xuICAgIHRleHROb2RlLm5hbWUgPSBcImxhYmVsXCI7XG4gICAgY29uc3QgdmFsdWVMYWJlbCA9IHRleHROb2RlLmNsb25lKCk7XG4gICAgdmFsdWVMYWJlbC5uYW1lID0gXCJ2YWx1ZS1sYWJlbFwiO1xuICAgIGZyYW1lLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBmcmFtZS5hcHBlbmRDaGlsZCh2YWx1ZUxhYmVsKTtcbiAgICBjb25zdCBjb2xvciA9IGlzV2hpdGUgPyB7XG4gICAgICAgIHI6IDEsIGc6IDEsIGI6IDFcbiAgICB9IDoge1xuICAgICAgICByOiAwLCBnOiAwLCBiOiAwXG4gICAgfTtcbiAgICB0ZXh0Tm9kZS5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yLCBvcGFjaXR5OiAwLjggfV07XG4gICAgdmFsdWVMYWJlbC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yIH1dO1xuICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsTm9kZTogdGV4dE5vZGUsIHZhbHVlTm9kZTogdmFsdWVMYWJlbCwgcm9vdDogZnJhbWVcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG91dHB1dEhTTChjaHJvbWFDb2xvcikge1xuICAgIGNvbnN0IFtoLCBzLCBsXSA9IGNocm9tYUNvbG9yLmhzbCgpO1xuICAgIHJldHVybiBbYCR7TWF0aC5yb3VuZChoKSB8fCAwfWRlZ2AsIGAke01hdGgucm91bmQocm91bmRUd29EaWdpdHMocykgKiAxMDApfSVgLCBgJHtNYXRoLnJvdW5kKHJvdW5kVHdvRGlnaXRzKGwpICogMTAwKX0lYF07XG59XG4iLCJpbXBvcnQgY29tcG9uZW50VG9rZW5zIGZyb20gJy4vdG9rZW5zL2NvbG9ycy9jb21wb25lbnRzL2NvbXBvbmVudC10b2tlbnMuanNvbic7XG5pbXBvcnQgcGFsZXR0ZUxpZ2h0Q29tbW9uIGZyb20gJy4vdG9rZW5zL2NvbG9ycy9zeXN0ZW0vbGlnaHQtY29tbW9uLmpzb24nO1xuaW1wb3J0IHBhbGV0dGVMaWdodDIgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9saWdodC0yLmpzb24nO1xuaW1wb3J0IHBhbGV0dGVMaWdodDMgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9saWdodC0zLmpzb24nO1xuaW1wb3J0IHBhbGV0dGVMaWdodDQgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9saWdodC00Lmpzb24nO1xuaW1wb3J0IHBhbGV0dGVEYXJrQ29tbW9uIGZyb20gJy4vdG9rZW5zL2NvbG9ycy9zeXN0ZW0vZGFyay1jb21tb24uanNvbic7XG5pbXBvcnQgcGFsZXR0ZURhcmtFbGV2YXRlZDIgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9kYXJrLWVsZXZhdGVkLTIuanNvbic7XG5pbXBvcnQgcGFsZXR0ZURhcmtFbGV2YXRlZDMgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9kYXJrLWVsZXZhdGVkLTMuanNvbic7XG5pbXBvcnQgcGFsZXR0ZURhcmtFbGV2YXRlZDQgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9kYXJrLWVsZXZhdGVkLTQuanNvbic7XG5pbXBvcnQgcGFsZXR0ZURhcmtCYXNlMiBmcm9tICcuL3Rva2Vucy9jb2xvcnMvc3lzdGVtL2RhcmstYmFzZS0yLmpzb24nO1xuaW1wb3J0IHBhbGV0dGVEYXJrQmFzZTMgZnJvbSAnLi90b2tlbnMvY29sb3JzL3N5c3RlbS9kYXJrLWJhc2UtMy5qc29uJztcbmltcG9ydCBwYWxldHRlRGFya0Jhc2U0IGZyb20gJy4vdG9rZW5zL2NvbG9ycy9zeXN0ZW0vZGFyay1iYXNlLTQuanNvbic7XG5pbXBvcnQgeyBmbGF0dGVuT2JqZWN0IH0gZnJvbSAnLi91dGlscy9mbGF0dGVuLW9iamVjdCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVN5c3RlbUFjY2VudFBhbGV0dGUgfSBmcm9tICcuL2NvbG9yLWdlbmVyYXRvcnMvYWNjZW50LXBhbGV0dGUtZ2VuZXJhdG9yJztcbmltcG9ydCB7IGdlbmVyYXRlTmV1dHJhbHMgfSBmcm9tICcuL2NvbG9yLWdlbmVyYXRvcnMvbmV1dHJhbHMtcGFsZXR0ZS1nZW5lcmF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFNlbWFudGljQWNjZW50cyB9IGZyb20gJy4vZGVmYXVsdHMnO1xubGV0IEdsb2JhbE5ldXRyYWxzO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbWFudGljQWNjZW50U2V0dGluZ3MoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRTZW1hbnRpY0FjY2VudHM7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsTmV1dHJhbHMoKSB7XG4gICAgcmV0dXJuIEdsb2JhbE5ldXRyYWxzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudENvbG9ycygpIHtcbiAgICByZXR1cm4gZmxhdHRlbk9iamVjdChjb21wb25lbnRUb2tlbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEJyYW5kQ29sb3JzKG5hbWUsIGFjY2VudFNoYWRlcywgZmxhdCkge1xuICAgIGNvbnN0IHBhbGV0dGUgPSB7XG4gICAgICAgIHByaW1hcnk6IGdlbmVyYXRlU2VtYW50aWNTaGFkZXMobmFtZSwgYWNjZW50U2hhZGVzKVxuICAgIH07XG4gICAgcmV0dXJuIGZsYXQgPyBmbGF0dGVuT2JqZWN0KHBhbGV0dGUpIDogcGFsZXR0ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaGVtZUNvbG9ycyh0aGVtZSwgZm9ybURhdGEpIHtcbiAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgZm9ybURhdGEpO1xuICAgIEdsb2JhbE5ldXRyYWxzID0gZ2VuZXJhdGVOZXV0cmFscyh7XG4gICAgICAgIGh1ZTogcGFyYW1zLmh1ZSxcbiAgICAgICAgc2F0dXJhdGlvbjogcGFyYW1zLnNhdHVyYXRpb24sXG4gICAgICAgIGRpc3RhbmNlOiBwYXJhbXMuZGlzdGFuY2VcbiAgICB9KTtcbiAgICBjb25zdCBzZW1hbnRpY0FjY2VudHMgPSB7XG4gICAgICAgIHByaW1hcnk6IHBhcmFtcy5wcmltYXJ5LFxuICAgICAgICBpbmZvOiBwYXJhbXMuaW5mbyxcbiAgICAgICAgc3VjY2VzczogcGFyYW1zLnN1Y2Nlc3MsXG4gICAgICAgIHdhcm5pbmc6IHBhcmFtcy53YXJuaW5nLFxuICAgICAgICBkYW5nZXI6IHBhcmFtcy5kYW5nZXIsXG4gICAgfTtcbiAgICBsZXQgbGlnaHRBY2NlbnRUb2tlbnMgPSBnZW5lcmF0ZVN5c3RlbUFjY2VudFBhbGV0dGUoJ2xpZ2h0JywgcGFyYW1zKTtcbiAgICBsZXQgZGFya0FjY2VudFRva2VucyA9IGdlbmVyYXRlU3lzdGVtQWNjZW50UGFsZXR0ZSgnZGFyaycsIHBhcmFtcyk7XG4gICAgY29uc3QgbGlnaHRTZW1hbnRpY1Rva2VucyA9IGdlbmVyYXRlU2VtYW50aWNQYWxldHRlKHNlbWFudGljQWNjZW50cywgbGlnaHRBY2NlbnRUb2tlbnMpO1xuICAgIGNvbnN0IGRhcmtTZW1hbnRpY1Rva2VucyA9IGdlbmVyYXRlU2VtYW50aWNQYWxldHRlKHNlbWFudGljQWNjZW50cywgZGFya0FjY2VudFRva2Vucyk7XG4gICAgY29uc3QgbGlnaHRDb21tb25Ub2tlbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBhY2NlbnQ6IGxpZ2h0QWNjZW50VG9rZW5zIH0sIHBhbGV0dGVMaWdodENvbW1vbiksIGxpZ2h0U2VtYW50aWNUb2tlbnMpO1xuICAgIGNvbnN0IGRhcmtDb21tb25Ub2tlbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyBhY2NlbnQ6IGRhcmtBY2NlbnRUb2tlbnMgfSwgcGFsZXR0ZURhcmtDb21tb24pLCBkYXJrU2VtYW50aWNUb2tlbnMpO1xuICAgIGxldCBjb21tb25Db2xvcnMgPSB7fTtcbiAgICBsZXQgdGhlbWVDb2xvcnMgPSB7fTtcbiAgICBpZiAodGhlbWUgPT09IFwibGlnaHRCYXNlXCIpIHtcbiAgICAgICAgY29tbW9uQ29sb3JzID0gZmxhdHRlbk9iamVjdChsaWdodENvbW1vblRva2Vucyk7XG4gICAgICAgIGlmIChwYXJhbXMuZGlzdGFuY2UgPT09IDAuMDIpIHtcbiAgICAgICAgICAgIHRoZW1lQ29sb3JzID0gZmxhdHRlbk9iamVjdChwYWxldHRlTGlnaHQyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLmRpc3RhbmNlID09PSAwLjAzKSB7XG4gICAgICAgICAgICB0aGVtZUNvbG9ycyA9IGZsYXR0ZW5PYmplY3QocGFsZXR0ZUxpZ2h0Myk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5kaXN0YW5jZSA9PT0gMC4wNCkge1xuICAgICAgICAgICAgdGhlbWVDb2xvcnMgPSBmbGF0dGVuT2JqZWN0KHBhbGV0dGVMaWdodDQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGVtZSA9PT0gXCJkYXJrRWxldmF0ZWRcIikge1xuICAgICAgICBjb21tb25Db2xvcnMgPSBmbGF0dGVuT2JqZWN0KGRhcmtDb21tb25Ub2tlbnMpO1xuICAgICAgICBpZiAocGFyYW1zLmRpc3RhbmNlID09PSAwLjAyKSB7XG4gICAgICAgICAgICB0aGVtZUNvbG9ycyA9IGZsYXR0ZW5PYmplY3QocGFsZXR0ZURhcmtFbGV2YXRlZDIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMuZGlzdGFuY2UgPT09IDAuMDMpIHtcbiAgICAgICAgICAgIHRoZW1lQ29sb3JzID0gZmxhdHRlbk9iamVjdChwYWxldHRlRGFya0VsZXZhdGVkMyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5kaXN0YW5jZSA9PT0gMC4wNCkge1xuICAgICAgICAgICAgdGhlbWVDb2xvcnMgPSBmbGF0dGVuT2JqZWN0KHBhbGV0dGVEYXJrRWxldmF0ZWQ0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhlbWUgPT09IFwiZGFya0Jhc2VcIikge1xuICAgICAgICBjb21tb25Db2xvcnMgPSBmbGF0dGVuT2JqZWN0KGRhcmtDb21tb25Ub2tlbnMpO1xuICAgICAgICBpZiAocGFyYW1zLmRpc3RhbmNlID09PSAwLjAyKSB7XG4gICAgICAgICAgICB0aGVtZUNvbG9ycyA9IGZsYXR0ZW5PYmplY3QocGFsZXR0ZURhcmtCYXNlMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5kaXN0YW5jZSA9PT0gMC4wMykge1xuICAgICAgICAgICAgdGhlbWVDb2xvcnMgPSBmbGF0dGVuT2JqZWN0KHBhbGV0dGVEYXJrQmFzZTMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMuZGlzdGFuY2UgPT09IDAuMDQpIHtcbiAgICAgICAgICAgIHRoZW1lQ29sb3JzID0gZmxhdHRlbk9iamVjdChwYWxldHRlRGFya0Jhc2U0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb21tb25Db2xvcnMpLCB0aGVtZUNvbG9ycyk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVNlbWFudGljU2hhZGVzKGFsaWFzTmFtZSwgYWNjZW50U2hhZGVzKSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIGZvciAodmFyIGEgPSAxLCBiID0gNzsgYSA8IGI7IGErKykge1xuICAgICAgICBvdXRwdXRbYCR7YX0wMGBdID0ge1xuICAgICAgICAgICAgXCIkdmFsdWVcIjogYHthY2NlbnQuJHthbGlhc05hbWV9LiR7YX0wMH1gLFxuICAgICAgICAgICAgXCIkdHlwZVwiOiBcImNvbG9yXCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IGFjY2VudFNoYWRlc1tgJHthfTAwYF0uZGVzY3JpcHRpb25cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlU2VtYW50aWNQYWxldHRlKGFjY2VudHMsIHBhbGV0dGUpIHtcbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmVudHJpZXMoYWNjZW50cykuZm9yRWFjaCgoW25hbWUsIGFsaWFzXSkgPT4ge1xuICAgICAgICByZXN1bHRbbmFtZV0gPSBnZW5lcmF0ZVNlbWFudGljU2hhZGVzKGFsaWFzLCBwYWxldHRlW2FsaWFzXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImV4cG9ydCBjb25zdCB0aGVtZXMgPSBbXG4gICAgJ2xpZ2h0QmFzZScsXG4gICAgJ2RhcmtCYXNlJyxcbiAgICAnZGFya0VsZXZhdGVkJ1xuXTtcbmV4cG9ydCBjb25zdCByYWRpaVNpemVOYW1lID0gW1xuICAgIFwiY29tcGFjdFwiLFxuICAgIFwiYmFzZVwiLFxuICAgIFwibGFyZ2VcIixcbl07XG5leHBvcnQgY29uc3QgcmFkaWlTaXplVmFsdWVzID0gW1xuICAgIDQsXG4gICAgNixcbiAgICA4LFxuXTtcbmV4cG9ydCBjb25zdCBzcGFjaW5nU2l6ZU5hbWUgPSBbXG4gICAgXCJjb21wYWN0XCIsXG4gICAgXCJiYXNlXCIsXG4gICAgXCJsYXJnZVwiLFxuICAgIFwidG91Y2hcIixcbl07XG5leHBvcnQgY29uc3QgdHlwb2dyYXBoeVNpemVOYW1lID0gW1xuICAgIFwiY29tcGFjdFwiLFxuICAgIFwiYmFzZVwiLFxuICAgIFwibGFyZ2VcIixcbl07XG5leHBvcnQgY29uc3QgdHlwb2dyYXBoeVNpemVWYWx1ZXMgPSBbXG4gICAgXCIxMy8xNlwiLFxuICAgIFwiMTUvMjBcIixcbiAgICBcIjE3LzI0XCIsXG5dO1xuZXhwb3J0IGNvbnN0IGljb25TaXplTmFtZSA9IFtcbiAgICBcImJhc2VcIixcbiAgICBcInRvdWNoXCJcbl07XG5leHBvcnQgY29uc3QgaWNvblNpemVWYWx1ZXMgPSBbXG4gICAgXCIxNlwiLFxuICAgIFwiMjRcIixcbl07XG5leHBvcnQgY29uc3Qgc3lzdGVtQWNjZW50TGlzdCA9IFtcbiAgICBcInJlZFwiLFxuICAgIFwiYW1iZXJcIixcbiAgICBcImJyb3duXCIsXG4gICAgXCJncmVlblwiLFxuICAgIFwidGVhbFwiLFxuICAgIFwiYmx1ZVwiLFxuICAgIFwiaW5kaWdvXCIsXG4gICAgXCJ2aW9sZXRcIixcbiAgICBcInB1cnBsZVwiLFxuICAgIFwicGlua1wiXG5dO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRBY2NlbnRIVUVzID0ge1xuICAgIFwicmVkXCI6IDQsXG4gICAgXCJhbWJlclwiOiAyNSxcbiAgICBcImJyb3duXCI6IDMzLFxuICAgIFwiZ3JlZW5cIjogMTUwLFxuICAgIFwidGVhbFwiOiAxODAsXG4gICAgXCJibHVlXCI6IDIxMCxcbiAgICBcImluZGlnb1wiOiAyNDAsXG4gICAgXCJ2aW9sZXRcIjogMjYwLFxuICAgIFwicHVycGxlXCI6IDI4MCxcbiAgICBcInBpbmtcIjogMzQwXG59O1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICB0eXBlOiAnSU1QT1JUJyxcbiAgICB0aGVtZTogJ2xpZ2h0JyxcbiAgICBodWU6IDE5MCxcbiAgICBzYXR1cmF0aW9uOiAwLjIsXG4gICAgZGlzdGFuY2U6IDAuMDIsXG4gICAgcHJpbWFyeTogJ2JsdWUnLFxuICAgIGluZm86ICd0ZWFsJyxcbiAgICBzdWNjZXNzOiAnZ3JlZW4nLFxuICAgIHdhcm5pbmc6ICdhbWJlcicsXG4gICAgZGFuZ2VyOiAncmVkJyxcbiAgICByZWQ6IDQsXG4gICAgYW1iZXI6IDI1LFxuICAgIGJyb3duOiAzMyxcbiAgICBncmVlbjogMTUwLFxuICAgIHRlYWw6IDE4NSxcbiAgICBibHVlOiAyMTAsXG4gICAgaW5kaWdvOiAyNDAsXG4gICAgdmlvbGV0OiAyNjAsXG4gICAgcHVycGxlOiAyODAsXG4gICAgcGluazogMzQwLFxuICAgIGJhc2VGb250U2l6ZTogJ2Jhc2UnLFxuICAgIHR5cGVTY2FsZTogJ21pbm9yVGhpcmQnLFxuICAgIGNyZWF0ZVN0eWxlczogdHJ1ZSxcbiAgICBhY2NlbnRTYXR1cmF0aW9uOiAwLjksXG4gICAgYWNjZW50TWF4THVtaW5hbmNlOiAwLjQ1LFxuICAgIGFjY2VudE1pZEx1bWluYW5jZTogMC4xOCxcbiAgICBhY2NlbnRNaW5MdW1pbmFuY2U6IDAuMTAsXG4gICAgcmFkaWk6ICdiYXNlJyxcbiAgICBzcGFjaW5nOiAnYmFzZScsXG4gICAgc2luZ2xlQ29sbGVjdGlvbjogZmFsc2Vcbn07XG5leHBvcnQgY29uc3QgZGVmYXVsdFNlbWFudGljQWNjZW50cyA9IHtcbiAgICBwcmltYXJ5OiAnYmx1ZScsXG4gICAgaW5mbzogJ3RlYWwnLFxuICAgIHN1Y2Nlc3M6ICdncmVlbicsXG4gICAgd2FybmluZzogJ2FtYmVyJyxcbiAgICBkYW5nZXI6ICdyZWQnXG59O1xuIiwiaW1wb3J0IGVsZXZhdGlvblRva2VucyBmcm9tICcuL3Rva2Vucy9lZmZlY3RzL2VsZXZhdGlvbi5qc29uJztcbmltcG9ydCB7IGZsYXR0ZW5PYmplY3QgfSBmcm9tIFwiLi91dGlscy9mbGF0dGVuLW9iamVjdFwiO1xuZXhwb3J0IGNvbnN0IGVsZXZhdGlvbiA9IGZsYXR0ZW5PYmplY3QoZWxldmF0aW9uVG9rZW5zKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGV2YXRpb25Ub2tlbnMoKSB7XG4gICAgcmV0dXJuIGVsZXZhdGlvblRva2Vucztcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZGVsYXlBc3luYyB9IGZyb20gXCIuL3V0aWxzL2RlbGF5LWFzeW5jXCI7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0NvbXBvbmVudHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgZmlnbWEuc2tpcEludmlzaWJsZUluc3RhbmNlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICBsZXQgcGFnZUNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ0NPTVBPTkVOVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZUNvbXBvbmVudHMgPSBwYWdlQ29tcG9uZW50cy5jb25jYXQobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUuZmluZEFsbFdpdGhDcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gbm9kZS5maW5kQWxsV2l0aENyaXRlcmlhKHsgdHlwZXM6IFsnQ09NUE9ORU5UJ10gfSk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VDb21wb25lbnRzID0gcGFnZUNvbXBvbmVudHMuY29uY2F0KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFnZUNvbXBvbmVudHMgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kQWxsV2l0aENyaXRlcmlhKHsgdHlwZXM6IFsnQ09NUE9ORU5UJ10gfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2l6ZSA9IHBhZ2VDb21wb25lbnRzLmxlbmd0aDtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKHBhZ2VDb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50RnJhbWUgPSBwYWdlQ29tcG9uZW50cy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEZyYW1lLm5hbWUgPT0gJ3N0YXRlPTpmb2N1cywgc3R5bGU9ZGVmYXVsdCwgc2VsZWN0ZWQ9ZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS5za2lwSW52aXNpYmxlSW5zdGFuY2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBjb21wb25lbnRGcmFtZS5maW5kQWxsKChuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG4ubGF5b3V0UG9zaXRpb25pbmcgPT0gJ0FCU09MVVRFJyAmJiAhbi5jb25zdHJhaW50cylcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG4ubGF5b3V0UG9zaXRpb25pbmcgPT0gJ0FCU09MVVRFJ1xuICAgICAgICAgICAgICAgICAgICAmJiBuLndpZHRoID4gMFxuICAgICAgICAgICAgICAgICAgICAmJiBuLmhlaWdodCA+IDBcbiAgICAgICAgICAgICAgICAgICAgJiYgbi5jb25zdHJhaW50cy5ob3Jpem9udGFsID09PSAnU1RSRVRDSCdcbiAgICAgICAgICAgICAgICAgICAgJiYgbi5jb25zdHJhaW50cy52ZXJ0aWNhbCA9PT0gJ1NUUkVUQ0gnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB5aWVsZCBmaXhMYXllcnMoY2hpbGRyZW4sIGNvbXBvbmVudEZyYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlY0NvbXBvbmVudCAke2NvdW50Kyt9IC8gJHtzaXplfWAsIGBjb2xvcjogIzA3NzNERjsgZm9udC13ZWlnaHQ6IGJvbGQ7YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeExheWVycyhub2RlcywgY29tcG9uZW50KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IG5vZGUsIHBhcmVudCwgb2Zmc2V0WCwgb2Zmc2V0WSwgaGVpZ2h0LCB3aWR0aDtcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSAwLCBza2lwcGVkID0gMCwgZmFpbGVkID0gMDtcbiAgICAgICAgY29uc29sZS5sb2coYFdvcmtpbmcgb24gJHtjb21wb25lbnQubmFtZX1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVtYWluaW5nIG5vZGVzOiAke25vZGVzLmxlbmd0aH1gKTtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJbnN0YW5jZShub2RlLCBjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraXBwZWQrKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgICAgICAgICAgICAgIG9mZnNldFggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IG5vZGUueTtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBwYXJlbnQuaGVpZ2h0IC0gMiAqIG9mZnNldFk7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBwYXJlbnQud2lkdGggLSAyICogb2Zmc2V0WDtcbiAgICAgICAgICAgICAgICBub2RlLnJlc2l6ZSh3aWR0aCAqIDAuOCwgaGVpZ2h0ICogMC44KTtcbiAgICAgICAgICAgICAgICB5aWVsZCBkZWxheUFzeW5jKDEwKTtcbiAgICAgICAgICAgICAgICBub2RlLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVkKys7XG4gICAgICAgICAgICAgICAgeWllbGQgZGVsYXlBc3luYyg1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVzaXplZDogJHt1cGRhdGVkfSwgU2tpcHBlZDogJHtza2lwcGVkfWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBmYWlsZWQrKztcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjaGVja0luc3RhbmNlKHRhcmdldEZyYW1lLCBjb21wb25lbnRGcmFtZSkge1xuICAgIGxldCBub2RlID0gdGFyZ2V0RnJhbWUucGFyZW50O1xuICAgIHdoaWxlIChub2RlICE9IGNvbXBvbmVudEZyYW1lKSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT0gJ0lOU1RBTkNFJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQgYmFzZVJhZGlpVG9rZW5zIGZyb20gXCIuL3Rva2Vucy9yYWRpaS9iYXNlLmpzb25cIjtcbmltcG9ydCBjb21wYWN0UmFkaWlUb2tlbnMgZnJvbSBcIi4vdG9rZW5zL3JhZGlpL2NvbXBhY3QuanNvblwiO1xuaW1wb3J0IGxhcmdlUmFkaWlUb2tlbnMgZnJvbSBcIi4vdG9rZW5zL3JhZGlpL2xhcmdlLmpzb25cIjtcbmltcG9ydCB7IGZsYXR0ZW5PYmplY3QgfSBmcm9tIFwiLi91dGlscy9mbGF0dGVuLW9iamVjdFwiO1xuZXhwb3J0IGNvbnN0IGJhc2UgPSBmbGF0dGVuT2JqZWN0KGJhc2VSYWRpaVRva2Vucyk7XG5leHBvcnQgY29uc3QgY29tcGFjdCA9IGZsYXR0ZW5PYmplY3QoY29tcGFjdFJhZGlpVG9rZW5zKTtcbmV4cG9ydCBjb25zdCBsYXJnZSA9IGZsYXR0ZW5PYmplY3QobGFyZ2VSYWRpaVRva2Vucyk7XG4iLCJpbXBvcnQgYmFzZVNpemluZ1Rva2VucyBmcm9tIFwiLi90b2tlbnMvc2l6aW5nL2Jhc2UuanNvblwiO1xuaW1wb3J0IHRvdWNoU2l6aW5nVG9rZW5zIGZyb20gXCIuL3Rva2Vucy9zaXppbmcvdG91Y2guanNvblwiO1xuaW1wb3J0IHsgZmxhdHRlbk9iamVjdCB9IGZyb20gXCIuL3V0aWxzL2ZsYXR0ZW4tb2JqZWN0XCI7XG5leHBvcnQgY29uc3QgYmFzZSA9IGZsYXR0ZW5PYmplY3QoYmFzZVNpemluZ1Rva2Vucyk7XG5leHBvcnQgY29uc3QgdG91Y2ggPSBmbGF0dGVuT2JqZWN0KHRvdWNoU2l6aW5nVG9rZW5zKTtcbiIsImltcG9ydCBiYXNlU3BhY2luZ1Rva2VucyBmcm9tIFwiLi90b2tlbnMvc3BhY2luZy9iYXNlLmpzb25cIjtcbmltcG9ydCBjb21wYWN0U3BhY2luZ1Rva2VucyBmcm9tIFwiLi90b2tlbnMvc3BhY2luZy9jb21wYWN0Lmpzb25cIjtcbmltcG9ydCBsYXJnZVNwYWNpbmdUb2tlbnMgZnJvbSBcIi4vdG9rZW5zL3NwYWNpbmcvbGFyZ2UuanNvblwiO1xuaW1wb3J0IHRvdWNoU3BhY2luZ1Rva2VucyBmcm9tIFwiLi90b2tlbnMvc3BhY2luZy90b3VjaC5qc29uXCI7XG5pbXBvcnQgeyBmbGF0dGVuT2JqZWN0IH0gZnJvbSBcIi4vdXRpbHMvZmxhdHRlbi1vYmplY3RcIjtcbmV4cG9ydCBjb25zdCBiYXNlID0gZmxhdHRlbk9iamVjdChiYXNlU3BhY2luZ1Rva2Vucyk7XG5leHBvcnQgY29uc3QgY29tcGFjdCA9IGZsYXR0ZW5PYmplY3QoY29tcGFjdFNwYWNpbmdUb2tlbnMpO1xuZXhwb3J0IGNvbnN0IGxhcmdlID0gZmxhdHRlbk9iamVjdChsYXJnZVNwYWNpbmdUb2tlbnMpO1xuZXhwb3J0IGNvbnN0IHRvdWNoID0gZmxhdHRlbk9iamVjdCh0b3VjaFNwYWNpbmdUb2tlbnMpO1xuIiwiaW1wb3J0IHRleHRTdHlsZVRva2VucyBmcm9tIFwiLi90b2tlbnMvdHlwb2dyYXBoeS9zdHlsZXMuanNvblwiO1xuaW1wb3J0IHR5cGVGYWNlVG9rZW5zIGZyb20gXCIuL3Rva2Vucy90eXBvZ3JhcGh5L3R5cGVmYWNlLmpzb25cIjtcbmltcG9ydCBiYXNlTWFqb3JUaGlyZCBmcm9tIFwiLi90b2tlbnMvdHlwb2dyYXBoeS9tYWpvci10aGlyZC90eXBlc2NhbGUtYmFzZS5qc29uXCI7XG5pbXBvcnQgY29tcGFjdE1ham9yVGhpcmQgZnJvbSBcIi4vdG9rZW5zL3R5cG9ncmFwaHkvbWFqb3ItdGhpcmQvdHlwZXNjYWxlLWNvbXBhY3QuanNvblwiO1xuaW1wb3J0IGxhcmdlTWFqb3JUaGlyZCBmcm9tIFwiLi90b2tlbnMvdHlwb2dyYXBoeS9tYWpvci10aGlyZC90eXBlc2NhbGUtbGFyZ2UuanNvblwiO1xuaW1wb3J0IGJhc2VNaW5vclRoaXJkIGZyb20gXCIuL3Rva2Vucy90eXBvZ3JhcGh5L21pbm9yLXRoaXJkL3R5cGVzY2FsZS1iYXNlLmpzb25cIjtcbmltcG9ydCBjb21wYWN0TWlub3JUaGlyZCBmcm9tIFwiLi90b2tlbnMvdHlwb2dyYXBoeS9taW5vci10aGlyZC90eXBlc2NhbGUtY29tcGFjdC5qc29uXCI7XG5pbXBvcnQgbGFyZ2VNaW5vclRoaXJkIGZyb20gXCIuL3Rva2Vucy90eXBvZ3JhcGh5L21pbm9yLXRoaXJkL3R5cGVzY2FsZS1sYXJnZS5qc29uXCI7XG5pbXBvcnQgYmFzZU1ham9yU2Vjb25kIGZyb20gXCIuL3Rva2Vucy90eXBvZ3JhcGh5L21ham9yLXNlY29uZC90eXBlc2NhbGUtYmFzZS5qc29uXCI7XG5pbXBvcnQgY29tcGFjdE1ham9yU2Vjb25kIGZyb20gXCIuL3Rva2Vucy90eXBvZ3JhcGh5L21ham9yLXNlY29uZC90eXBlc2NhbGUtY29tcGFjdC5qc29uXCI7XG5pbXBvcnQgbGFyZ2VNYWpvclNlY29uZCBmcm9tIFwiLi90b2tlbnMvdHlwb2dyYXBoeS9tYWpvci1zZWNvbmQvdHlwZXNjYWxlLWxhcmdlLmpzb25cIjtcbmltcG9ydCB7IGZsYXR0ZW5PYmplY3QgfSBmcm9tIFwiLi91dGlscy9mbGF0dGVuLW9iamVjdFwiO1xuZXhwb3J0IGNvbnN0IGJhc2UgPSBmbGF0dGVuT2JqZWN0KGJhc2VNaW5vclRoaXJkKTtcbmV4cG9ydCBjb25zdCBjb21wYWN0ID0gZmxhdHRlbk9iamVjdChjb21wYWN0TWlub3JUaGlyZCk7XG5leHBvcnQgY29uc3QgbGFyZ2UgPSBmbGF0dGVuT2JqZWN0KGxhcmdlTWlub3JUaGlyZCk7XG5jb25zdCBzdHlsZXMgPSBmbGF0dGVuT2JqZWN0KHRleHRTdHlsZVRva2Vucyk7XG5jb25zdCB0b2tlbnMgPSB7XG4gICAgbWFqb3JUaGlyZDoge1xuICAgICAgICBiYXNlOiBmbGF0dGVuT2JqZWN0KGJhc2VNYWpvclRoaXJkKSxcbiAgICAgICAgY29tcGFjdDogZmxhdHRlbk9iamVjdChjb21wYWN0TWFqb3JUaGlyZCksXG4gICAgICAgIGxhcmdlOiBmbGF0dGVuT2JqZWN0KGxhcmdlTWFqb3JUaGlyZCksXG4gICAgfSxcbiAgICBtaW5vclRoaXJkOiB7XG4gICAgICAgIGJhc2U6IGZsYXR0ZW5PYmplY3QoYmFzZU1pbm9yVGhpcmQpLFxuICAgICAgICBjb21wYWN0OiBmbGF0dGVuT2JqZWN0KGNvbXBhY3RNaW5vclRoaXJkKSxcbiAgICAgICAgbGFyZ2U6IGZsYXR0ZW5PYmplY3QobGFyZ2VNaW5vclRoaXJkKSxcbiAgICB9LFxuICAgIG1ham9yU2Vjb25kOiB7XG4gICAgICAgIGJhc2U6IGZsYXR0ZW5PYmplY3QoYmFzZU1ham9yU2Vjb25kKSxcbiAgICAgICAgY29tcGFjdDogZmxhdHRlbk9iamVjdChjb21wYWN0TWFqb3JTZWNvbmQpLFxuICAgICAgICBsYXJnZTogZmxhdHRlbk9iamVjdChsYXJnZU1ham9yU2Vjb25kKSxcbiAgICB9LFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBvZ3Jhb2h5VG9rZW5zKHNpemUsIHNjYWxlID0gXCJtaW5vclRoaXJkXCIpIHtcbiAgICBsZXQgc2NhbGVUb2tlbnMgPSB0b2tlbnNbc2NhbGVdW3NpemVdO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZmxhdHRlbk9iamVjdCh0eXBlRmFjZVRva2VucykpLCBzY2FsZVRva2VucyksIHN0eWxlcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9udERldGFpbHMoKSB7XG4gICAgbGV0IG5hbWVzID0gW107XG4gICAgY29uc3QgdG9rZW5zID0gdHlwZUZhY2VUb2tlbnM7XG4gICAgY29uc3QgZmFtaWx5ID0gdHlwZUZhY2VUb2tlbnNbXCJmb250LWZhbWlseVwiXS5wcmltYXJ5LiR2YWx1ZTtcbiAgICBmb3IgKGxldCBbbmFtZSwgZm9udFdlaWdodF0gb2YgT2JqZWN0LmVudHJpZXModHlwZUZhY2VUb2tlbnNbXCJmb250LXdlaWdodFwiXSkpIHtcbiAgICAgICAgbmFtZXMucHVzaCh7IGZhbWlseSwgc3R5bGU6IGZvbnRXZWlnaHQuJHZhbHVlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gX2Nsb25lKHZhbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKHggPT4gX2Nsb25lKHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBfY2xvbmUodmFsW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgJ3Vua25vd24nO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGRlbGF5QXN5bmModGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSk7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGRlbGF5QXN5bmMgfSBmcm9tIFwiLi9kZWxheS1hc3luY1wiO1xubGV0IHRvdGFsTGF5ZXJzQ291bnQgPSAwO1xubGV0IHJlYm91bmRMYXllcnNDb3VudCA9IDA7XG5sZXQgc2tpcHBlZExheWVyc0NvdW50ID0gMDtcbmxldCBtaXNzaW5nTGF5ZXJzQ291bnQgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFN0eWxlVGVtcGxhdGVzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRvdGFsTGF5ZXJzQ291bnQgPSAwO1xuICAgICAgICByZWJvdW5kTGF5ZXJzQ291bnQgPSAwO1xuICAgICAgICBza2lwcGVkTGF5ZXJzQ291bnQgPSAwO1xuICAgICAgICBsZXQgX25vZGVzID0gW107XG4gICAgICAgIGZpZ21hLnNraXBJbnZpc2libGVJbnN0YW5jZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIlNlbGVjdCBhdCBsZWFzdCBvbmUgbGF5ZXIgYW5kIHRyeSBhZ2FpblwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCdmaW5kQWxsV2l0aENyaXRlcmlhJyBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50Tm9kZXMgPSBub2RlLmZpbmRBbGxXaXRoQ3JpdGVyaWEoeyB0eXBlczogW1wiQ09NUE9ORU5UXCJdIH0pO1xuICAgICAgICAgICAgICAgIF9ub2RlcyA9IF9ub2Rlcy5jb25jYXQoY29tcG9uZW50Tm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyRnJhbWUgPSBjcmVhdGVGcmFtZU5vZGUoKTtcbiAgICAgICAgY29udGFpbmVyRnJhbWUuZmlsbHMgPSBbXG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KHsgdHlwZTogXCJTT0xJRFwiLCBjb2xvcjogeyByOiAxLCBnOiAxLCBiOiAxIH0gfSwgXCJjb2xvclwiLCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXMoKS5maW5kKG4gPT4gbi5uYW1lID09ICdmaWxsL2Jhc2UvMzAwJykpXG4gICAgICAgIF07XG4gICAgICAgIGNvbnRhaW5lckZyYW1lLmxheW91dE1vZGUgPSAnVkVSVElDQUwnO1xuICAgICAgICBjb250YWluZXJGcmFtZS5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRyc7XG4gICAgICAgIGNvbnRhaW5lckZyYW1lLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRyc7XG4gICAgICAgIGNvbnRhaW5lckZyYW1lLnBhZGRpbmdCb3R0b20gPSA4MDtcbiAgICAgICAgY29udGFpbmVyRnJhbWUucGFkZGluZ0xlZnQgPSA5NjtcbiAgICAgICAgY29udGFpbmVyRnJhbWUucGFkZGluZ1JpZ2h0ID0gOTY7XG4gICAgICAgIGNvbnRhaW5lckZyYW1lLnBhZGRpbmdUb3AgPSAwO1xuICAgICAgICBjb250YWluZXJGcmFtZS5zZXRCb3VuZFZhcmlhYmxlKCd0b3BMZWZ0UmFkaXVzJywgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCkuZmluZChuID0+IG4ubmFtZSA9PSAncmFkaWkveGwyJykuaWQpO1xuICAgICAgICBjb250YWluZXJGcmFtZS5zZXRCb3VuZFZhcmlhYmxlKCd0b3BSaWdodFJhZGl1cycsIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpLmZpbmQobiA9PiBuLm5hbWUgPT0gJ3JhZGlpL3hsMicpLmlkKTtcbiAgICAgICAgY29udGFpbmVyRnJhbWUuc2V0Qm91bmRWYXJpYWJsZSgnYm90dG9tTGVmdFJhZGl1cycsIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpLmZpbmQobiA9PiBuLm5hbWUgPT0gJ3JhZGlpL3hsMicpLmlkKTtcbiAgICAgICAgY29udGFpbmVyRnJhbWUuc2V0Qm91bmRWYXJpYWJsZSgnYm90dG9tUmlnaHRSYWRpdXMnLCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXMoKS5maW5kKG4gPT4gbi5uYW1lID09ICdyYWRpaS94bDInKS5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9ub2Rlcyk7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gX25vZGVzLmxlbmd0aDtcbiAgICAgICAgdG90YWxMYXllcnNDb3VudCA9IHRvdGFsO1xuICAgICAgICB3aGlsZSAoX25vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50Tm9kZSA9IF9ub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgLy8gKDcwIC0gNDQpIC8gNzBcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKCgodG90YWwgLSBfbm9kZXMubGVuZ3RoKSAvIHRvdGFsKSAqIDEwMCk7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgJHtwZXJjZW50fSUgZG9uZS4gV29ya2luZyBvbiBsYXllciAke3RvdGFsIC0gX25vZGVzLmxlbmd0aH0gb3V0IG9mICR7dG90YWx9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICBjb250YWluZXJGcmFtZS5hcHBlbmRDaGlsZChjaGVja05vZGUoY29tcG9uZW50Tm9kZSkpO1xuICAgICAgICAgICAgeWllbGQgZGVsYXlBc3luYygxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2NvbnRhaW5lckZyYW1lXTtcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gY2hlY2tOb2RlKG5vZGUpIHtcbiAgICBsZXQgcGFyZW50O1xuICAgIGlmIChub2RlLnBhcmVudC50eXBlID09ICdDT01QT05FTlRfU0VUJykge1xuICAgICAgICBwYXJlbnQgPSBnZXRGcmFtZShub2RlLnBhcmVudCk7XG4gICAgfVxuICAgIGNvbnN0IGZyYW1lID0gcHJvY2Vzc0NvbXBvbmVudE5vZGUobm9kZSk7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICBmcmFtZS54ID0gbm9kZS54O1xuICAgICAgICBmcmFtZS55ID0gbm9kZS55O1xuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZnJhbWU7XG59XG5mdW5jdGlvbiBwcm9jZXNzQ29tcG9uZW50Tm9kZShub2RlKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBub2RlLmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgY29uc3QgZnJhbWUgPSBpbnN0YW5jZS5kZXRhY2hJbnN0YW5jZSgpO1xuICAgIGZyYW1lLm5hbWUgPSBub2RlLm5hbWU7XG4gICAgY29uc3QgaW5zdGFuY2VzID0gZnJhbWUuZmluZEFsbFdpdGhDcml0ZXJpYSh7IHR5cGVzOiBbJ0lOU1RBTkNFJ10gfSk7XG4gICAgaW5zdGFuY2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGkubWFpbkNvbXBvbmVudC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBmcmFtZTtcbn1cbmNvbnN0IGNvbXBvbmVudFNldEZyYW1lc0NhY2hlID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2V0RnJhbWUoY21wU2V0KSB7XG4gICAgY29uc3QgY2hhY2hlZEZyYW1lID0gY29tcG9uZW50U2V0RnJhbWVzQ2FjaGUuZ2V0KGNtcFNldC5uYW1lKTtcbiAgICBpZiAoY2hhY2hlZEZyYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGFjaGVkRnJhbWU7XG4gICAgfVxuICAgIGNvbnN0IGZyYW1lID0gY3JlYXRlRnJhbWVOb2RlKCk7XG4gICAgZnJhbWUubmFtZSA9IGNtcFNldC5uYW1lO1xuICAgIGZyYW1lLnJlc2l6ZShjbXBTZXQud2lkdGgsIGNtcFNldC5oZWlnaHQpO1xuICAgIGNvbXBvbmVudFNldEZyYW1lc0NhY2hlLnNldChjbXBTZXQubmFtZSwgZnJhbWUpO1xuICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtmcmFtZV07XG4gICAgcmV0dXJuIGZyYW1lO1xufVxuZnVuY3Rpb24gY3JlYXRlRnJhbWVOb2RlKCkge1xuICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICBmcmFtZS5maWxscyA9IFtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLnNldEJvdW5kVmFyaWFibGVGb3JQYWludCh7IHR5cGU6IFwiU09MSURcIiwgY29sb3I6IHsgcjogMSwgZzogMSwgYjogMSB9IH0sIFwiY29sb3JcIiwgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCkuZmluZChuID0+IG4ubmFtZSA9PSAnY2FyZC9iZy9wcmltYXJ5JykpXG4gICAgXTtcbiAgICBmcmFtZS5zdHJva2VzID0gW1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KHsgdHlwZTogXCJTT0xJRFwiLCBjb2xvcjogeyByOiAxLCBnOiAxLCBiOiAxIH0gfSwgXCJjb2xvclwiLCBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXMoKS5maW5kKG4gPT4gbi5uYW1lID09ICdjYXJkL2JvcmRlci9vdXRlcicpKVxuICAgIF07XG4gICAgZnJhbWUuc2V0Qm91bmRWYXJpYWJsZSgndG9wTGVmdFJhZGl1cycsIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpLmZpbmQobiA9PiBuLm5hbWUgPT0gJ3JhZGlpL3hsJykuaWQpO1xuICAgIGZyYW1lLnNldEJvdW5kVmFyaWFibGUoJ3RvcFJpZ2h0UmFkaXVzJywgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCkuZmluZChuID0+IG4ubmFtZSA9PSAncmFkaWkveGwnKS5pZCk7XG4gICAgZnJhbWUuc2V0Qm91bmRWYXJpYWJsZSgnYm90dG9tTGVmdFJhZGl1cycsIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpLmZpbmQobiA9PiBuLm5hbWUgPT0gJ3JhZGlpL3hsJykuaWQpO1xuICAgIGZyYW1lLnNldEJvdW5kVmFyaWFibGUoJ2JvdHRvbVJpZ2h0UmFkaXVzJywgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCkuZmluZChuID0+IG4ubmFtZSA9PSAncmFkaWkveGwnKS5pZCk7XG4gICAgZnJhbWUueCA9IC0xMDAwMDtcbiAgICBmcmFtZS55ID0gLTEwMDAwO1xuICAgIHJldHVybiBmcmFtZTtcbn1cbiIsImltcG9ydCBjaHJvbWEgZnJvbSAnY2hyb21hLWpzJztcbmltcG9ydCB7IHBhcnNlUmVmZXJlbmNlR2xvYmFsIH0gZnJvbSAnLi90b2tlbi1yZWZlcmVuY2VzJztcbmNvbnN0IGhleENvbG9yUmVnZXggPSAvXiMoWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9pO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRGaWdtYUNvbG9yVG9SZ2IoaW5wdXQsIGZvcm1hdCkge1xuICAgIGNvbnN0IHsgciwgZywgYiwgYSB9ID0gaW5wdXQ7XG4gICAgLy9maWdtYSB1c2VzIGZsb2F0IDAuLi4xIHZzIHN0YW5kYXJkIDAuLi4yNTVcbiAgICBjb25zdCBmaWdtYUNvbG9yVHJhbnNmb3JtZWQgPSB7XG4gICAgICAgIHI6IGlucHV0LnIgKiAyNTUsXG4gICAgICAgIGc6IGlucHV0LmcgKiAyNTUsXG4gICAgICAgIGI6IGlucHV0LmIgKiAyNTUsXG4gICAgICAgIGE6IGlucHV0LmFcbiAgICB9O1xuICAgIGxldCBjb2xvciA9IGNocm9tYS5nbChyLCBnLCBiLCBhKTtcbiAgICBkZWJ1Z2dlcjtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgICBjYXNlICdoZXgnOiB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IuaGV4KCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHNsJzoge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmNzcygnaHNsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmNzcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3JWYWx1ZShpbnB1dCwgYWRqdXN0bWVudHMpIHtcbiAgICBsZXQgY29sb3I7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGlucHV0LnN0YXJ0c1dpdGgoJ3JnYicpKSB7XG4gICAgICAgICAgICBjb25zdCByZ2JWYWx1ZXMgPSBpbnB1dC5yZXBsYWNlKC9ecmdiYT9cXCh8XFxzK3xcXCkkL2csICcnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgaWYgKGhleENvbG9yUmVnZXgudGVzdChyZ2JWYWx1ZXNbMF0pKSB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSBjaHJvbWEocmdiVmFsdWVzWzBdKTsgLy8gaGV4VG9GaWdtYVJHQihyZ2JWYWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFscGhhID0gcGFyc2VGbG9hdChyZ2JWYWx1ZXNbMV0pO1xuICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3IuYWxwaGEoYWxwaGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSBjaHJvbWEoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29sb3IgPSBjaHJvbWEoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGFkanVzdG1lbnRzKSB7XG4gICAgICAgIGlmIChhZGp1c3RtZW50cy5oKSB7XG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnNldCgnaHNsLmgnLCBgJHthZGp1c3RtZW50cy5ofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGp1c3RtZW50cy5zKSB7XG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnNldCgnaHNsLnMnLCBgJHthZGp1c3RtZW50cy5zfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGp1c3RtZW50cy5sKSB7XG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnNldCgnaHNsLmwnLCBgJHthZGp1c3RtZW50cy5sfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGp1c3RtZW50cy5hKSB7XG4gICAgICAgICAgICBjb2xvciA9IGNvbG9yLnNldCgnaHNsLmEnLCBgJHthZGp1c3RtZW50cy5hfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFtyLCBnLCBiLCBhXSA9IGNvbG9yLmdsKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2w6IHsgciwgZywgYiwgYSB9LFxuICAgICAgICByZ2I6IGNvbG9yLmNzcygpLFxuICAgICAgICBoc2w6IGNvbG9yLmNzcygnaHNsJyksXG4gICAgICAgIGhleDogY29sb3IuaGV4KClcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3JUb2tlbih0b2tlbiwgZGljdGlvbmFyeSwgb3V0cHV0ID0gJ2dsJykge1xuICAgIGxldCBjb2xvciA9IHRva2VuLiR2YWx1ZTtcbiAgICBjb2xvciA9IHBhcnNlUmVmZXJlbmNlR2xvYmFsKGNvbG9yLnRyaW0oKSwgZGljdGlvbmFyeSk7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VDb2xvclZhbHVlKGNvbG9yLCB0b2tlbi5hZGp1c3RtZW50cyk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0W291dHB1dF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb2xvciBmb3JtYXRcIik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZmluZFZhcmlhYmxlQnlSZWZlcmVuY2VzIH0gZnJvbSBcIi4vdG9rZW4tcmVmZXJlbmNlc1wiO1xuLypcbiAgICBUaGlzIG1ldGhvZCByZWFkcyBzaGFkb3cgY29sb3IgdmFsdWVzIGRpcmVjdGx5IGZyb20gRmlnbWEgVmFyaWFibGVzXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydEVmZmVjdFN0eWxlcyh0b2tlbnMpIHtcbiAgICBPYmplY3QuZW50cmllcyh0b2tlbnMpLmZvckVhY2goKFtuYW1lLCB0b2tlbkRhdGFdKSA9PiB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2VuRGF0YTtcbiAgICAgICAgaWYgKHRva2VuLiR0eXBlID09ICdib3hTaGFkb3cnKSB7XG4gICAgICAgICAgICBsZXQgZmlnbWFTdHlsZSA9IGdldFN0eWxlQnlOYW1lKG5hbWUpIHx8IGZpZ21hLmNyZWF0ZUVmZmVjdFN0eWxlKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB0b2tlbi4kdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlZmZlY3RzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlnbWFWYXJpYWJsZSA9IGZpbmRWYXJpYWJsZUJ5UmVmZXJlbmNlcyh2YWx1ZS5jb2xvcik7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbklEID0gZmlnbWFWYXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gZmlnbWEudmFyaWFibGVzLmdldFZhcmlhYmxlQ29sbGVjdGlvbkJ5SWQoY29sbGVjdGlvbklEKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0TW9kZSA9IGNvbGxlY3Rpb24ubW9kZXNbMF0ubW9kZUlkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZ21hRWZmZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGZpZ21hVmFyaWFibGUudmFsdWVzQnlNb2RlW2RlZmF1bHRNb2RlXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVmZmVjdCA9IGNvbnZlcnRFZmZlY3RTdHlsZVRvRmlnbWEoZmlnbWFFZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVmZmVjdFZhciA9IGZpZ21hLnZhcmlhYmxlcy5zZXRCb3VuZFZhcmlhYmxlRm9yRWZmZWN0KGVmZmVjdCwgJ2NvbG9yJywgZmlnbWFWYXJpYWJsZSk7XG4gICAgICAgICAgICAgICAgZWZmZWN0VmFyLnNwcmVhZCA9IGVmZmVjdC5zcHJlYWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVmZmVjdFZhcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlnbWFTdHlsZS5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIGZpZ21hU3R5bGUuZWZmZWN0cyA9IGVmZmVjdHM7XG4gICAgICAgICAgICBmaWdtYVN0eWxlLmRlc2NyaXB0aW9uID0gdG9rZW4uZGVzY3JpcHRpb24gfHwgZmlnbWFTdHlsZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIC8vIGZpZ21hU3R5bGUuZG9jdW1lbnRhdGlvbkxpbmtzID0gdG9rZW4uZG9jdW1lbnRhdGlvbkxpbmsgPyBbdG9rZW4uZG9jdW1lbnRhdGlvbkxpbmtdIDogZmlnbWFTdHlsZS5kb2N1bWVudGF0aW9uTGlua3M7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldExvY2FsU3R5bGVzKCkge1xuICAgIHJldHVybiBmaWdtYS5nZXRMb2NhbEVmZmVjdFN0eWxlcygpO1xufVxuO1xuZnVuY3Rpb24gZ2V0U3R5bGVCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IHN0eWxlc0J5VHlwZSA9IGdldExvY2FsU3R5bGVzKCk7XG4gICAgY29uc3QgbWF0Y2ggPSBzdHlsZXNCeVR5cGUuZmluZCgoc3R5bGUpID0+IHN0eWxlLm5hbWUgPT09IG5hbWUpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG47XG5mdW5jdGlvbiBwYXJzZUJvb2xlYW4odmFsKSB7XG4gICAgcmV0dXJuIHZhbCAhPT0gXCJmYWxzZVwiO1xufVxuZnVuY3Rpb24gY29udmVydEVmZmVjdFN0eWxlVG9GaWdtYSh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiRFJPUF9TSEFET1dcIixcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yLFxuICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQodmFsdWUueCksXG4gICAgICAgICAgICB5OiBwYXJzZUZsb2F0KHZhbHVlLnkpXG4gICAgICAgIH0sXG4gICAgICAgIHJhZGl1czogcGFyc2VGbG9hdCh2YWx1ZS5ibHVyKSxcbiAgICAgICAgc3ByZWFkOiBwYXJzZUZsb2F0KHZhbHVlLnNwcmVhZCksXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIGJsZW5kTW9kZTogXCJOT1JNQUxcIixcbiAgICAgICAgc2hvd1NoYWRvd0JlaGluZE5vZGU6IHBhcnNlQm9vbGVhbih2YWx1ZS5zaG93U2hhZG93QmVoaW5kTm9kZSlcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgcGFyc2VSZWZlcmVuY2VHbG9iYWwgfSBmcm9tIFwiLi90b2tlbi1yZWZlcmVuY2VzXCI7XG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0VGV4dFN0eWxlcyh0b2tlbnMpIHtcbiAgICBPYmplY3QuZW50cmllcyh0b2tlbnMpLmZvckVhY2goKFtuYW1lLCB0b2tlbl0pID0+IHtcbiAgICAgICAgaWYgKHRva2VuLiR0eXBlID09ICd0eXBvZ3JhcGh5Jykge1xuICAgICAgICAgICAgbGV0IHRleHRTdHlsZSA9IGdldFN0eWxlQnlOYW1lKG5hbWUpIHx8IGZpZ21hLmNyZWF0ZVRleHRTdHlsZSgpO1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBwYXJzZVZhbHVlcyh0b2tlbi4kdmFsdWUsIHRva2Vucyk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gY29udmVydFRleHRTdHlsZVRvRmlnbWEobmFtZSwgcmVzb2x2ZWQpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobm9ybWFsaXplZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRleHRTdHlsZVtrZXldID0gbm9ybWFsaXplZFtrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVzKHZhbHVlLCBkaWN0aW9uYXJ5KSB7XG4gICAgbGV0IG91dHB1dCA9IHt9O1xuICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHBhcnNlUmVmZXJlbmNlR2xvYmFsKHZhbHVlLCBkaWN0aW9uYXJ5KTtcbiAgICAgICAgb3V0cHV0W2tleV0gPSByZXNvbHZlZFZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59XG5mdW5jdGlvbiBnZXRMb2NhbFN0eWxlcygpIHtcbiAgICByZXR1cm4gZmlnbWEuZ2V0TG9jYWxUZXh0U3R5bGVzKCk7XG59XG47XG5mdW5jdGlvbiBnZXRTdHlsZUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3Qgc3R5bGVzQnlUeXBlID0gZ2V0TG9jYWxTdHlsZXMoKTtcbiAgICBjb25zdCBtYXRjaCA9IHN0eWxlc0J5VHlwZS5maW5kKChzdHlsZSkgPT4gc3R5bGUubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbjtcbmZ1bmN0aW9uIGNvbnZlcnRUZXh0Q2FzZVRvRmlnbWEodmFsdWUpIHtcbiAgICBzd2l0Y2ggKHZhbHVlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgY2FzZSAndXBwZXJjYXNlJzpcbiAgICAgICAgY2FzZSAndXBwZXInOlxuICAgICAgICAgICAgcmV0dXJuICdVUFBFUic7XG4gICAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6XG4gICAgICAgIGNhc2UgJ2xvd2VyJzpcbiAgICAgICAgICAgIHJldHVybiAnTE9XRVInO1xuICAgICAgICBjYXNlICdjYXBpdGFsaXplJzpcbiAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgcmV0dXJuICdUSVRMRSc7XG4gICAgICAgIGNhc2UgJ3NtYWxsLWNhcHMnOlxuICAgICAgICBjYXNlICdzbWFsbF9jYXBzJzpcbiAgICAgICAgICAgIHJldHVybiAnU01BTExfQ0FQUyc7XG4gICAgICAgIGNhc2UgJ2FsbC1zbWFsbC1jYXBzJzpcbiAgICAgICAgY2FzZSAnc21hbGxfY2Fwc19mb3JjZWQnOlxuICAgICAgICAgICAgcmV0dXJuICdTTUFMTF9DQVBTX0ZPUkNFRCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ09SSUdJTkFMJztcbiAgICB9XG59XG5mdW5jdGlvbiBjb252ZXJ0VGV4dERlY29yYXRpb25Ub0ZpZ21hKHZhbHVlKSB7XG4gICAgc3dpdGNoICh2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ3VuZGVybGluZSc6XG4gICAgICAgICAgICByZXR1cm4gJ1VOREVSTElORSc7XG4gICAgICAgIGNhc2UgJ2xpbmUtdGhyb3VnaCc6XG4gICAgICAgIGNhc2UgJ3N0cmlrZXRocm91Z2gnOlxuICAgICAgICAgICAgcmV0dXJuICdTVFJJS0VUSFJPVUdIJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnTk9ORSc7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUZXh0U3R5bGVUb0ZpZ21hKG5hbWUsIHZhbHVlcykge1xuICAgIGxldCB0ZXh0U3R5bGUgPSB7XG4gICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgJ2ZvbnRTaXplJzogcGFyc2VGbG9hdCh2YWx1ZXMuZm9udFNpemUpLFxuICAgICAgICAndGV4dERlY29yYXRpb24nOiBjb252ZXJ0VGV4dERlY29yYXRpb25Ub0ZpZ21hKHZhbHVlcy50ZXh0RGVjb3JhdGlvbiksXG4gICAgICAgICdmb250TmFtZSc6IHtcbiAgICAgICAgICAgIGZhbWlseTogdmFsdWVzLmZvbnRGYW1pbHksXG4gICAgICAgICAgICBzdHlsZTogdmFsdWVzLmZvbnRXZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgJ2xldHRlclNwYWNpbmcnOiB7XG4gICAgICAgICAgICB1bml0OiB2YWx1ZXMubGV0dGVyU3BhY2luZy5pbmNsdWRlcygnJScpID8gXCJQRVJDRU5UXCIgOiBcIlBJWEVMU1wiLFxuICAgICAgICAgICAgdmFsdWU6IHBhcnNlSW50KHZhbHVlcy5sZXR0ZXJTcGFjaW5nKVxuICAgICAgICB9LFxuICAgICAgICAnbGluZUhlaWdodCc6IHtcbiAgICAgICAgICAgIHVuaXQ6IHZhbHVlcy5saW5lSGVpZ2h0LmluY2x1ZGVzKCclJykgPyBcIlBFUkNFTlRcIiA6IFwiUElYRUxTXCIsXG4gICAgICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh2YWx1ZXMubGluZUhlaWdodClcbiAgICAgICAgfSxcbiAgICAgICAgbGVhZGluZ1RyaW06IFwiTk9ORVwiLFxuICAgICAgICBwYXJhZ3JhcGhJbmRlbnQ6IDAsXG4gICAgICAgICdwYXJhZ3JhcGhTcGFjaW5nJzogcGFyc2VJbnQodmFsdWVzLnBhcmFncmFwaFNwYWNpbmcpLFxuICAgICAgICBsaXN0U3BhY2luZzogMCxcbiAgICAgICAgaGFuZ2luZ1B1bmN0dWF0aW9uOiBmYWxzZSxcbiAgICAgICAgaGFuZ2luZ0xpc3Q6IGZhbHNlLFxuICAgICAgICAndGV4dENhc2UnOiBjb252ZXJ0VGV4dENhc2VUb0ZpZ21hKHZhbHVlcy50ZXh0Q2FzZSlcbiAgICB9O1xuICAgIHJldHVybiB0ZXh0U3R5bGU7XG59XG4iLCJmdW5jdGlvbiBmaW5kVmFyaWFibGVJbkNvbGxlY3Rpb24odmFyaWFibGVOYW1lLCBjb2xsZWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IGZpZ21hQ29sbGVjdGlvbnMgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zKCk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGZpZ21hQ29sbGVjdGlvbnMuZmluZChjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24ubmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpO1xuICAgIGxldCBmaWdtYVZpcmFibGU7XG4gICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbi52YXJpYWJsZUlkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpZ21hVmFyaWFibGVJbkNvbGxlY2l0b24gPSBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkKGlkKTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gZmlnbWFWYXJpYWJsZUluQ29sbGVjaXRvbi5uYW1lID09PSB2YXJpYWJsZU5hbWU7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBmaWdtYVZpcmFibGUgPSBmaWdtYVZhcmlhYmxlSW5Db2xsZWNpdG9uO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZ21hVmlyYWJsZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRmlnbWFWYXJpYWJsZUJ5TmFtZSh2YXJpYWJsZU5hbWUsIGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgaWYgKGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgIHJldHVybiBmaW5kVmFyaWFibGVJbkNvbGxlY3Rpb24odmFyaWFibGVOYW1lLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBmaWdtYVZhcmlhYmxlcyA9IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlcygpO1xuICAgICAgICByZXR1cm4gZmlnbWFWYXJpYWJsZXMuZmluZCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lID09PSB2YXJpYWJsZU5hbWUpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWdtYUNvbGxlY3Rpb24obmFtZSkge1xuICAgIGNvbnN0IGZpZ21hQ29sbGVjdGlvbnMgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zKCk7XG4gICAgbGV0IGlzTmV3ID0gZmFsc2U7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSBmaWdtYUNvbGxlY3Rpb25zLmZpbmQoY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLm5hbWUgPT09IG5hbWUpO1xuICAgIGlmICghY29sbGVjdGlvbikge1xuICAgICAgICBpc05ldyA9IHRydWU7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBmaWdtYS52YXJpYWJsZXMuY3JlYXRlVmFyaWFibGVDb2xsZWN0aW9uKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4geyBjb2xsZWN0aW9uLCBpc05ldyB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVWYXJpYWJsZVR5cGUodHlwZU5hbWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVOYW1lKSB7XG4gICAgICAgIGNhc2UgJ2NvbG9yJzogcmV0dXJuICdDT0xPUic7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOiByZXR1cm4gJ0JPT0xFQU4nO1xuICAgICAgICBjYXNlICdudW1iZXInOiByZXR1cm4gJ0ZMT0FUJztcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICdTVFJJTkcnO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWdtYVZhcmlhYmxlKGNvbGxlY3Rpb24sIG1vZGVJZCwgdHlwZSwgdmFyaWFibGVOYW1lLCB2YWx1ZSA9IG51bGwsIHNjb3BlcyA9IFsnQUxMX1NDT1BFUyddLCBkZXNjcmlwdGlvbiA9IG51bGwpIHtcbiAgICBsZXQgZmlnbWFWYXJpYWJsZSA9IGZpbmRGaWdtYVZhcmlhYmxlQnlOYW1lKHZhcmlhYmxlTmFtZSwgY29sbGVjdGlvbi5uYW1lKTtcbiAgICBpZiAoIWZpZ21hVmFyaWFibGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpZ21hVmFyaWFibGUgPSBmaWdtYS52YXJpYWJsZXMuY3JlYXRlVmFyaWFibGUodmFyaWFibGVOYW1lLCBjb2xsZWN0aW9uLmlkLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGUgIT0gZmlnbWFWYXJpYWJsZS5yZXNvbHZlZFR5cGUpIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgfVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmaWdtYVZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShtb2RlSWQsIHZhbHVlKTtcbiAgICB9XG4gICAgZmlnbWFWYXJpYWJsZS5zY29wZXMgPSBzY29wZXM7XG4gICAgaWYgKGRlc2NyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgZmlnbWFWYXJpYWJsZS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZmlnbWFWYXJpYWJsZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KGRhdGEpIHtcbiAgICBjb25zdCB0b2tlbnMgPSB7fTtcbiAgICBPYmplY3QuZW50cmllcyhkYXRhKS5mb3JFYWNoKChba2V5LCBvYmplY3RdKSA9PiB7XG4gICAgICAgIHRyYXZlcnNlVG9rZW4oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgdG9rZW5zLFxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW5zO1xufVxuZnVuY3Rpb24gdHJhdmVyc2VUb2tlbih7IGtleSwgb2JqZWN0LCB0b2tlbnMsIH0pIHtcbiAgICBpZiAoIW9iamVjdClcbiAgICAgICAgZGVidWdnZXI7XG4gICAgLy8gaWYga2V5IGlzIGEgbWV0YSBmaWVsZCwgbW92ZSBvblxuICAgIGlmIChrZXkuY2hhckF0KDApID09PSBcIiRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvYmplY3QuJHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdG9rZW5zW2tleV0gPSBPYmplY3QuYXNzaWduKHt9LCBvYmplY3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMob2JqZWN0KS5mb3JFYWNoKChba2V5Miwgb2JqZWN0Ml0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkyLmNoYXJBdCgwKSAhPT0gXCIkXCIpIHtcbiAgICAgICAgICAgICAgICB0cmF2ZXJzZVRva2VuKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBgJHtrZXl9LyR7a2V5Mn1gLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IG9iamVjdDIsXG4gICAgICAgICAgICAgICAgICAgIHRva2Vuc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGRlbGF5QXN5bmMgfSBmcm9tIFwiLi9kZWxheS1hc3luY1wiO1xuaW1wb3J0IHsgX2Nsb25lIH0gZnJvbSBcIi4vY2xvbmVcIjtcbmltcG9ydCB7IGJpbmRQcm9wZXJ0eVZhcmlhYmxlcywgZmluZFZhcmlhYmxlTWF0Y2ggfSBmcm9tIFwiLi9zd2FwLXZhcmlhYmxlc1wiO1xubGV0IHRvdGFsTGF5ZXJzQ291bnQgPSAwO1xubGV0IHJlYm91bmRMYXllcnNDb3VudCA9IDA7XG5sZXQgc2tpcHBlZExheWVyc0NvdW50ID0gMDtcbmxldCBtaXNzaW5nTGF5ZXJzQ291bnQgPSAwO1xuLy9jYWNoZSBhbGwgY29tcG9uZW50IHNldHMgdG8gc3BlZWQgdXAgdGhlIHByb2Nlc3NcbmxldCBjb21wb25lbnRTZXRzO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50U2V0cygpIHtcbiAgICBpZiAoIWNvbXBvbmVudFNldHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coYEZpcnN0IHRpbWUgbG9vayB1cCwgcnVubmluZyBzbG93Li4uYCk7XG4gICAgICAgIGZpZ21hLnNraXBJbnZpc2libGVJbnN0YW5jZUNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgY29tcG9uZW50U2V0cyA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRBbGxXaXRoQ3JpdGVyaWEoe1xuICAgICAgICAgICAgdHlwZXM6IFsnQ09NUE9ORU5UJywgJ0NPTVBPTkVOVF9TRVQnXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudFNldHM7XG59XG5mdW5jdGlvbiBmaW5kQ29tcG9uZW50KGNtcE5hbWUpIHtcbiAgICBsZXQgbWFzdGVyQ29tcG9uZW50ID0gZ2V0Q29tcG9uZW50U2V0cygpLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGNtcE5hbWUpO1xuICAgIHJldHVybiBtYXN0ZXJDb21wb25lbnQgfHwgbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRTdHlsZVRlbXBsYXRlcygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0b3RhbExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgcmVib3VuZExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgc2tpcHBlZExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgbGV0IF9ub2RlcyA9IFtdO1xuICAgICAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3QgYXQgbGVhc3Qgb25lIGxheWVyIGFuZCB0cnkgYWdhaW5cIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICgnY2hpbGRyZW4nIGluIG5vZGUpIHtcbiAgICAgICAgICAgICAgICBfbm9kZXMgPSBfbm9kZXMuY29uY2F0KG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coX25vZGVzKTtcbiAgICAgICAgbGV0IG1hdGNoZXMgPSBbXTtcbiAgICAgICAgX25vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlICE9ICdGUkFNRScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHNraXAgZXZlcnl0aW5nIHRoYXQgaXMgbm90IGEgcmVndWxhciBmcmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50Tm9kZSA9IGZpbmRDb21wb25lbnQobm9kZS5uYW1lKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGNvbXBvbmVudE5vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIHRvdGFsTGF5ZXJzQ291bnQgPSB0b3RhbDtcbiAgICAgICAgd2hpbGUgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaERhdGEgPSBtYXRjaGVzLnNoaWZ0KCk7XG4gICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5yb3VuZCgoKHRvdGFsIC0gbWF0Y2hlcy5sZW5ndGgpIC8gdG90YWwpICogMTAwKTtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGAke3BlcmNlbnR9JSBkb25lLiBXb3JraW5nIG9uIGxheWVyICR7dG90YWwgLSBtYXRjaGVzLmxlbmd0aH0gb3V0IG9mICR7dG90YWx9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICBpZiAobWF0Y2hEYXRhLnRhcmdldC50eXBlID09ICdDT01QT05FTlRfU0VUJykge1xuICAgICAgICAgICAgICAgIG1hdGNoRGF0YS5zb3VyY2UuY2hpbGRyZW4uZm9yRWFjaCgoc291cmNlRnJhbWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbWF0Y2hEYXRhLnRhcmdldC5maW5kQ2hpbGQobiA9PiBuLm5hbWUgPT09IHNvdXJjZUZyYW1lLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRhcmdldCA9PT0gbnVsbCB8fCB0YXJnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRhcmdldC50eXBlKSA9PSAnQ09NUE9ORU5UJyAmJiBzb3VyY2VGcmFtZS50eXBlID09ICdGUkFNRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHByb2Nlc3NOb2RlKHNvdXJjZUZyYW1lLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeWllbGQgcHJvY2Vzc05vZGUobWF0Y2hEYXRhLnNvdXJjZSwgbWF0Y2hEYXRhLnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcHJvY2Vzc05vZGUoc291cmNlRnJhbWUsIHRhcmdldENvbXBvbmVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCB0YXJnZXRGcmFtZXMgPSBbXTtcbiAgICAgICAgY29weVN0eWxlcyhzb3VyY2VGcmFtZSwgdGFyZ2V0Q29tcG9uZW50KTtcbiAgICAgICAgYmluZFZhaXJhYmxlcyhzb3VyY2VGcmFtZSwgdGFyZ2V0Q29tcG9uZW50KTtcbiAgICAgICAgZmlnbWEuc2tpcEludmlzaWJsZUluc3RhbmNlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICBjb25zdCBpbnN0YW5jZXMgPSBzb3VyY2VGcmFtZS5maW5kQWxsV2l0aENyaXRlcmlhKHsgdHlwZXM6IFsnSU5TVEFOQ0UnXSB9KTtcbiAgICAgICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2VOb2RlID0+IHtcbiAgICAgICAgICAgIGxldCB0YXJnZXROb2RlID0gdGFyZ2V0Q29tcG9uZW50LmZpbmRPbmUobiA9PiBuLm5hbWUgPT09IGluc3RhbmNlTm9kZS5uYW1lKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXROb2RlKSB7XG4gICAgICAgICAgICAgICAgY29weU92ZXJyaWRlcyhpbnN0YW5jZU5vZGUsIHRhcmdldE5vZGUsIHRhcmdldENvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzb3VyY2VGcmFtZS5jaGlsZHJlbi5mb3JFYWNoKChzb3VyY2VOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldE5vZGUgPSB0YXJnZXRDb21wb25lbnQuZmluZE9uZShuID0+IG4ubmFtZSA9PT0gc291cmNlTm9kZS5uYW1lKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgIC8vIGNvcHkgYSBjb21wb25lbnQgYW5kIGluc2VydCBpdCBpbnRvIHRoZSBzYW1lIHBvc2l0aW9uIGFzIGl0IGlzIGluIHNvdXJjZUZyYW1lXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBzb3VyY2VOb2RlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Q29tcG9uZW50Lmluc2VydENoaWxkKGluZGV4LCBjbG9uZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzaXplQW5kUmVwb3NpdGlvbihzb3VyY2VOb2RlLCB0YXJnZXROb2RlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VOb2RlLnR5cGUgPT0gJ0ZSQU1FJyAmJiB0YXJnZXROb2RlLnR5cGUgPT0gJ0ZSQU1FJyB8fFxuICAgICAgICAgICAgICAgIHNvdXJjZU5vZGUudHlwZSA9PSAnSU5TVEFOQ0UnICYmIHRhcmdldE5vZGUudHlwZSA9PSAnSU5TVEFOQ0UnIHx8XG4gICAgICAgICAgICAgICAgc291cmNlTm9kZS50eXBlID09ICdCT09MRUFOX09QRVJBVElPTicgJiYgdGFyZ2V0Tm9kZS50eXBlID09ICdCT09MRUFOX09QRVJBVElPTicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRGcmFtZXMucHVzaCh7IHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0YXJnZXRGcmFtZXMuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEudGFyZ2V0Tm9kZS5maWxscyA9IF9jbG9uZShkYXRhLnNvdXJjZU5vZGUuZmlsbHMpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLmVmZmVjdHMgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLmVmZmVjdHMpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZXMgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnN0cm9rZXMpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLm9wYWNpdHkgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLm9wYWNpdHkpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnZpc2libGUgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnZpc2libGUpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLmlzTWFzayA9IF9jbG9uZShkYXRhLnNvdXJjZU5vZGUuaXNNYXNrKTtcbiAgICAgICAgICAgIGRhdGEudGFyZ2V0Tm9kZS5zdHJva2VBbGlnbiA9IF9jbG9uZShkYXRhLnNvdXJjZU5vZGUuc3Ryb2tlQWxpZ24pO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZUFsaWduID0gX2Nsb25lKGRhdGEuc291cmNlTm9kZS5zdHJva2VBbGlnbik7XG4gICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUuc3Ryb2tlQ2FwID0gX2Nsb25lKGRhdGEuc291cmNlTm9kZS5zdHJva2VDYXApO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZUpvaW4gPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnN0cm9rZUpvaW4pO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZU1pdGVyTGltaXQgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnN0cm9rZU1pdGVyTGltaXQpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZVN0eWxlSWQgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnN0cm9rZVN0eWxlSWQpO1xuICAgICAgICAgICAgZGF0YS50YXJnZXROb2RlLnN0cm9rZVdlaWdodCA9IF9jbG9uZShkYXRhLnNvdXJjZU5vZGUuc3Ryb2tlV2VpZ2h0KTtcbiAgICAgICAgICAgIGlmIChkYXRhLnNvdXJjZU5vZGUudHlwZSA9PSAnRlJBTUUnICYmIGRhdGEudGFyZ2V0Tm9kZS50eXBlID09ICdGUkFNRScpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUuY29uc3RyYWludHMgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLmNvbnN0cmFpbnRzKTtcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUubGF5b3V0R3JpZHMgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLmxheW91dEdyaWRzKTtcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUuc3Ryb2tlQm90dG9tV2VpZ2h0ID0gX2Nsb25lKGRhdGEuc291cmNlTm9kZS5zdHJva2VCb3R0b21XZWlnaHQpO1xuICAgICAgICAgICAgICAgIGRhdGEudGFyZ2V0Tm9kZS5zdHJva2VMZWZ0V2VpZ2h0ID0gX2Nsb25lKGRhdGEuc291cmNlTm9kZS5zdHJva2VMZWZ0V2VpZ2h0KTtcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUuc3Ryb2tlUmlnaHRXZWlnaHQgPSBfY2xvbmUoZGF0YS5zb3VyY2VOb2RlLnN0cm9rZVJpZ2h0V2VpZ2h0KTtcbiAgICAgICAgICAgICAgICBkYXRhLnRhcmdldE5vZGUuc3Ryb2tlVG9wV2VpZ2h0ID0gX2Nsb25lKGRhdGEuc291cmNlTm9kZS5zdHJva2VUb3BXZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29weVN0eWxlcyhkYXRhLnNvdXJjZU5vZGUsIGRhdGEudGFyZ2V0Tm9kZSk7XG4gICAgICAgICAgICBiaW5kVmFpcmFibGVzKGRhdGEuc291cmNlTm9kZSwgZGF0YS50YXJnZXROb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHlpZWxkIGRlbGF5QXN5bmMoMTApO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYmluZFZhaXJhYmxlcyhzb3VyY2VGcmFtZSwgdGFyZ2V0Q29tcG9uZW50KSB7XG4gICAgY29uc3QgYm91bmRWYWlyYWJsZXMgPSBPYmplY3QuZW50cmllcyhzb3VyY2VGcmFtZS5ib3VuZFZhcmlhYmxlcyk7XG4gICAgYm91bmRWYWlyYWJsZXMuZm9yRWFjaCgoW3Byb3BOYW1lLCB2YXJCaW5kaW5nXSkgPT4ge1xuICAgICAgICBiaW5kVmFyaWFibGUoc291cmNlRnJhbWUsIHRhcmdldENvbXBvbmVudCwgcHJvcE5hbWUsIHZhckJpbmRpbmcpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVzaXplQW5kUmVwb3NpdGlvbihzb3VyY2VOb2RlLCB0YXJnZXROb2RlKSB7XG4gICAgaWYgKHRhcmdldE5vZGUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzb3VyY2VOb2RlLnR5cGUgPT0gJ0JPT0xFQU5fT1BFUkFUSU9OJykge1xuICAgICAgICBzb3VyY2VOb2RlLmNoaWxkcmVuLmZvckVhY2goc291cmNlID0+IHtcbiAgICAgICAgICAgIGlmICgnZmluZE9uZScgaW4gdGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldE5vZGUuZmluZE9uZShuID0+IG4ubmFtZSA9PT0gc291cmNlLm5hbWUpO1xuICAgICAgICAgICAgICAgIHJlc2l6ZUFuZFJlcG9zaXRpb24oc291cmNlLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRhcmdldE5vZGUueCA9IHNvdXJjZU5vZGUueDtcbiAgICAgICAgdGFyZ2V0Tm9kZS55ID0gc291cmNlTm9kZS55O1xuICAgICAgICBpZiAoJ3Jlc2l6ZScgaW4gdGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5yZXNpemUoc291cmNlTm9kZS53aWR0aCwgc291cmNlTm9kZS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY29weU92ZXJyaWRlcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCB0YXJnZXRDb21wb25lbnQpIHtcbiAgICBpZiAodGFyZ2V0Tm9kZS50eXBlID09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgLy8gU1dBUCBJTlNUQU5DRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNvbnN0IGRvU3dhcCA9IHNvdXJjZU5vZGUubWFpbkNvbXBvbmVudC5pZCAhPT0gdGFyZ2V0Tm9kZS5tYWluQ29tcG9uZW50LmlkO1xuICAgICAgICBpZiAoZG9Td2FwKSB7XG4gICAgICAgICAgICB0YXJnZXROb2RlLnN3YXBDb21wb25lbnQoc291cmNlTm9kZS5tYWluQ29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDT1BZIENPTVBPTkVOVCBQUk9QUyAtLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbXBvbmVudFByb3BzID0gc291cmNlTm9kZS5jb21wb25lbnRQcm9wZXJ0aWVzO1xuICAgICAgICBjb25zdCBwcm9wc0NvcHkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlQ29tcG9uZW50UHJvcHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHByb3BzQ29weVtrZXldID0gc291cmNlQ29tcG9uZW50UHJvcHNba2V5XS52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhcmdldE5vZGUuc2V0UHJvcGVydGllcyhwcm9wc0NvcHkpO1xuICAgIH1cbiAgICBzb3VyY2VOb2RlLm92ZXJyaWRlcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBjb25zdCB0eXBlID0gdGFyZ2V0Tm9kZS50eXBlO1xuICAgICAgICBpZiAodHlwZSAhPSAnRlJBTUUnICYmXG4gICAgICAgICAgICB0eXBlICE9ICdCT09MRUFOX09QRVJBVElPTicgJiZcbiAgICAgICAgICAgIHR5cGUgIT0gJ0NPTVBPTkVOVF9TRVQnICYmXG4gICAgICAgICAgICB0eXBlICE9ICdDT01QT05FTlQnICYmXG4gICAgICAgICAgICB0eXBlICE9ICdJTlNUQU5DRScgJiZcbiAgICAgICAgICAgIHR5cGUgIT0gJ0dST1VQJyAmJlxuICAgICAgICAgICAgdHlwZSAhPSAnU0VDVElPTicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzb3VyY2UgPSBmaWdtYS5nZXROb2RlQnlJZChwcm9wLmlkKTtcbiAgICAgICAgY29uc3QgZmllbGRzID0gcHJvcC5vdmVycmlkZGVuRmllbGRzO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBwcm9wLmlkID09IHRhcmdldE5vZGUuaWQgPyB0YXJnZXROb2RlIDogdGFyZ2V0Tm9kZS5maW5kT25lKG4gPT4gbi5uYW1lID09PSBzb3VyY2UubmFtZSk7XG4gICAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZCA9PSAnc3Rva2VUb3BXZWlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lID0gJ3N0cm9rZVRvcFdlaWdodCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWVsZCA9PSAnY29tcG9uZW50UHJvcGVydGllcycgJiYgc291cmNlLnR5cGUgPT0gJ0lOU1RBTkNFJyAmJiB0YXJnZXQudHlwZSA9PSAnSU5TVEFOQ0UnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENPUFkgQ09NUE9ORU5UIFBST1BTIC0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlQ29tcG9uZW50UHJvcHMgPSBzb3VyY2UuY29tcG9uZW50UHJvcGVydGllcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcHNDb3B5ID0ge307XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZUNvbXBvbmVudFByb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wc0NvcHlba2V5XSA9IHNvdXJjZUNvbXBvbmVudFByb3BzW2tleV0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2V0UHJvcGVydGllcyhwcm9wc0NvcHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wTmFtZSAhPSAnY29tcG9uZW50UHJvcGVydHlEZWZpbml0aW9ucycgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWUgIT0gJ2hlaWdodCcgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWUgIT0gJ292ZXJsYXlCYWNrZ3JvdW5kJyAmJlxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSAhPSAnb3ZlcmxheUJhY2tncm91bmRJbnRlcmFjdGlvbicgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWUgIT0gJ292ZXJsYXlQb3NpdGlvblR5cGUnICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lICE9ICdwYXJlbnQnICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lICE9ICd0eXBlJyAmJlxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSAhPSAnd2lkdGgnICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lICE9ICdib3VuZFZhcmlhYmxlcycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGFwcGx5aW5nICR7cHJvcE5hbWV9OiR7c291cmNlW3Byb3BOYW1lXX0gdG8gJHtzb3VyY2UubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IF9jbG9uZShzb3VyY2VbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJpbmRWYWlyYWJsZXMoc291cmNlLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjb3B5U3R5bGVzKHNvdXJjZUZyYW1lLCB0YXJnZXRDb21wb25lbnQpIHtcbiAgICBpZiAoJ2VmZmVjdFN0eWxlSWQnIGluIHNvdXJjZUZyYW1lICYmICdlZmZlY3RTdHlsZUlkJyBpbiB0YXJnZXRDb21wb25lbnQpIHtcbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50LmVmZmVjdFN0eWxlSWQgPSBzb3VyY2VGcmFtZS5lZmZlY3RTdHlsZUlkO1xuICAgIH1cbiAgICBpZiAoJ2dyaWRTdHlsZUlkJyBpbiBzb3VyY2VGcmFtZSAmJiAnZ3JpZFN0eWxlSWQnIGluIHRhcmdldENvbXBvbmVudCkge1xuICAgICAgICB0YXJnZXRDb21wb25lbnQuZ3JpZFN0eWxlSWQgPSBzb3VyY2VGcmFtZS5ncmlkU3R5bGVJZDtcbiAgICB9XG4gICAgaWYgKCdmaWxsU3R5bGVJZCcgaW4gc291cmNlRnJhbWUgJiYgJ2ZpbGxTdHlsZUlkJyBpbiB0YXJnZXRDb21wb25lbnQpIHtcbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50LmZpbGxTdHlsZUlkID0gc291cmNlRnJhbWUuZmlsbFN0eWxlSWQ7XG4gICAgfVxuICAgIGlmICgnc3Ryb2tlU3R5bGVJZCcgaW4gc291cmNlRnJhbWUgJiYgJ3N0cm9rZVN0eWxlSWQnIGluIHRhcmdldENvbXBvbmVudCkge1xuICAgICAgICB0YXJnZXRDb21wb25lbnQuc3Ryb2tlU3R5bGVJZCA9IHNvdXJjZUZyYW1lLnN0cm9rZVN0eWxlSWQ7XG4gICAgfVxufVxuZnVuY3Rpb24gYmluZFZhcmlhYmxlKHNvdXJjZUZyYW1lLCB0YXJnZXRDb21wb25lbnQsIHByb3BOYW1lLCB2YXJpYWJsZUJpbmRpbmcpIHtcbiAgICBpZiAocHJvcE5hbWUgPT0gJ2ZpbGxzJyAmJiAnZmlsbHMnIGluIHNvdXJjZUZyYW1lICYmICdmaWxscycgaW4gdGFyZ2V0Q29tcG9uZW50ICYmICF0YXJnZXRDb21wb25lbnRbJ2ZpbGxTdHlsZUlkJ10pIHtcbiAgICAgICAgdGFyZ2V0Q29tcG9uZW50LmZpbGxzID0gYmluZFByb3BlcnR5VmFyaWFibGVzKHNvdXJjZUZyYW1lLmZpbGxzLCBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcE5hbWUgPT0gJ3N0cm9rZXMnICYmICdzdHJva2VzJyBpbiBzb3VyY2VGcmFtZSAmJiAnc3Ryb2tlcycgaW4gdGFyZ2V0Q29tcG9uZW50ICYmICF0YXJnZXRDb21wb25lbnRbJ3N0cm9rZVN0eWxlSWQnXSkge1xuICAgICAgICB0YXJnZXRDb21wb25lbnQuc3Ryb2tlcyA9IGJpbmRQcm9wZXJ0eVZhcmlhYmxlcyhzb3VyY2VGcmFtZS5zdHJva2VzLCBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcE5hbWUgPT0gJ2VmZmVjdHMnICYmICdlZmZlY3RzJyBpbiBzb3VyY2VGcmFtZSAmJiAnZWZmZWN0cycgaW4gdGFyZ2V0Q29tcG9uZW50ICYmICF0YXJnZXRDb21wb25lbnRbJ2VmZmVjdFN0eWxlSWQnXSkge1xuICAgICAgICB0YXJnZXRDb21wb25lbnQuZWZmZWN0cyA9IGJpbmRQcm9wZXJ0eVZhcmlhYmxlcyhzb3VyY2VGcmFtZS5lZmZlY3RzLCBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvckVmZmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BOYW1lID09ICdsYXlvdXRHcmlkcycgJiYgJ2xheW91dEdyaWRzJyBpbiBzb3VyY2VGcmFtZSAmJiAnbGF5b3V0R3JpZHMnIGluIHRhcmdldENvbXBvbmVudCkge1xuICAgICAgICB0YXJnZXRDb21wb25lbnQubGF5b3V0R3JpZHMgPSBiaW5kUHJvcGVydHlWYXJpYWJsZXMoc291cmNlRnJhbWUubGF5b3V0R3JpZHMsIGZpZ21hLnZhcmlhYmxlcy5zZXRCb3VuZFZhcmlhYmxlRm9yTGF5b3V0R3JpZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BOYW1lID09ICdjb21wb25lbnRQcm9wZXJ0aWVzJyB8fCBwcm9wTmFtZSA9PSAndGV4dFJhbmdlRmlsbHMnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgU3dhcCBkb2VzIG5vdCB3b3JrIGZvciAke3Byb3BOYW1lfSwgc2tpcHBpbmcgbm9kZWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGUgPSBmaW5kVmFyaWFibGVNYXRjaCh2YXJpYWJsZUJpbmRpbmcuaWQpO1xuICAgICAgICBpZiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIHRhcmdldENvbXBvbmVudC5zZXRCb3VuZFZhcmlhYmxlKHByb3BOYW1lLCBudWxsKTtcbiAgICAgICAgICAgIHRhcmdldENvbXBvbmVudC5zZXRCb3VuZFZhcmlhYmxlKHByb3BOYW1lLCB2YXJpYWJsZS5pZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByb3VuZFR3b0RpZ2l0cyhudW0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgobnVtICsgTnVtYmVyLkVQU0lMT04pICogMTAwKSAvIDEwMDtcbn1cbiIsImNvbnN0IHBhbGV0dGVPcmRlciA9IFtcbiAgICAncHJpbWFyeScsXG4gICAgJ2JyYW5kJyxcbiAgICAnZmlsbC9iYXNlJyxcbiAgICAnZmlsbC9jb250cmFzdCcsXG4gICAgJ3RleHQvYmFzZS82MDAnLFxuICAgICd0ZXh0L2Jhc2UvNTAwJyxcbiAgICAndGV4dC9iYXNlLzQwMCcsXG4gICAgJ3RleHQvYmFzZS9hY3Rpb24nLFxuICAgICd0ZXh0L2Jhc2UvaW5mbycsXG4gICAgJ3RleHQvYmFzZS9zdWNjZXNzJyxcbiAgICAndGV4dC9iYXNlL3dhcm5pbmcnLFxuICAgICd0ZXh0L2Jhc2UvZGFuZ2VyJyxcbiAgICAndGV4dC9jb250cmFzdC82MDAnLFxuICAgICd0ZXh0L2NvbnRyYXN0LzUwMCcsXG4gICAgJ3RleHQvY29udHJhc3QvNDAwJyxcbiAgICAndGV4dC9jb250cmFzdC9hY3Rpb24nLFxuICAgICd0ZXh0L2NvbnRyYXN0L2luZm8nLFxuICAgICd0ZXh0L2NvbnRyYXN0L3N1Y2Nlc3MnLFxuICAgICd0ZXh0L2NvbnRyYXN0L3dhcm5pbmcnLFxuICAgICd0ZXh0L2NvbnRyYXN0L2RhbmdlcicsXG4gICAgJ3N0cm9rZS9iYXNlJyxcbiAgICAnc3Ryb2tlL2NvbnRyYXN0JyxcbiAgICAnaW5mbycsXG4gICAgJ3N1Y2Nlc3MnLFxuICAgICd3YXJuaW5nJyxcbiAgICAnZGFuZ2VyJyxcbiAgICAnYWx0L2Jhc2UnLFxuICAgICdhbHQvY29udHJhc3QnLFxuICAgICd1dGlsaXR5JyxcbiAgICAnYWNjZW50L3JlZCcsXG4gICAgJ2FjY2VudC9hbWJlcicsXG4gICAgJ2FjY2VudC9icm93bicsXG4gICAgJ2FjY2VudC9ncmVlbicsXG4gICAgJ2FjY2VudC90ZWFsJyxcbiAgICAnYWNjZW50L2N5YW4nLFxuICAgICdhY2NlbnQvYmx1ZScsXG4gICAgJ2FjY2VudC9pbmRpZ28nLFxuICAgICdhY2NlbnQvdmlvbGV0JyxcbiAgICAnYWNjZW50L3B1cnBsZScsXG4gICAgJ2FjY2VudC9waW5rJyxcbiAgICAndWktZWxlbWVudC9iZy9yZXN0JyxcbiAgICAndWktZWxlbWVudC9iZy9ob3ZlcicsXG4gICAgJ3VpLWVsZW1lbnQvYmcvYWN0aXZlJyxcbiAgICAndWktZWxlbWVudC9iZy9zZWxlY3RlZCcsXG4gICAgJ3VpLWVsZW1lbnQvYmcvZGlzYWJsZWQnLFxuICAgICd1aS1lbGVtZW50L2JvcmRlci9yZXN0JyxcbiAgICAndWktZWxlbWVudC9ib3JkZXIvaG92ZXInLFxuICAgICd1aS1lbGVtZW50L2JvcmRlci9hY3RpdmUnLFxuICAgICd1aS1lbGVtZW50L2JvcmRlci9zZWxlY3RlZCcsXG4gICAgJ3VpLWVsZW1lbnQvYm9yZGVyL2Rpc2FibGVkJyxcbiAgICAndWktZWxlbWVudC90ZXh0JyxcbiAgICAnYnV0dG9uL2JnL3Jlc3QnLFxuICAgICdidXR0b24vYmcvaG92ZXInLFxuICAgICdidXR0b24vYmcvYWN0aXZlJyxcbiAgICAnYnV0dG9uL3ByaW1hcnknLFxuICAgICdidXR0b24vc3VjY2VzcycsXG4gICAgJ2J1dHRvbi9kYW5nZXInLFxuICAgICdidXR0b24vYm9yZGVyL3Jlc3QnLFxuICAgICdidXR0b24vYm9yZGVyL2hvdmVyJyxcbiAgICAnYnV0dG9uL2JvcmRlci9hY3RpdmUnLFxuICAgICdmb3JtLWVsZW1lbnQvYmcvcmVzdCcsXG4gICAgJ2Zvcm0tZWxlbWVudC9iZy9yZWFkb25seScsXG4gICAgJ2Zvcm0tZWxlbWVudC9iZy9ob3ZlcicsXG4gICAgJ2Zvcm0tZWxlbWVudC9ib3JkZXIvcmVzdCcsXG4gICAgJ2Zvcm0tZWxlbWVudC9ib3JkZXIvcmVhZG9ubHknLFxuICAgICdmb3JtLWVsZW1lbnQvYm9yZGVyL2hvdmVyJyxcbiAgICAnY2FyZC9iZy9wcmltYXJ5JyxcbiAgICAnY2FyZC9iZy9zZWNvbmRhcnknLFxuICAgICdjYXJkL2JvcmRlci9pbm5lcicsXG4gICAgJ2NhcmQvYm9yZGVyL291dGVyJyxcbiAgICAnb3ZlcmxheS9iZycsXG4gICAgJ292ZXJsYXkvYm9yZGVyJyxcbl07XG5leHBvcnQgZnVuY3Rpb24gc29ydENvbG9yVG9rZW5zKGZpcnN0RWwsIHNlY29uZEVsKSB7XG4gICAgdmFyIHJlc3VsdEZpcnN0ID0gcGFsZXR0ZU9yZGVyLmZpbmRJbmRleChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGZpcnN0RWwubmFtZS5zdGFydHNXaXRoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHZhciByZXN1bHRTZWNvbmQgPSBwYWxldHRlT3JkZXIuZmluZEluZGV4KGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gc2Vjb25kRWwubmFtZS5zdGFydHNXaXRoKGl0ZW0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHRGaXJzdCA8IHJlc3VsdFNlY29uZCkge1xuICAgICAgICByZXR1cm4gLTE7IC8vIGZpcnN0RWwgZ29lcyBmaXJzdFxuICAgIH1cbiAgICBpZiAocmVzdWx0Rmlyc3QgPiByZXN1bHRTZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIDE7IC8vIHNlY29uZEVsIGdvZXMgZmlyc3RcbiAgICB9XG4gICAgaWYgKHJlc3VsdEZpcnN0ID09PSByZXN1bHRTZWNvbmQpIHtcbiAgICAgICAgbGV0IG5hbWUxID0gZmlyc3RFbC5uYW1lO1xuICAgICAgICBsZXQgbmFtZTIgPSBzZWNvbmRFbC5uYW1lO1xuICAgICAgICBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgcmV0dXJuIDE7IC8vIGZpcnN0RWwgZ29lcyBmaXJzdFxuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vIHNlY29uZEVsIGdvZXMgZmlyc3RcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIDA7IC8vIGtlZXAgb3JpZ2luYWwgb3JkZXIgICAgXG59XG4iLCJjb25zdCBwYWxldHRlT3JkZXIgPSBbXG4gICAgJ25vbmUnLFxuICAgICd4czUnLFxuICAgICd4czUnLFxuICAgICd4czMnLFxuICAgICd4czInLFxuICAgICd4cycsXG4gICAgJ3NtJyxcbiAgICAnYmFzZScsXG4gICAgJ21kJyxcbiAgICAnbGcnLFxuICAgICd4bCcsXG4gICAgJ3hsMicsXG4gICAgJ3hsMycsXG4gICAgJ3hsNCcsXG4gICAgJ3hsNScsXG4gICAgJ3hsNicsXG4gICAgJ3hsNycsXG4gICAgJ3JvdW5kJ1xuXTtcbmV4cG9ydCBmdW5jdGlvbiBzb3J0U2l6ZVRva2VucyhmaXJzdEVsLCBzZWNvbmRFbCkge1xuICAgIHZhciByZXN1bHRGaXJzdCA9IHBhbGV0dGVPcmRlci5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBmaXJzdEVsLm5hbWUuZW5kc1dpdGgoaXRlbSk7XG4gICAgfSk7XG4gICAgdmFyIHJlc3VsdFNlY29uZCA9IHBhbGV0dGVPcmRlci5maW5kSW5kZXgoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBzZWNvbmRFbC5uYW1lLmVuZHNXaXRoKGl0ZW0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHRGaXJzdCA8IHJlc3VsdFNlY29uZCkge1xuICAgICAgICByZXR1cm4gLTE7IC8vIGZpcnN0RWwgZ29lcyBmaXJzdFxuICAgIH1cbiAgICBpZiAocmVzdWx0Rmlyc3QgPiByZXN1bHRTZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIDE7IC8vIHNlY29uZEVsIGdvZXMgZmlyc3RcbiAgICB9XG4gICAgaWYgKHJlc3VsdEZpcnN0ID09PSByZXN1bHRTZWNvbmQpIHtcbiAgICAgICAgbGV0IG5hbWUxID0gZmlyc3RFbC5uYW1lO1xuICAgICAgICBsZXQgbmFtZTIgPSBzZWNvbmRFbC5uYW1lO1xuICAgICAgICBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyBmaXJzdEVsIGdvZXMgZmlyc3RcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgcmV0dXJuIDE7IC8vIHNlY29uZEVsIGdvZXMgZmlyc3RcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIDA7IC8vIGtlZXAgb3JpZ2luYWwgb3JkZXIgICAgXG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGRlbGF5QXN5bmMgfSBmcm9tIFwiLi9kZWxheS1hc3luY1wiO1xuaW1wb3J0IHsgX2Nsb25lIH0gZnJvbSBcIi4vY2xvbmVcIjtcbmltcG9ydCB7IGZpbmRGaWdtYVZhcmlhYmxlQnlOYW1lIH0gZnJvbSBcIi4vZmlnbWEtdmFyaWFibGVzXCI7XG5sZXQgdG90YWxMYXllcnNDb3VudCA9IDA7XG5sZXQgcmVib3VuZExheWVyc0NvdW50ID0gMDtcbmxldCBza2lwcGVkTGF5ZXJzQ291bnQgPSAwO1xubGV0IG1pc3NpbmdMYXllcnNDb3VudCA9IDA7XG5leHBvcnQgZnVuY3Rpb24gc3dhcFZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0b3RhbExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgcmVib3VuZExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgc2tpcHBlZExheWVyc0NvdW50ID0gMDtcbiAgICAgICAgbGV0IF9ub2RlcyA9IFtdO1xuICAgICAgICBmaWdtYS5za2lwSW52aXNpYmxlSW5zdGFuY2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJTZWxlY3QgYXQgbGVhc3Qgb25lIGxheWVyIGFuZCB0cnkgYWdhaW5cIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICgnYm91bmRWYXJpYWJsZXMnIGluIG5vZGUgJiYgT2JqZWN0LmtleXMobm9kZS5ib3VuZFZhcmlhYmxlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIF9ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCdmaW5kQWxsJyBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBub2RlLmZpbmRBbGwoKG4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdib3VuZFZhcmlhYmxlcycgaW4gbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG4uYm91bmRWYXJpYWJsZXMpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfbm9kZXMgPSBfbm9kZXMuY29uY2F0KG5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKF9ub2Rlcyk7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gX25vZGVzLmxlbmd0aDtcbiAgICAgICAgdG90YWxMYXllcnNDb3VudCA9IHRvdGFsO1xuICAgICAgICB3aGlsZSAoX25vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IF9ub2Rlcy5zaGlmdCgpO1xuICAgICAgICAgICAgLy8gKDcwIC0gNDQpIC8gNzBcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKCgodG90YWwgLSBfbm9kZXMubGVuZ3RoKSAvIHRvdGFsKSAqIDEwMCk7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgJHtwZXJjZW50fSUgZG9uZS4gV29ya2luZyBvbiBsYXllciAke3RvdGFsIC0gX25vZGVzLmxlbmd0aH0gb3V0IG9mICR7dG90YWx9YDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICB5aWVsZCBwcm9jZXNzTGF5ZXIobm9kZSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyAoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm9kZTogJHtub2RlLm5hbWV9YCk7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB5aWVsZCBwcm9jZXNzTGF5ZXIobm9kZSk7XG4gICAgICAgIGlmIChcImNoaWxkcmVuXCIgaW4gbm9kZSAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRyYXZlcnNpbmcgXCIke25vZGUubmFtZX1cIiBjaGlsZHJlbmApO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdHJhdmVyc2UoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRWYXJpYWJsZU5hbWUodmFyaWFibGUpIHtcbiAgICBjb25zdCBuYW1lID0gdmFyaWFibGUubmFtZTtcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlQWxsKCdzeCcsICdzcGFjaW5nJykucmVwbGFjZUFsbCgnc3knLCAnc3BhY2luZy9taW5vcicpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRWYXJpYWJsZU1hdGNoKHZhcklkKSB7XG4gICAgY29uc3QgdmFyaWFibGUgPSBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkKHZhcklkKTtcbiAgICBpZiAoIXZhcmlhYmxlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgY29sbGVjdGlvbklkID0gbnVsbDtcbiAgICBsZXQgY29sbGVjdGlvbiA9IG51bGw7XG4gICAgY29sbGVjdGlvbklkID0gdmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQ7XG4gICAgY29sbGVjdGlvbiA9IGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUNvbGxlY3Rpb25CeUlkKGNvbGxlY3Rpb25JZCk7XG4gICAgY29uc3QgbmFtZSA9IGdldFZhcmlhYmxlTmFtZSh2YXJpYWJsZSk7XG4gICAgY29uc3QgdGFyZ2V0VmFyaWFibGUgPSBmaW5kRmlnbWFWYXJpYWJsZUJ5TmFtZShuYW1lLCBjb2xsZWN0aW9uLm5hbWUpO1xuICAgIGlmICghdGFyZ2V0VmFyaWFibGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBDYW5ub3QgZmluZCAke2NvbGxlY3Rpb24ubmFtZX0gPiAke3ZhcmlhYmxlLm5hbWV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICA7XG4gICAgLy8gaWYgKHRhcmdldFZhcmlhYmxlLmlkID09IHZhcmlhYmxlLmlkKSB7XG4gICAgLy8gICAgIGNvbnNvbGUud2FybihgJHt2YXJpYWJsZS5uYW1lfSBpcyBhIGxvY2FsIHZhcmlhYmxlYCk7XG4gICAgLy8gICAgIHNraXBwZWRMYXllcnNDb3VudCsrO1xuICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG4gICAgcmV0dXJuIHRhcmdldFZhcmlhYmxlO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0xheWVyKG5vZGUpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBib3VuZFZhaXJhYmxlcyA9IE9iamVjdC5lbnRyaWVzKG5vZGUuYm91bmRWYXJpYWJsZXMpO1xuICAgICAgICBib3VuZFZhaXJhYmxlcy5mb3JFYWNoKChbcHJvcE5hbWUsIGJvdW5kVmFyXSkgPT4ge1xuICAgICAgICAgICAgYmluZFZhcmlhYmxlKG5vZGUsIHByb3BOYW1lLCBib3VuZFZhcik7XG4gICAgICAgIH0pO1xuICAgICAgICB5aWVsZCBkZWxheUFzeW5jKDIpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRQcm9wZXJ0eVZhcmlhYmxlcyhwcm9wcywgZmlnbWFGbikge1xuICAgIGNvbnN0IHByb3BzQ29weSA9IF9jbG9uZShwcm9wcykubWFwKHByb3AgPT4ge1xuICAgICAgICBPYmplY3Qua2V5cyhwcm9wLmJvdW5kVmFyaWFibGVzKS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWxpYXMgPSBwcm9wLmJvdW5kVmFyaWFibGVzW2ZpZWxkXTtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlID0gZmluZFZhcmlhYmxlTWF0Y2goYWxpYXMuaWQpO1xuICAgICAgICAgICAgY29uc3Qgc3ByZWFkID0gcHJvcFsnc3ByZWFkJ107IC8vd29ya2Fyb3VuZCBGaWdtYSBidWcuIEl0IHJlc2V0cyBzcHJlYWQgYWZ0ZXIgY2FsbGluZyBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvckVmZmVjdFxuICAgICAgICAgICAgaWYgKHZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgICAgLy8gcHJvcC5ib3VuZFZhcmlhYmxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHByb3AgPSBmaWdtYUZuKHByb3AsIGZpZWxkLCBudWxsKTtcbiAgICAgICAgICAgICAgICBwcm9wID0gZmlnbWFGbihwcm9wLCBmaWVsZCwgdmFyaWFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzcHJlYWQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwcm9wWydzcHJlYWQnXSA9IHNwcmVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9wO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9wc0NvcHk7XG59XG5mdW5jdGlvbiBiaW5kRWZmZWN0VmFyaWFibGVzKHByb3BzLCBmaWdtYUZuKSB7XG59XG5mdW5jdGlvbiBiaW5kVmFyaWFibGUobm9kZSwgcHJvcE5hbWUsIHZhcmlhYmxlQmluZGluZykge1xuICAgIGlmIChub2RlLnR5cGUgPT0gJ1RFWFQnKSB7XG4gICAgICAgIGNvbnN0IHRleHRTdHlsZSA9IGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnRleHRTdHlsZUlkKTtcbiAgICAgICAgaWYgKHRleHRTdHlsZSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxUZXh0U3R5bGUgPSBmaWdtYS5nZXRMb2NhbFRleHRTdHlsZXMoKS5maW5kKHN0eWxlID0+IHN0eWxlLm5hbWUgPT09IHRleHRTdHlsZS5uYW1lKTtcbiAgICAgICAgICAgIGlmIChsb2NhbFRleHRTdHlsZSkge1xuICAgICAgICAgICAgICAgIG5vZGUudGV4dFN0eWxlSWQgPSBsb2NhbFRleHRTdHlsZS5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcE5hbWUgPT0gJ2ZpbGxzJyAmJiAnZmlsbHMnIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZS5maWxscyA9IGJpbmRQcm9wZXJ0eVZhcmlhYmxlcyhub2RlLmZpbGxzLCBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcE5hbWUgPT0gJ3N0cm9rZXMnICYmICdzdHJva2VzJyBpbiBub2RlKSB7XG4gICAgICAgIG5vZGUuc3Ryb2tlcyA9IGJpbmRQcm9wZXJ0eVZhcmlhYmxlcyhub2RlLnN0cm9rZXMsIGZpZ21hLnZhcmlhYmxlcy5zZXRCb3VuZFZhcmlhYmxlRm9yUGFpbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wTmFtZSA9PSAnZWZmZWN0cycgJiYgJ2VmZmVjdHMnIGluIG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuZWZmZWN0U3R5bGVJZCAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZU5hbWUgPSBzdHlsZS5uYW1lO1xuICAgICAgICAgICAgY29uc3QgbG9jYWxTdHlsZSA9IGZpZ21hLmdldExvY2FsRWZmZWN0U3R5bGVzKCkuZmluZChzdHlsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlLm5hbWUgPT09IHN0eWxlTmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9kZS5lZmZlY3RzID0gW107XG4gICAgICAgICAgICBub2RlLmVmZmVjdFN0eWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgbm9kZS5lZmZlY3RTdHlsZUlkID0gbG9jYWxTdHlsZSA/IGxvY2FsU3R5bGUuaWQgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5lZmZlY3RzID0gYmluZFByb3BlcnR5VmFyaWFibGVzKG5vZGUuZWZmZWN0cywgZmlnbWEudmFyaWFibGVzLnNldEJvdW5kVmFyaWFibGVGb3JFZmZlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wTmFtZSA9PSAnbGF5b3V0R3JpZHMnICYmICdsYXlvdXRHcmlkcycgaW4gbm9kZSkge1xuICAgICAgICBub2RlLmxheW91dEdyaWRzID0gYmluZFByb3BlcnR5VmFyaWFibGVzKG5vZGUubGF5b3V0R3JpZHMsIGZpZ21hLnZhcmlhYmxlcy5zZXRCb3VuZFZhcmlhYmxlRm9yTGF5b3V0R3JpZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BOYW1lID09ICdjb21wb25lbnRQcm9wZXJ0aWVzJyB8fCBwcm9wTmFtZSA9PSAndGV4dFJhbmdlRmlsbHMnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgU3dhcCBkb2VzIG5vdCB3b3JrIGZvciAke3Byb3BOYW1lfSwgc2tpcHBpbmcgbm9kZWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFyaWFibGUgPSBmaW5kVmFyaWFibGVNYXRjaCh2YXJpYWJsZUJpbmRpbmcuaWQpO1xuICAgICAgICBpZiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0Qm91bmRWYXJpYWJsZShwcm9wTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICBub2RlLnNldEJvdW5kVmFyaWFibGUocHJvcE5hbWUsIHZhcmlhYmxlLmlkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0b1RpdGxlQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgZnVuY3Rpb24gKHR4dCkge1xuICAgICAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsVG9UaXRsZShjYW1lbENhc2UpIHtcbiAgICAvLyBubyBzaWRlLWVmZmVjdHNcbiAgICByZXR1cm4gY2FtZWxDYXNlXG4gICAgICAgIC8vIGluamVjdCBzcGFjZSBiZWZvcmUgdGhlIHVwcGVyIGNhc2UgbGV0dGVyc1xuICAgICAgICAucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIFwiIFwiICsgbWF0Y2g7XG4gICAgfSlcbiAgICAgICAgLy8gcmVwbGFjZSBmaXJzdCBjaGFyIHdpdGggdXBwZXIgY2FzZVxuICAgICAgICAucmVwbGFjZSgvXi4vLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBmaW5kRmlnbWFWYXJpYWJsZUJ5TmFtZSB9IGZyb20gXCIuL2ZpZ21hLXZhcmlhYmxlc1wiO1xuY29uc3QgYWxpYXNSZWdleCA9IC9cXHsoLis/KSguKz8pXFx9L2c7XG5leHBvcnQgZnVuY3Rpb24gZmluZFRva2VuUmVmZXJlbmNlcyh0b2tlblZhbHVlKSB7XG4gICAgcmV0dXJuIHRva2VuVmFsdWUgPT09IG51bGwgfHwgdG9rZW5WYWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdG9rZW5WYWx1ZS50b1N0cmluZygpLm1hdGNoKGFsaWFzUmVnZXgpO1xufVxuO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZmVyZW5jZU5hbWUocmVmZXJlbmNlKSB7XG4gICAgbGV0IG5hbWUgPSByZWZlcmVuY2UucmVwbGFjZSgvey9nLCBcIlwiKTtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC99L2csIFwiXCIpO1xuICAgIHJldHVybiBuYW1lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRWYXJpYWJsZUJ5UmVmZXJlbmNlcyh2YWx1ZSkge1xuICAgIGxldCByZWZlcmVuY2VzID0gZmluZFRva2VuUmVmZXJlbmNlcyh2YWx1ZSk7XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICByZWZlcmVuY2VzID09PSBudWxsIHx8IHJlZmVyZW5jZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZmVyZW5jZXMuZm9yRWFjaChyZWZlcmVuY2UgPT4ge1xuICAgICAgICBsZXQgbmFtZSA9IGdldFJlZmVyZW5jZU5hbWUocmVmZXJlbmNlKTtcbiAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcbiAgICAgICAgY29uc3QgZmlnbWFWYXJpYWJsZSA9IGZpbmRGaWdtYVZhcmlhYmxlQnlOYW1lKG5hbWUpO1xuICAgICAgICBpZiAoZmlnbWFWYXJpYWJsZSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZpZ21hVmFyaWFibGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBmaW5kVmFyaWFibGVCeVJlZmVyZW5jZXMoKSBjYWxsIGZhaWxlZCAtPiBjYW5ub3QgZmluZCB2YWx1ZSBmb3IgJHtyZWZlcmVuY2V9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0c1swXTtcbn1cbmZ1bmN0aW9uIGZpbmRHbG9iYWxUb2tlbkJ5TmFtZShuYW1lLCBkaWN0aW9uYXJ5KSB7XG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvXFwuL2csIFwiL1wiKTtcbiAgICBjb25zdCB0b2tlbiA9IGRpY3Rpb25hcnlbbmFtZV07XG4gICAgaWYgKCF0b2tlbilcbiAgICAgICAgZGVidWdnZXI7XG4gICAgcmV0dXJuIHRva2VuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVmZXJlbmNlR2xvYmFsKHZhbHVlLCBkaWN0aW9uYXJ5KSB7XG4gICAgbGV0IHJlZmVyZW5jZXMgPSBmaW5kVG9rZW5SZWZlcmVuY2VzKHZhbHVlKTtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWU7XG4gICAgcmVmZXJlbmNlcyA9PT0gbnVsbCB8fCByZWZlcmVuY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWZlcmVuY2VzLmZvckVhY2gocmVmZXJlbmNlID0+IHtcbiAgICAgICAgbGV0IG5hbWUgPSBnZXRSZWZlcmVuY2VOYW1lKHJlZmVyZW5jZSk7XG4gICAgICAgIGNvbnN0IGdsb2JhbFRva2VuID0gZmluZEdsb2JhbFRva2VuQnlOYW1lKG5hbWUsIGRpY3Rpb25hcnkpO1xuICAgICAgICBpZiAoZ2xvYmFsVG9rZW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHJlZmVyZW5jZSwgZ2xvYmFsVG9rZW4uJHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBwYXJzZVJlZmVyZW5jZUdsb2JhbCgpIGNhbGwgZmFpbGVkIC0+IGNhbm5vdCBmaW5kIHJlZmVyZW5jZSBmb3IgJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGNoZWNrID0gZmluZFRva2VuUmVmZXJlbmNlcyhyZXN1bHQpO1xuICAgIGlmIChjaGVjayAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwYXJzZVJlZmVyZW5jZUdsb2JhbChyZXN1bHQsIGRpY3Rpb25hcnkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gdXBkYXRlRWxldmF0aW9uQ29tcG9uZW50cyh0b2tlbnMpIHtcbiAgICBmaWdtYS5za2lwSW52aXNpYmxlSW5zdGFuY2VDaGlsZHJlbiA9IHRydWU7XG4gICAgY29uc3QgcGFnZUNvbXBvbmVudHMgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kQWxsV2l0aENyaXRlcmlhKHsgdHlwZXM6IFsnQ09NUE9ORU5UJ10gfSk7XG4gICAgY29uc3QgZWxldmF0aW9uQ29tcG9uZW50cyA9IHBhZ2VDb21wb25lbnRzLmZpbHRlcihub2RlID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IG5vZGUubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbmFtZS5zdGFydHNXaXRoKCdzaGFkb3cnKTtcbiAgICB9KTtcbiAgICBpZiAoZWxldmF0aW9uQ29tcG9uZW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdObyBlbGV2YXRpb24gY29tcG9uZW50cyBoYXMgYmVlbiBmb3VuZCcpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyh0b2tlbnMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IHZhcmlhbnRzID0gdG9rZW5zW25hbWVdO1xuICAgICAgICBjb25zdCBbc2hhZGUsIHRva2VuXSA9IE9iamVjdC5lbnRyaWVzKHZhcmlhbnRzKVswXTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0b2tlblsnJHZhbHVlJ107XG4gICAgICAgIGNvbnN0IGVsZXZhdGlvbkNvbXBvbmVudCA9IGVsZXZhdGlvbkNvbXBvbmVudHMuZmluZChub2RlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVOb3JtYWxpemVkID0gbmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCIgXCIpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZU5hbWVOb3JtYWxpemVkID0gbm9kZS5uYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkucmVwbGFjZSgvLS9nLCBcIiBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lTm9ybWFsaXplZCwgbm9kZU5hbWVOb3JtYWxpemVkKTtcbiAgICAgICAgICAgIHJldHVybiBub2RlTmFtZU5vcm1hbGl6ZWQuaW5kZXhPZihuYW1lTm9ybWFsaXplZCkgPiAtMTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2Nlc3NDb21wb25lbnQoc2V0dGluZ3MsIGVsZXZhdGlvbkNvbXBvbmVudCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjbG9uZSh2YWwpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbDtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBjbG9uZSh2YWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyAndW5rbm93bic7XG59XG5mdW5jdGlvbiBwcm9jZXNzQ29tcG9uZW50KGVmZmVjdHMsIGNvbXBvbmVudCkge1xuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICAgIHRocm93ICgnRWxldmF0aW9uIGNvbXBvbmVudCB3YXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIGNvbnN0IHNoYWRvd0xheWVycyA9IGNvbXBvbmVudC5maW5kQ2hpbGRyZW4obm9kZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBub2RlLm5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnc2hhZG93Jyk7XG4gICAgfSk7XG4gICAgY29uc3QgbWFza0xheWVyID0gY29tcG9uZW50LmZpbmRDaGlsZChub2RlID0+IHtcbiAgICAgICAgcmV0dXJuIG5vZGUubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSAnbWFzayc7XG4gICAgfSk7XG4gICAgbWFza0xheWVyLnZpc2libGUgPSBmYWxzZTtcbiAgICBkZWJ1Z2dlcjtcbiAgICBlZmZlY3RzLmZvckVhY2goKHNoYWRvd1NldHRpbmdzLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzaGFkb3dMYXllciA9IHNoYWRvd0xheWVyc1tpbmRleF07XG4gICAgICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHNoYWRvd1NldHRpbmdzLngpO1xuICAgICAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChzaGFkb3dTZXR0aW5ncy55KTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gcGFyc2VGbG9hdChzaGFkb3dTZXR0aW5ncy5ibHVyKTtcbiAgICAgICAgY29uc3Qgc3ByZWFkID0gcGFyc2VGbG9hdChzaGFkb3dTZXR0aW5ncy5zcHJlYWQpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IGNvbXBvbmVudC53aWR0aCArICgyICogc3ByZWFkKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29tcG9uZW50LmhlaWdodCArICgyICogc3ByZWFkKTtcbiAgICAgICAgY29uc3QgbGVmdCA9IHggLSBzcHJlYWQ7XG4gICAgICAgIGNvbnN0IHRvcCA9IHkgLSBzcHJlYWQ7XG4gICAgICAgIGNvbnN0IGJsdXIgPSB7XG4gICAgICAgICAgICB0eXBlOiBcIkxBWUVSX0JMVVJcIixcbiAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBzaGFkb3dMYXllci5lZmZlY3RzID0gW2JsdXJdO1xuICAgICAgICBzaGFkb3dMYXllci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHNoYWRvd0xheWVyLnggPSBsZWZ0O1xuICAgICAgICBzaGFkb3dMYXllci55ID0gdG9wO1xuICAgIH0pO1xuICAgIGNvbnN0IGFic29sdXRlQm91bmRpbmdCb3ggPSBjb21wb25lbnQuYWJzb2x1dGVCb3VuZGluZ0JveDtcbiAgICBjb25zdCBhYnNvbHV0ZVJlbmRlckJvdW5kcyA9IGNvbXBvbmVudC5hYnNvbHV0ZVJlbmRlckJvdW5kcztcbiAgICBjb25zdCBtYXNrV2lkdGggPSBhYnNvbHV0ZVJlbmRlckJvdW5kcy53aWR0aDtcbiAgICBjb25zdCBtYXNrSGVpZ2h0ID0gYWJzb2x1dGVSZW5kZXJCb3VuZHMuaGVpZ2h0O1xuICAgIGNvbnN0IG1hc2tMZWZ0ID0gKGFic29sdXRlUmVuZGVyQm91bmRzLnggLSBhYnNvbHV0ZUJvdW5kaW5nQm94LngpO1xuICAgIGNvbnN0IG1hc2tUb3AgPSAoYWJzb2x1dGVSZW5kZXJCb3VuZHMueSAtIGFic29sdXRlQm91bmRpbmdCb3gueSk7XG4gICAgY29uc3QgaW5uZXJMYXllciA9IG1hc2tMYXllci5maW5kQ2hpbGQobm9kZSA9PiBub2RlLm5hbWUgPT09ICdpbm5lcicpO1xuICAgIGNvbnN0IG91dGVyTGF5ZXIgPSBtYXNrTGF5ZXIuZmluZENoaWxkKG5vZGUgPT4gbm9kZS5uYW1lID09PSAnb3V0ZXInKTtcbiAgICBvdXRlckxheWVyLnJlc2l6ZShtYXNrV2lkdGgsIG1hc2tIZWlnaHQpO1xuICAgIG91dGVyTGF5ZXIueCA9IG1hc2tMZWZ0O1xuICAgIG91dGVyTGF5ZXIueSA9IG1hc2tUb3A7XG4gICAgaW5uZXJMYXllci5yZXNpemUoY29tcG9uZW50LndpZHRoLCBjb21wb25lbnQuaGVpZ2h0KTtcbiAgICBpbm5lckxheWVyLnggPSAwO1xuICAgIGlubmVyTGF5ZXIueSA9IDA7XG4gICAgbWFza0xheWVyLnZpc2libGUgPSB0cnVlO1xufVxuIiwiY29uc29sZS5jbGVhcigpO1xuY29uc3Qgc3R5bGVzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xuY29uc3QgdmFyaWFibGVzID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzKCk7XG5sZXQgY291bnQgPSAwO1xuZnVuY3Rpb24gZ2V0U3R5bGVCeU5hbWUobmFtZSkge1xuICAgIHJldHVybiBzdHlsZXMuZmluZCgoc3R5bGUpID0+IHN0eWxlLm5hbWUgPT09IG5hbWUpO1xufVxuO1xuZnVuY3Rpb24gZ2V0RmlnbWFDb2xvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIGJsZW5kTW9kZTogXCJOT1JNQUxcIixcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHI6IDEsXG4gICAgICAgICAgICBnOiAxLFxuICAgICAgICAgICAgYjogMVxuICAgICAgICB9LFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfTtcbn1cbjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kVmFyaWFibGVzQW5kU3R5bGVzKCkge1xuICAgIGNvdW50ID0gMDtcbiAgICB2YXJpYWJsZXMuZm9yRWFjaCh2YXJpYWJsZSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB2YXJpYWJsZS5uYW1lO1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRTdHlsZUJ5TmFtZShuYW1lKTtcbiAgICAgICAgaWYgKHZhcmlhYmxlLnJlc29sdmVkVHlwZSAhPT0gJ0NPTE9SJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3R5bGUpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBzdHlsZSA9IGZpZ21hLmNyZWF0ZVBhaW50U3R5bGUoKTtcbiAgICAgICAgICAgIHN0eWxlLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgc3R5bGUucGFpbnRzID0gW1xuICAgICAgICAgICAgICAgIGdldEZpZ21hQ29sb3IoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3UGFpbnRzID0gc3R5bGUucGFpbnRzLm1hcCgocGFpbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KHBhaW50LCAnY29sb3InLCB2YXJpYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdHlsZS5wYWludHMgPSBuZXdQYWludHM7XG4gICAgfSk7XG4gICAgZmlnbWEubm90aWZ5KGDinIUgVmFyaWFibGVzIGFuZCBzdHlsZXMgYXJlIG5vdyBjb25uZWN0ZWQuICR7Y291bnR9IHN0eWxlcyBjcmVhdGVkYCk7XG59XG4iLCIvKipcbiAqIGNocm9tYS5qcyAtIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgY29sb3IgY29udmVyc2lvbnNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxOSwgR3JlZ29yIEFpc2NoXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiAzLiBUaGUgbmFtZSBHcmVnb3IgQWlzY2ggbWF5IG5vdCBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgR1JFR09SIEFJU0NIIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORyxcbiAqIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsXG4gKiBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZXG4gKiBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuICogTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLFxuICogRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogY2hyb21hLmpzIGluY2x1ZGVzIGNvbG9ycyBmcm9tIGNvbG9yYnJld2VyMi5vcmcsIHdoaWNoIGFyZSByZWxlYXNlZCB1bmRlclxuICogdGhlIGZvbGxvd2luZyBsaWNlbnNlOlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAwMiBDeW50aGlhIEJyZXdlciwgTWFyayBIYXJyb3dlcixcbiAqIGFuZCBUaGUgUGVubnN5bHZhbmlhIFN0YXRlIFVuaXZlcnNpdHkuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuICogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiAqIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsXG4gKiBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpY1xuICogbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBOYW1lZCBjb2xvcnMgYXJlIHRha2VuIGZyb20gWDExIENvbG9yIE5hbWVzLlxuICogaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jc3ZnLWNvbG9yXG4gKlxuICogQHByZXNlcnZlXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuY2hyb21hID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBsaW1pdCQyID0gZnVuY3Rpb24gKHgsIG1pbiwgbWF4KSB7XG4gICAgICAgIGlmICggbWluID09PSB2b2lkIDAgKSBtaW49MDtcbiAgICAgICAgaWYgKCBtYXggPT09IHZvaWQgMCApIG1heD0xO1xuXG4gICAgICAgIHJldHVybiB4IDwgbWluID8gbWluIDogeCA+IG1heCA/IG1heCA6IHg7XG4gICAgfTtcblxuICAgIHZhciBsaW1pdCQxID0gbGltaXQkMjtcblxuICAgIHZhciBjbGlwX3JnYiQzID0gZnVuY3Rpb24gKHJnYikge1xuICAgICAgICByZ2IuX2NsaXBwZWQgPSBmYWxzZTtcbiAgICAgICAgcmdiLl91bmNsaXBwZWQgPSByZ2Iuc2xpY2UoMCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTw9MzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmdiW2ldIDwgMCB8fCByZ2JbaV0gPiAyNTUpIHsgcmdiLl9jbGlwcGVkID0gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIHJnYltpXSA9IGxpbWl0JDEocmdiW2ldLCAwLCAyNTUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmdiW2ldID0gbGltaXQkMShyZ2JbaV0sIDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZ2I7XG4gICAgfTtcblxuICAgIC8vIHBvcnRlZCBmcm9tIGpRdWVyeSdzICQudHlwZVxuICAgIHZhciBjbGFzc1RvVHlwZSA9IHt9O1xuICAgIGZvciAodmFyIGkkMSA9IDAsIGxpc3QkMSA9IFsnQm9vbGVhbicsICdOdW1iZXInLCAnU3RyaW5nJywgJ0Z1bmN0aW9uJywgJ0FycmF5JywgJ0RhdGUnLCAnUmVnRXhwJywgJ1VuZGVmaW5lZCcsICdOdWxsJ107IGkkMSA8IGxpc3QkMS5sZW5ndGg7IGkkMSArPSAxKSB7XG4gICAgICAgIHZhciBuYW1lID0gbGlzdCQxW2kkMV07XG5cbiAgICAgICAgY2xhc3NUb1R5cGVbKFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIildID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICB2YXIgdHlwZSRwID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBjbGFzc1RvVHlwZVtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKV0gfHwgXCJvYmplY3RcIjtcbiAgICB9O1xuXG4gICAgdmFyIHR5cGUkbyA9IHR5cGUkcDtcblxuICAgIHZhciB1bnBhY2skQiA9IGZ1bmN0aW9uIChhcmdzLCBrZXlPcmRlcikge1xuICAgICAgICBpZiAoIGtleU9yZGVyID09PSB2b2lkIDAgKSBrZXlPcmRlcj1udWxsO1xuXG4gICAgXHQvLyBpZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gMyBhcmd1bWVudHMsIHdlIHJldHVybiB0aGUgYXJndW1lbnRzXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTsgfVxuICAgICAgICAvLyB3aXRoIGxlc3MgdGhhbiAzIGFyZ3Mgd2UgY2hlY2sgaWYgZmlyc3QgYXJnIGlzIG9iamVjdFxuICAgICAgICAvLyBhbmQgdXNlIHRoZSBrZXlPcmRlciBzdHJpbmcgdG8gZXh0cmFjdCBhbmQgc29ydCBwcm9wZXJ0aWVzXG4gICAgXHRpZiAodHlwZSRvKGFyZ3NbMF0pID09ICdvYmplY3QnICYmIGtleU9yZGVyKSB7XG4gICAgXHRcdHJldHVybiBrZXlPcmRlci5zcGxpdCgnJylcbiAgICBcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBhcmdzWzBdW2tdICE9PSB1bmRlZmluZWQ7IH0pXG4gICAgXHRcdFx0Lm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gYXJnc1swXVtrXTsgfSk7XG4gICAgXHR9XG4gICAgXHQvLyBvdGhlcndpc2Ugd2UganVzdCByZXR1cm4gdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgXHQvLyAod2hpY2ggd2Ugc3VwcG9zZSBpcyBhbiBhcnJheSBvZiBhcmdzKVxuICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICB9O1xuXG4gICAgdmFyIHR5cGUkbiA9IHR5cGUkcDtcblxuICAgIHZhciBsYXN0JDQgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIHZhciBsID0gYXJncy5sZW5ndGgtMTtcbiAgICAgICAgaWYgKHR5cGUkbihhcmdzW2xdKSA9PSAnc3RyaW5nJykgeyByZXR1cm4gYXJnc1tsXS50b0xvd2VyQ2FzZSgpOyB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgUEkkMiA9IE1hdGguUEk7XG5cbiAgICB2YXIgdXRpbHMgPSB7XG4gICAgXHRjbGlwX3JnYjogY2xpcF9yZ2IkMyxcbiAgICBcdGxpbWl0OiBsaW1pdCQyLFxuICAgIFx0dHlwZTogdHlwZSRwLFxuICAgIFx0dW5wYWNrOiB1bnBhY2skQixcbiAgICBcdGxhc3Q6IGxhc3QkNCxcbiAgICBcdFBJOiBQSSQyLFxuICAgIFx0VFdPUEk6IFBJJDIqMixcbiAgICBcdFBJVEhJUkQ6IFBJJDIvMyxcbiAgICBcdERFRzJSQUQ6IFBJJDIgLyAxODAsXG4gICAgXHRSQUQyREVHOiAxODAgLyBQSSQyXG4gICAgfTtcblxuICAgIHZhciBpbnB1dCRoID0ge1xuICAgIFx0Zm9ybWF0OiB7fSxcbiAgICBcdGF1dG9kZXRlY3Q6IFtdXG4gICAgfTtcblxuICAgIHZhciBsYXN0JDMgPSB1dGlscy5sYXN0O1xuICAgIHZhciBjbGlwX3JnYiQyID0gdXRpbHMuY2xpcF9yZ2I7XG4gICAgdmFyIHR5cGUkbSA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIF9pbnB1dCA9IGlucHV0JGg7XG5cbiAgICB2YXIgQ29sb3IkRCA9IGZ1bmN0aW9uIENvbG9yKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlJG0oYXJnc1swXSkgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBhcmdzWzBdLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICBhcmdzWzBdLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAvLyB0aGUgYXJndW1lbnQgaXMgYWxyZWFkeSBhIENvbG9yIGluc3RhbmNlXG4gICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxhc3QgYXJndW1lbnQgY291bGQgYmUgdGhlIG1vZGVcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDMoYXJncyk7XG4gICAgICAgIHZhciBhdXRvZGV0ZWN0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFtb2RlKSB7XG4gICAgICAgICAgICBhdXRvZGV0ZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghX2lucHV0LnNvcnRlZCkge1xuICAgICAgICAgICAgICAgIF9pbnB1dC5hdXRvZGV0ZWN0ID0gX2lucHV0LmF1dG9kZXRlY3Quc29ydChmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBiLnAgLSBhLnA7IH0pO1xuICAgICAgICAgICAgICAgIF9pbnB1dC5zb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYXV0by1kZXRlY3QgZm9ybWF0XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGlzdCA9IF9pbnB1dC5hdXRvZGV0ZWN0OyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGsgPSBsaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgbW9kZSA9IGNoay50ZXN0LmFwcGx5KGNoaywgYXJncyk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfaW5wdXQuZm9ybWF0W21vZGVdKSB7XG4gICAgICAgICAgICB2YXIgcmdiID0gX2lucHV0LmZvcm1hdFttb2RlXS5hcHBseShudWxsLCBhdXRvZGV0ZWN0ID8gYXJncyA6IGFyZ3Muc2xpY2UoMCwtMSkpO1xuICAgICAgICAgICAgbWUuX3JnYiA9IGNsaXBfcmdiJDIocmdiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBmb3JtYXQ6ICcrYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgYWxwaGEgY2hhbm5lbFxuICAgICAgICBpZiAobWUuX3JnYi5sZW5ndGggPT09IDMpIHsgbWUuX3JnYi5wdXNoKDEpOyB9XG4gICAgfTtcblxuICAgIENvbG9yJEQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgICAgICBpZiAodHlwZSRtKHRoaXMuaGV4KSA9PSAnZnVuY3Rpb24nKSB7IHJldHVybiB0aGlzLmhleCgpOyB9XG4gICAgICAgIHJldHVybiAoXCJbXCIgKyAodGhpcy5fcmdiLmpvaW4oJywnKSkgKyBcIl1cIik7XG4gICAgfTtcblxuICAgIHZhciBDb2xvcl8xID0gQ29sb3IkRDtcblxuICAgIHZhciBjaHJvbWEkayA9IGZ1bmN0aW9uICgpIHtcbiAgICBcdHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgXHR3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgXHRyZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggY2hyb21hJGsuQ29sb3IsIFsgbnVsbCBdLmNvbmNhdCggYXJncykgKSk7XG4gICAgfTtcblxuICAgIGNocm9tYSRrLkNvbG9yID0gQ29sb3JfMTtcbiAgICBjaHJvbWEkay52ZXJzaW9uID0gJzIuNC4yJztcblxuICAgIHZhciBjaHJvbWFfMSA9IGNocm9tYSRrO1xuXG4gICAgdmFyIHVucGFjayRBID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBtYXgkMiA9IE1hdGgubWF4O1xuXG4gICAgdmFyIHJnYjJjbXlrJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRBKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgciA9IHIgLyAyNTU7XG4gICAgICAgIGcgPSBnIC8gMjU1O1xuICAgICAgICBiID0gYiAvIDI1NTtcbiAgICAgICAgdmFyIGsgPSAxIC0gbWF4JDIocixtYXgkMihnLGIpKTtcbiAgICAgICAgdmFyIGYgPSBrIDwgMSA/IDEgLyAoMS1rKSA6IDA7XG4gICAgICAgIHZhciBjID0gKDEtci1rKSAqIGY7XG4gICAgICAgIHZhciBtID0gKDEtZy1rKSAqIGY7XG4gICAgICAgIHZhciB5ID0gKDEtYi1rKSAqIGY7XG4gICAgICAgIHJldHVybiBbYyxtLHksa107XG4gICAgfTtcblxuICAgIHZhciByZ2IyY215a18xID0gcmdiMmNteWskMTtcblxuICAgIHZhciB1bnBhY2skeiA9IHV0aWxzLnVucGFjaztcblxuICAgIHZhciBjbXlrMnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICBhcmdzID0gdW5wYWNrJHooYXJncywgJ2NteWsnKTtcbiAgICAgICAgdmFyIGMgPSBhcmdzWzBdO1xuICAgICAgICB2YXIgbSA9IGFyZ3NbMV07XG4gICAgICAgIHZhciB5ID0gYXJnc1syXTtcbiAgICAgICAgdmFyIGsgPSBhcmdzWzNdO1xuICAgICAgICB2YXIgYWxwaGEgPSBhcmdzLmxlbmd0aCA+IDQgPyBhcmdzWzRdIDogMTtcbiAgICAgICAgaWYgKGsgPT09IDEpIHsgcmV0dXJuIFswLDAsMCxhbHBoYV07IH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGMgPj0gMSA/IDAgOiAyNTUgKiAoMS1jKSAqICgxLWspLCAvLyByXG4gICAgICAgICAgICBtID49IDEgPyAwIDogMjU1ICogKDEtbSkgKiAoMS1rKSwgLy8gZ1xuICAgICAgICAgICAgeSA+PSAxID8gMCA6IDI1NSAqICgxLXkpICogKDEtayksIC8vIGJcbiAgICAgICAgICAgIGFscGhhXG4gICAgICAgIF07XG4gICAgfTtcblxuICAgIHZhciBjbXlrMnJnYl8xID0gY215azJyZ2I7XG5cbiAgICB2YXIgY2hyb21hJGogPSBjaHJvbWFfMTtcbiAgICB2YXIgQ29sb3IkQyA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JGcgPSBpbnB1dCRoO1xuICAgIHZhciB1bnBhY2skeSA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgdHlwZSRsID0gdXRpbHMudHlwZTtcblxuICAgIHZhciByZ2IyY215ayA9IHJnYjJjbXlrXzE7XG5cbiAgICBDb2xvciRDLnByb3RvdHlwZS5jbXlrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IyY215ayh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkai5jbXlrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvciRDLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnY215ayddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQkZy5mb3JtYXQuY215ayA9IGNteWsycmdiXzE7XG5cbiAgICBpbnB1dCRnLmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDIsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgICAgICBhcmdzID0gdW5wYWNrJHkoYXJncywgJ2NteWsnKTtcbiAgICAgICAgICAgIGlmICh0eXBlJGwoYXJncykgPT09ICdhcnJheScgJiYgYXJncy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NteWsnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJHggPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxhc3QkMiA9IHV0aWxzLmxhc3Q7XG4gICAgdmFyIHJuZCA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBNYXRoLnJvdW5kKGEqMTAwKS8xMDA7IH07XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSBoc2wyY3NzKGgscyxsKVxuICAgICAqIC0gaHNsMmNzcyhoLHMsbCxhKVxuICAgICAqIC0gaHNsMmNzcyhbaCxzLGxdLCBtb2RlKVxuICAgICAqIC0gaHNsMmNzcyhbaCxzLGwsYV0sIG1vZGUpXG4gICAgICogLSBoc2wyY3NzKHtoLHMsbCxhfSwgbW9kZSlcbiAgICAgKi9cbiAgICB2YXIgaHNsMmNzcyQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciBoc2xhID0gdW5wYWNrJHgoYXJncywgJ2hzbGEnKTtcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDIoYXJncykgfHwgJ2xzYSc7XG4gICAgICAgIGhzbGFbMF0gPSBybmQoaHNsYVswXSB8fCAwKTtcbiAgICAgICAgaHNsYVsxXSA9IHJuZChoc2xhWzFdKjEwMCkgKyAnJSc7XG4gICAgICAgIGhzbGFbMl0gPSBybmQoaHNsYVsyXSoxMDApICsgJyUnO1xuICAgICAgICBpZiAobW9kZSA9PT0gJ2hzbGEnIHx8IChoc2xhLmxlbmd0aCA+IDMgJiYgaHNsYVszXTwxKSkge1xuICAgICAgICAgICAgaHNsYVszXSA9IGhzbGEubGVuZ3RoID4gMyA/IGhzbGFbM10gOiAxO1xuICAgICAgICAgICAgbW9kZSA9ICdoc2xhJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhzbGEubGVuZ3RoID0gMztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG1vZGUgKyBcIihcIiArIChoc2xhLmpvaW4oJywnKSkgKyBcIilcIik7XG4gICAgfTtcblxuICAgIHZhciBoc2wyY3NzXzEgPSBoc2wyY3NzJDE7XG5cbiAgICB2YXIgdW5wYWNrJHcgPSB1dGlscy51bnBhY2s7XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSByZ2IyaHNsKHIsZyxiKVxuICAgICAqIC0gcmdiMmhzbChyLGcsYixhKVxuICAgICAqIC0gcmdiMmhzbChbcixnLGJdKVxuICAgICAqIC0gcmdiMmhzbChbcixnLGIsYV0pXG4gICAgICogLSByZ2IyaHNsKHtyLGcsYixhfSlcbiAgICAgKi9cbiAgICB2YXIgcmdiMmhzbCQzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIGFyZ3MgPSB1bnBhY2skdyhhcmdzLCAncmdiYScpO1xuICAgICAgICB2YXIgciA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBnID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIGIgPSBhcmdzWzJdO1xuXG4gICAgICAgIHIgLz0gMjU1O1xuICAgICAgICBnIC89IDI1NTtcbiAgICAgICAgYiAvPSAyNTU7XG5cbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cbiAgICAgICAgdmFyIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgICAgIHZhciBzLCBoO1xuXG4gICAgICAgIGlmIChtYXggPT09IG1pbil7XG4gICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgIGggPSBOdW1iZXIuTmFOO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IGwgPCAwLjUgPyAobWF4IC0gbWluKSAvIChtYXggKyBtaW4pIDogKG1heCAtIG1pbikgLyAoMiAtIG1heCAtIG1pbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAociA9PSBtYXgpIHsgaCA9IChnIC0gYikgLyAobWF4IC0gbWluKTsgfVxuICAgICAgICBlbHNlIGlmIChnID09IG1heCkgeyBoID0gMiArIChiIC0gcikgLyAobWF4IC0gbWluKTsgfVxuICAgICAgICBlbHNlIGlmIChiID09IG1heCkgeyBoID0gNCArIChyIC0gZykgLyAobWF4IC0gbWluKTsgfVxuXG4gICAgICAgIGggKj0gNjA7XG4gICAgICAgIGlmIChoIDwgMCkgeyBoICs9IDM2MDsgfVxuICAgICAgICBpZiAoYXJncy5sZW5ndGg+MyAmJiBhcmdzWzNdIT09dW5kZWZpbmVkKSB7IHJldHVybiBbaCxzLGwsYXJnc1szXV07IH1cbiAgICAgICAgcmV0dXJuIFtoLHMsbF07XG4gICAgfTtcblxuICAgIHZhciByZ2IyaHNsXzEgPSByZ2IyaHNsJDM7XG5cbiAgICB2YXIgdW5wYWNrJHYgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxhc3QkMSA9IHV0aWxzLmxhc3Q7XG4gICAgdmFyIGhzbDJjc3MgPSBoc2wyY3NzXzE7XG4gICAgdmFyIHJnYjJoc2wkMiA9IHJnYjJoc2xfMTtcbiAgICB2YXIgcm91bmQkNiA9IE1hdGgucm91bmQ7XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSByZ2IyY3NzKHIsZyxiKVxuICAgICAqIC0gcmdiMmNzcyhyLGcsYixhKVxuICAgICAqIC0gcmdiMmNzcyhbcixnLGJdLCBtb2RlKVxuICAgICAqIC0gcmdiMmNzcyhbcixnLGIsYV0sIG1vZGUpXG4gICAgICogLSByZ2IyY3NzKHtyLGcsYixhfSwgbW9kZSlcbiAgICAgKi9cbiAgICB2YXIgcmdiMmNzcyQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZ2JhID0gdW5wYWNrJHYoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgdmFyIG1vZGUgPSBsYXN0JDEoYXJncykgfHwgJ3JnYic7XG4gICAgICAgIGlmIChtb2RlLnN1YnN0cigwLDMpID09ICdoc2wnKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsMmNzcyhyZ2IyaHNsJDIocmdiYSksIG1vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJnYmFbMF0gPSByb3VuZCQ2KHJnYmFbMF0pO1xuICAgICAgICByZ2JhWzFdID0gcm91bmQkNihyZ2JhWzFdKTtcbiAgICAgICAgcmdiYVsyXSA9IHJvdW5kJDYocmdiYVsyXSk7XG4gICAgICAgIGlmIChtb2RlID09PSAncmdiYScgfHwgKHJnYmEubGVuZ3RoID4gMyAmJiByZ2JhWzNdPDEpKSB7XG4gICAgICAgICAgICByZ2JhWzNdID0gcmdiYS5sZW5ndGggPiAzID8gcmdiYVszXSA6IDE7XG4gICAgICAgICAgICBtb2RlID0gJ3JnYmEnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobW9kZSArIFwiKFwiICsgKHJnYmEuc2xpY2UoMCxtb2RlPT09J3JnYic/Mzo0KS5qb2luKCcsJykpICsgXCIpXCIpO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMmNzc18xID0gcmdiMmNzcyQxO1xuXG4gICAgdmFyIHVucGFjayR1ID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciByb3VuZCQ1ID0gTWF0aC5yb3VuZDtcblxuICAgIHZhciBoc2wycmdiJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhc3NpZ247XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcbiAgICAgICAgYXJncyA9IHVucGFjayR1KGFyZ3MsICdoc2wnKTtcbiAgICAgICAgdmFyIGggPSBhcmdzWzBdO1xuICAgICAgICB2YXIgcyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBsID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHIsZyxiO1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gbCoyNTU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdDMgPSBbMCwwLDBdO1xuICAgICAgICAgICAgdmFyIGMgPSBbMCwwLDBdO1xuICAgICAgICAgICAgdmFyIHQyID0gbCA8IDAuNSA/IGwgKiAoMStzKSA6IGwrcy1sKnM7XG4gICAgICAgICAgICB2YXIgdDEgPSAyICogbCAtIHQyO1xuICAgICAgICAgICAgdmFyIGhfID0gaCAvIDM2MDtcbiAgICAgICAgICAgIHQzWzBdID0gaF8gKyAxLzM7XG4gICAgICAgICAgICB0M1sxXSA9IGhfO1xuICAgICAgICAgICAgdDNbMl0gPSBoXyAtIDEvMztcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTwzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodDNbaV0gPCAwKSB7IHQzW2ldICs9IDE7IH1cbiAgICAgICAgICAgICAgICBpZiAodDNbaV0gPiAxKSB7IHQzW2ldIC09IDE7IH1cbiAgICAgICAgICAgICAgICBpZiAoNiAqIHQzW2ldIDwgMSlcbiAgICAgICAgICAgICAgICAgICAgeyBjW2ldID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDNbaV07IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgyICogdDNbaV0gPCAxKVxuICAgICAgICAgICAgICAgICAgICB7IGNbaV0gPSB0MjsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDMgKiB0M1tpXSA8IDIpXG4gICAgICAgICAgICAgICAgICAgIHsgY1tpXSA9IHQxICsgKHQyIC0gdDEpICogKCgyIC8gMykgLSB0M1tpXSkgKiA2OyB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7IGNbaV0gPSB0MTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKGFzc2lnbiA9IFtyb3VuZCQ1KGNbMF0qMjU1KSxyb3VuZCQ1KGNbMV0qMjU1KSxyb3VuZCQ1KGNbMl0qMjU1KV0sIHIgPSBhc3NpZ25bMF0sIGcgPSBhc3NpZ25bMV0sIGIgPSBhc3NpZ25bMl0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIC8vIGtlZXAgYWxwaGEgY2hhbm5lbFxuICAgICAgICAgICAgcmV0dXJuIFtyLGcsYixhcmdzWzNdXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3IsZyxiLDFdO1xuICAgIH07XG5cbiAgICB2YXIgaHNsMnJnYl8xID0gaHNsMnJnYiQxO1xuXG4gICAgdmFyIGhzbDJyZ2IgPSBoc2wycmdiXzE7XG4gICAgdmFyIGlucHV0JGYgPSBpbnB1dCRoO1xuXG4gICAgdmFyIFJFX1JHQiA9IC9ecmdiXFwoXFxzKigtP1xcZCspLFxccyooLT9cXGQrKVxccyosXFxzKigtP1xcZCspXFxzKlxcKSQvO1xuICAgIHZhciBSRV9SR0JBID0gL15yZ2JhXFwoXFxzKigtP1xcZCspLFxccyooLT9cXGQrKVxccyosXFxzKigtP1xcZCspXFxzKixcXHMqKFswMV18WzAxXT9cXC5cXGQrKVxcKSQvO1xuICAgIHZhciBSRV9SR0JfUENUID0gL15yZ2JcXChcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqXFwpJC87XG4gICAgdmFyIFJFX1JHQkFfUENUID0gL15yZ2JhXFwoXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pJSxcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKFswMV18WzAxXT9cXC5cXGQrKVxcKSQvO1xuICAgIHZhciBSRV9IU0wgPSAvXmhzbFxcKFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSxcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKixcXHMqKC0/XFxkKyg/OlxcLlxcZCspPyklXFxzKlxcKSQvO1xuICAgIHZhciBSRV9IU0xBID0gL15oc2xhXFwoXFxzKigtP1xcZCsoPzpcXC5cXGQrKT8pLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooLT9cXGQrKD86XFwuXFxkKyk/KSVcXHMqLFxccyooWzAxXXxbMDFdP1xcLlxcZCspXFwpJC87XG5cbiAgICB2YXIgcm91bmQkNCA9IE1hdGgucm91bmQ7XG5cbiAgICB2YXIgY3NzMnJnYiQxID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgICBjc3MgPSBjc3MudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAgIHZhciBtO1xuXG4gICAgICAgIGlmIChpbnB1dCRmLmZvcm1hdC5uYW1lZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQkZi5mb3JtYXQubmFtZWQoY3NzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJnYigyNTAsMjAsMClcbiAgICAgICAgaWYgKChtID0gY3NzLm1hdGNoKFJFX1JHQikpKSB7XG4gICAgICAgICAgICB2YXIgcmdiID0gbS5zbGljZSgxLDQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHJnYltpXSA9ICtyZ2JbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZ2JbM10gPSAxOyAgLy8gZGVmYXVsdCBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuIHJnYjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJnYmEoMjUwLDIwLDAsMC40KVxuICAgICAgICBpZiAoKG0gPSBjc3MubWF0Y2goUkVfUkdCQSkpKSB7XG4gICAgICAgICAgICB2YXIgcmdiJDEgPSBtLnNsaWNlKDEsNSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpJDE9MDsgaSQxPDQ7IGkkMSsrKSB7XG4gICAgICAgICAgICAgICAgcmdiJDFbaSQxXSA9ICtyZ2IkMVtpJDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJnYiQxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmdiKDEwMCUsMCUsMCUpXG4gICAgICAgIGlmICgobSA9IGNzcy5tYXRjaChSRV9SR0JfUENUKSkpIHtcbiAgICAgICAgICAgIHZhciByZ2IkMiA9IG0uc2xpY2UoMSw0KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkkMj0wOyBpJDI8MzsgaSQyKyspIHtcbiAgICAgICAgICAgICAgICByZ2IkMltpJDJdID0gcm91bmQkNChyZ2IkMltpJDJdICogMi41NSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZ2IkMlszXSA9IDE7ICAvLyBkZWZhdWx0IGFscGhhXG4gICAgICAgICAgICByZXR1cm4gcmdiJDI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZ2JhKDEwMCUsMCUsMCUsMC40KVxuICAgICAgICBpZiAoKG0gPSBjc3MubWF0Y2goUkVfUkdCQV9QQ1QpKSkge1xuICAgICAgICAgICAgdmFyIHJnYiQzID0gbS5zbGljZSgxLDUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQzPTA7IGkkMzwzOyBpJDMrKykge1xuICAgICAgICAgICAgICAgIHJnYiQzW2kkM10gPSByb3VuZCQ0KHJnYiQzW2kkM10gKiAyLjU1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJnYiQzWzNdID0gK3JnYiQzWzNdO1xuICAgICAgICAgICAgcmV0dXJuIHJnYiQzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHNsKDAsMTAwJSw1MCUpXG4gICAgICAgIGlmICgobSA9IGNzcy5tYXRjaChSRV9IU0wpKSkge1xuICAgICAgICAgICAgdmFyIGhzbCA9IG0uc2xpY2UoMSw0KTtcbiAgICAgICAgICAgIGhzbFsxXSAqPSAwLjAxO1xuICAgICAgICAgICAgaHNsWzJdICo9IDAuMDE7XG4gICAgICAgICAgICB2YXIgcmdiJDQgPSBoc2wycmdiKGhzbCk7XG4gICAgICAgICAgICByZ2IkNFszXSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gcmdiJDQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoc2xhKDAsMTAwJSw1MCUsMC41KVxuICAgICAgICBpZiAoKG0gPSBjc3MubWF0Y2goUkVfSFNMQSkpKSB7XG4gICAgICAgICAgICB2YXIgaHNsJDEgPSBtLnNsaWNlKDEsNCk7XG4gICAgICAgICAgICBoc2wkMVsxXSAqPSAwLjAxO1xuICAgICAgICAgICAgaHNsJDFbMl0gKj0gMC4wMTtcbiAgICAgICAgICAgIHZhciByZ2IkNSA9IGhzbDJyZ2IoaHNsJDEpO1xuICAgICAgICAgICAgcmdiJDVbM10gPSArbVs0XTsgIC8vIGRlZmF1bHQgYWxwaGEgPSAxXG4gICAgICAgICAgICByZXR1cm4gcmdiJDU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3NzMnJnYiQxLnRlc3QgPSBmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gUkVfUkdCLnRlc3QocykgfHxcbiAgICAgICAgICAgIFJFX1JHQkEudGVzdChzKSB8fFxuICAgICAgICAgICAgUkVfUkdCX1BDVC50ZXN0KHMpIHx8XG4gICAgICAgICAgICBSRV9SR0JBX1BDVC50ZXN0KHMpIHx8XG4gICAgICAgICAgICBSRV9IU0wudGVzdChzKSB8fFxuICAgICAgICAgICAgUkVfSFNMQS50ZXN0KHMpO1xuICAgIH07XG5cbiAgICB2YXIgY3NzMnJnYl8xID0gY3NzMnJnYiQxO1xuXG4gICAgdmFyIGNocm9tYSRpID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJEIgPSBDb2xvcl8xO1xuICAgIHZhciBpbnB1dCRlID0gaW5wdXQkaDtcbiAgICB2YXIgdHlwZSRrID0gdXRpbHMudHlwZTtcblxuICAgIHZhciByZ2IyY3NzID0gcmdiMmNzc18xO1xuICAgIHZhciBjc3MycmdiID0gY3NzMnJnYl8xO1xuXG4gICAgQ29sb3IkQi5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24obW9kZSkge1xuICAgICAgICByZXR1cm4gcmdiMmNzcyh0aGlzLl9yZ2IsIG1vZGUpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkaS5jc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJEIsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydjc3MnXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0JGUuZm9ybWF0LmNzcyA9IGNzczJyZ2I7XG5cbiAgICBpbnB1dCRlLmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDUsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgcmVzdFsgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgICAgICAgICAgaWYgKCFyZXN0Lmxlbmd0aCAmJiB0eXBlJGsoaCkgPT09ICdzdHJpbmcnICYmIGNzczJyZ2IudGVzdChoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnY3NzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIENvbG9yJEEgPSBDb2xvcl8xO1xuICAgIHZhciBjaHJvbWEkaCA9IGNocm9tYV8xO1xuICAgIHZhciBpbnB1dCRkID0gaW5wdXQkaDtcbiAgICB2YXIgdW5wYWNrJHQgPSB1dGlscy51bnBhY2s7XG5cbiAgICBpbnB1dCRkLmZvcm1hdC5nbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgcmdiID0gdW5wYWNrJHQoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgcmdiWzBdICo9IDI1NTtcbiAgICAgICAgcmdiWzFdICo9IDI1NTtcbiAgICAgICAgcmdiWzJdICo9IDI1NTtcbiAgICAgICAgcmV0dXJuIHJnYjtcbiAgICB9O1xuXG4gICAgY2hyb21hJGguZ2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJEEsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydnbCddKSApKTtcbiAgICB9O1xuXG4gICAgQ29sb3IkQS5wcm90b3R5cGUuZ2wgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJnYiA9IHRoaXMuX3JnYjtcbiAgICAgICAgcmV0dXJuIFtyZ2JbMF0vMjU1LCByZ2JbMV0vMjU1LCByZ2JbMl0vMjU1LCByZ2JbM11dO1xuICAgIH07XG5cbiAgICB2YXIgdW5wYWNrJHMgPSB1dGlscy51bnBhY2s7XG5cbiAgICB2YXIgcmdiMmhjZyQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skcyhhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgICAgICB2YXIgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgIHZhciBjID0gZGVsdGEgKiAxMDAgLyAyNTU7XG4gICAgICAgIHZhciBfZyA9IG1pbiAvICgyNTUgLSBkZWx0YSkgKiAxMDA7XG4gICAgICAgIHZhciBoO1xuICAgICAgICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgIGggPSBOdW1iZXIuTmFOO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHIgPT09IG1heCkgeyBoID0gKGcgLSBiKSAvIGRlbHRhOyB9XG4gICAgICAgICAgICBpZiAoZyA9PT0gbWF4KSB7IGggPSAyKyhiIC0gcikgLyBkZWx0YTsgfVxuICAgICAgICAgICAgaWYgKGIgPT09IG1heCkgeyBoID0gNCsociAtIGcpIC8gZGVsdGE7IH1cbiAgICAgICAgICAgIGggKj0gNjA7XG4gICAgICAgICAgICBpZiAoaCA8IDApIHsgaCArPSAzNjA7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2gsIGMsIF9nXTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJoY2dfMSA9IHJnYjJoY2ckMTtcblxuICAgIHZhciB1bnBhY2skciA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgZmxvb3IkMyA9IE1hdGguZmxvb3I7XG5cbiAgICAvKlxuICAgICAqIHRoaXMgaXMgYmFzaWNhbGx5IGp1c3QgSFNWIHdpdGggc29tZSBtaW5vciB0d2Vha3NcbiAgICAgKlxuICAgICAqIGh1ZS4uIFswLi4zNjBdXG4gICAgICogY2hyb21hIC4uIFswLi4xXVxuICAgICAqIGdyYXluZXNzIC4uIFswLi4xXVxuICAgICAqL1xuXG4gICAgdmFyIGhjZzJyZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhc3NpZ24sIGFzc2lnbiQxLCBhc3NpZ24kMiwgYXNzaWduJDMsIGFzc2lnbiQ0LCBhc3NpZ24kNTtcblxuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuICAgICAgICBhcmdzID0gdW5wYWNrJHIoYXJncywgJ2hjZycpO1xuICAgICAgICB2YXIgaCA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBjID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIF9nID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHIsZyxiO1xuICAgICAgICBfZyA9IF9nICogMjU1O1xuICAgICAgICB2YXIgX2MgPSBjICogMjU1O1xuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gX2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaCA9PT0gMzYwKSB7IGggPSAwOyB9XG4gICAgICAgICAgICBpZiAoaCA+IDM2MCkgeyBoIC09IDM2MDsgfVxuICAgICAgICAgICAgaWYgKGggPCAwKSB7IGggKz0gMzYwOyB9XG4gICAgICAgICAgICBoIC89IDYwO1xuICAgICAgICAgICAgdmFyIGkgPSBmbG9vciQzKGgpO1xuICAgICAgICAgICAgdmFyIGYgPSBoIC0gaTtcbiAgICAgICAgICAgIHZhciBwID0gX2cgKiAoMSAtIGMpO1xuICAgICAgICAgICAgdmFyIHEgPSBwICsgX2MgKiAoMSAtIGYpO1xuICAgICAgICAgICAgdmFyIHQgPSBwICsgX2MgKiBmO1xuICAgICAgICAgICAgdmFyIHYgPSBwICsgX2M7XG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IChhc3NpZ24gPSBbdiwgdCwgcF0sIHIgPSBhc3NpZ25bMF0sIGcgPSBhc3NpZ25bMV0sIGIgPSBhc3NpZ25bMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgMTogKGFzc2lnbiQxID0gW3EsIHYsIHBdLCByID0gYXNzaWduJDFbMF0sIGcgPSBhc3NpZ24kMVsxXSwgYiA9IGFzc2lnbiQxWzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDI6IChhc3NpZ24kMiA9IFtwLCB2LCB0XSwgciA9IGFzc2lnbiQyWzBdLCBnID0gYXNzaWduJDJbMV0sIGIgPSBhc3NpZ24kMlsyXSk7IGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAzOiAoYXNzaWduJDMgPSBbcCwgcSwgdl0sIHIgPSBhc3NpZ24kM1swXSwgZyA9IGFzc2lnbiQzWzFdLCBiID0gYXNzaWduJDNbMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgNDogKGFzc2lnbiQ0ID0gW3QsIHAsIHZdLCByID0gYXNzaWduJDRbMF0sIGcgPSBhc3NpZ24kNFsxXSwgYiA9IGFzc2lnbiQ0WzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IChhc3NpZ24kNSA9IFt2LCBwLCBxXSwgciA9IGFzc2lnbiQ1WzBdLCBnID0gYXNzaWduJDVbMV0sIGIgPSBhc3NpZ24kNVsyXSk7IGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyLCBnLCBiLCBhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciBoY2cycmdiXzEgPSBoY2cycmdiO1xuXG4gICAgdmFyIHVucGFjayRxID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciB0eXBlJGogPSB1dGlscy50eXBlO1xuICAgIHZhciBjaHJvbWEkZyA9IGNocm9tYV8xO1xuICAgIHZhciBDb2xvciR6ID0gQ29sb3JfMTtcbiAgICB2YXIgaW5wdXQkYyA9IGlucHV0JGg7XG5cbiAgICB2YXIgcmdiMmhjZyA9IHJnYjJoY2dfMTtcblxuICAgIENvbG9yJHoucHJvdG90eXBlLmhjZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmdiMmhjZyh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkZy5oY2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHosIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydoY2cnXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0JGMuZm9ybWF0LmhjZyA9IGhjZzJyZ2JfMTtcblxuICAgIGlucHV0JGMuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMSxcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skcShhcmdzLCAnaGNnJyk7XG4gICAgICAgICAgICBpZiAodHlwZSRqKGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoY2cnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJHAgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxhc3QgPSB1dGlscy5sYXN0O1xuICAgIHZhciByb3VuZCQzID0gTWF0aC5yb3VuZDtcblxuICAgIHZhciByZ2IyaGV4JDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRwKGFyZ3MsICdyZ2JhJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciBhID0gcmVmWzNdO1xuICAgICAgICB2YXIgbW9kZSA9IGxhc3QoYXJncykgfHwgJ2F1dG8nO1xuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7IGEgPSAxOyB9XG4gICAgICAgIGlmIChtb2RlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIG1vZGUgPSBhIDwgMSA/ICdyZ2JhJyA6ICdyZ2InO1xuICAgICAgICB9XG4gICAgICAgIHIgPSByb3VuZCQzKHIpO1xuICAgICAgICBnID0gcm91bmQkMyhnKTtcbiAgICAgICAgYiA9IHJvdW5kJDMoYik7XG4gICAgICAgIHZhciB1ID0gciA8PCAxNiB8IGcgPDwgOCB8IGI7XG4gICAgICAgIHZhciBzdHIgPSBcIjAwMDAwMFwiICsgdS50b1N0cmluZygxNik7IC8vIy50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSA2KTtcbiAgICAgICAgdmFyIGh4YSA9ICcwJyArIHJvdW5kJDMoYSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgICAgICBoeGEgPSBoeGEuc3Vic3RyKGh4YS5sZW5ndGggLSAyKTtcbiAgICAgICAgc3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JnYmEnOiByZXR1cm4gKFwiI1wiICsgc3RyICsgaHhhKTtcbiAgICAgICAgICAgIGNhc2UgJ2FyZ2InOiByZXR1cm4gKFwiI1wiICsgaHhhICsgc3RyKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAoXCIjXCIgKyBzdHIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZ2IyaGV4XzEgPSByZ2IyaGV4JDI7XG5cbiAgICB2YXIgUkVfSEVYID0gL14jPyhbQS1GYS1mMC05XXs2fXxbQS1GYS1mMC05XXszfSkkLztcbiAgICB2YXIgUkVfSEVYQSA9IC9eIz8oW0EtRmEtZjAtOV17OH18W0EtRmEtZjAtOV17NH0pJC87XG5cbiAgICB2YXIgaGV4MnJnYiQxID0gZnVuY3Rpb24gKGhleCkge1xuICAgICAgICBpZiAoaGV4Lm1hdGNoKFJFX0hFWCkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvcHRpb25hbCBsZWFkaW5nICNcbiAgICAgICAgICAgIGlmIChoZXgubGVuZ3RoID09PSA0IHx8IGhleC5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgICAgICAgICBoZXggPSBoZXguc3Vic3RyKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZXhwYW5kIHNob3J0LW5vdGF0aW9uIHRvIGZ1bGwgc2l4LWRpZ2l0XG4gICAgICAgICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGhleCA9IGhleC5zcGxpdCgnJyk7XG4gICAgICAgICAgICAgICAgaGV4ID0gaGV4WzBdK2hleFswXStoZXhbMV0raGV4WzFdK2hleFsyXStoZXhbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdSA9IHBhcnNlSW50KGhleCwgMTYpO1xuICAgICAgICAgICAgdmFyIHIgPSB1ID4+IDE2O1xuICAgICAgICAgICAgdmFyIGcgPSB1ID4+IDggJiAweEZGO1xuICAgICAgICAgICAgdmFyIGIgPSB1ICYgMHhGRjtcbiAgICAgICAgICAgIHJldHVybiBbcixnLGIsMV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYXRjaCByZ2JhIGhleCBmb3JtYXQsIGVnICNGRjAwMDA3N1xuICAgICAgICBpZiAoaGV4Lm1hdGNoKFJFX0hFWEEpKSB7XG4gICAgICAgICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gNSB8fCBoZXgubGVuZ3RoID09PSA5KSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG9wdGlvbmFsIGxlYWRpbmcgI1xuICAgICAgICAgICAgICAgIGhleCA9IGhleC5zdWJzdHIoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBleHBhbmQgc2hvcnQtbm90YXRpb24gdG8gZnVsbCBlaWdodC1kaWdpdFxuICAgICAgICAgICAgaWYgKGhleC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICBoZXggPSBoZXguc3BsaXQoJycpO1xuICAgICAgICAgICAgICAgIGhleCA9IGhleFswXStoZXhbMF0raGV4WzFdK2hleFsxXStoZXhbMl0raGV4WzJdK2hleFszXStoZXhbM107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdSQxID0gcGFyc2VJbnQoaGV4LCAxNik7XG4gICAgICAgICAgICB2YXIgciQxID0gdSQxID4+IDI0ICYgMHhGRjtcbiAgICAgICAgICAgIHZhciBnJDEgPSB1JDEgPj4gMTYgJiAweEZGO1xuICAgICAgICAgICAgdmFyIGIkMSA9IHUkMSA+PiA4ICYgMHhGRjtcbiAgICAgICAgICAgIHZhciBhID0gTWF0aC5yb3VuZCgodSQxICYgMHhGRikgLyAweEZGICogMTAwKSAvIDEwMDtcbiAgICAgICAgICAgIHJldHVybiBbciQxLGckMSxiJDEsYV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSB1c2VkIHRvIGNoZWNrIGZvciBjc3MgY29sb3JzIGhlcmVcbiAgICAgICAgLy8gaWYgX2lucHV0LmNzcz8gYW5kIHJnYiA9IF9pbnB1dC5jc3MgaGV4XG4gICAgICAgIC8vICAgICByZXR1cm4gcmdiXG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcInVua25vd24gaGV4IGNvbG9yOiBcIiArIGhleCkpO1xuICAgIH07XG5cbiAgICB2YXIgaGV4MnJnYl8xID0gaGV4MnJnYiQxO1xuXG4gICAgdmFyIGNocm9tYSRmID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJHkgPSBDb2xvcl8xO1xuICAgIHZhciB0eXBlJGkgPSB1dGlscy50eXBlO1xuICAgIHZhciBpbnB1dCRiID0gaW5wdXQkaDtcblxuICAgIHZhciByZ2IyaGV4JDEgPSByZ2IyaGV4XzE7XG5cbiAgICBDb2xvciR5LnByb3RvdHlwZS5oZXggPSBmdW5jdGlvbihtb2RlKSB7XG4gICAgICAgIHJldHVybiByZ2IyaGV4JDEodGhpcy5fcmdiLCBtb2RlKTtcbiAgICB9O1xuXG4gICAgY2hyb21hJGYuaGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvciR5LCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnaGV4J10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dCRiLmZvcm1hdC5oZXggPSBoZXgycmdiXzE7XG4gICAgaW5wdXQkYi5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiA0LFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoaCkge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHJlc3RbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgICAgICAgICAgIGlmICghcmVzdC5sZW5ndGggJiYgdHlwZSRpKGgpID09PSAnc3RyaW5nJyAmJiBbMyw0LDUsNiw3LDgsOV0uaW5kZXhPZihoLmxlbmd0aCkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnaGV4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHVucGFjayRvID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBUV09QSSQyID0gdXRpbHMuVFdPUEk7XG4gICAgdmFyIG1pbiQyID0gTWF0aC5taW47XG4gICAgdmFyIHNxcnQkNCA9IE1hdGguc3FydDtcbiAgICB2YXIgYWNvcyA9IE1hdGguYWNvcztcblxuICAgIHZhciByZ2IyaHNpJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgLypcbiAgICAgICAgYm9ycm93ZWQgZnJvbSBoZXJlOlxuICAgICAgICBodHRwOi8vaHVtbWVyLnN0YW5mb3JkLmVkdS9tdXNlaW5mby9kb2MvZXhhbXBsZXMvaHVtZHJ1bS9rZXlzY2FwZTIvcmdiMmhzaS5jcHBcbiAgICAgICAgKi9cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRvKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgciAvPSAyNTU7XG4gICAgICAgIGcgLz0gMjU1O1xuICAgICAgICBiIC89IDI1NTtcbiAgICAgICAgdmFyIGg7XG4gICAgICAgIHZhciBtaW5fID0gbWluJDIocixnLGIpO1xuICAgICAgICB2YXIgaSA9IChyK2crYikgLyAzO1xuICAgICAgICB2YXIgcyA9IGkgPiAwID8gMSAtIG1pbl8vaSA6IDA7XG4gICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICBoID0gTmFOO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaCA9ICgoci1nKSsoci1iKSkgLyAyO1xuICAgICAgICAgICAgaCAvPSBzcXJ0JDQoKHItZykqKHItZykgKyAoci1iKSooZy1iKSk7XG4gICAgICAgICAgICBoID0gYWNvcyhoKTtcbiAgICAgICAgICAgIGlmIChiID4gZykge1xuICAgICAgICAgICAgICAgIGggPSBUV09QSSQyIC0gaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGggLz0gVFdPUEkkMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2gqMzYwLHMsaV07XG4gICAgfTtcblxuICAgIHZhciByZ2IyaHNpXzEgPSByZ2IyaHNpJDE7XG5cbiAgICB2YXIgdW5wYWNrJG4gPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxpbWl0ID0gdXRpbHMubGltaXQ7XG4gICAgdmFyIFRXT1BJJDEgPSB1dGlscy5UV09QSTtcbiAgICB2YXIgUElUSElSRCA9IHV0aWxzLlBJVEhJUkQ7XG4gICAgdmFyIGNvcyQ0ID0gTWF0aC5jb3M7XG5cbiAgICAvKlxuICAgICAqIGh1ZSBbMC4uMzYwXVxuICAgICAqIHNhdHVyYXRpb24gWzAuLjFdXG4gICAgICogaW50ZW5zaXR5IFswLi4xXVxuICAgICAqL1xuICAgIHZhciBoc2kycmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIC8qXG4gICAgICAgIGJvcnJvd2VkIGZyb20gaGVyZTpcbiAgICAgICAgaHR0cDovL2h1bW1lci5zdGFuZm9yZC5lZHUvbXVzZWluZm8vZG9jL2V4YW1wbGVzL2h1bWRydW0va2V5c2NhcGUyL2hzaTJyZ2IuY3BwXG4gICAgICAgICovXG4gICAgICAgIGFyZ3MgPSB1bnBhY2skbihhcmdzLCAnaHNpJyk7XG4gICAgICAgIHZhciBoID0gYXJnc1swXTtcbiAgICAgICAgdmFyIHMgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgaSA9IGFyZ3NbMl07XG4gICAgICAgIHZhciByLGcsYjtcblxuICAgICAgICBpZiAoaXNOYU4oaCkpIHsgaCA9IDA7IH1cbiAgICAgICAgaWYgKGlzTmFOKHMpKSB7IHMgPSAwOyB9XG4gICAgICAgIC8vIG5vcm1hbGl6ZSBodWVcbiAgICAgICAgaWYgKGggPiAzNjApIHsgaCAtPSAzNjA7IH1cbiAgICAgICAgaWYgKGggPCAwKSB7IGggKz0gMzYwOyB9XG4gICAgICAgIGggLz0gMzYwO1xuICAgICAgICBpZiAoaCA8IDEvMykge1xuICAgICAgICAgICAgYiA9ICgxLXMpLzM7XG4gICAgICAgICAgICByID0gKDErcypjb3MkNChUV09QSSQxKmgpL2NvcyQ0KFBJVEhJUkQtVFdPUEkkMSpoKSkvMztcbiAgICAgICAgICAgIGcgPSAxIC0gKGIrcik7XG4gICAgICAgIH0gZWxzZSBpZiAoaCA8IDIvMykge1xuICAgICAgICAgICAgaCAtPSAxLzM7XG4gICAgICAgICAgICByID0gKDEtcykvMztcbiAgICAgICAgICAgIGcgPSAoMStzKmNvcyQ0KFRXT1BJJDEqaCkvY29zJDQoUElUSElSRC1UV09QSSQxKmgpKS8zO1xuICAgICAgICAgICAgYiA9IDEgLSAocitnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGggLT0gMi8zO1xuICAgICAgICAgICAgZyA9ICgxLXMpLzM7XG4gICAgICAgICAgICBiID0gKDErcypjb3MkNChUV09QSSQxKmgpL2NvcyQ0KFBJVEhJUkQtVFdPUEkkMSpoKSkvMztcbiAgICAgICAgICAgIHIgPSAxIC0gKGcrYik7XG4gICAgICAgIH1cbiAgICAgICAgciA9IGxpbWl0KGkqciozKTtcbiAgICAgICAgZyA9IGxpbWl0KGkqZyozKTtcbiAgICAgICAgYiA9IGxpbWl0KGkqYiozKTtcbiAgICAgICAgcmV0dXJuIFtyKjI1NSwgZyoyNTUsIGIqMjU1LCBhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciBoc2kycmdiXzEgPSBoc2kycmdiO1xuXG4gICAgdmFyIHVucGFjayRtID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciB0eXBlJGggPSB1dGlscy50eXBlO1xuICAgIHZhciBjaHJvbWEkZSA9IGNocm9tYV8xO1xuICAgIHZhciBDb2xvciR4ID0gQ29sb3JfMTtcbiAgICB2YXIgaW5wdXQkYSA9IGlucHV0JGg7XG5cbiAgICB2YXIgcmdiMmhzaSA9IHJnYjJoc2lfMTtcblxuICAgIENvbG9yJHgucHJvdG90eXBlLmhzaSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmdiMmhzaSh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkZS5oc2kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHgsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydoc2knXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0JGEuZm9ybWF0LmhzaSA9IGhzaTJyZ2JfMTtcblxuICAgIGlucHV0JGEuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skbShhcmdzLCAnaHNpJyk7XG4gICAgICAgICAgICBpZiAodHlwZSRoKGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoc2knO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJGwgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkZyA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIGNocm9tYSRkID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJHcgPSBDb2xvcl8xO1xuICAgIHZhciBpbnB1dCQ5ID0gaW5wdXQkaDtcblxuICAgIHZhciByZ2IyaHNsJDEgPSByZ2IyaHNsXzE7XG5cbiAgICBDb2xvciR3LnByb3RvdHlwZS5oc2wgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJnYjJoc2wkMSh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkZC5oc2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHcsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydoc2wnXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0JDkuZm9ybWF0LmhzbCA9IGhzbDJyZ2JfMTtcblxuICAgIGlucHV0JDkuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skbChhcmdzLCAnaHNsJyk7XG4gICAgICAgICAgICBpZiAodHlwZSRnKGFyZ3MpID09PSAnYXJyYXknICYmIGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoc2wnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJGsgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIG1pbiQxID0gTWF0aC5taW47XG4gICAgdmFyIG1heCQxID0gTWF0aC5tYXg7XG5cbiAgICAvKlxuICAgICAqIHN1cHBvcnRlZCBhcmd1bWVudHM6XG4gICAgICogLSByZ2IyaHN2KHIsZyxiKVxuICAgICAqIC0gcmdiMmhzdihbcixnLGJdKVxuICAgICAqIC0gcmdiMmhzdih7cixnLGJ9KVxuICAgICAqL1xuICAgIHZhciByZ2IyaHNsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIGFyZ3MgPSB1bnBhY2skayhhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gYXJnc1swXTtcbiAgICAgICAgdmFyIGcgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgYiA9IGFyZ3NbMl07XG4gICAgICAgIHZhciBtaW5fID0gbWluJDEociwgZywgYik7XG4gICAgICAgIHZhciBtYXhfID0gbWF4JDEociwgZywgYik7XG4gICAgICAgIHZhciBkZWx0YSA9IG1heF8gLSBtaW5fO1xuICAgICAgICB2YXIgaCxzLHY7XG4gICAgICAgIHYgPSBtYXhfIC8gMjU1LjA7XG4gICAgICAgIGlmIChtYXhfID09PSAwKSB7XG4gICAgICAgICAgICBoID0gTnVtYmVyLk5hTjtcbiAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IGRlbHRhIC8gbWF4XztcbiAgICAgICAgICAgIGlmIChyID09PSBtYXhfKSB7IGggPSAoZyAtIGIpIC8gZGVsdGE7IH1cbiAgICAgICAgICAgIGlmIChnID09PSBtYXhfKSB7IGggPSAyKyhiIC0gcikgLyBkZWx0YTsgfVxuICAgICAgICAgICAgaWYgKGIgPT09IG1heF8pIHsgaCA9IDQrKHIgLSBnKSAvIGRlbHRhOyB9XG4gICAgICAgICAgICBoICo9IDYwO1xuICAgICAgICAgICAgaWYgKGggPCAwKSB7IGggKz0gMzYwOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtoLCBzLCB2XVxuICAgIH07XG5cbiAgICB2YXIgcmdiMmhzdiQxID0gcmdiMmhzbDtcblxuICAgIHZhciB1bnBhY2skaiA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgZmxvb3IkMiA9IE1hdGguZmxvb3I7XG5cbiAgICB2YXIgaHN2MnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFzc2lnbiwgYXNzaWduJDEsIGFzc2lnbiQyLCBhc3NpZ24kMywgYXNzaWduJDQsIGFzc2lnbiQ1O1xuXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG4gICAgICAgIGFyZ3MgPSB1bnBhY2skaihhcmdzLCAnaHN2Jyk7XG4gICAgICAgIHZhciBoID0gYXJnc1swXTtcbiAgICAgICAgdmFyIHMgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgdiA9IGFyZ3NbMl07XG4gICAgICAgIHZhciByLGcsYjtcbiAgICAgICAgdiAqPSAyNTU7XG4gICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICByID0gZyA9IGIgPSB2O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGggPT09IDM2MCkgeyBoID0gMDsgfVxuICAgICAgICAgICAgaWYgKGggPiAzNjApIHsgaCAtPSAzNjA7IH1cbiAgICAgICAgICAgIGlmIChoIDwgMCkgeyBoICs9IDM2MDsgfVxuICAgICAgICAgICAgaCAvPSA2MDtcblxuICAgICAgICAgICAgdmFyIGkgPSBmbG9vciQyKGgpO1xuICAgICAgICAgICAgdmFyIGYgPSBoIC0gaTtcbiAgICAgICAgICAgIHZhciBwID0gdiAqICgxIC0gcyk7XG4gICAgICAgICAgICB2YXIgcSA9IHYgKiAoMSAtIHMgKiBmKTtcbiAgICAgICAgICAgIHZhciB0ID0gdiAqICgxIC0gcyAqICgxIC0gZikpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IChhc3NpZ24gPSBbdiwgdCwgcF0sIHIgPSBhc3NpZ25bMF0sIGcgPSBhc3NpZ25bMV0sIGIgPSBhc3NpZ25bMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgMTogKGFzc2lnbiQxID0gW3EsIHYsIHBdLCByID0gYXNzaWduJDFbMF0sIGcgPSBhc3NpZ24kMVsxXSwgYiA9IGFzc2lnbiQxWzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDI6IChhc3NpZ24kMiA9IFtwLCB2LCB0XSwgciA9IGFzc2lnbiQyWzBdLCBnID0gYXNzaWduJDJbMV0sIGIgPSBhc3NpZ24kMlsyXSk7IGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAzOiAoYXNzaWduJDMgPSBbcCwgcSwgdl0sIHIgPSBhc3NpZ24kM1swXSwgZyA9IGFzc2lnbiQzWzFdLCBiID0gYXNzaWduJDNbMl0pOyBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgNDogKGFzc2lnbiQ0ID0gW3QsIHAsIHZdLCByID0gYXNzaWduJDRbMF0sIGcgPSBhc3NpZ24kNFsxXSwgYiA9IGFzc2lnbiQ0WzJdKTsgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IChhc3NpZ24kNSA9IFt2LCBwLCBxXSwgciA9IGFzc2lnbiQ1WzBdLCBnID0gYXNzaWduJDVbMV0sIGIgPSBhc3NpZ24kNVsyXSk7IGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyLGcsYixhcmdzLmxlbmd0aCA+IDM/YXJnc1szXToxXTtcbiAgICB9O1xuXG4gICAgdmFyIGhzdjJyZ2JfMSA9IGhzdjJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrJGkgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkZiA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIGNocm9tYSRjID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJHYgPSBDb2xvcl8xO1xuICAgIHZhciBpbnB1dCQ4ID0gaW5wdXQkaDtcblxuICAgIHZhciByZ2IyaHN2ID0gcmdiMmhzdiQxO1xuXG4gICAgQ29sb3Ikdi5wcm90b3R5cGUuaHN2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZ2IyaHN2KHRoaXMuX3JnYik7XG4gICAgfTtcblxuICAgIGNocm9tYSRjLmhzdiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3IkdiwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2hzdiddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQkOC5mb3JtYXQuaHN2ID0gaHN2MnJnYl8xO1xuXG4gICAgaW5wdXQkOC5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAyLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayRpKGFyZ3MsICdoc3YnKTtcbiAgICAgICAgICAgIGlmICh0eXBlJGYoYXJncykgPT09ICdhcnJheScgJiYgYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hzdic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBsYWJDb25zdGFudHMgPSB7XG4gICAgICAgIC8vIENvcnJlc3BvbmRzIHJvdWdobHkgdG8gUkdCIGJyaWdodGVyL2RhcmtlclxuICAgICAgICBLbjogMTgsXG5cbiAgICAgICAgLy8gRDY1IHN0YW5kYXJkIHJlZmVyZW50XG4gICAgICAgIFhuOiAwLjk1MDQ3MCxcbiAgICAgICAgWW46IDEsXG4gICAgICAgIFpuOiAxLjA4ODgzMCxcblxuICAgICAgICB0MDogMC4xMzc5MzEwMzQsICAvLyA0IC8gMjlcbiAgICAgICAgdDE6IDAuMjA2ODk2NTUyLCAgLy8gNiAvIDI5XG4gICAgICAgIHQyOiAwLjEyODQxODU1LCAgIC8vIDMgKiB0MSAqIHQxXG4gICAgICAgIHQzOiAwLjAwODg1NjQ1MiwgIC8vIHQxICogdDEgKiB0MVxuICAgIH07XG5cbiAgICB2YXIgTEFCX0NPTlNUQU5UUyQzID0gbGFiQ29uc3RhbnRzO1xuICAgIHZhciB1bnBhY2skaCA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgcG93JGEgPSBNYXRoLnBvdztcblxuICAgIHZhciByZ2IybGFiJDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayRoKGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gcmdiMnh5eihyLGcsYik7XG4gICAgICAgIHZhciB4ID0gcmVmJDFbMF07XG4gICAgICAgIHZhciB5ID0gcmVmJDFbMV07XG4gICAgICAgIHZhciB6ID0gcmVmJDFbMl07XG4gICAgICAgIHZhciBsID0gMTE2ICogeSAtIDE2O1xuICAgICAgICByZXR1cm4gW2wgPCAwID8gMCA6IGwsIDUwMCAqICh4IC0geSksIDIwMCAqICh5IC0geildO1xuICAgIH07XG5cbiAgICB2YXIgcmdiX3h5eiA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIGlmICgociAvPSAyNTUpIDw9IDAuMDQwNDUpIHsgcmV0dXJuIHIgLyAxMi45MjsgfVxuICAgICAgICByZXR1cm4gcG93JGEoKHIgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICB9O1xuXG4gICAgdmFyIHh5el9sYWIgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA+IExBQl9DT05TVEFOVFMkMy50MykgeyByZXR1cm4gcG93JGEodCwgMSAvIDMpOyB9XG4gICAgICAgIHJldHVybiB0IC8gTEFCX0NPTlNUQU5UUyQzLnQyICsgTEFCX0NPTlNUQU5UUyQzLnQwO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMnh5eiA9IGZ1bmN0aW9uIChyLGcsYikge1xuICAgICAgICByID0gcmdiX3h5eihyKTtcbiAgICAgICAgZyA9IHJnYl94eXooZyk7XG4gICAgICAgIGIgPSByZ2JfeHl6KGIpO1xuICAgICAgICB2YXIgeCA9IHh5el9sYWIoKDAuNDEyNDU2NCAqIHIgKyAwLjM1NzU3NjEgKiBnICsgMC4xODA0Mzc1ICogYikgLyBMQUJfQ09OU1RBTlRTJDMuWG4pO1xuICAgICAgICB2YXIgeSA9IHh5el9sYWIoKDAuMjEyNjcyOSAqIHIgKyAwLjcxNTE1MjIgKiBnICsgMC4wNzIxNzUwICogYikgLyBMQUJfQ09OU1RBTlRTJDMuWW4pO1xuICAgICAgICB2YXIgeiA9IHh5el9sYWIoKDAuMDE5MzMzOSAqIHIgKyAwLjExOTE5MjAgKiBnICsgMC45NTAzMDQxICogYikgLyBMQUJfQ09OU1RBTlRTJDMuWm4pO1xuICAgICAgICByZXR1cm4gW3gseSx6XTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJsYWJfMSA9IHJnYjJsYWIkMjtcblxuICAgIHZhciBMQUJfQ09OU1RBTlRTJDIgPSBsYWJDb25zdGFudHM7XG4gICAgdmFyIHVucGFjayRnID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBwb3ckOSA9IE1hdGgucG93O1xuXG4gICAgLypcbiAgICAgKiBMKiBbMC4uMTAwXVxuICAgICAqIGEgWy0xMDAuLjEwMF1cbiAgICAgKiBiIFstMTAwLi4xMDBdXG4gICAgICovXG4gICAgdmFyIGxhYjJyZ2IkMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICBhcmdzID0gdW5wYWNrJGcoYXJncywgJ2xhYicpO1xuICAgICAgICB2YXIgbCA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBhID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIGIgPSBhcmdzWzJdO1xuICAgICAgICB2YXIgeCx5LHosIHIsZyxiXztcblxuICAgICAgICB5ID0gKGwgKyAxNikgLyAxMTY7XG4gICAgICAgIHggPSBpc05hTihhKSA/IHkgOiB5ICsgYSAvIDUwMDtcbiAgICAgICAgeiA9IGlzTmFOKGIpID8geSA6IHkgLSBiIC8gMjAwO1xuXG4gICAgICAgIHkgPSBMQUJfQ09OU1RBTlRTJDIuWW4gKiBsYWJfeHl6KHkpO1xuICAgICAgICB4ID0gTEFCX0NPTlNUQU5UUyQyLlhuICogbGFiX3h5eih4KTtcbiAgICAgICAgeiA9IExBQl9DT05TVEFOVFMkMi5abiAqIGxhYl94eXooeik7XG5cbiAgICAgICAgciA9IHh5el9yZ2IoMy4yNDA0NTQyICogeCAtIDEuNTM3MTM4NSAqIHkgLSAwLjQ5ODUzMTQgKiB6KTsgIC8vIEQ2NSAtPiBzUkdCXG4gICAgICAgIGcgPSB4eXpfcmdiKC0wLjk2OTI2NjAgKiB4ICsgMS44NzYwMTA4ICogeSArIDAuMDQxNTU2MCAqIHopO1xuICAgICAgICBiXyA9IHh5el9yZ2IoMC4wNTU2NDM0ICogeCAtIDAuMjA0MDI1OSAqIHkgKyAxLjA1NzIyNTIgKiB6KTtcblxuICAgICAgICByZXR1cm4gW3IsZyxiXyxhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciB4eXpfcmdiID0gZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgcmV0dXJuIDI1NSAqIChyIDw9IDAuMDAzMDQgPyAxMi45MiAqIHIgOiAxLjA1NSAqIHBvdyQ5KHIsIDEgLyAyLjQpIC0gMC4wNTUpXG4gICAgfTtcblxuICAgIHZhciBsYWJfeHl6ID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPiBMQUJfQ09OU1RBTlRTJDIudDEgPyB0ICogdCAqIHQgOiBMQUJfQ09OU1RBTlRTJDIudDIgKiAodCAtIExBQl9DT05TVEFOVFMkMi50MClcbiAgICB9O1xuXG4gICAgdmFyIGxhYjJyZ2JfMSA9IGxhYjJyZ2IkMTtcblxuICAgIHZhciB1bnBhY2skZiA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgdHlwZSRlID0gdXRpbHMudHlwZTtcbiAgICB2YXIgY2hyb21hJGIgPSBjaHJvbWFfMTtcbiAgICB2YXIgQ29sb3IkdSA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JDcgPSBpbnB1dCRoO1xuXG4gICAgdmFyIHJnYjJsYWIkMSA9IHJnYjJsYWJfMTtcblxuICAgIENvbG9yJHUucHJvdG90eXBlLmxhYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmdiMmxhYiQxKHRoaXMuX3JnYik7XG4gICAgfTtcblxuICAgIGNocm9tYSRiLmxhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3IkdSwgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ2xhYiddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQkNy5mb3JtYXQubGFiID0gbGFiMnJnYl8xO1xuXG4gICAgaW5wdXQkNy5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAyLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayRmKGFyZ3MsICdsYWInKTtcbiAgICAgICAgICAgIGlmICh0eXBlJGUoYXJncykgPT09ICdhcnJheScgJiYgYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xhYic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciB1bnBhY2skZSA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgUkFEMkRFRyA9IHV0aWxzLlJBRDJERUc7XG4gICAgdmFyIHNxcnQkMyA9IE1hdGguc3FydDtcbiAgICB2YXIgYXRhbjIkMiA9IE1hdGguYXRhbjI7XG4gICAgdmFyIHJvdW5kJDIgPSBNYXRoLnJvdW5kO1xuXG4gICAgdmFyIGxhYjJsY2gkMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgcmVmID0gdW5wYWNrJGUoYXJncywgJ2xhYicpO1xuICAgICAgICB2YXIgbCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGEgPSByZWZbMV07XG4gICAgICAgIHZhciBiID0gcmVmWzJdO1xuICAgICAgICB2YXIgYyA9IHNxcnQkMyhhICogYSArIGIgKiBiKTtcbiAgICAgICAgdmFyIGggPSAoYXRhbjIkMihiLCBhKSAqIFJBRDJERUcgKyAzNjApICUgMzYwO1xuICAgICAgICBpZiAocm91bmQkMihjKjEwMDAwKSA9PT0gMCkgeyBoID0gTnVtYmVyLk5hTjsgfVxuICAgICAgICByZXR1cm4gW2wsIGMsIGhdO1xuICAgIH07XG5cbiAgICB2YXIgbGFiMmxjaF8xID0gbGFiMmxjaCQyO1xuXG4gICAgdmFyIHVucGFjayRkID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciByZ2IybGFiID0gcmdiMmxhYl8xO1xuICAgIHZhciBsYWIybGNoJDEgPSBsYWIybGNoXzE7XG5cbiAgICB2YXIgcmdiMmxjaCQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skZChhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IHJnYjJsYWIocixnLGIpO1xuICAgICAgICB2YXIgbCA9IHJlZiQxWzBdO1xuICAgICAgICB2YXIgYSA9IHJlZiQxWzFdO1xuICAgICAgICB2YXIgYl8gPSByZWYkMVsyXTtcbiAgICAgICAgcmV0dXJuIGxhYjJsY2gkMShsLGEsYl8pO1xuICAgIH07XG5cbiAgICB2YXIgcmdiMmxjaF8xID0gcmdiMmxjaCQxO1xuXG4gICAgdmFyIHVucGFjayRjID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBERUcyUkFEID0gdXRpbHMuREVHMlJBRDtcbiAgICB2YXIgc2luJDMgPSBNYXRoLnNpbjtcbiAgICB2YXIgY29zJDMgPSBNYXRoLmNvcztcblxuICAgIHZhciBsY2gybGFiJDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgLypcbiAgICAgICAgQ29udmVydCBmcm9tIGEgcXVhbGl0YXRpdmUgcGFyYW1ldGVyIGggYW5kIGEgcXVhbnRpdGF0aXZlIHBhcmFtZXRlciBsIHRvIGEgMjQtYml0IHBpeGVsLlxuICAgICAgICBUaGVzZSBmb3JtdWxhcyB3ZXJlIGludmVudGVkIGJ5IERhdmlkIERhbHJ5bXBsZSB0byBvYnRhaW4gbWF4aW11bSBjb250cmFzdCB3aXRob3V0IGdvaW5nXG4gICAgICAgIG91dCBvZiBnYW11dCBpZiB0aGUgcGFyYW1ldGVycyBhcmUgaW4gdGhlIHJhbmdlIDAtMS5cblxuICAgICAgICBBIHNhdHVyYXRpb24gbXVsdGlwbGllciB3YXMgYWRkZWQgYnkgR3JlZ29yIEFpc2NoXG4gICAgICAgICovXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skYyhhcmdzLCAnbGNoJyk7XG4gICAgICAgIHZhciBsID0gcmVmWzBdO1xuICAgICAgICB2YXIgYyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGggPSByZWZbMl07XG4gICAgICAgIGlmIChpc05hTihoKSkgeyBoID0gMDsgfVxuICAgICAgICBoID0gaCAqIERFRzJSQUQ7XG4gICAgICAgIHJldHVybiBbbCwgY29zJDMoaCkgKiBjLCBzaW4kMyhoKSAqIGNdXG4gICAgfTtcblxuICAgIHZhciBsY2gybGFiXzEgPSBsY2gybGFiJDI7XG5cbiAgICB2YXIgdW5wYWNrJGIgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxjaDJsYWIkMSA9IGxjaDJsYWJfMTtcbiAgICB2YXIgbGFiMnJnYiA9IGxhYjJyZ2JfMTtcblxuICAgIHZhciBsY2gycmdiJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgYXJncyA9IHVucGFjayRiKGFyZ3MsICdsY2gnKTtcbiAgICAgICAgdmFyIGwgPSBhcmdzWzBdO1xuICAgICAgICB2YXIgYyA9IGFyZ3NbMV07XG4gICAgICAgIHZhciBoID0gYXJnc1syXTtcbiAgICAgICAgdmFyIHJlZiA9IGxjaDJsYWIkMSAobCxjLGgpO1xuICAgICAgICB2YXIgTCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGEgPSByZWZbMV07XG4gICAgICAgIHZhciBiXyA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gbGFiMnJnYiAoTCxhLGJfKTtcbiAgICAgICAgdmFyIHIgPSByZWYkMVswXTtcbiAgICAgICAgdmFyIGcgPSByZWYkMVsxXTtcbiAgICAgICAgdmFyIGIgPSByZWYkMVsyXTtcbiAgICAgICAgcmV0dXJuIFtyLCBnLCBiLCBhcmdzLmxlbmd0aCA+IDMgPyBhcmdzWzNdIDogMV07XG4gICAgfTtcblxuICAgIHZhciBsY2gycmdiXzEgPSBsY2gycmdiJDE7XG5cbiAgICB2YXIgdW5wYWNrJGEgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxjaDJyZ2IgPSBsY2gycmdiXzE7XG5cbiAgICB2YXIgaGNsMnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICB2YXIgaGNsID0gdW5wYWNrJGEoYXJncywgJ2hjbCcpLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIGxjaDJyZ2IuYXBwbHkodm9pZCAwLCBoY2wpO1xuICAgIH07XG5cbiAgICB2YXIgaGNsMnJnYl8xID0gaGNsMnJnYjtcblxuICAgIHZhciB1bnBhY2skOSA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgdHlwZSRkID0gdXRpbHMudHlwZTtcbiAgICB2YXIgY2hyb21hJGEgPSBjaHJvbWFfMTtcbiAgICB2YXIgQ29sb3IkdCA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JDYgPSBpbnB1dCRoO1xuXG4gICAgdmFyIHJnYjJsY2ggPSByZ2IybGNoXzE7XG5cbiAgICBDb2xvciR0LnByb3RvdHlwZS5sY2ggPSBmdW5jdGlvbigpIHsgcmV0dXJuIHJnYjJsY2godGhpcy5fcmdiKTsgfTtcbiAgICBDb2xvciR0LnByb3RvdHlwZS5oY2wgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHJnYjJsY2godGhpcy5fcmdiKS5yZXZlcnNlKCk7IH07XG5cbiAgICBjaHJvbWEkYS5sY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHQsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydsY2gnXSkgKSk7XG4gICAgfTtcbiAgICBjaHJvbWEkYS5oY2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHQsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydoY2wnXSkgKSk7XG4gICAgfTtcblxuICAgIGlucHV0JDYuZm9ybWF0LmxjaCA9IGxjaDJyZ2JfMTtcbiAgICBpbnB1dCQ2LmZvcm1hdC5oY2wgPSBoY2wycmdiXzE7XG5cbiAgICBbJ2xjaCcsJ2hjbCddLmZvckVhY2goZnVuY3Rpb24gKG0pIHsgcmV0dXJuIGlucHV0JDYuYXV0b2RldGVjdC5wdXNoKHtcbiAgICAgICAgcDogMixcbiAgICAgICAgdGVzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgICAgIGFyZ3MgPSB1bnBhY2skOShhcmdzLCBtKTtcbiAgICAgICAgICAgIGlmICh0eXBlJGQoYXJncykgPT09ICdhcnJheScgJiYgYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pOyB9KTtcblxuICAgIC8qKlxuICAgIFx0WDExIGNvbG9yIG5hbWVzXG5cbiAgICBcdGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3N2Zy1jb2xvclxuICAgICovXG5cbiAgICB2YXIgdzNjeDExJDEgPSB7XG4gICAgICAgIGFsaWNlYmx1ZTogJyNmMGY4ZmYnLFxuICAgICAgICBhbnRpcXVld2hpdGU6ICcjZmFlYmQ3JyxcbiAgICAgICAgYXF1YTogJyMwMGZmZmYnLFxuICAgICAgICBhcXVhbWFyaW5lOiAnIzdmZmZkNCcsXG4gICAgICAgIGF6dXJlOiAnI2YwZmZmZicsXG4gICAgICAgIGJlaWdlOiAnI2Y1ZjVkYycsXG4gICAgICAgIGJpc3F1ZTogJyNmZmU0YzQnLFxuICAgICAgICBibGFjazogJyMwMDAwMDAnLFxuICAgICAgICBibGFuY2hlZGFsbW9uZDogJyNmZmViY2QnLFxuICAgICAgICBibHVlOiAnIzAwMDBmZicsXG4gICAgICAgIGJsdWV2aW9sZXQ6ICcjOGEyYmUyJyxcbiAgICAgICAgYnJvd246ICcjYTUyYTJhJyxcbiAgICAgICAgYnVybHl3b29kOiAnI2RlYjg4NycsXG4gICAgICAgIGNhZGV0Ymx1ZTogJyM1ZjllYTAnLFxuICAgICAgICBjaGFydHJldXNlOiAnIzdmZmYwMCcsXG4gICAgICAgIGNob2NvbGF0ZTogJyNkMjY5MWUnLFxuICAgICAgICBjb3JhbDogJyNmZjdmNTAnLFxuICAgICAgICBjb3JuZmxvd2VyOiAnIzY0OTVlZCcsXG4gICAgICAgIGNvcm5mbG93ZXJibHVlOiAnIzY0OTVlZCcsXG4gICAgICAgIGNvcm5zaWxrOiAnI2ZmZjhkYycsXG4gICAgICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICAgICAgY3lhbjogJyMwMGZmZmYnLFxuICAgICAgICBkYXJrYmx1ZTogJyMwMDAwOGInLFxuICAgICAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgICAgICBkYXJrZ29sZGVucm9kOiAnI2I4ODYwYicsXG4gICAgICAgIGRhcmtncmF5OiAnI2E5YTlhOScsXG4gICAgICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgICAgICBkYXJrZ3JleTogJyNhOWE5YTknLFxuICAgICAgICBkYXJra2hha2k6ICcjYmRiNzZiJyxcbiAgICAgICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICAgICAgZGFya29saXZlZ3JlZW46ICcjNTU2YjJmJyxcbiAgICAgICAgZGFya29yYW5nZTogJyNmZjhjMDAnLFxuICAgICAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgICAgIGRhcmtyZWQ6ICcjOGIwMDAwJyxcbiAgICAgICAgZGFya3NhbG1vbjogJyNlOTk2N2EnLFxuICAgICAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICAgICAgZGFya3NsYXRlYmx1ZTogJyM0ODNkOGInLFxuICAgICAgICBkYXJrc2xhdGVncmF5OiAnIzJmNGY0ZicsXG4gICAgICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICAgICAgZGFya3R1cnF1b2lzZTogJyMwMGNlZDEnLFxuICAgICAgICBkYXJrdmlvbGV0OiAnIzk0MDBkMycsXG4gICAgICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgICAgIGRlZXBza3libHVlOiAnIzAwYmZmZicsXG4gICAgICAgIGRpbWdyYXk6ICcjNjk2OTY5JyxcbiAgICAgICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgICAgICBkb2RnZXJibHVlOiAnIzFlOTBmZicsXG4gICAgICAgIGZpcmVicmljazogJyNiMjIyMjInLFxuICAgICAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgICAgICBmb3Jlc3RncmVlbjogJyMyMjhiMjInLFxuICAgICAgICBmdWNoc2lhOiAnI2ZmMDBmZicsXG4gICAgICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgICAgICBnaG9zdHdoaXRlOiAnI2Y4ZjhmZicsXG4gICAgICAgIGdvbGQ6ICcjZmZkNzAwJyxcbiAgICAgICAgZ29sZGVucm9kOiAnI2RhYTUyMCcsXG4gICAgICAgIGdyYXk6ICcjODA4MDgwJyxcbiAgICAgICAgZ3JlZW46ICcjMDA4MDAwJyxcbiAgICAgICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICAgICAgZ3JleTogJyM4MDgwODAnLFxuICAgICAgICBob25leWRldzogJyNmMGZmZjAnLFxuICAgICAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgICAgIGluZGlhbnJlZDogJyNjZDVjNWMnLFxuICAgICAgICBpbmRpZ286ICcjNGIwMDgyJyxcbiAgICAgICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICAgICAga2hha2k6ICcjZjBlNjhjJyxcbiAgICAgICAgbGFzZXJsZW1vbjogJyNmZmZmNTQnLFxuICAgICAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgICAgICBsYXZlbmRlcmJsdXNoOiAnI2ZmZjBmNScsXG4gICAgICAgIGxhd25ncmVlbjogJyM3Y2ZjMDAnLFxuICAgICAgICBsZW1vbmNoaWZmb246ICcjZmZmYWNkJyxcbiAgICAgICAgbGlnaHRibHVlOiAnI2FkZDhlNicsXG4gICAgICAgIGxpZ2h0Y29yYWw6ICcjZjA4MDgwJyxcbiAgICAgICAgbGlnaHRjeWFuOiAnI2UwZmZmZicsXG4gICAgICAgIGxpZ2h0Z29sZGVucm9kOiAnI2ZhZmFkMicsXG4gICAgICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiAnI2ZhZmFkMicsXG4gICAgICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgICAgICBsaWdodGdyZWVuOiAnIzkwZWU5MCcsXG4gICAgICAgIGxpZ2h0Z3JleTogJyNkM2QzZDMnLFxuICAgICAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICAgICAgbGlnaHRzYWxtb246ICcjZmZhMDdhJyxcbiAgICAgICAgbGlnaHRzZWFncmVlbjogJyMyMGIyYWEnLFxuICAgICAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICAgICAgbGlnaHRzbGF0ZWdyYXk6ICcjNzc4ODk5JyxcbiAgICAgICAgbGlnaHRzbGF0ZWdyZXk6ICcjNzc4ODk5JyxcbiAgICAgICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICAgICAgbGlnaHR5ZWxsb3c6ICcjZmZmZmUwJyxcbiAgICAgICAgbGltZTogJyMwMGZmMDAnLFxuICAgICAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICAgICAgbGluZW46ICcjZmFmMGU2JyxcbiAgICAgICAgbWFnZW50YTogJyNmZjAwZmYnLFxuICAgICAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICAgICAgbWFyb29uMjogJyM3ZjAwMDAnLFxuICAgICAgICBtYXJvb24zOiAnI2IwMzA2MCcsXG4gICAgICAgIG1lZGl1bWFxdWFtYXJpbmU6ICcjNjZjZGFhJyxcbiAgICAgICAgbWVkaXVtYmx1ZTogJyMwMDAwY2QnLFxuICAgICAgICBtZWRpdW1vcmNoaWQ6ICcjYmE1NWQzJyxcbiAgICAgICAgbWVkaXVtcHVycGxlOiAnIzkzNzBkYicsXG4gICAgICAgIG1lZGl1bXNlYWdyZWVuOiAnIzNjYjM3MScsXG4gICAgICAgIG1lZGl1bXNsYXRlYmx1ZTogJyM3YjY4ZWUnLFxuICAgICAgICBtZWRpdW1zcHJpbmdncmVlbjogJyMwMGZhOWEnLFxuICAgICAgICBtZWRpdW10dXJxdW9pc2U6ICcjNDhkMWNjJyxcbiAgICAgICAgbWVkaXVtdmlvbGV0cmVkOiAnI2M3MTU4NScsXG4gICAgICAgIG1pZG5pZ2h0Ymx1ZTogJyMxOTE5NzAnLFxuICAgICAgICBtaW50Y3JlYW06ICcjZjVmZmZhJyxcbiAgICAgICAgbWlzdHlyb3NlOiAnI2ZmZTRlMScsXG4gICAgICAgIG1vY2Nhc2luOiAnI2ZmZTRiNScsXG4gICAgICAgIG5hdmFqb3doaXRlOiAnI2ZmZGVhZCcsXG4gICAgICAgIG5hdnk6ICcjMDAwMDgwJyxcbiAgICAgICAgb2xkbGFjZTogJyNmZGY1ZTYnLFxuICAgICAgICBvbGl2ZTogJyM4MDgwMDAnLFxuICAgICAgICBvbGl2ZWRyYWI6ICcjNmI4ZTIzJyxcbiAgICAgICAgb3JhbmdlOiAnI2ZmYTUwMCcsXG4gICAgICAgIG9yYW5nZXJlZDogJyNmZjQ1MDAnLFxuICAgICAgICBvcmNoaWQ6ICcjZGE3MGQ2JyxcbiAgICAgICAgcGFsZWdvbGRlbnJvZDogJyNlZWU4YWEnLFxuICAgICAgICBwYWxlZ3JlZW46ICcjOThmYjk4JyxcbiAgICAgICAgcGFsZXR1cnF1b2lzZTogJyNhZmVlZWUnLFxuICAgICAgICBwYWxldmlvbGV0cmVkOiAnI2RiNzA5MycsXG4gICAgICAgIHBhcGF5YXdoaXA6ICcjZmZlZmQ1JyxcbiAgICAgICAgcGVhY2hwdWZmOiAnI2ZmZGFiOScsXG4gICAgICAgIHBlcnU6ICcjY2Q4NTNmJyxcbiAgICAgICAgcGluazogJyNmZmMwY2InLFxuICAgICAgICBwbHVtOiAnI2RkYTBkZCcsXG4gICAgICAgIHBvd2RlcmJsdWU6ICcjYjBlMGU2JyxcbiAgICAgICAgcHVycGxlOiAnIzgwMDA4MCcsXG4gICAgICAgIHB1cnBsZTI6ICcjN2YwMDdmJyxcbiAgICAgICAgcHVycGxlMzogJyNhMDIwZjAnLFxuICAgICAgICByZWJlY2NhcHVycGxlOiAnIzY2MzM5OScsXG4gICAgICAgIHJlZDogJyNmZjAwMDAnLFxuICAgICAgICByb3N5YnJvd246ICcjYmM4ZjhmJyxcbiAgICAgICAgcm95YWxibHVlOiAnIzQxNjllMScsXG4gICAgICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgICAgIHNhbG1vbjogJyNmYTgwNzInLFxuICAgICAgICBzYW5keWJyb3duOiAnI2Y0YTQ2MCcsXG4gICAgICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgICAgIHNlYXNoZWxsOiAnI2ZmZjVlZScsXG4gICAgICAgIHNpZW5uYTogJyNhMDUyMmQnLFxuICAgICAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICAgICAgc2t5Ymx1ZTogJyM4N2NlZWInLFxuICAgICAgICBzbGF0ZWJsdWU6ICcjNmE1YWNkJyxcbiAgICAgICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgICAgIHNsYXRlZ3JleTogJyM3MDgwOTAnLFxuICAgICAgICBzbm93OiAnI2ZmZmFmYScsXG4gICAgICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgICAgIHN0ZWVsYmx1ZTogJyM0NjgyYjQnLFxuICAgICAgICB0YW46ICcjZDJiNDhjJyxcbiAgICAgICAgdGVhbDogJyMwMDgwODAnLFxuICAgICAgICB0aGlzdGxlOiAnI2Q4YmZkOCcsXG4gICAgICAgIHRvbWF0bzogJyNmZjYzNDcnLFxuICAgICAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICAgICAgdmlvbGV0OiAnI2VlODJlZScsXG4gICAgICAgIHdoZWF0OiAnI2Y1ZGViMycsXG4gICAgICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgICAgIHdoaXRlc21va2U6ICcjZjVmNWY1JyxcbiAgICAgICAgeWVsbG93OiAnI2ZmZmYwMCcsXG4gICAgICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMidcbiAgICB9O1xuXG4gICAgdmFyIHczY3gxMV8xID0gdzNjeDExJDE7XG5cbiAgICB2YXIgQ29sb3IkcyA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JDUgPSBpbnB1dCRoO1xuICAgIHZhciB0eXBlJGMgPSB1dGlscy50eXBlO1xuXG4gICAgdmFyIHczY3gxMSA9IHczY3gxMV8xO1xuICAgIHZhciBoZXgycmdiID0gaGV4MnJnYl8xO1xuICAgIHZhciByZ2IyaGV4ID0gcmdiMmhleF8xO1xuXG4gICAgQ29sb3Ikcy5wcm90b3R5cGUubmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGV4ID0gcmdiMmhleCh0aGlzLl9yZ2IsICdyZ2InKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxpc3QgPSBPYmplY3Qua2V5cyh3M2N4MTEpOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIG4gPSBsaXN0W2ldO1xuXG4gICAgICAgICAgICBpZiAodzNjeDExW25dID09PSBoZXgpIHsgcmV0dXJuIG4udG9Mb3dlckNhc2UoKTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfTtcblxuICAgIGlucHV0JDUuZm9ybWF0Lm5hbWVkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHczY3gxMVtuYW1lXSkgeyByZXR1cm4gaGV4MnJnYih3M2N4MTFbbmFtZV0pOyB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBjb2xvciBuYW1lOiAnK25hbWUpO1xuICAgIH07XG5cbiAgICBpbnB1dCQ1LmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDUsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgcmVzdFsgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgICAgICAgICAgaWYgKCFyZXN0Lmxlbmd0aCAmJiB0eXBlJGMoaCkgPT09ICdzdHJpbmcnICYmIHczY3gxMVtoLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICduYW1lZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciB1bnBhY2skOCA9IHV0aWxzLnVucGFjaztcblxuICAgIHZhciByZ2IybnVtJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayQ4KGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgcmV0dXJuIChyIDw8IDE2KSArIChnIDw8IDgpICsgYjtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJudW1fMSA9IHJnYjJudW0kMTtcblxuICAgIHZhciB0eXBlJGIgPSB1dGlscy50eXBlO1xuXG4gICAgdmFyIG51bTJyZ2IgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICh0eXBlJGIobnVtKSA9PSBcIm51bWJlclwiICYmIG51bSA+PSAwICYmIG51bSA8PSAweEZGRkZGRikge1xuICAgICAgICAgICAgdmFyIHIgPSBudW0gPj4gMTY7XG4gICAgICAgICAgICB2YXIgZyA9IChudW0gPj4gOCkgJiAweEZGO1xuICAgICAgICAgICAgdmFyIGIgPSBudW0gJiAweEZGO1xuICAgICAgICAgICAgcmV0dXJuIFtyLGcsYiwxXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIG51bSBjb2xvcjogXCIrbnVtKTtcbiAgICB9O1xuXG4gICAgdmFyIG51bTJyZ2JfMSA9IG51bTJyZ2I7XG5cbiAgICB2YXIgY2hyb21hJDkgPSBjaHJvbWFfMTtcbiAgICB2YXIgQ29sb3IkciA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JDQgPSBpbnB1dCRoO1xuICAgIHZhciB0eXBlJGEgPSB1dGlscy50eXBlO1xuXG4gICAgdmFyIHJnYjJudW0gPSByZ2IybnVtXzE7XG5cbiAgICBDb2xvciRyLnByb3RvdHlwZS5udW0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJnYjJudW0odGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hJDkubnVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvciRyLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsnbnVtJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dCQ0LmZvcm1hdC5udW0gPSBudW0ycmdiXzE7XG5cbiAgICBpbnB1dCQ0LmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDUsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgdHlwZSRhKGFyZ3NbMF0pID09PSAnbnVtYmVyJyAmJiBhcmdzWzBdID49IDAgJiYgYXJnc1swXSA8PSAweEZGRkZGRikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbnVtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGNocm9tYSQ4ID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJHEgPSBDb2xvcl8xO1xuICAgIHZhciBpbnB1dCQzID0gaW5wdXQkaDtcbiAgICB2YXIgdW5wYWNrJDcgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkOSA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIHJvdW5kJDEgPSBNYXRoLnJvdW5kO1xuXG4gICAgQ29sb3IkcS5wcm90b3R5cGUucmdiID0gZnVuY3Rpb24ocm5kKSB7XG4gICAgICAgIGlmICggcm5kID09PSB2b2lkIDAgKSBybmQ9dHJ1ZTtcblxuICAgICAgICBpZiAocm5kID09PSBmYWxzZSkgeyByZXR1cm4gdGhpcy5fcmdiLnNsaWNlKDAsMyk7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYi5zbGljZSgwLDMpLm1hcChyb3VuZCQxKTtcbiAgICB9O1xuXG4gICAgQ29sb3IkcS5wcm90b3R5cGUucmdiYSA9IGZ1bmN0aW9uKHJuZCkge1xuICAgICAgICBpZiAoIHJuZCA9PT0gdm9pZCAwICkgcm5kPXRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYi5zbGljZSgwLDQpLm1hcChmdW5jdGlvbiAodixpKSB7XG4gICAgICAgICAgICByZXR1cm4gaTwzID8gKHJuZCA9PT0gZmFsc2UgPyB2IDogcm91bmQkMSh2KSkgOiB2O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY2hyb21hJDgucmdiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvciRxLCBbIG51bGwgXS5jb25jYXQoIGFyZ3MsIFsncmdiJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dCQzLmZvcm1hdC5yZ2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgdmFyIHJnYmEgPSB1bnBhY2skNyhhcmdzLCAncmdiYScpO1xuICAgICAgICBpZiAocmdiYVszXSA9PT0gdW5kZWZpbmVkKSB7IHJnYmFbM10gPSAxOyB9XG4gICAgICAgIHJldHVybiByZ2JhO1xuICAgIH07XG5cbiAgICBpbnB1dCQzLmF1dG9kZXRlY3QucHVzaCh7XG4gICAgICAgIHA6IDMsXG4gICAgICAgIHRlc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgICAgICBhcmdzID0gdW5wYWNrJDcoYXJncywgJ3JnYmEnKTtcbiAgICAgICAgICAgIGlmICh0eXBlJDkoYXJncykgPT09ICdhcnJheScgJiYgKGFyZ3MubGVuZ3RoID09PSAzIHx8XG4gICAgICAgICAgICAgICAgYXJncy5sZW5ndGggPT09IDQgJiYgdHlwZSQ5KGFyZ3NbM10pID09ICdudW1iZXInICYmIGFyZ3NbM10gPj0gMCAmJiBhcmdzWzNdIDw9IDEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2InO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAqIEJhc2VkIG9uIGltcGxlbWVudGF0aW9uIGJ5IE5laWwgQmFydGxldHRcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmVpbGJhcnRsZXR0L2NvbG9yLXRlbXBlcmF0dXJlXG4gICAgICovXG5cbiAgICB2YXIgbG9nJDEgPSBNYXRoLmxvZztcblxuICAgIHZhciB0ZW1wZXJhdHVyZTJyZ2IkMSA9IGZ1bmN0aW9uIChrZWx2aW4pIHtcbiAgICAgICAgdmFyIHRlbXAgPSBrZWx2aW4gLyAxMDA7XG4gICAgICAgIHZhciByLGcsYjtcbiAgICAgICAgaWYgKHRlbXAgPCA2Nikge1xuICAgICAgICAgICAgciA9IDI1NTtcbiAgICAgICAgICAgIGcgPSB0ZW1wIDwgNiA/IDAgOiAtMTU1LjI1NDg1NTYyNzA5MTc5IC0gMC40NDU5Njk1MDQ2OTU3OTEzMyAqIChnID0gdGVtcC0yKSArIDEwNC40OTIxNjE5OTM5Mzg4OCAqIGxvZyQxKGcpO1xuICAgICAgICAgICAgYiA9IHRlbXAgPCAyMCA/IDAgOiAtMjU0Ljc2OTM1MTg0MTIwOTAyICsgMC44Mjc0MDk2MDY0MDA3Mzk1ICogKGIgPSB0ZW1wLTEwKSArIDExNS42Nzk5NDQwMTA2NjE0NyAqIGxvZyQxKGIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgciA9IDM1MS45NzY5MDU2NjgwNTY5MyArIDAuMTE0MjA2NDUzNzg0MTY1ICogKHIgPSB0ZW1wLTU1KSAtIDQwLjI1MzY2MzA5MzMyMTI3ICogbG9nJDEocik7XG4gICAgICAgICAgICBnID0gMzI1LjQ0OTQxMjU3MTE5NzQgKyAwLjA3OTQzNDU2NTM2NjYyMzQyICogKGcgPSB0ZW1wLTUwKSAtIDI4LjA4NTI5NjM1MDc5NTcgKiBsb2ckMShnKTtcbiAgICAgICAgICAgIGIgPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyLGcsYiwxXTtcbiAgICB9O1xuXG4gICAgdmFyIHRlbXBlcmF0dXJlMnJnYl8xID0gdGVtcGVyYXR1cmUycmdiJDE7XG5cbiAgICAvKlxuICAgICAqIEJhc2VkIG9uIGltcGxlbWVudGF0aW9uIGJ5IE5laWwgQmFydGxldHRcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmVpbGJhcnRsZXR0L2NvbG9yLXRlbXBlcmF0dXJlXG4gICAgICoqL1xuXG4gICAgdmFyIHRlbXBlcmF0dXJlMnJnYiA9IHRlbXBlcmF0dXJlMnJnYl8xO1xuICAgIHZhciB1bnBhY2skNiA9IHV0aWxzLnVucGFjaztcbiAgICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xuXG4gICAgdmFyIHJnYjJ0ZW1wZXJhdHVyZSQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZ2IgPSB1bnBhY2skNihhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmdiWzBdLCBiID0gcmdiWzJdO1xuICAgICAgICB2YXIgbWluVGVtcCA9IDEwMDA7XG4gICAgICAgIHZhciBtYXhUZW1wID0gNDAwMDA7XG4gICAgICAgIHZhciBlcHMgPSAwLjQ7XG4gICAgICAgIHZhciB0ZW1wO1xuICAgICAgICB3aGlsZSAobWF4VGVtcCAtIG1pblRlbXAgPiBlcHMpIHtcbiAgICAgICAgICAgIHRlbXAgPSAobWF4VGVtcCArIG1pblRlbXApICogMC41O1xuICAgICAgICAgICAgdmFyIHJnYiQxID0gdGVtcGVyYXR1cmUycmdiKHRlbXApO1xuICAgICAgICAgICAgaWYgKChyZ2IkMVsyXSAvIHJnYiQxWzBdKSA+PSAoYiAvIHIpKSB7XG4gICAgICAgICAgICAgICAgbWF4VGVtcCA9IHRlbXA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pblRlbXAgPSB0ZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3VuZCh0ZW1wKTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJ0ZW1wZXJhdHVyZV8xID0gcmdiMnRlbXBlcmF0dXJlJDE7XG5cbiAgICB2YXIgY2hyb21hJDcgPSBjaHJvbWFfMTtcbiAgICB2YXIgQ29sb3IkcCA9IENvbG9yXzE7XG4gICAgdmFyIGlucHV0JDIgPSBpbnB1dCRoO1xuXG4gICAgdmFyIHJnYjJ0ZW1wZXJhdHVyZSA9IHJnYjJ0ZW1wZXJhdHVyZV8xO1xuXG4gICAgQ29sb3IkcC5wcm90b3R5cGUudGVtcCA9XG4gICAgQ29sb3IkcC5wcm90b3R5cGUua2VsdmluID1cbiAgICBDb2xvciRwLnByb3RvdHlwZS50ZW1wZXJhdHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmdiMnRlbXBlcmF0dXJlKHRoaXMuX3JnYik7XG4gICAgfTtcblxuICAgIGNocm9tYSQ3LnRlbXAgPVxuICAgIGNocm9tYSQ3LmtlbHZpbiA9XG4gICAgY2hyb21hJDcudGVtcGVyYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJHAsIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWyd0ZW1wJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dCQyLmZvcm1hdC50ZW1wID1cbiAgICBpbnB1dCQyLmZvcm1hdC5rZWx2aW4gPVxuICAgIGlucHV0JDIuZm9ybWF0LnRlbXBlcmF0dXJlID0gdGVtcGVyYXR1cmUycmdiXzE7XG5cbiAgICB2YXIgdW5wYWNrJDUgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGNicnQgPSBNYXRoLmNicnQ7XG4gICAgdmFyIHBvdyQ4ID0gTWF0aC5wb3c7XG4gICAgdmFyIHNpZ24kMSA9IE1hdGguc2lnbjtcblxuICAgIHZhciByZ2Iyb2tsYWIkMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAvLyBPS0xhYiBjb2xvciBzcGFjZSBpbXBsZW1lbnRhdGlvbiB0YWtlbiBmcm9tXG4gICAgICAgIC8vIGh0dHBzOi8vYm90dG9zc29uLmdpdGh1Yi5pby9wb3N0cy9va2xhYi9cbiAgICAgICAgdmFyIHJlZiA9IHVucGFjayQ1KGFyZ3MsICdyZ2InKTtcbiAgICAgICAgdmFyIHIgPSByZWZbMF07XG4gICAgICAgIHZhciBnID0gcmVmWzFdO1xuICAgICAgICB2YXIgYiA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gW3JnYjJscmdiKHIgLyAyNTUpLCByZ2IybHJnYihnIC8gMjU1KSwgcmdiMmxyZ2IoYiAvIDI1NSldO1xuICAgICAgICB2YXIgbHIgPSByZWYkMVswXTtcbiAgICAgICAgdmFyIGxnID0gcmVmJDFbMV07XG4gICAgICAgIHZhciBsYiA9IHJlZiQxWzJdO1xuICAgICAgICB2YXIgbCA9IGNicnQoMC40MTIyMjE0NzA4ICogbHIgKyAwLjUzNjMzMjUzNjMgKiBsZyArIDAuMDUxNDQ1OTkyOSAqIGxiKTtcbiAgICAgICAgdmFyIG0gPSBjYnJ0KDAuMjExOTAzNDk4MiAqIGxyICsgMC42ODA2OTk1NDUxICogbGcgKyAwLjEwNzM5Njk1NjYgKiBsYik7XG4gICAgICAgIHZhciBzID0gY2JydCgwLjA4ODMwMjQ2MTkgKiBsciArIDAuMjgxNzE4ODM3NiAqIGxnICsgMC42Mjk5Nzg3MDA1ICogbGIpO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAwLjIxMDQ1NDI1NTMgKiBsICsgMC43OTM2MTc3ODUgKiBtIC0gMC4wMDQwNzIwNDY4ICogcyxcbiAgICAgICAgICAgIDEuOTc3OTk4NDk1MSAqIGwgLSAyLjQyODU5MjIwNSAqIG0gKyAwLjQ1MDU5MzcwOTkgKiBzLFxuICAgICAgICAgICAgMC4wMjU5MDQwMzcxICogbCArIDAuNzgyNzcxNzY2MiAqIG0gLSAwLjgwODY3NTc2NiAqIHNcbiAgICAgICAgXTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJva2xhYl8xID0gcmdiMm9rbGFiJDI7XG5cbiAgICBmdW5jdGlvbiByZ2IybHJnYihjKSB7XG4gICAgICAgIHZhciBhYnMgPSBNYXRoLmFicyhjKTtcbiAgICAgICAgaWYgKGFicyA8IDAuMDQwNDUpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMTIuOTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChzaWduJDEoYykgfHwgMSkgKiBwb3ckOCgoYWJzICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgfVxuXG4gICAgdmFyIHVucGFjayQ0ID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciBwb3ckNyA9IE1hdGgucG93O1xuICAgIHZhciBzaWduID0gTWF0aC5zaWduO1xuXG4gICAgLypcbiAgICAgKiBMKiBbMC4uMTAwXVxuICAgICAqIGEgWy0xMDAuLjEwMF1cbiAgICAgKiBiIFstMTAwLi4xMDBdXG4gICAgICovXG4gICAgdmFyIG9rbGFiMnJnYiQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIGFyZ3MgPSB1bnBhY2skNChhcmdzLCAnbGFiJyk7XG4gICAgICAgIHZhciBMID0gYXJnc1swXTtcbiAgICAgICAgdmFyIGEgPSBhcmdzWzFdO1xuICAgICAgICB2YXIgYiA9IGFyZ3NbMl07XG5cbiAgICAgICAgdmFyIGwgPSBwb3ckNyhMICsgMC4zOTYzMzc3Nzc0ICogYSArIDAuMjE1ODAzNzU3MyAqIGIsIDMpO1xuICAgICAgICB2YXIgbSA9IHBvdyQ3KEwgLSAwLjEwNTU2MTM0NTggKiBhIC0gMC4wNjM4NTQxNzI4ICogYiwgMyk7XG4gICAgICAgIHZhciBzID0gcG93JDcoTCAtIDAuMDg5NDg0MTc3NSAqIGEgLSAxLjI5MTQ4NTU0OCAqIGIsIDMpO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAyNTUgKiBscmdiMnJnYigrNC4wNzY3NDE2NjIxICogbCAtIDMuMzA3NzExNTkxMyAqIG0gKyAwLjIzMDk2OTkyOTIgKiBzKSxcbiAgICAgICAgICAgIDI1NSAqIGxyZ2IycmdiKC0xLjI2ODQzODAwNDYgKiBsICsgMi42MDk3NTc0MDExICogbSAtIDAuMzQxMzE5Mzk2NSAqIHMpLFxuICAgICAgICAgICAgMjU1ICogbHJnYjJyZ2IoLTAuMDA0MTk2MDg2MyAqIGwgLSAwLjcwMzQxODYxNDcgKiBtICsgMS43MDc2MTQ3MDEgKiBzKSxcbiAgICAgICAgICAgIGFyZ3MubGVuZ3RoID4gMyA/IGFyZ3NbM10gOiAxXG4gICAgICAgIF07XG4gICAgfTtcblxuICAgIHZhciBva2xhYjJyZ2JfMSA9IG9rbGFiMnJnYiQxO1xuXG4gICAgZnVuY3Rpb24gbHJnYjJyZ2IoYykge1xuICAgICAgICB2YXIgYWJzID0gTWF0aC5hYnMoYyk7XG4gICAgICAgIGlmIChhYnMgPiAwLjAwMzEzMDgpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2lnbihjKSB8fCAxKSAqICgxLjA1NSAqIHBvdyQ3KGFicywgMSAvIDIuNCkgLSAwLjA1NSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGMgKiAxMi45MjtcbiAgICB9XG5cbiAgICB2YXIgdW5wYWNrJDMgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHR5cGUkOCA9IHV0aWxzLnR5cGU7XG4gICAgdmFyIGNocm9tYSQ2ID0gY2hyb21hXzE7XG4gICAgdmFyIENvbG9yJG8gPSBDb2xvcl8xO1xuICAgIHZhciBpbnB1dCQxID0gaW5wdXQkaDtcblxuICAgIHZhciByZ2Iyb2tsYWIkMSA9IHJnYjJva2xhYl8xO1xuXG4gICAgQ29sb3Ikby5wcm90b3R5cGUub2tsYWIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZ2Iyb2tsYWIkMSh0aGlzLl9yZ2IpO1xuICAgIH07XG5cbiAgICBjaHJvbWEkNi5va2xhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSggQ29sb3IkbywgWyBudWxsIF0uY29uY2F0KCBhcmdzLCBbJ29rbGFiJ10pICkpO1xuICAgIH07XG5cbiAgICBpbnB1dCQxLmZvcm1hdC5va2xhYiA9IG9rbGFiMnJnYl8xO1xuXG4gICAgaW5wdXQkMS5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAzLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayQzKGFyZ3MsICdva2xhYicpO1xuICAgICAgICAgICAgaWYgKHR5cGUkOChhcmdzKSA9PT0gJ2FycmF5JyAmJiBhcmdzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnb2tsYWInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgdW5wYWNrJDIgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIHJnYjJva2xhYiA9IHJnYjJva2xhYl8xO1xuICAgIHZhciBsYWIybGNoID0gbGFiMmxjaF8xO1xuXG4gICAgdmFyIHJnYjJva2xjaCQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHZhciByZWYgPSB1bnBhY2skMihhcmdzLCAncmdiJyk7XG4gICAgICAgIHZhciByID0gcmVmWzBdO1xuICAgICAgICB2YXIgZyA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGIgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IHJnYjJva2xhYihyLCBnLCBiKTtcbiAgICAgICAgdmFyIGwgPSByZWYkMVswXTtcbiAgICAgICAgdmFyIGEgPSByZWYkMVsxXTtcbiAgICAgICAgdmFyIGJfID0gcmVmJDFbMl07XG4gICAgICAgIHJldHVybiBsYWIybGNoKGwsIGEsIGJfKTtcbiAgICB9O1xuXG4gICAgdmFyIHJnYjJva2xjaF8xID0gcmdiMm9rbGNoJDE7XG5cbiAgICB2YXIgdW5wYWNrJDEgPSB1dGlscy51bnBhY2s7XG4gICAgdmFyIGxjaDJsYWIgPSBsY2gybGFiXzE7XG4gICAgdmFyIG9rbGFiMnJnYiA9IG9rbGFiMnJnYl8xO1xuXG4gICAgdmFyIG9rbGNoMnJnYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICBhcmdzID0gdW5wYWNrJDEoYXJncywgJ2xjaCcpO1xuICAgICAgICB2YXIgbCA9IGFyZ3NbMF07XG4gICAgICAgIHZhciBjID0gYXJnc1sxXTtcbiAgICAgICAgdmFyIGggPSBhcmdzWzJdO1xuICAgICAgICB2YXIgcmVmID0gbGNoMmxhYihsLCBjLCBoKTtcbiAgICAgICAgdmFyIEwgPSByZWZbMF07XG4gICAgICAgIHZhciBhID0gcmVmWzFdO1xuICAgICAgICB2YXIgYl8gPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IG9rbGFiMnJnYihMLCBhLCBiXyk7XG4gICAgICAgIHZhciByID0gcmVmJDFbMF07XG4gICAgICAgIHZhciBnID0gcmVmJDFbMV07XG4gICAgICAgIHZhciBiID0gcmVmJDFbMl07XG4gICAgICAgIHJldHVybiBbciwgZywgYiwgYXJncy5sZW5ndGggPiAzID8gYXJnc1szXSA6IDFdO1xuICAgIH07XG5cbiAgICB2YXIgb2tsY2gycmdiXzEgPSBva2xjaDJyZ2I7XG5cbiAgICB2YXIgdW5wYWNrID0gdXRpbHMudW5wYWNrO1xuICAgIHZhciB0eXBlJDcgPSB1dGlscy50eXBlO1xuICAgIHZhciBjaHJvbWEkNSA9IGNocm9tYV8xO1xuICAgIHZhciBDb2xvciRuID0gQ29sb3JfMTtcbiAgICB2YXIgaW5wdXQgPSBpbnB1dCRoO1xuXG4gICAgdmFyIHJnYjJva2xjaCA9IHJnYjJva2xjaF8xO1xuXG4gICAgQ29sb3Ikbi5wcm90b3R5cGUub2tsY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZ2Iyb2tsY2godGhpcy5fcmdiKTtcbiAgICB9O1xuXG4gICAgY2hyb21hJDUub2tsY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoIENvbG9yJG4sIFsgbnVsbCBdLmNvbmNhdCggYXJncywgWydva2xjaCddKSApKTtcbiAgICB9O1xuXG4gICAgaW5wdXQuZm9ybWF0Lm9rbGNoID0gb2tsY2gycmdiXzE7XG5cbiAgICBpbnB1dC5hdXRvZGV0ZWN0LnB1c2goe1xuICAgICAgICBwOiAzLFxuICAgICAgICB0ZXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgICAgICAgYXJncyA9IHVucGFjayhhcmdzLCAnb2tsY2gnKTtcbiAgICAgICAgICAgIGlmICh0eXBlJDcoYXJncykgPT09ICdhcnJheScgJiYgYXJncy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ29rbGNoJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIENvbG9yJG0gPSBDb2xvcl8xO1xuICAgIHZhciB0eXBlJDYgPSB1dGlscy50eXBlO1xuXG4gICAgQ29sb3IkbS5wcm90b3R5cGUuYWxwaGEgPSBmdW5jdGlvbihhLCBtdXRhdGUpIHtcbiAgICAgICAgaWYgKCBtdXRhdGUgPT09IHZvaWQgMCApIG11dGF0ZT1mYWxzZTtcblxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkICYmIHR5cGUkNihhKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChtdXRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZ2JbM10gPSBhO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvciRtKFt0aGlzLl9yZ2JbMF0sIHRoaXMuX3JnYlsxXSwgdGhpcy5fcmdiWzJdLCBhXSwgJ3JnYicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yZ2JbM107XG4gICAgfTtcblxuICAgIHZhciBDb2xvciRsID0gQ29sb3JfMTtcblxuICAgIENvbG9yJGwucHJvdG90eXBlLmNsaXBwZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JnYi5fY2xpcHBlZCB8fCBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIENvbG9yJGsgPSBDb2xvcl8xO1xuICAgIHZhciBMQUJfQ09OU1RBTlRTJDEgPSBsYWJDb25zdGFudHM7XG5cbiAgICBDb2xvciRrLnByb3RvdHlwZS5kYXJrZW4gPSBmdW5jdGlvbihhbW91bnQpIHtcbiAgICBcdGlmICggYW1vdW50ID09PSB2b2lkIDAgKSBhbW91bnQ9MTtcblxuICAgIFx0dmFyIG1lID0gdGhpcztcbiAgICBcdHZhciBsYWIgPSBtZS5sYWIoKTtcbiAgICBcdGxhYlswXSAtPSBMQUJfQ09OU1RBTlRTJDEuS24gKiBhbW91bnQ7XG4gICAgXHRyZXR1cm4gbmV3IENvbG9yJGsobGFiLCAnbGFiJykuYWxwaGEobWUuYWxwaGEoKSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIENvbG9yJGsucHJvdG90eXBlLmJyaWdodGVuID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgXHRpZiAoIGFtb3VudCA9PT0gdm9pZCAwICkgYW1vdW50PTE7XG5cbiAgICBcdHJldHVybiB0aGlzLmRhcmtlbigtYW1vdW50KTtcbiAgICB9O1xuXG4gICAgQ29sb3Ikay5wcm90b3R5cGUuZGFya2VyID0gQ29sb3Ikay5wcm90b3R5cGUuZGFya2VuO1xuICAgIENvbG9yJGsucHJvdG90eXBlLmJyaWdodGVyID0gQ29sb3Ikay5wcm90b3R5cGUuYnJpZ2h0ZW47XG5cbiAgICB2YXIgQ29sb3IkaiA9IENvbG9yXzE7XG5cbiAgICBDb2xvciRqLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobWMpIHtcbiAgICAgICAgdmFyIHJlZiA9IG1jLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBtb2RlID0gcmVmWzBdO1xuICAgICAgICB2YXIgY2hhbm5lbCA9IHJlZlsxXTtcbiAgICAgICAgdmFyIHNyYyA9IHRoaXNbbW9kZV0oKTtcbiAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIHZhciBpID0gbW9kZS5pbmRleE9mKGNoYW5uZWwpIC0gKG1vZGUuc3Vic3RyKDAsIDIpID09PSAnb2snID8gMiA6IDApO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkgeyByZXR1cm4gc3JjW2ldOyB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwidW5rbm93biBjaGFubmVsIFwiICsgY2hhbm5lbCArIFwiIGluIG1vZGUgXCIgKyBtb2RlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3JjO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBDb2xvciRpID0gQ29sb3JfMTtcbiAgICB2YXIgdHlwZSQ1ID0gdXRpbHMudHlwZTtcbiAgICB2YXIgcG93JDYgPSBNYXRoLnBvdztcblxuICAgIHZhciBFUFMgPSAxZS03O1xuICAgIHZhciBNQVhfSVRFUiA9IDIwO1xuXG4gICAgQ29sb3IkaS5wcm90b3R5cGUubHVtaW5hbmNlID0gZnVuY3Rpb24obHVtKSB7XG4gICAgICAgIGlmIChsdW0gIT09IHVuZGVmaW5lZCAmJiB0eXBlJDUobHVtKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChsdW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gcHVyZSBibGFja1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IkaShbMCwwLDAsdGhpcy5fcmdiWzNdXSwgJ3JnYicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGx1bSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiBwdXJlIHdoaXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvciRpKFsyNTUsMjU1LDI1NSx0aGlzLl9yZ2JbM11dLCAncmdiJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb21wdXRlIG5ldyBjb2xvciB1c2luZy4uLlxuICAgICAgICAgICAgdmFyIGN1cl9sdW0gPSB0aGlzLmx1bWluYW5jZSgpO1xuICAgICAgICAgICAgdmFyIG1vZGUgPSAncmdiJztcbiAgICAgICAgICAgIHZhciBtYXhfaXRlciA9IE1BWF9JVEVSO1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IGZ1bmN0aW9uIChsb3csIGhpZ2gpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWlkID0gbG93LmludGVycG9sYXRlKGhpZ2gsIDAuNSwgbW9kZSk7XG4gICAgICAgICAgICAgICAgdmFyIGxtID0gbWlkLmx1bWluYW5jZSgpO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhsdW0gLSBsbSkgPCBFUFMgfHwgIW1heF9pdGVyLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgZW5vdWdoXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBsbSA+IGx1bSA/IHRlc3QobG93LCBtaWQpIDogdGVzdChtaWQsIGhpZ2gpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJnYiA9IChjdXJfbHVtID4gbHVtID8gdGVzdChuZXcgQ29sb3IkaShbMCwwLDBdKSwgdGhpcykgOiB0ZXN0KHRoaXMsIG5ldyBDb2xvciRpKFsyNTUsMjU1LDI1NV0pKSkucmdiKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yJGkocmdiLmNvbmNhdCggW3RoaXMuX3JnYlszXV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmdiMmx1bWluYW5jZS5hcHBseSh2b2lkIDAsICh0aGlzLl9yZ2IpLnNsaWNlKDAsMykpO1xuICAgIH07XG5cblxuICAgIHZhciByZ2IybHVtaW5hbmNlID0gZnVuY3Rpb24gKHIsZyxiKSB7XG4gICAgICAgIC8vIHJlbGF0aXZlIGx1bWluYW5jZVxuICAgICAgICAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICAgICAgICByID0gbHVtaW5hbmNlX3gocik7XG4gICAgICAgIGcgPSBsdW1pbmFuY2VfeChnKTtcbiAgICAgICAgYiA9IGx1bWluYW5jZV94KGIpO1xuICAgICAgICByZXR1cm4gMC4yMTI2ICogciArIDAuNzE1MiAqIGcgKyAwLjA3MjIgKiBiO1xuICAgIH07XG5cbiAgICB2YXIgbHVtaW5hbmNlX3ggPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICB4IC89IDI1NTtcbiAgICAgICAgcmV0dXJuIHggPD0gMC4wMzkyOCA/IHgvMTIuOTIgOiBwb3ckNigoeCswLjA1NSkvMS4wNTUsIDIuNCk7XG4gICAgfTtcblxuICAgIHZhciBpbnRlcnBvbGF0b3IkMSA9IHt9O1xuXG4gICAgdmFyIENvbG9yJGggPSBDb2xvcl8xO1xuICAgIHZhciB0eXBlJDQgPSB1dGlscy50eXBlO1xuICAgIHZhciBpbnRlcnBvbGF0b3IgPSBpbnRlcnBvbGF0b3IkMTtcblxuICAgIHZhciBtaXgkMSA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIGlmICggZiA9PT0gdm9pZCAwICkgZj0wLjU7XG4gICAgICAgIHZhciByZXN0ID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAzO1xuICAgICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHJlc3RbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAzIF07XG5cbiAgICAgICAgdmFyIG1vZGUgPSByZXN0WzBdIHx8ICdscmdiJztcbiAgICAgICAgaWYgKCFpbnRlcnBvbGF0b3JbbW9kZV0gJiYgIXJlc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBmYWxsIGJhY2sgdG8gdGhlIGZpcnN0IHN1cHBvcnRlZCBtb2RlXG4gICAgICAgICAgICBtb2RlID0gT2JqZWN0LmtleXMoaW50ZXJwb2xhdG9yKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWludGVycG9sYXRvclttb2RlXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcImludGVycG9sYXRpb24gbW9kZSBcIiArIG1vZGUgKyBcIiBpcyBub3QgZGVmaW5lZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUkNChjb2wxKSAhPT0gJ29iamVjdCcpIHsgY29sMSA9IG5ldyBDb2xvciRoKGNvbDEpOyB9XG4gICAgICAgIGlmICh0eXBlJDQoY29sMikgIT09ICdvYmplY3QnKSB7IGNvbDIgPSBuZXcgQ29sb3IkaChjb2wyKTsgfVxuICAgICAgICByZXR1cm4gaW50ZXJwb2xhdG9yW21vZGVdKGNvbDEsIGNvbDIsIGYpXG4gICAgICAgICAgICAuYWxwaGEoY29sMS5hbHBoYSgpICsgZiAqIChjb2wyLmFscGhhKCkgLSBjb2wxLmFscGhhKCkpKTtcbiAgICB9O1xuXG4gICAgdmFyIENvbG9yJGcgPSBDb2xvcl8xO1xuICAgIHZhciBtaXggPSBtaXgkMTtcblxuICAgIENvbG9yJGcucHJvdG90eXBlLm1peCA9XG4gICAgQ29sb3IkZy5wcm90b3R5cGUuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihjb2wyLCBmKSB7XG4gICAgXHRpZiAoIGYgPT09IHZvaWQgMCApIGY9MC41O1xuICAgIFx0dmFyIHJlc3QgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gICAgXHR3aGlsZSAoIGxlbi0tID4gMCApIHJlc3RbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAyIF07XG5cbiAgICBcdHJldHVybiBtaXguYXBwbHkodm9pZCAwLCBbIHRoaXMsIGNvbDIsIGYgXS5jb25jYXQoIHJlc3QgKSk7XG4gICAgfTtcblxuICAgIHZhciBDb2xvciRmID0gQ29sb3JfMTtcblxuICAgIENvbG9yJGYucHJvdG90eXBlLnByZW11bHRpcGx5ID0gZnVuY3Rpb24obXV0YXRlKSB7XG4gICAgXHRpZiAoIG11dGF0ZSA9PT0gdm9pZCAwICkgbXV0YXRlPWZhbHNlO1xuXG4gICAgXHR2YXIgcmdiID0gdGhpcy5fcmdiO1xuICAgIFx0dmFyIGEgPSByZ2JbM107XG4gICAgXHRpZiAobXV0YXRlKSB7XG4gICAgXHRcdHRoaXMuX3JnYiA9IFtyZ2JbMF0qYSwgcmdiWzFdKmEsIHJnYlsyXSphLCBhXTtcbiAgICBcdFx0cmV0dXJuIHRoaXM7XG4gICAgXHR9IGVsc2Uge1xuICAgIFx0XHRyZXR1cm4gbmV3IENvbG9yJGYoW3JnYlswXSphLCByZ2JbMV0qYSwgcmdiWzJdKmEsIGFdLCAncmdiJyk7XG4gICAgXHR9XG4gICAgfTtcblxuICAgIHZhciBDb2xvciRlID0gQ29sb3JfMTtcbiAgICB2YXIgTEFCX0NPTlNUQU5UUyA9IGxhYkNvbnN0YW50cztcblxuICAgIENvbG9yJGUucHJvdG90eXBlLnNhdHVyYXRlID0gZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgXHRpZiAoIGFtb3VudCA9PT0gdm9pZCAwICkgYW1vdW50PTE7XG5cbiAgICBcdHZhciBtZSA9IHRoaXM7XG4gICAgXHR2YXIgbGNoID0gbWUubGNoKCk7XG4gICAgXHRsY2hbMV0gKz0gTEFCX0NPTlNUQU5UUy5LbiAqIGFtb3VudDtcbiAgICBcdGlmIChsY2hbMV0gPCAwKSB7IGxjaFsxXSA9IDA7IH1cbiAgICBcdHJldHVybiBuZXcgQ29sb3IkZShsY2gsICdsY2gnKS5hbHBoYShtZS5hbHBoYSgpLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgQ29sb3IkZS5wcm90b3R5cGUuZGVzYXR1cmF0ZSA9IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgIFx0aWYgKCBhbW91bnQgPT09IHZvaWQgMCApIGFtb3VudD0xO1xuXG4gICAgXHRyZXR1cm4gdGhpcy5zYXR1cmF0ZSgtYW1vdW50KTtcbiAgICB9O1xuXG4gICAgdmFyIENvbG9yJGQgPSBDb2xvcl8xO1xuICAgIHZhciB0eXBlJDMgPSB1dGlscy50eXBlO1xuXG4gICAgQ29sb3IkZC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG1jLCB2YWx1ZSwgbXV0YXRlKSB7XG4gICAgICAgIGlmICggbXV0YXRlID09PSB2b2lkIDAgKSBtdXRhdGUgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcmVmID0gbWMuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIG1vZGUgPSByZWZbMF07XG4gICAgICAgIHZhciBjaGFubmVsID0gcmVmWzFdO1xuICAgICAgICB2YXIgc3JjID0gdGhpc1ttb2RlXSgpO1xuICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtb2RlLmluZGV4T2YoY2hhbm5lbCkgLSAobW9kZS5zdWJzdHIoMCwgMikgPT09ICdvaycgPyAyIDogMCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUkMyh2YWx1ZSkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1tpXSArPSArdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNbaV0gKz0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjW2ldICo9ICt2YWx1ZS5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNbaV0gLz0gK3ZhbHVlLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjW2ldID0gK3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlJDModmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzcmNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bnN1cHBvcnRlZCB2YWx1ZSBmb3IgQ29sb3Iuc2V0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgb3V0ID0gbmV3IENvbG9yJGQoc3JjLCBtb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JnYiA9IG91dC5fcmdiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJ1bmtub3duIGNoYW5uZWwgXCIgKyBjaGFubmVsICsgXCIgaW4gbW9kZSBcIiArIG1vZGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcmM7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIENvbG9yJGMgPSBDb2xvcl8xO1xuXG4gICAgdmFyIHJnYiA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIHZhciB4eXowID0gY29sMS5fcmdiO1xuICAgICAgICB2YXIgeHl6MSA9IGNvbDIuX3JnYjtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciRjKFxuICAgICAgICAgICAgeHl6MFswXSArIGYgKiAoeHl6MVswXS14eXowWzBdKSxcbiAgICAgICAgICAgIHh5ejBbMV0gKyBmICogKHh5ejFbMV0teHl6MFsxXSksXG4gICAgICAgICAgICB4eXowWzJdICsgZiAqICh4eXoxWzJdLXh5ejBbMl0pLFxuICAgICAgICAgICAgJ3JnYidcbiAgICAgICAgKVxuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IkMS5yZ2IgPSByZ2I7XG5cbiAgICB2YXIgQ29sb3IkYiA9IENvbG9yXzE7XG4gICAgdmFyIHNxcnQkMiA9IE1hdGguc3FydDtcbiAgICB2YXIgcG93JDUgPSBNYXRoLnBvdztcblxuICAgIHZhciBscmdiID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICAgICAgdmFyIHJlZiA9IGNvbDEuX3JnYjtcbiAgICAgICAgdmFyIHgxID0gcmVmWzBdO1xuICAgICAgICB2YXIgeTEgPSByZWZbMV07XG4gICAgICAgIHZhciB6MSA9IHJlZlsyXTtcbiAgICAgICAgdmFyIHJlZiQxID0gY29sMi5fcmdiO1xuICAgICAgICB2YXIgeDIgPSByZWYkMVswXTtcbiAgICAgICAgdmFyIHkyID0gcmVmJDFbMV07XG4gICAgICAgIHZhciB6MiA9IHJlZiQxWzJdO1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yJGIoXG4gICAgICAgICAgICBzcXJ0JDIocG93JDUoeDEsMikgKiAoMS1mKSArIHBvdyQ1KHgyLDIpICogZiksXG4gICAgICAgICAgICBzcXJ0JDIocG93JDUoeTEsMikgKiAoMS1mKSArIHBvdyQ1KHkyLDIpICogZiksXG4gICAgICAgICAgICBzcXJ0JDIocG93JDUoejEsMikgKiAoMS1mKSArIHBvdyQ1KHoyLDIpICogZiksXG4gICAgICAgICAgICAncmdiJ1xuICAgICAgICApXG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmxyZ2IgPSBscmdiO1xuXG4gICAgdmFyIENvbG9yJGEgPSBDb2xvcl8xO1xuXG4gICAgdmFyIGxhYiA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIHZhciB4eXowID0gY29sMS5sYWIoKTtcbiAgICAgICAgdmFyIHh5ejEgPSBjb2wyLmxhYigpO1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yJGEoXG4gICAgICAgICAgICB4eXowWzBdICsgZiAqICh4eXoxWzBdLXh5ejBbMF0pLFxuICAgICAgICAgICAgeHl6MFsxXSArIGYgKiAoeHl6MVsxXS14eXowWzFdKSxcbiAgICAgICAgICAgIHh5ejBbMl0gKyBmICogKHh5ejFbMl0teHl6MFsyXSksXG4gICAgICAgICAgICAnbGFiJ1xuICAgICAgICApXG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmxhYiA9IGxhYjtcblxuICAgIHZhciBDb2xvciQ5ID0gQ29sb3JfMTtcblxuICAgIHZhciBfaHN4ID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYsIG0pIHtcbiAgICAgICAgdmFyIGFzc2lnbiwgYXNzaWduJDE7XG5cbiAgICAgICAgdmFyIHh5ejAsIHh5ejE7XG4gICAgICAgIGlmIChtID09PSAnaHNsJykge1xuICAgICAgICAgICAgeHl6MCA9IGNvbDEuaHNsKCk7XG4gICAgICAgICAgICB4eXoxID0gY29sMi5oc2woKTtcbiAgICAgICAgfSBlbHNlIGlmIChtID09PSAnaHN2Jykge1xuICAgICAgICAgICAgeHl6MCA9IGNvbDEuaHN2KCk7XG4gICAgICAgICAgICB4eXoxID0gY29sMi5oc3YoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtID09PSAnaGNnJykge1xuICAgICAgICAgICAgeHl6MCA9IGNvbDEuaGNnKCk7XG4gICAgICAgICAgICB4eXoxID0gY29sMi5oY2coKTtcbiAgICAgICAgfSBlbHNlIGlmIChtID09PSAnaHNpJykge1xuICAgICAgICAgICAgeHl6MCA9IGNvbDEuaHNpKCk7XG4gICAgICAgICAgICB4eXoxID0gY29sMi5oc2koKTtcbiAgICAgICAgfSBlbHNlIGlmIChtID09PSAnbGNoJyB8fCBtID09PSAnaGNsJykge1xuICAgICAgICAgICAgbSA9ICdoY2wnO1xuICAgICAgICAgICAgeHl6MCA9IGNvbDEuaGNsKCk7XG4gICAgICAgICAgICB4eXoxID0gY29sMi5oY2woKTtcbiAgICAgICAgfSBlbHNlIGlmIChtID09PSAnb2tsY2gnKSB7XG4gICAgICAgICAgICB4eXowID0gY29sMS5va2xjaCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHh5ejEgPSBjb2wyLm9rbGNoKCkucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGh1ZTAsIGh1ZTEsIHNhdDAsIHNhdDEsIGxidjAsIGxidjE7XG4gICAgICAgIGlmIChtLnN1YnN0cigwLCAxKSA9PT0gJ2gnIHx8IG0gPT09ICdva2xjaCcpIHtcbiAgICAgICAgICAgIChhc3NpZ24gPSB4eXowLCBodWUwID0gYXNzaWduWzBdLCBzYXQwID0gYXNzaWduWzFdLCBsYnYwID0gYXNzaWduWzJdKTtcbiAgICAgICAgICAgIChhc3NpZ24kMSA9IHh5ejEsIGh1ZTEgPSBhc3NpZ24kMVswXSwgc2F0MSA9IGFzc2lnbiQxWzFdLCBsYnYxID0gYXNzaWduJDFbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNhdCwgaHVlLCBsYnYsIGRoO1xuXG4gICAgICAgIGlmICghaXNOYU4oaHVlMCkgJiYgIWlzTmFOKGh1ZTEpKSB7XG4gICAgICAgICAgICAvLyBib3RoIGNvbG9ycyBoYXZlIGh1ZVxuICAgICAgICAgICAgaWYgKGh1ZTEgPiBodWUwICYmIGh1ZTEgLSBodWUwID4gMTgwKSB7XG4gICAgICAgICAgICAgICAgZGggPSBodWUxIC0gKGh1ZTAgKyAzNjApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChodWUxIDwgaHVlMCAmJiBodWUwIC0gaHVlMSA+IDE4MCkge1xuICAgICAgICAgICAgICAgIGRoID0gaHVlMSArIDM2MCAtIGh1ZTA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRoID0gaHVlMSAtIGh1ZTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodWUgPSBodWUwICsgZiAqIGRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihodWUwKSkge1xuICAgICAgICAgICAgaHVlID0gaHVlMDtcbiAgICAgICAgICAgIGlmICgobGJ2MSA9PSAxIHx8IGxidjEgPT0gMCkgJiYgbSAhPSAnaHN2JykgeyBzYXQgPSBzYXQwOyB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKGh1ZTEpKSB7XG4gICAgICAgICAgICBodWUgPSBodWUxO1xuICAgICAgICAgICAgaWYgKChsYnYwID09IDEgfHwgbGJ2MCA9PSAwKSAmJiBtICE9ICdoc3YnKSB7IHNhdCA9IHNhdDE7IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh1ZSA9IE51bWJlci5OYU47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2F0ID09PSB1bmRlZmluZWQpIHsgc2F0ID0gc2F0MCArIGYgKiAoc2F0MSAtIHNhdDApOyB9XG4gICAgICAgIGxidiA9IGxidjAgKyBmICogKGxidjEgLSBsYnYwKTtcbiAgICAgICAgcmV0dXJuIG0gPT09ICdva2xjaCcgPyBuZXcgQ29sb3IkOShbbGJ2LCBzYXQsIGh1ZV0sIG0pIDogbmV3IENvbG9yJDkoW2h1ZSwgc2F0LCBsYnZdLCBtKTtcbiAgICB9O1xuXG4gICAgdmFyIGludGVycG9sYXRlX2hzeCQ1ID0gX2hzeDtcblxuICAgIHZhciBsY2ggPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgIFx0cmV0dXJuIGludGVycG9sYXRlX2hzeCQ1KGNvbDEsIGNvbDIsIGYsICdsY2gnKTtcbiAgICB9O1xuXG4gICAgLy8gcmVnaXN0ZXIgaW50ZXJwb2xhdG9yXG4gICAgaW50ZXJwb2xhdG9yJDEubGNoID0gbGNoO1xuICAgIGludGVycG9sYXRvciQxLmhjbCA9IGxjaDtcblxuICAgIHZhciBDb2xvciQ4ID0gQ29sb3JfMTtcblxuICAgIHZhciBudW0gPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgICAgICB2YXIgYzEgPSBjb2wxLm51bSgpO1xuICAgICAgICB2YXIgYzIgPSBjb2wyLm51bSgpO1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yJDgoYzEgKyBmICogKGMyLWMxKSwgJ251bScpXG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLm51bSA9IG51bTtcblxuICAgIHZhciBpbnRlcnBvbGF0ZV9oc3gkNCA9IF9oc3g7XG5cbiAgICB2YXIgaGNnID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICBcdHJldHVybiBpbnRlcnBvbGF0ZV9oc3gkNChjb2wxLCBjb2wyLCBmLCAnaGNnJyk7XG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmhjZyA9IGhjZztcblxuICAgIHZhciBpbnRlcnBvbGF0ZV9oc3gkMyA9IF9oc3g7XG5cbiAgICB2YXIgaHNpID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICBcdHJldHVybiBpbnRlcnBvbGF0ZV9oc3gkMyhjb2wxLCBjb2wyLCBmLCAnaHNpJyk7XG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmhzaSA9IGhzaTtcblxuICAgIHZhciBpbnRlcnBvbGF0ZV9oc3gkMiA9IF9oc3g7XG5cbiAgICB2YXIgaHNsID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICBcdHJldHVybiBpbnRlcnBvbGF0ZV9oc3gkMihjb2wxLCBjb2wyLCBmLCAnaHNsJyk7XG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmhzbCA9IGhzbDtcblxuICAgIHZhciBpbnRlcnBvbGF0ZV9oc3gkMSA9IF9oc3g7XG5cbiAgICB2YXIgaHN2ID0gZnVuY3Rpb24gKGNvbDEsIGNvbDIsIGYpIHtcbiAgICBcdHJldHVybiBpbnRlcnBvbGF0ZV9oc3gkMShjb2wxLCBjb2wyLCBmLCAnaHN2Jyk7XG4gICAgfTtcblxuICAgIC8vIHJlZ2lzdGVyIGludGVycG9sYXRvclxuICAgIGludGVycG9sYXRvciQxLmhzdiA9IGhzdjtcblxuICAgIHZhciBDb2xvciQ3ID0gQ29sb3JfMTtcblxuICAgIHZhciBva2xhYiA9IGZ1bmN0aW9uIChjb2wxLCBjb2wyLCBmKSB7XG4gICAgICAgIHZhciB4eXowID0gY29sMS5va2xhYigpO1xuICAgICAgICB2YXIgeHl6MSA9IGNvbDIub2tsYWIoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciQ3KFxuICAgICAgICAgICAgeHl6MFswXSArIGYgKiAoeHl6MVswXSAtIHh5ejBbMF0pLFxuICAgICAgICAgICAgeHl6MFsxXSArIGYgKiAoeHl6MVsxXSAtIHh5ejBbMV0pLFxuICAgICAgICAgICAgeHl6MFsyXSArIGYgKiAoeHl6MVsyXSAtIHh5ejBbMl0pLFxuICAgICAgICAgICAgJ29rbGFiJ1xuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IkMS5va2xhYiA9IG9rbGFiO1xuXG4gICAgdmFyIGludGVycG9sYXRlX2hzeCA9IF9oc3g7XG5cbiAgICB2YXIgb2tsY2ggPSBmdW5jdGlvbiAoY29sMSwgY29sMiwgZikge1xuICAgICAgICByZXR1cm4gaW50ZXJwb2xhdGVfaHN4KGNvbDEsIGNvbDIsIGYsICdva2xjaCcpO1xuICAgIH07XG5cbiAgICAvLyByZWdpc3RlciBpbnRlcnBvbGF0b3JcbiAgICBpbnRlcnBvbGF0b3IkMS5va2xjaCA9IG9rbGNoO1xuXG4gICAgdmFyIENvbG9yJDYgPSBDb2xvcl8xO1xuICAgIHZhciBjbGlwX3JnYiQxID0gdXRpbHMuY2xpcF9yZ2I7XG4gICAgdmFyIHBvdyQ0ID0gTWF0aC5wb3c7XG4gICAgdmFyIHNxcnQkMSA9IE1hdGguc3FydDtcbiAgICB2YXIgUEkkMSA9IE1hdGguUEk7XG4gICAgdmFyIGNvcyQyID0gTWF0aC5jb3M7XG4gICAgdmFyIHNpbiQyID0gTWF0aC5zaW47XG4gICAgdmFyIGF0YW4yJDEgPSBNYXRoLmF0YW4yO1xuXG4gICAgdmFyIGF2ZXJhZ2UgPSBmdW5jdGlvbiAoY29sb3JzLCBtb2RlLCB3ZWlnaHRzKSB7XG4gICAgICAgIGlmICggbW9kZSA9PT0gdm9pZCAwICkgbW9kZT0nbHJnYic7XG4gICAgICAgIGlmICggd2VpZ2h0cyA9PT0gdm9pZCAwICkgd2VpZ2h0cz1udWxsO1xuXG4gICAgICAgIHZhciBsID0gY29sb3JzLmxlbmd0aDtcbiAgICAgICAgaWYgKCF3ZWlnaHRzKSB7IHdlaWdodHMgPSBBcnJheS5mcm9tKG5ldyBBcnJheShsKSkubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0pOyB9XG4gICAgICAgIC8vIG5vcm1hbGl6ZSB3ZWlnaHRzXG4gICAgICAgIHZhciBrID0gbCAvIHdlaWdodHMucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KTtcbiAgICAgICAgd2VpZ2h0cy5mb3JFYWNoKGZ1bmN0aW9uICh3LGkpIHsgd2VpZ2h0c1tpXSAqPSBrOyB9KTtcbiAgICAgICAgLy8gY29udmVydCBjb2xvcnMgdG8gQ29sb3Igb2JqZWN0c1xuICAgICAgICBjb2xvcnMgPSBjb2xvcnMubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBuZXcgQ29sb3IkNihjKTsgfSk7XG4gICAgICAgIGlmIChtb2RlID09PSAnbHJnYicpIHtcbiAgICAgICAgICAgIHJldHVybiBfYXZlcmFnZV9scmdiKGNvbG9ycywgd2VpZ2h0cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3QgPSBjb2xvcnMuc2hpZnQoKTtcbiAgICAgICAgdmFyIHh5eiA9IGZpcnN0LmdldChtb2RlKTtcbiAgICAgICAgdmFyIGNudCA9IFtdO1xuICAgICAgICB2YXIgZHggPSAwO1xuICAgICAgICB2YXIgZHkgPSAwO1xuICAgICAgICAvLyBpbml0aWFsIGNvbG9yXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTx4eXoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHh5eltpXSA9ICh4eXpbaV0gfHwgMCkgKiB3ZWlnaHRzWzBdO1xuICAgICAgICAgICAgY250LnB1c2goaXNOYU4oeHl6W2ldKSA/IDAgOiB3ZWlnaHRzWzBdKTtcbiAgICAgICAgICAgIGlmIChtb2RlLmNoYXJBdChpKSA9PT0gJ2gnICYmICFpc05hTih4eXpbaV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIEEgPSB4eXpbaV0gLyAxODAgKiBQSSQxO1xuICAgICAgICAgICAgICAgIGR4ICs9IGNvcyQyKEEpICogd2VpZ2h0c1swXTtcbiAgICAgICAgICAgICAgICBkeSArPSBzaW4kMihBKSAqIHdlaWdodHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxwaGEgPSBmaXJzdC5hbHBoYSgpICogd2VpZ2h0c1swXTtcbiAgICAgICAgY29sb3JzLmZvckVhY2goZnVuY3Rpb24gKGMsY2kpIHtcbiAgICAgICAgICAgIHZhciB4eXoyID0gYy5nZXQobW9kZSk7XG4gICAgICAgICAgICBhbHBoYSArPSBjLmFscGhhKCkgKiB3ZWlnaHRzW2NpKzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHh5ei5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oeHl6MltpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY250W2ldICs9IHdlaWdodHNbY2krMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlLmNoYXJBdChpKSA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgQSA9IHh5ejJbaV0gLyAxODAgKiBQSSQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHggKz0gY29zJDIoQSkgKiB3ZWlnaHRzW2NpKzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgKz0gc2luJDIoQSkgKiB3ZWlnaHRzW2NpKzFdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgeHl6W2ldICs9IHh5ejJbaV0gKiB3ZWlnaHRzW2NpKzFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpJDE9MDsgaSQxPHh5ei5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgICAgICBpZiAobW9kZS5jaGFyQXQoaSQxKSA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgdmFyIEEkMSA9IGF0YW4yJDEoZHkgLyBjbnRbaSQxXSwgZHggLyBjbnRbaSQxXSkgLyBQSSQxICogMTgwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChBJDEgPCAwKSB7IEEkMSArPSAzNjA7IH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoQSQxID49IDM2MCkgeyBBJDEgLT0gMzYwOyB9XG4gICAgICAgICAgICAgICAgeHl6W2kkMV0gPSBBJDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHh5eltpJDFdID0geHl6W2kkMV0vY250W2kkMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWxwaGEgLz0gbDtcbiAgICAgICAgcmV0dXJuIChuZXcgQ29sb3IkNih4eXosIG1vZGUpKS5hbHBoYShhbHBoYSA+IDAuOTk5OTkgPyAxIDogYWxwaGEsIHRydWUpO1xuICAgIH07XG5cblxuICAgIHZhciBfYXZlcmFnZV9scmdiID0gZnVuY3Rpb24gKGNvbG9ycywgd2VpZ2h0cykge1xuICAgICAgICB2YXIgbCA9IGNvbG9ycy5sZW5ndGg7XG4gICAgICAgIHZhciB4eXogPSBbMCwwLDAsMF07XG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvbCA9IGNvbG9yc1tpXTtcbiAgICAgICAgICAgIHZhciBmID0gd2VpZ2h0c1tpXSAvIGw7XG4gICAgICAgICAgICB2YXIgcmdiID0gY29sLl9yZ2I7XG4gICAgICAgICAgICB4eXpbMF0gKz0gcG93JDQocmdiWzBdLDIpICogZjtcbiAgICAgICAgICAgIHh5elsxXSArPSBwb3ckNChyZ2JbMV0sMikgKiBmO1xuICAgICAgICAgICAgeHl6WzJdICs9IHBvdyQ0KHJnYlsyXSwyKSAqIGY7XG4gICAgICAgICAgICB4eXpbM10gKz0gcmdiWzNdICogZjtcbiAgICAgICAgfVxuICAgICAgICB4eXpbMF0gPSBzcXJ0JDEoeHl6WzBdKTtcbiAgICAgICAgeHl6WzFdID0gc3FydCQxKHh5elsxXSk7XG4gICAgICAgIHh5elsyXSA9IHNxcnQkMSh4eXpbMl0pO1xuICAgICAgICBpZiAoeHl6WzNdID4gMC45OTk5OTk5KSB7IHh5elszXSA9IDE7IH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciQ2KGNsaXBfcmdiJDEoeHl6KSk7XG4gICAgfTtcblxuICAgIC8vIG1pbmltYWwgbXVsdGktcHVycG9zZSBpbnRlcmZhY2VcblxuICAgIC8vIEByZXF1aXJlcyB1dGlscyBjb2xvciBhbmFseXplXG5cbiAgICB2YXIgY2hyb21hJDQgPSBjaHJvbWFfMTtcbiAgICB2YXIgdHlwZSQyID0gdXRpbHMudHlwZTtcblxuICAgIHZhciBwb3ckMyA9IE1hdGgucG93O1xuXG4gICAgdmFyIHNjYWxlJDIgPSBmdW5jdGlvbihjb2xvcnMpIHtcblxuICAgICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgX21vZGUgPSAncmdiJztcbiAgICAgICAgdmFyIF9uYWNvbCA9IGNocm9tYSQ0KCcjY2NjJyk7XG4gICAgICAgIHZhciBfc3ByZWFkID0gMDtcbiAgICAgICAgLy8gY29uc3QgX2ZpeGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBfZG9tYWluID0gWzAsIDFdO1xuICAgICAgICB2YXIgX3BvcyA9IFtdO1xuICAgICAgICB2YXIgX3BhZGRpbmcgPSBbMCwwXTtcbiAgICAgICAgdmFyIF9jbGFzc2VzID0gZmFsc2U7XG4gICAgICAgIHZhciBfY29sb3JzID0gW107XG4gICAgICAgIHZhciBfb3V0ID0gZmFsc2U7XG4gICAgICAgIHZhciBfbWluID0gMDtcbiAgICAgICAgdmFyIF9tYXggPSAxO1xuICAgICAgICB2YXIgX2NvcnJlY3RMaWdodG5lc3MgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9jb2xvckNhY2hlID0ge307XG4gICAgICAgIHZhciBfdXNlQ2FjaGUgPSB0cnVlO1xuICAgICAgICB2YXIgX2dhbW1hID0gMTtcblxuICAgICAgICAvLyBwcml2YXRlIG1ldGhvZHNcblxuICAgICAgICB2YXIgc2V0Q29sb3JzID0gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgICAgICAgICBjb2xvcnMgPSBjb2xvcnMgfHwgWycjZmZmJywgJyMwMDAnXTtcbiAgICAgICAgICAgIGlmIChjb2xvcnMgJiYgdHlwZSQyKGNvbG9ycykgPT09ICdzdHJpbmcnICYmIGNocm9tYSQ0LmJyZXdlciAmJlxuICAgICAgICAgICAgICAgIGNocm9tYSQ0LmJyZXdlcltjb2xvcnMudG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICBjb2xvcnMgPSBjaHJvbWEkNC5icmV3ZXJbY29sb3JzLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGUkMihjb2xvcnMpID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIHNpbmdsZSBjb2xvclxuICAgICAgICAgICAgICAgIGlmIChjb2xvcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9ycyA9IFtjb2xvcnNbMF0sIGNvbG9yc1swXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIG1ha2UgYSBjb3B5IG9mIHRoZSBjb2xvcnNcbiAgICAgICAgICAgICAgICBjb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0byBjaHJvbWEgY2xhc3Nlc1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGM9MDsgYzxjb2xvcnMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzW2NdID0gY2hyb21hJDQoY29sb3JzW2NdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYXV0by1maWxsIGNvbG9yIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgX3Bvcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGMkMT0wOyBjJDE8Y29sb3JzLmxlbmd0aDsgYyQxKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX3Bvcy5wdXNoKGMkMS8oY29sb3JzLmxlbmd0aC0xKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgcmV0dXJuIF9jb2xvcnMgPSBjb2xvcnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldENsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChfY2xhc3NlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBfY2xhc3Nlcy5sZW5ndGgtMTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBuICYmIHZhbHVlID49IF9jbGFzc2VzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGktMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0TWFwTGlnaHRuZXNzID0gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQ7IH07XG4gICAgICAgIHZhciB0TWFwRG9tYWluID0gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQ7IH07XG5cbiAgICAgICAgLy8gY29uc3QgY2xhc3NpZnlWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICBsZXQgdmFsID0gdmFsdWU7XG4gICAgICAgIC8vICAgICBpZiAoX2NsYXNzZXMubGVuZ3RoID4gMikge1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IG4gPSBfY2xhc3Nlcy5sZW5ndGgtMTtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBpID0gZ2V0Q2xhc3ModmFsdWUpO1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IG1pbmMgPSBfY2xhc3Nlc1swXSArICgoX2NsYXNzZXNbMV0tX2NsYXNzZXNbMF0pICogKDAgKyAoX3NwcmVhZCAqIDAuNSkpKTsgIC8vIGNlbnRlciBvZiAxc3QgY2xhc3NcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBtYXhjID0gX2NsYXNzZXNbbi0xXSArICgoX2NsYXNzZXNbbl0tX2NsYXNzZXNbbi0xXSkgKiAoMSAtIChfc3ByZWFkICogMC41KSkpOyAgLy8gY2VudGVyIG9mIGxhc3QgY2xhc3NcbiAgICAgICAgLy8gICAgICAgICB2YWwgPSBfbWluICsgKCgoKF9jbGFzc2VzW2ldICsgKChfY2xhc3Nlc1tpKzFdIC0gX2NsYXNzZXNbaV0pICogMC41KSkgLSBtaW5jKSAvIChtYXhjLW1pbmMpKSAqIChfbWF4IC0gX21pbikpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgLy8gfTtcblxuICAgICAgICB2YXIgZ2V0Q29sb3IgPSBmdW5jdGlvbih2YWwsIGJ5cGFzc01hcCkge1xuICAgICAgICAgICAgdmFyIGNvbCwgdDtcbiAgICAgICAgICAgIGlmIChieXBhc3NNYXAgPT0gbnVsbCkgeyBieXBhc3NNYXAgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbCkgfHwgKHZhbCA9PT0gbnVsbCkpIHsgcmV0dXJuIF9uYWNvbDsgfVxuICAgICAgICAgICAgaWYgKCFieXBhc3NNYXApIHtcbiAgICAgICAgICAgICAgICBpZiAoX2NsYXNzZXMgJiYgKF9jbGFzc2VzLmxlbmd0aCA+IDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gZ2V0Q2xhc3ModmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdCA9IGMgLyAoX2NsYXNzZXMubGVuZ3RoLTIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX21heCAhPT0gX21pbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGludGVycG9sYXRlIGJldHdlZW4gbWluL21heFxuICAgICAgICAgICAgICAgICAgICB0ID0gKHZhbCAtIF9taW4pIC8gKF9tYXggLSBfbWluKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHQgPSB2YWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvbWFpbiBtYXBcbiAgICAgICAgICAgIHQgPSB0TWFwRG9tYWluKHQpO1xuXG4gICAgICAgICAgICBpZiAoIWJ5cGFzc01hcCkge1xuICAgICAgICAgICAgICAgIHQgPSB0TWFwTGlnaHRuZXNzKHQpOyAgLy8gbGlnaHRuZXNzIGNvcnJlY3Rpb25cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9nYW1tYSAhPT0gMSkgeyB0ID0gcG93JDModCwgX2dhbW1hKTsgfVxuXG4gICAgICAgICAgICB0ID0gX3BhZGRpbmdbMF0gKyAodCAqICgxIC0gX3BhZGRpbmdbMF0gLSBfcGFkZGluZ1sxXSkpO1xuXG4gICAgICAgICAgICB0ID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgdCkpO1xuXG4gICAgICAgICAgICB2YXIgayA9IE1hdGguZmxvb3IodCAqIDEwMDAwKTtcblxuICAgICAgICAgICAgaWYgKF91c2VDYWNoZSAmJiBfY29sb3JDYWNoZVtrXSkge1xuICAgICAgICAgICAgICAgIGNvbCA9IF9jb2xvckNhY2hlW2tdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSQyKF9jb2xvcnMpID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGkgaW4gWzAuLl9wb3MubGVuZ3RoLTFdXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxfcG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IF9wb3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA8PSBwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sID0gX2NvbG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodCA+PSBwKSAmJiAoaSA9PT0gKF9wb3MubGVuZ3RoLTEpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA9IF9jb2xvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA+IHAgJiYgdCA8IF9wb3NbaSsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAodC1wKS8oX3Bvc1tpKzFdLXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA9IGNocm9tYSQ0LmludGVycG9sYXRlKF9jb2xvcnNbaV0sIF9jb2xvcnNbaSsxXSwgdCwgX21vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlJDIoX2NvbG9ycykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sID0gX2NvbG9ycyh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF91c2VDYWNoZSkgeyBfY29sb3JDYWNoZVtrXSA9IGNvbDsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbDtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcmVzZXRDYWNoZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9jb2xvckNhY2hlID0ge307IH07XG5cbiAgICAgICAgc2V0Q29sb3JzKGNvbG9ycyk7XG5cbiAgICAgICAgLy8gcHVibGljIGludGVyZmFjZVxuXG4gICAgICAgIHZhciBmID0gZnVuY3Rpb24odikge1xuICAgICAgICAgICAgdmFyIGMgPSBjaHJvbWEkNChnZXRDb2xvcih2KSk7XG4gICAgICAgICAgICBpZiAoX291dCAmJiBjW19vdXRdKSB7IHJldHVybiBjW19vdXRdKCk7IH0gZWxzZSB7IHJldHVybiBjOyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5jbGFzc2VzID0gZnVuY3Rpb24oY2xhc3Nlcykge1xuICAgICAgICAgICAgaWYgKGNsYXNzZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlJDIoY2xhc3NlcykgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzZXMgPSBjbGFzc2VzO1xuICAgICAgICAgICAgICAgICAgICBfZG9tYWluID0gW2NsYXNzZXNbMF0sIGNsYXNzZXNbY2xhc3Nlcy5sZW5ndGgtMV1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gY2hyb21hJDQuYW5hbHl6ZShfZG9tYWluKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jbGFzc2VzID0gW2QubWluLCBkLm1heF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2xhc3NlcyA9IGNocm9tYSQ0LmxpbWl0cyhkLCAnZScsIGNsYXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9jbGFzc2VzO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgZi5kb21haW4gPSBmdW5jdGlvbihkb21haW4pIHtcbiAgICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZG9tYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX21pbiA9IGRvbWFpblswXTtcbiAgICAgICAgICAgIF9tYXggPSBkb21haW5bZG9tYWluLmxlbmd0aC0xXTtcbiAgICAgICAgICAgIF9wb3MgPSBbXTtcbiAgICAgICAgICAgIHZhciBrID0gX2NvbG9ycy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoKGRvbWFpbi5sZW5ndGggPT09IGspICYmIChfbWluICE9PSBfbWF4KSkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBwb3NpdGlvbnNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGlzdCA9IEFycmF5LmZyb20oZG9tYWluKTsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBsaXN0W2ldO1xuXG4gICAgICAgICAgICAgICAgICBfcG9zLnB1c2goKGQtX21pbikgLyAoX21heC1fbWluKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjPTA7IGM8azsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wb3MucHVzaChjLyhrLTEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbWFpbi5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBkb21haW4gbWFwXG4gICAgICAgICAgICAgICAgICAgIHZhciB0T3V0ID0gZG9tYWluLm1hcChmdW5jdGlvbiAoZCxpKSB7IHJldHVybiBpLyhkb21haW4ubGVuZ3RoLTEpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRCcmVha3MgPSBkb21haW4ubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiAoZCAtIF9taW4pIC8gKF9tYXggLSBfbWluKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdEJyZWFrcy5ldmVyeShmdW5jdGlvbiAodmFsLCBpKSB7IHJldHVybiB0T3V0W2ldID09PSB2YWw7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0TWFwRG9tYWluID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA8PSAwIHx8IHQgPj0gMSkgeyByZXR1cm4gdDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodCA+PSB0QnJlYWtzW2krMV0pIHsgaSsrOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSAodCAtIHRCcmVha3NbaV0pIC8gKHRCcmVha3NbaSsxXSAtIHRCcmVha3NbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXQgPSB0T3V0W2ldICsgZiAqICh0T3V0W2krMV0gLSB0T3V0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2RvbWFpbiA9IFtfbWluLCBfbWF4XTtcbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYubW9kZSA9IGZ1bmN0aW9uKF9tKSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX21vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfbW9kZSA9IF9tO1xuICAgICAgICAgICAgcmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5yYW5nZSA9IGZ1bmN0aW9uKGNvbG9ycywgX3Bvcykge1xuICAgICAgICAgICAgc2V0Q29sb3JzKGNvbG9ycyk7XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLm91dCA9IGZ1bmN0aW9uKF9vKSB7XG4gICAgICAgICAgICBfb3V0ID0gX287XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLnNwcmVhZCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zcHJlYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc3ByZWFkID0gdmFsO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5jb3JyZWN0TGlnaHRuZXNzID0gZnVuY3Rpb24odikge1xuICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCkgeyB2ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgX2NvcnJlY3RMaWdodG5lc3MgPSB2O1xuICAgICAgICAgICAgcmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgaWYgKF9jb3JyZWN0TGlnaHRuZXNzKSB7XG4gICAgICAgICAgICAgICAgdE1hcExpZ2h0bmVzcyA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIEwwID0gZ2V0Q29sb3IoMCwgdHJ1ZSkubGFiKClbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBMMSA9IGdldENvbG9yKDEsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9sID0gTDAgPiBMMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIExfYWN0dWFsID0gZ2V0Q29sb3IodCwgdHJ1ZSkubGFiKClbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBMX2lkZWFsID0gTDAgKyAoKEwxIC0gTDApICogdCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBMX2RpZmYgPSBMX2FjdHVhbCAtIExfaWRlYWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0MCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0MSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhfaXRlciA9IDIwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKE1hdGguYWJzKExfZGlmZikgPiAxZS0yKSAmJiAobWF4X2l0ZXItLSA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvbCkgeyBMX2RpZmYgKj0gLTE7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTF9kaWZmIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgKz0gKHQxIC0gdCkgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEgPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ICs9ICh0MCAtIHQpICogMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMX2FjdHVhbCA9IGdldENvbG9yKHQsIHRydWUpLmxhYigpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBMX2RpZmYgPSBMX2FjdHVhbCAtIExfaWRlYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRNYXBMaWdodG5lc3MgPSBmdW5jdGlvbiAodCkgeyByZXR1cm4gdDsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYucGFkZGluZyA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIGlmIChwICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSQyKHApID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBwID0gW3AscF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9wYWRkaW5nID0gcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wYWRkaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGYuY29sb3JzID0gZnVuY3Rpb24obnVtQ29sb3JzLCBvdXQpIHtcbiAgICAgICAgICAgIC8vIElmIG5vIGFyZ3VtZW50cyBhcmUgZ2l2ZW4sIHJldHVybiB0aGUgb3JpZ2luYWwgY29sb3JzIHRoYXQgd2VyZSBwcm92aWRlZFxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7IG91dCA9ICdoZXgnOyB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX2NvbG9ycy5zbGljZSgwKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1Db2xvcnMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbZigwLjUpXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1Db2xvcnMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRtID0gX2RvbWFpblswXTtcbiAgICAgICAgICAgICAgICB2YXIgZGQgPSBfZG9tYWluWzFdIC0gZG07XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gX19yYW5nZV9fKDAsIG51bUNvbG9ycywgZmFsc2UpLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gZiggZG0gKyAoKGkvKG51bUNvbG9ycy0xKSkgKiBkZCkgKTsgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIHJldHVybnMgYWxsIGNvbG9ycyBiYXNlZCBvbiB0aGUgZGVmaW5lZCBjbGFzc2VzXG4gICAgICAgICAgICAgICAgY29sb3JzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHNhbXBsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoX2NsYXNzZXMgJiYgKF9jbGFzc2VzLmxlbmd0aCA+IDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxLCBlbmQgPSBfY2xhc3Nlcy5sZW5ndGgsIGFzYyA9IDEgPD0gZW5kOyBhc2MgPyBpIDwgZW5kIDogaSA+IGVuZDsgYXNjID8gaSsrIDogaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVzLnB1c2goKF9jbGFzc2VzW2ktMV0rX2NsYXNzZXNbaV0pKjAuNSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzYW1wbGVzID0gX2RvbWFpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc2FtcGxlcy5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGYodik7IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hyb21hJDRbb3V0XSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGNbb3V0XSgpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5jYWNoZSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIGlmIChjICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfdXNlQ2FjaGUgPSBjO1xuICAgICAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3VzZUNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGYuZ2FtbWEgPSBmdW5jdGlvbihnKSB7XG4gICAgICAgICAgICBpZiAoZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgX2dhbW1hID0gZztcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nYW1tYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmLm5vZGF0YSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmIChkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfbmFjb2wgPSBjaHJvbWEkNChkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9uYWNvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX19yYW5nZV9fKGxlZnQsIHJpZ2h0LCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciByYW5nZSA9IFtdO1xuICAgICAgdmFyIGFzY2VuZGluZyA9IGxlZnQgPCByaWdodDtcbiAgICAgIHZhciBlbmQgPSAhaW5jbHVzaXZlID8gcmlnaHQgOiBhc2NlbmRpbmcgPyByaWdodCArIDEgOiByaWdodCAtIDE7XG4gICAgICBmb3IgKHZhciBpID0gbGVmdDsgYXNjZW5kaW5nID8gaSA8IGVuZCA6IGkgPiBlbmQ7IGFzY2VuZGluZyA/IGkrKyA6IGktLSkge1xuICAgICAgICByYW5nZS5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gaW50ZXJwb2xhdGVzIGJldHdlZW4gYSBzZXQgb2YgY29sb3JzIHV6aW5nIGEgYmV6aWVyIHNwbGluZVxuICAgIC8vXG5cbiAgICAvLyBAcmVxdWlyZXMgdXRpbHMgbGFiXG4gICAgdmFyIENvbG9yJDUgPSBDb2xvcl8xO1xuXG4gICAgdmFyIHNjYWxlJDEgPSBzY2FsZSQyO1xuXG4gICAgLy8gbnRoIHJvdyBvZiB0aGUgcGFzY2FsIHRyaWFuZ2xlXG4gICAgdmFyIGJpbm9tX3JvdyA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIHJvdyA9IFsxLCAxXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZXdyb3cgPSBbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8PSByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBuZXdyb3dbal0gPSAocm93W2pdIHx8IDApICsgcm93W2ogLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyA9IG5ld3JvdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93O1xuICAgIH07XG5cbiAgICB2YXIgYmV6aWVyID0gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgICAgIHZhciBhc3NpZ24sIGFzc2lnbiQxLCBhc3NpZ24kMjtcblxuICAgICAgICB2YXIgSSwgbGFiMCwgbGFiMSwgbGFiMjtcbiAgICAgICAgY29sb3JzID0gY29sb3JzLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gbmV3IENvbG9yJDUoYyk7IH0pO1xuICAgICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy8gbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIChhc3NpZ24gPSBjb2xvcnMubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmxhYigpOyB9KSwgbGFiMCA9IGFzc2lnblswXSwgbGFiMSA9IGFzc2lnblsxXSk7XG4gICAgICAgICAgICBJID0gZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgIHZhciBsYWIgPSAoWzAsIDEsIDJdLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gbGFiMFtpXSArICh0ICogKGxhYjFbaV0gLSBsYWIwW2ldKSk7IH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yJDUobGFiLCAnbGFiJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGNvbG9ycy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vIHF1YWRyYXRpYyBiZXppZXIgaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgKGFzc2lnbiQxID0gY29sb3JzLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5sYWIoKTsgfSksIGxhYjAgPSBhc3NpZ24kMVswXSwgbGFiMSA9IGFzc2lnbiQxWzFdLCBsYWIyID0gYXNzaWduJDFbMl0pO1xuICAgICAgICAgICAgSSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiID0gKFswLCAxLCAyXS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuICgoMS10KSooMS10KSAqIGxhYjBbaV0pICsgKDIgKiAoMS10KSAqIHQgKiBsYWIxW2ldKSArICh0ICogdCAqIGxhYjJbaV0pOyB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvciQ1KGxhYiwgJ2xhYicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xvcnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAvLyBjdWJpYyBiZXppZXIgaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgdmFyIGxhYjM7XG4gICAgICAgICAgICAoYXNzaWduJDIgPSBjb2xvcnMubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmxhYigpOyB9KSwgbGFiMCA9IGFzc2lnbiQyWzBdLCBsYWIxID0gYXNzaWduJDJbMV0sIGxhYjIgPSBhc3NpZ24kMlsyXSwgbGFiMyA9IGFzc2lnbiQyWzNdKTtcbiAgICAgICAgICAgIEkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYiA9IChbMCwgMSwgMl0ubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiAoKDEtdCkqKDEtdCkqKDEtdCkgKiBsYWIwW2ldKSArICgzICogKDEtdCkgKiAoMS10KSAqIHQgKiBsYWIxW2ldKSArICgzICogKDEtdCkgKiB0ICogdCAqIGxhYjJbaV0pICsgKHQqdCp0ICogbGFiM1tpXSk7IH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yJDUobGFiLCAnbGFiJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGNvbG9ycy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgICAgLy8gZ2VuZXJhbCBjYXNlIChkZWdyZWUgbiBiZXppZXIpXG4gICAgICAgICAgICB2YXIgbGFicywgcm93LCBuO1xuICAgICAgICAgICAgbGFicyA9IGNvbG9ycy5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubGFiKCk7IH0pO1xuICAgICAgICAgICAgbiA9IGNvbG9ycy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgcm93ID0gYmlub21fcm93KG4pO1xuICAgICAgICAgICAgSSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHUgPSAxIC0gdDtcbiAgICAgICAgICAgICAgICB2YXIgbGFiID0gKFswLCAxLCAyXS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGxhYnMucmVkdWNlKGZ1bmN0aW9uIChzdW0sIGVsLCBqKSB7IHJldHVybiAoc3VtICsgcm93W2pdICogTWF0aC5wb3coIHUsIChuIC0gaikgKSAqIE1hdGgucG93KCB0LCBqICkgKiBlbFtpXSk7IH0sIDApOyB9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvciQ1KGxhYiwgJ2xhYicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiTm8gcG9pbnQgaW4gcnVubmluZyBiZXppZXIgd2l0aCBvbmx5IG9uZSBjb2xvci5cIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSTtcbiAgICB9O1xuXG4gICAgdmFyIGJlemllcl8xID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICAgICAgICB2YXIgZiA9IGJlemllcihjb2xvcnMpO1xuICAgICAgICBmLnNjYWxlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NhbGUkMShmKTsgfTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogaW50ZXJwb2xhdGVzIGJldHdlZW4gYSBzZXQgb2YgY29sb3JzIHV6aW5nIGEgYmV6aWVyIHNwbGluZVxuICAgICAqIGJsZW5kIG1vZGUgZm9ybXVsYXMgdGFrZW4gZnJvbSBodHRwOi8vd3d3LnZlbnR1cmUtd2FyZS5jb20va2V2aW4vY29kaW5nL2xldHMtbGVhcm4tbWF0aC1waG90b3Nob3AtYmxlbmQtbW9kZXMvXG4gICAgICovXG5cbiAgICB2YXIgY2hyb21hJDMgPSBjaHJvbWFfMTtcblxuICAgIHZhciBibGVuZCA9IGZ1bmN0aW9uIChib3R0b20sIHRvcCwgbW9kZSkge1xuICAgICAgICBpZiAoIWJsZW5kW21vZGVdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gYmxlbmQgbW9kZSAnICsgbW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsZW5kW21vZGVdKGJvdHRvbSwgdG9wKTtcbiAgICB9O1xuXG4gICAgdmFyIGJsZW5kX2YgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZnVuY3Rpb24gKGJvdHRvbSx0b3ApIHtcbiAgICAgICAgICAgIHZhciBjMCA9IGNocm9tYSQzKHRvcCkucmdiKCk7XG4gICAgICAgICAgICB2YXIgYzEgPSBjaHJvbWEkMyhib3R0b20pLnJnYigpO1xuICAgICAgICAgICAgcmV0dXJuIGNocm9tYSQzLnJnYihmKGMwLCBjMSkpO1xuICAgICAgICB9OyB9O1xuXG4gICAgdmFyIGVhY2ggPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZnVuY3Rpb24gKGMwLCBjMSkge1xuICAgICAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICAgICAgb3V0WzBdID0gZihjMFswXSwgYzFbMF0pO1xuICAgICAgICAgICAgb3V0WzFdID0gZihjMFsxXSwgYzFbMV0pO1xuICAgICAgICAgICAgb3V0WzJdID0gZihjMFsyXSwgYzFbMl0pO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfTsgfTtcblxuICAgIHZhciBub3JtYWwgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYTsgfTtcbiAgICB2YXIgbXVsdGlwbHkgPSBmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBhICogYiAvIDI1NTsgfTtcbiAgICB2YXIgZGFya2VuID0gZnVuY3Rpb24gKGEsYikgeyByZXR1cm4gYSA+IGIgPyBiIDogYTsgfTtcbiAgICB2YXIgbGlnaHRlbiA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGEgPiBiID8gYSA6IGI7IH07XG4gICAgdmFyIHNjcmVlbiA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIDI1NSAqICgxIC0gKDEtYS8yNTUpICogKDEtYi8yNTUpKTsgfTtcbiAgICB2YXIgb3ZlcmxheSA9IGZ1bmN0aW9uIChhLGIpIHsgcmV0dXJuIGIgPCAxMjggPyAyICogYSAqIGIgLyAyNTUgOiAyNTUgKiAoMSAtIDIgKiAoMSAtIGEgLyAyNTUgKSAqICggMSAtIGIgLyAyNTUgKSk7IH07XG4gICAgdmFyIGJ1cm4gPSBmdW5jdGlvbiAoYSxiKSB7IHJldHVybiAyNTUgKiAoMSAtICgxIC0gYiAvIDI1NSkgLyAoYS8yNTUpKTsgfTtcbiAgICB2YXIgZG9kZ2UgPSBmdW5jdGlvbiAoYSxiKSB7XG4gICAgICAgIGlmIChhID09PSAyNTUpIHsgcmV0dXJuIDI1NTsgfVxuICAgICAgICBhID0gMjU1ICogKGIgLyAyNTUpIC8gKDEgLSBhIC8gMjU1KTtcbiAgICAgICAgcmV0dXJuIGEgPiAyNTUgPyAyNTUgOiBhXG4gICAgfTtcblxuICAgIC8vICMgYWRkID0gKGEsYikgLT5cbiAgICAvLyAjICAgICBpZiAoYSArIGIgPiAyNTUpIHRoZW4gMjU1IGVsc2UgYSArIGJcblxuICAgIGJsZW5kLm5vcm1hbCA9IGJsZW5kX2YoZWFjaChub3JtYWwpKTtcbiAgICBibGVuZC5tdWx0aXBseSA9IGJsZW5kX2YoZWFjaChtdWx0aXBseSkpO1xuICAgIGJsZW5kLnNjcmVlbiA9IGJsZW5kX2YoZWFjaChzY3JlZW4pKTtcbiAgICBibGVuZC5vdmVybGF5ID0gYmxlbmRfZihlYWNoKG92ZXJsYXkpKTtcbiAgICBibGVuZC5kYXJrZW4gPSBibGVuZF9mKGVhY2goZGFya2VuKSk7XG4gICAgYmxlbmQubGlnaHRlbiA9IGJsZW5kX2YoZWFjaChsaWdodGVuKSk7XG4gICAgYmxlbmQuZG9kZ2UgPSBibGVuZF9mKGVhY2goZG9kZ2UpKTtcbiAgICBibGVuZC5idXJuID0gYmxlbmRfZihlYWNoKGJ1cm4pKTtcbiAgICAvLyBibGVuZC5hZGQgPSBibGVuZF9mKGVhY2goYWRkKSk7XG5cbiAgICB2YXIgYmxlbmRfMSA9IGJsZW5kO1xuXG4gICAgLy8gY3ViZWhlbGl4IGludGVycG9sYXRpb25cbiAgICAvLyBiYXNlZCBvbiBELkEuIEdyZWVuIFwiQSBjb2xvdXIgc2NoZW1lIGZvciB0aGUgZGlzcGxheSBvZiBhc3Ryb25vbWljYWwgaW50ZW5zaXR5IGltYWdlc1wiXG4gICAgLy8gaHR0cDovL2FzdHJvbi1zb2MuaW4vYnVsbGV0aW4vMTFKdW5lLzI4OTM5MjAxMS5wZGZcblxuICAgIHZhciB0eXBlJDEgPSB1dGlscy50eXBlO1xuICAgIHZhciBjbGlwX3JnYiA9IHV0aWxzLmNsaXBfcmdiO1xuICAgIHZhciBUV09QSSA9IHV0aWxzLlRXT1BJO1xuICAgIHZhciBwb3ckMiA9IE1hdGgucG93O1xuICAgIHZhciBzaW4kMSA9IE1hdGguc2luO1xuICAgIHZhciBjb3MkMSA9IE1hdGguY29zO1xuICAgIHZhciBjaHJvbWEkMiA9IGNocm9tYV8xO1xuXG4gICAgdmFyIGN1YmVoZWxpeCA9IGZ1bmN0aW9uKHN0YXJ0LCByb3RhdGlvbnMsIGh1ZSwgZ2FtbWEsIGxpZ2h0bmVzcykge1xuICAgICAgICBpZiAoIHN0YXJ0ID09PSB2b2lkIDAgKSBzdGFydD0zMDA7XG4gICAgICAgIGlmICggcm90YXRpb25zID09PSB2b2lkIDAgKSByb3RhdGlvbnM9LTEuNTtcbiAgICAgICAgaWYgKCBodWUgPT09IHZvaWQgMCApIGh1ZT0xO1xuICAgICAgICBpZiAoIGdhbW1hID09PSB2b2lkIDAgKSBnYW1tYT0xO1xuICAgICAgICBpZiAoIGxpZ2h0bmVzcyA9PT0gdm9pZCAwICkgbGlnaHRuZXNzPVswLDFdO1xuXG4gICAgICAgIHZhciBkaCA9IDAsIGRsO1xuICAgICAgICBpZiAodHlwZSQxKGxpZ2h0bmVzcykgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIGRsID0gbGlnaHRuZXNzWzFdIC0gbGlnaHRuZXNzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGwgPSAwO1xuICAgICAgICAgICAgbGlnaHRuZXNzID0gW2xpZ2h0bmVzcywgbGlnaHRuZXNzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmID0gZnVuY3Rpb24oZnJhY3QpIHtcbiAgICAgICAgICAgIHZhciBhID0gVFdPUEkgKiAoKChzdGFydCsxMjApLzM2MCkgKyAocm90YXRpb25zICogZnJhY3QpKTtcbiAgICAgICAgICAgIHZhciBsID0gcG93JDIobGlnaHRuZXNzWzBdICsgKGRsICogZnJhY3QpLCBnYW1tYSk7XG4gICAgICAgICAgICB2YXIgaCA9IGRoICE9PSAwID8gaHVlWzBdICsgKGZyYWN0ICogZGgpIDogaHVlO1xuICAgICAgICAgICAgdmFyIGFtcCA9IChoICogbCAqICgxLWwpKSAvIDI7XG4gICAgICAgICAgICB2YXIgY29zX2EgPSBjb3MkMShhKTtcbiAgICAgICAgICAgIHZhciBzaW5fYSA9IHNpbiQxKGEpO1xuICAgICAgICAgICAgdmFyIHIgPSBsICsgKGFtcCAqICgoLTAuMTQ4NjEgKiBjb3NfYSkgKyAoMS43ODI3Nyogc2luX2EpKSk7XG4gICAgICAgICAgICB2YXIgZyA9IGwgKyAoYW1wICogKCgtMC4yOTIyNyAqIGNvc19hKSAtICgwLjkwNjQ5KiBzaW5fYSkpKTtcbiAgICAgICAgICAgIHZhciBiID0gbCArIChhbXAgKiAoKzEuOTcyOTQgKiBjb3NfYSkpO1xuICAgICAgICAgICAgcmV0dXJuIGNocm9tYSQyKGNsaXBfcmdiKFtyKjI1NSxnKjI1NSxiKjI1NSwxXSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuc3RhcnQgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICBpZiAoKHMgPT0gbnVsbCkpIHsgcmV0dXJuIHN0YXJ0OyB9XG4gICAgICAgICAgICBzdGFydCA9IHM7XG4gICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgfTtcblxuICAgICAgICBmLnJvdGF0aW9ucyA9IGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIGlmICgociA9PSBudWxsKSkgeyByZXR1cm4gcm90YXRpb25zOyB9XG4gICAgICAgICAgICByb3RhdGlvbnMgPSByO1xuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH07XG5cbiAgICAgICAgZi5nYW1tYSA9IGZ1bmN0aW9uKGcpIHtcbiAgICAgICAgICAgIGlmICgoZyA9PSBudWxsKSkgeyByZXR1cm4gZ2FtbWE7IH1cbiAgICAgICAgICAgIGdhbW1hID0gZztcbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuaHVlID0gZnVuY3Rpb24oaCkge1xuICAgICAgICAgICAgaWYgKChoID09IG51bGwpKSB7IHJldHVybiBodWU7IH1cbiAgICAgICAgICAgIGh1ZSA9IGg7XG4gICAgICAgICAgICBpZiAodHlwZSQxKGh1ZSkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBkaCA9IGh1ZVsxXSAtIGh1ZVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZGggPT09IDApIHsgaHVlID0gaHVlWzFdOyB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYubGlnaHRuZXNzID0gZnVuY3Rpb24oaCkge1xuICAgICAgICAgICAgaWYgKChoID09IG51bGwpKSB7IHJldHVybiBsaWdodG5lc3M7IH1cbiAgICAgICAgICAgIGlmICh0eXBlJDEoaCkgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBsaWdodG5lc3MgPSBoO1xuICAgICAgICAgICAgICAgIGRsID0gaFsxXSAtIGhbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpZ2h0bmVzcyA9IFtoLGhdO1xuICAgICAgICAgICAgICAgIGRsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9O1xuXG4gICAgICAgIGYuc2NhbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjaHJvbWEkMi5zY2FsZShmKTsgfTtcblxuICAgICAgICBmLmh1ZShodWUpO1xuXG4gICAgICAgIHJldHVybiBmO1xuICAgIH07XG5cbiAgICB2YXIgQ29sb3IkNCA9IENvbG9yXzE7XG4gICAgdmFyIGRpZ2l0cyA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICAgIHZhciBmbG9vciQxID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb207XG5cbiAgICB2YXIgcmFuZG9tXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2RlID0gJyMnO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8NjsgaSsrKSB7XG4gICAgICAgICAgICBjb2RlICs9IGRpZ2l0cy5jaGFyQXQoZmxvb3IkMShyYW5kb20oKSAqIDE2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvciQ0KGNvZGUsICdoZXgnKTtcbiAgICB9O1xuXG4gICAgdmFyIHR5cGUgPSB0eXBlJHA7XG4gICAgdmFyIGxvZyA9IE1hdGgubG9nO1xuICAgIHZhciBwb3ckMSA9IE1hdGgucG93O1xuICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIGFicyQxID0gTWF0aC5hYnM7XG5cblxuICAgIHZhciBhbmFseXplID0gZnVuY3Rpb24gKGRhdGEsIGtleSkge1xuICAgICAgICBpZiAoIGtleSA9PT0gdm9pZCAwICkga2V5PW51bGw7XG5cbiAgICAgICAgdmFyIHIgPSB7XG4gICAgICAgICAgICBtaW46IE51bWJlci5NQVhfVkFMVUUsXG4gICAgICAgICAgICBtYXg6IE51bWJlci5NQVhfVkFMVUUqLTEsXG4gICAgICAgICAgICBzdW06IDAsXG4gICAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGUoZGF0YSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBkYXRhID0gT2JqZWN0LnZhbHVlcyhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKGtleSAmJiB0eXBlKHZhbCkgPT09ICdvYmplY3QnKSB7IHZhbCA9IHZhbFtrZXldOyB9XG4gICAgICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSBudWxsICYmICFpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgci52YWx1ZXMucHVzaCh2YWwpO1xuICAgICAgICAgICAgICAgIHIuc3VtICs9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgci5taW4pIHsgci5taW4gPSB2YWw7IH1cbiAgICAgICAgICAgICAgICBpZiAodmFsID4gci5tYXgpIHsgci5tYXggPSB2YWw7IH1cbiAgICAgICAgICAgICAgICByLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHIuZG9tYWluID0gW3IubWluLCByLm1heF07XG5cbiAgICAgICAgci5saW1pdHMgPSBmdW5jdGlvbiAobW9kZSwgbnVtKSB7IHJldHVybiBsaW1pdHMociwgbW9kZSwgbnVtKTsgfTtcblxuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG5cbiAgICB2YXIgbGltaXRzID0gZnVuY3Rpb24gKGRhdGEsIG1vZGUsIG51bSkge1xuICAgICAgICBpZiAoIG1vZGUgPT09IHZvaWQgMCApIG1vZGU9J2VxdWFsJztcbiAgICAgICAgaWYgKCBudW0gPT09IHZvaWQgMCApIG51bT03O1xuXG4gICAgICAgIGlmICh0eXBlKGRhdGEpID09ICdhcnJheScpIHtcbiAgICAgICAgICAgIGRhdGEgPSBhbmFseXplKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW4gPSBkYXRhLm1pbjtcbiAgICAgICAgdmFyIG1heCA9IGRhdGEubWF4O1xuICAgICAgICB2YXIgdmFsdWVzID0gZGF0YS52YWx1ZXMuc29ydChmdW5jdGlvbiAoYSxiKSB7IHJldHVybiBhLWI7IH0pO1xuXG4gICAgICAgIGlmIChudW0gPT09IDEpIHsgcmV0dXJuIFttaW4sbWF4XTsgfVxuXG4gICAgICAgIHZhciBsaW1pdHMgPSBbXTtcblxuICAgICAgICBpZiAobW9kZS5zdWJzdHIoMCwxKSA9PT0gJ2MnKSB7IC8vIGNvbnRpbnVvdXNcbiAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1pbik7XG4gICAgICAgICAgICBsaW1pdHMucHVzaChtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGUuc3Vic3RyKDAsMSkgPT09ICdlJykgeyAvLyBlcXVhbCBpbnRlcnZhbFxuICAgICAgICAgICAgbGltaXRzLnB1c2gobWluKTtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MTsgaTxudW07IGkrKykge1xuICAgICAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1pbisoKGkvbnVtKSoobWF4LW1pbikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbWl0cy5wdXNoKG1heCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChtb2RlLnN1YnN0cigwLDEpID09PSAnbCcpIHsgLy8gbG9nIHNjYWxlXG4gICAgICAgICAgICBpZiAobWluIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvZ2FyaXRobWljIHNjYWxlcyBhcmUgb25seSBwb3NzaWJsZSBmb3IgdmFsdWVzID4gMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1pbl9sb2cgPSBNYXRoLkxPRzEwRSAqIGxvZyhtaW4pO1xuICAgICAgICAgICAgdmFyIG1heF9sb2cgPSBNYXRoLkxPRzEwRSAqIGxvZyhtYXgpO1xuICAgICAgICAgICAgbGltaXRzLnB1c2gobWluKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkkMT0xOyBpJDE8bnVtOyBpJDErKykge1xuICAgICAgICAgICAgICAgIGxpbWl0cy5wdXNoKHBvdyQxKDEwLCBtaW5fbG9nICsgKChpJDEvbnVtKSAqIChtYXhfbG9nIC0gbWluX2xvZykpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW1pdHMucHVzaChtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAobW9kZS5zdWJzdHIoMCwxKSA9PT0gJ3EnKSB7IC8vIHF1YW50aWxlIHNjYWxlXG4gICAgICAgICAgICBsaW1pdHMucHVzaChtaW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQyPTE7IGkkMjxudW07IGkkMisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSAoKHZhbHVlcy5sZW5ndGgtMSkgKiBpJDIpL251bTtcbiAgICAgICAgICAgICAgICB2YXIgcGIgPSBmbG9vcihwKTtcbiAgICAgICAgICAgICAgICBpZiAocGIgPT09IHApIHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXRzLnB1c2godmFsdWVzW3BiXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gcCA+IHBiXG4gICAgICAgICAgICAgICAgICAgIHZhciBwciA9IHAgLSBwYjtcbiAgICAgICAgICAgICAgICAgICAgbGltaXRzLnB1c2goKHZhbHVlc1twYl0qKDEtcHIpKSArICh2YWx1ZXNbcGIrMV0qcHIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW1pdHMucHVzaChtYXgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChtb2RlLnN1YnN0cigwLDEpID09PSAnaycpIHsgLy8gay1tZWFucyBjbHVzdGVyaW5nXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gYmFzZWQgb25cbiAgICAgICAgICAgIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9maWd1ZS9zb3VyY2UvYnJvd3NlL3RydW5rL2ZpZ3VlLmpzIzMzNlxuICAgICAgICAgICAgc2ltcGxpZmllZCBmb3IgMS1kIGlucHV0IHZhbHVlc1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBjbHVzdGVyO1xuICAgICAgICAgICAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRzID0gbmV3IEFycmF5KG4pO1xuICAgICAgICAgICAgdmFyIGNsdXN0ZXJTaXplcyA9IG5ldyBBcnJheShudW0pO1xuICAgICAgICAgICAgdmFyIHJlcGVhdCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbmJfaXRlcnMgPSAwO1xuICAgICAgICAgICAgdmFyIGNlbnRyb2lkcyA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGdldCBzZWVkIHZhbHVlc1xuICAgICAgICAgICAgY2VudHJvaWRzID0gW107XG4gICAgICAgICAgICBjZW50cm9pZHMucHVzaChtaW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSQzPTE7IGkkMzxudW07IGkkMysrKSB7XG4gICAgICAgICAgICAgICAgY2VudHJvaWRzLnB1c2gobWluICsgKChpJDMvbnVtKSAqIChtYXgtbWluKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VudHJvaWRzLnB1c2gobWF4KTtcblxuICAgICAgICAgICAgd2hpbGUgKHJlcGVhdCkge1xuICAgICAgICAgICAgICAgIC8vIGFzc2lnbm1lbnQgc3RlcFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGo9MDsgajxudW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyU2l6ZXNbal0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpJDQ9MDsgaSQ0PG47IGkkNCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tpJDRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWluZGlzdCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiZXN0ID0gKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGokMT0wOyBqJDE8bnVtOyBqJDErKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3QgPSBhYnMkMShjZW50cm9pZHNbaiQxXS12YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IG1pbmRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5kaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0ID0gaiQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNpemVzW2Jlc3RdKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50c1tpJDRdID0gYmVzdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBjZW50cm9pZHMgc3RlcFxuICAgICAgICAgICAgICAgIHZhciBuZXdDZW50cm9pZHMgPSBuZXcgQXJyYXkobnVtKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqJDI9MDsgaiQyPG51bTsgaiQyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2VudHJvaWRzW2okMl0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpJDU9MDsgaSQ1PG47IGkkNSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgPSBhc3NpZ25tZW50c1tpJDVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Q2VudHJvaWRzW2NsdXN0ZXJdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDZW50cm9pZHNbY2x1c3Rlcl0gPSB2YWx1ZXNbaSQ1XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NlbnRyb2lkc1tjbHVzdGVyXSArPSB2YWx1ZXNbaSQ1XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqJDM9MDsgaiQzPG51bTsgaiQzKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2VudHJvaWRzW2okM10gKj0gMS9jbHVzdGVyU2l6ZXNbaiQzXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBjb252ZXJnZW5jZVxuICAgICAgICAgICAgICAgIHJlcGVhdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGokND0wOyBqJDQ8bnVtOyBqJDQrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Q2VudHJvaWRzW2okNF0gIT09IGNlbnRyb2lkc1tqJDRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjZW50cm9pZHMgPSBuZXdDZW50cm9pZHM7XG4gICAgICAgICAgICAgICAgbmJfaXRlcnMrKztcblxuICAgICAgICAgICAgICAgIGlmIChuYl9pdGVycyA+IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXBlYXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbmlzaGVkIGstbWVhbnMgY2x1c3RlcmluZ1xuICAgICAgICAgICAgLy8gdGhlIG5leHQgcGFydCBpcyBib3Jyb3dlZCBmcm9tIGdhYnJpZWxmbG9yLml0XG4gICAgICAgICAgICB2YXIga0NsdXN0ZXJzID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBqJDU9MDsgaiQ1PG51bTsgaiQ1KyspIHtcbiAgICAgICAgICAgICAgICBrQ2x1c3RlcnNbaiQ1XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSQ2PTA7IGkkNjxuOyBpJDYrKykge1xuICAgICAgICAgICAgICAgIGNsdXN0ZXIgPSBhc3NpZ25tZW50c1tpJDZdO1xuICAgICAgICAgICAgICAgIGtDbHVzdGVyc1tjbHVzdGVyXS5wdXNoKHZhbHVlc1tpJDZdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0bXBLTWVhbnNCcmVha3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGokNj0wOyBqJDY8bnVtOyBqJDYrKykge1xuICAgICAgICAgICAgICAgIHRtcEtNZWFuc0JyZWFrcy5wdXNoKGtDbHVzdGVyc1tqJDZdWzBdKTtcbiAgICAgICAgICAgICAgICB0bXBLTWVhbnNCcmVha3MucHVzaChrQ2x1c3RlcnNbaiQ2XVtrQ2x1c3RlcnNbaiQ2XS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG1wS01lYW5zQnJlYWtzID0gdG1wS01lYW5zQnJlYWtzLnNvcnQoZnVuY3Rpb24gKGEsYil7IHJldHVybiBhLWI7IH0pO1xuICAgICAgICAgICAgbGltaXRzLnB1c2godG1wS01lYW5zQnJlYWtzWzBdKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkkNz0xOyBpJDcgPCB0bXBLTWVhbnNCcmVha3MubGVuZ3RoOyBpJDcrPSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSB0bXBLTWVhbnNCcmVha3NbaSQ3XTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHYpICYmIChsaW1pdHMuaW5kZXhPZih2KSA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0cy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGltaXRzO1xuICAgIH07XG5cbiAgICB2YXIgYW5hbHl6ZV8xID0ge2FuYWx5emU6IGFuYWx5emUsIGxpbWl0czogbGltaXRzfTtcblxuICAgIHZhciBDb2xvciQzID0gQ29sb3JfMTtcblxuXG4gICAgdmFyIGNvbnRyYXN0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgLy8gV0NBRyBjb250cmFzdCByYXRpb1xuICAgICAgICAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNjb250cmFzdC1yYXRpb2RlZlxuICAgICAgICBhID0gbmV3IENvbG9yJDMoYSk7XG4gICAgICAgIGIgPSBuZXcgQ29sb3IkMyhiKTtcbiAgICAgICAgdmFyIGwxID0gYS5sdW1pbmFuY2UoKTtcbiAgICAgICAgdmFyIGwyID0gYi5sdW1pbmFuY2UoKTtcbiAgICAgICAgcmV0dXJuIGwxID4gbDIgPyAobDEgKyAwLjA1KSAvIChsMiArIDAuMDUpIDogKGwyICsgMC4wNSkgLyAobDEgKyAwLjA1KTtcbiAgICB9O1xuXG4gICAgdmFyIENvbG9yJDIgPSBDb2xvcl8xO1xuICAgIHZhciBzcXJ0ID0gTWF0aC5zcXJ0O1xuICAgIHZhciBwb3cgPSBNYXRoLnBvdztcbiAgICB2YXIgbWluID0gTWF0aC5taW47XG4gICAgdmFyIG1heCA9IE1hdGgubWF4O1xuICAgIHZhciBhdGFuMiA9IE1hdGguYXRhbjI7XG4gICAgdmFyIGFicyA9IE1hdGguYWJzO1xuICAgIHZhciBjb3MgPSBNYXRoLmNvcztcbiAgICB2YXIgc2luID0gTWF0aC5zaW47XG4gICAgdmFyIGV4cCA9IE1hdGguZXhwO1xuICAgIHZhciBQSSA9IE1hdGguUEk7XG5cbiAgICB2YXIgZGVsdGFFID0gZnVuY3Rpb24oYSwgYiwgS2wsIEtjLCBLaCkge1xuICAgICAgICBpZiAoIEtsID09PSB2b2lkIDAgKSBLbD0xO1xuICAgICAgICBpZiAoIEtjID09PSB2b2lkIDAgKSBLYz0xO1xuICAgICAgICBpZiAoIEtoID09PSB2b2lkIDAgKSBLaD0xO1xuXG4gICAgICAgIC8vIERlbHRhIEUgKENJRSAyMDAwKVxuICAgICAgICAvLyBzZWUgaHR0cDovL3d3dy5icnVjZWxpbmRibG9vbS5jb20vaW5kZXguaHRtbD9FcW5fRGVsdGFFX0NJRTIwMDAuaHRtbFxuICAgICAgICB2YXIgcmFkMmRlZyA9IGZ1bmN0aW9uKHJhZCkge1xuICAgICAgICAgICAgcmV0dXJuIDM2MCAqIHJhZCAvICgyICogUEkpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZGVnMnJhZCA9IGZ1bmN0aW9uKGRlZykge1xuICAgICAgICAgICAgcmV0dXJuICgyICogUEkgKiBkZWcpIC8gMzYwO1xuICAgICAgICB9O1xuICAgICAgICBhID0gbmV3IENvbG9yJDIoYSk7XG4gICAgICAgIGIgPSBuZXcgQ29sb3IkMihiKTtcbiAgICAgICAgdmFyIHJlZiA9IEFycmF5LmZyb20oYS5sYWIoKSk7XG4gICAgICAgIHZhciBMMSA9IHJlZlswXTtcbiAgICAgICAgdmFyIGExID0gcmVmWzFdO1xuICAgICAgICB2YXIgYjEgPSByZWZbMl07XG4gICAgICAgIHZhciByZWYkMSA9IEFycmF5LmZyb20oYi5sYWIoKSk7XG4gICAgICAgIHZhciBMMiA9IHJlZiQxWzBdO1xuICAgICAgICB2YXIgYTIgPSByZWYkMVsxXTtcbiAgICAgICAgdmFyIGIyID0gcmVmJDFbMl07XG4gICAgICAgIHZhciBhdmdMID0gKEwxICsgTDIpLzI7XG4gICAgICAgIHZhciBDMSA9IHNxcnQocG93KGExLCAyKSArIHBvdyhiMSwgMikpO1xuICAgICAgICB2YXIgQzIgPSBzcXJ0KHBvdyhhMiwgMikgKyBwb3coYjIsIDIpKTtcbiAgICAgICAgdmFyIGF2Z0MgPSAoQzEgKyBDMikvMjtcbiAgICAgICAgdmFyIEcgPSAwLjUqKDEtc3FydChwb3coYXZnQywgNykvKHBvdyhhdmdDLCA3KSArIHBvdygyNSwgNykpKSk7XG4gICAgICAgIHZhciBhMXAgPSBhMSooMStHKTtcbiAgICAgICAgdmFyIGEycCA9IGEyKigxK0cpO1xuICAgICAgICB2YXIgQzFwID0gc3FydChwb3coYTFwLCAyKSArIHBvdyhiMSwgMikpO1xuICAgICAgICB2YXIgQzJwID0gc3FydChwb3coYTJwLCAyKSArIHBvdyhiMiwgMikpO1xuICAgICAgICB2YXIgYXZnQ3AgPSAoQzFwICsgQzJwKS8yO1xuICAgICAgICB2YXIgYXJjdGFuMSA9IHJhZDJkZWcoYXRhbjIoYjEsIGExcCkpO1xuICAgICAgICB2YXIgYXJjdGFuMiA9IHJhZDJkZWcoYXRhbjIoYjIsIGEycCkpO1xuICAgICAgICB2YXIgaDFwID0gYXJjdGFuMSA+PSAwID8gYXJjdGFuMSA6IGFyY3RhbjEgKyAzNjA7XG4gICAgICAgIHZhciBoMnAgPSBhcmN0YW4yID49IDAgPyBhcmN0YW4yIDogYXJjdGFuMiArIDM2MDtcbiAgICAgICAgdmFyIGF2Z0hwID0gYWJzKGgxcCAtIGgycCkgPiAxODAgPyAoaDFwICsgaDJwICsgMzYwKS8yIDogKGgxcCArIGgycCkvMjtcbiAgICAgICAgdmFyIFQgPSAxIC0gMC4xNypjb3MoZGVnMnJhZChhdmdIcCAtIDMwKSkgKyAwLjI0KmNvcyhkZWcycmFkKDIqYXZnSHApKSArIDAuMzIqY29zKGRlZzJyYWQoMyphdmdIcCArIDYpKSAtIDAuMipjb3MoZGVnMnJhZCg0KmF2Z0hwIC0gNjMpKTtcbiAgICAgICAgdmFyIGRlbHRhSHAgPSBoMnAgLSBoMXA7XG4gICAgICAgIGRlbHRhSHAgPSBhYnMoZGVsdGFIcCkgPD0gMTgwID8gZGVsdGFIcCA6IGgycCA8PSBoMXAgPyBkZWx0YUhwICsgMzYwIDogZGVsdGFIcCAtIDM2MDtcbiAgICAgICAgZGVsdGFIcCA9IDIqc3FydChDMXAqQzJwKSpzaW4oZGVnMnJhZChkZWx0YUhwKS8yKTtcbiAgICAgICAgdmFyIGRlbHRhTCA9IEwyIC0gTDE7XG4gICAgICAgIHZhciBkZWx0YUNwID0gQzJwIC0gQzFwOyAgICBcbiAgICAgICAgdmFyIHNsID0gMSArICgwLjAxNSpwb3coYXZnTCAtIDUwLCAyKSkvc3FydCgyMCArIHBvdyhhdmdMIC0gNTAsIDIpKTtcbiAgICAgICAgdmFyIHNjID0gMSArIDAuMDQ1KmF2Z0NwO1xuICAgICAgICB2YXIgc2ggPSAxICsgMC4wMTUqYXZnQ3AqVDtcbiAgICAgICAgdmFyIGRlbHRhVGhldGEgPSAzMCpleHAoLXBvdygoYXZnSHAgLSAyNzUpLzI1LCAyKSk7XG4gICAgICAgIHZhciBSYyA9IDIqc3FydChwb3coYXZnQ3AsIDcpLyhwb3coYXZnQ3AsIDcpICsgcG93KDI1LCA3KSkpO1xuICAgICAgICB2YXIgUnQgPSAtUmMqc2luKDIqZGVnMnJhZChkZWx0YVRoZXRhKSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBzcXJ0KHBvdyhkZWx0YUwvKEtsKnNsKSwgMikgKyBwb3coZGVsdGFDcC8oS2Mqc2MpLCAyKSArIHBvdyhkZWx0YUhwLyhLaCpzaCksIDIpICsgUnQqKGRlbHRhQ3AvKEtjKnNjKSkqKGRlbHRhSHAvKEtoKnNoKSkpO1xuICAgICAgICByZXR1cm4gbWF4KDAsIG1pbigxMDAsIHJlc3VsdCkpO1xuICAgIH07XG5cbiAgICB2YXIgQ29sb3IkMSA9IENvbG9yXzE7XG5cbiAgICAvLyBzaW1wbGUgRXVjbGlkZWFuIGRpc3RhbmNlXG4gICAgdmFyIGRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYiwgbW9kZSkge1xuICAgICAgICBpZiAoIG1vZGUgPT09IHZvaWQgMCApIG1vZGU9J2xhYic7XG5cbiAgICAgICAgLy8gRGVsdGEgRSAoQ0lFIDE5NzYpXG4gICAgICAgIC8vIHNlZSBodHRwOi8vd3d3LmJydWNlbGluZGJsb29tLmNvbS9pbmRleC5odG1sP0VxdWF0aW9ucy5odG1sXG4gICAgICAgIGEgPSBuZXcgQ29sb3IkMShhKTtcbiAgICAgICAgYiA9IG5ldyBDb2xvciQxKGIpO1xuICAgICAgICB2YXIgbDEgPSBhLmdldChtb2RlKTtcbiAgICAgICAgdmFyIGwyID0gYi5nZXQobW9kZSk7XG4gICAgICAgIHZhciBzdW1fc3EgPSAwO1xuICAgICAgICBmb3IgKHZhciBpIGluIGwxKSB7XG4gICAgICAgICAgICB2YXIgZCA9IChsMVtpXSB8fCAwKSAtIChsMltpXSB8fCAwKTtcbiAgICAgICAgICAgIHN1bV9zcSArPSBkKmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChzdW1fc3EpO1xuICAgIH07XG5cbiAgICB2YXIgQ29sb3IgPSBDb2xvcl8xO1xuXG4gICAgdmFyIHZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KCBDb2xvciwgWyBudWxsIF0uY29uY2F0KCBhcmdzKSApKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gc29tZSBwcmUtZGVmaW5lZCBjb2xvciBzY2FsZXM6XG4gICAgdmFyIGNocm9tYSQxID0gY2hyb21hXzE7XG5cbiAgICB2YXIgc2NhbGUgPSBzY2FsZSQyO1xuXG4gICAgdmFyIHNjYWxlcyA9IHtcbiAgICBcdGNvb2w6IGZ1bmN0aW9uIGNvb2woKSB7IHJldHVybiBzY2FsZShbY2hyb21hJDEuaHNsKDE4MCwxLC45KSwgY2hyb21hJDEuaHNsKDI1MCwuNywuNCldKSB9LFxuICAgIFx0aG90OiBmdW5jdGlvbiBob3QoKSB7IHJldHVybiBzY2FsZShbJyMwMDAnLCcjZjAwJywnI2ZmMCcsJyNmZmYnXSkubW9kZSgncmdiJykgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgICAgQ29sb3JCcmV3ZXIgY29sb3JzIGZvciBjaHJvbWEuanNcblxuICAgICAgICBDb3B5cmlnaHQgKGMpIDIwMDIgQ3ludGhpYSBCcmV3ZXIsIE1hcmsgSGFycm93ZXIsIGFuZCBUaGVcbiAgICAgICAgUGVubnN5bHZhbmlhIFN0YXRlIFVuaXZlcnNpdHkuXG5cbiAgICAgICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAgICAgICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgICAgICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cbiAgICAgICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZFxuICAgICAgICB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUlxuICAgICAgICBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICAgICAgICBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICAgICovXG5cbiAgICB2YXIgY29sb3JicmV3ZXIgPSB7XG4gICAgICAgIC8vIHNlcXVlbnRpYWxcbiAgICAgICAgT3JSZDogWycjZmZmN2VjJywgJyNmZWU4YzgnLCAnI2ZkZDQ5ZScsICcjZmRiYjg0JywgJyNmYzhkNTknLCAnI2VmNjU0OCcsICcjZDczMDFmJywgJyNiMzAwMDAnLCAnIzdmMDAwMCddLFxuICAgICAgICBQdUJ1OiBbJyNmZmY3ZmInLCAnI2VjZTdmMicsICcjZDBkMWU2JywgJyNhNmJkZGInLCAnIzc0YTljZicsICcjMzY5MGMwJywgJyMwNTcwYjAnLCAnIzA0NWE4ZCcsICcjMDIzODU4J10sXG4gICAgICAgIEJ1UHU6IFsnI2Y3ZmNmZCcsICcjZTBlY2Y0JywgJyNiZmQzZTYnLCAnIzllYmNkYScsICcjOGM5NmM2JywgJyM4YzZiYjEnLCAnIzg4NDE5ZCcsICcjODEwZjdjJywgJyM0ZDAwNGInXSxcbiAgICAgICAgT3JhbmdlczogWycjZmZmNWViJywgJyNmZWU2Y2UnLCAnI2ZkZDBhMicsICcjZmRhZTZiJywgJyNmZDhkM2MnLCAnI2YxNjkxMycsICcjZDk0ODAxJywgJyNhNjM2MDMnLCAnIzdmMjcwNCddLFxuICAgICAgICBCdUduOiBbJyNmN2ZjZmQnLCAnI2U1ZjVmOScsICcjY2NlY2U2JywgJyM5OWQ4YzknLCAnIzY2YzJhNCcsICcjNDFhZTc2JywgJyMyMzhiNDUnLCAnIzAwNmQyYycsICcjMDA0NDFiJ10sXG4gICAgICAgIFlsT3JCcjogWycjZmZmZmU1JywgJyNmZmY3YmMnLCAnI2ZlZTM5MScsICcjZmVjNDRmJywgJyNmZTk5MjknLCAnI2VjNzAxNCcsICcjY2M0YzAyJywgJyM5OTM0MDQnLCAnIzY2MjUwNiddLFxuICAgICAgICBZbEduOiBbJyNmZmZmZTUnLCAnI2Y3ZmNiOScsICcjZDlmMGEzJywgJyNhZGRkOGUnLCAnIzc4YzY3OScsICcjNDFhYjVkJywgJyMyMzg0NDMnLCAnIzAwNjgzNycsICcjMDA0NTI5J10sXG4gICAgICAgIFJlZHM6IFsnI2ZmZjVmMCcsICcjZmVlMGQyJywgJyNmY2JiYTEnLCAnI2ZjOTI3MicsICcjZmI2YTRhJywgJyNlZjNiMmMnLCAnI2NiMTgxZCcsICcjYTUwZjE1JywgJyM2NzAwMGQnXSxcbiAgICAgICAgUmRQdTogWycjZmZmN2YzJywgJyNmZGUwZGQnLCAnI2ZjYzVjMCcsICcjZmE5ZmI1JywgJyNmNzY4YTEnLCAnI2RkMzQ5NycsICcjYWUwMTdlJywgJyM3YTAxNzcnLCAnIzQ5MDA2YSddLFxuICAgICAgICBHcmVlbnM6IFsnI2Y3ZmNmNScsICcjZTVmNWUwJywgJyNjN2U5YzAnLCAnI2ExZDk5YicsICcjNzRjNDc2JywgJyM0MWFiNWQnLCAnIzIzOGI0NScsICcjMDA2ZDJjJywgJyMwMDQ0MWInXSxcbiAgICAgICAgWWxHbkJ1OiBbJyNmZmZmZDknLCAnI2VkZjhiMScsICcjYzdlOWI0JywgJyM3ZmNkYmInLCAnIzQxYjZjNCcsICcjMWQ5MWMwJywgJyMyMjVlYTgnLCAnIzI1MzQ5NCcsICcjMDgxZDU4J10sXG4gICAgICAgIFB1cnBsZXM6IFsnI2ZjZmJmZCcsICcjZWZlZGY1JywgJyNkYWRhZWInLCAnI2JjYmRkYycsICcjOWU5YWM4JywgJyM4MDdkYmEnLCAnIzZhNTFhMycsICcjNTQyNzhmJywgJyMzZjAwN2QnXSxcbiAgICAgICAgR25CdTogWycjZjdmY2YwJywgJyNlMGYzZGInLCAnI2NjZWJjNScsICcjYThkZGI1JywgJyM3YmNjYzQnLCAnIzRlYjNkMycsICcjMmI4Y2JlJywgJyMwODY4YWMnLCAnIzA4NDA4MSddLFxuICAgICAgICBHcmV5czogWycjZmZmZmZmJywgJyNmMGYwZjAnLCAnI2Q5ZDlkOScsICcjYmRiZGJkJywgJyM5Njk2OTYnLCAnIzczNzM3MycsICcjNTI1MjUyJywgJyMyNTI1MjUnLCAnIzAwMDAwMCddLFxuICAgICAgICBZbE9yUmQ6IFsnI2ZmZmZjYycsICcjZmZlZGEwJywgJyNmZWQ5NzYnLCAnI2ZlYjI0YycsICcjZmQ4ZDNjJywgJyNmYzRlMmEnLCAnI2UzMWExYycsICcjYmQwMDI2JywgJyM4MDAwMjYnXSxcbiAgICAgICAgUHVSZDogWycjZjdmNGY5JywgJyNlN2UxZWYnLCAnI2Q0YjlkYScsICcjYzk5NGM3JywgJyNkZjY1YjAnLCAnI2U3Mjk4YScsICcjY2UxMjU2JywgJyM5ODAwNDMnLCAnIzY3MDAxZiddLFxuICAgICAgICBCbHVlczogWycjZjdmYmZmJywgJyNkZWViZjcnLCAnI2M2ZGJlZicsICcjOWVjYWUxJywgJyM2YmFlZDYnLCAnIzQyOTJjNicsICcjMjE3MWI1JywgJyMwODUxOWMnLCAnIzA4MzA2YiddLFxuICAgICAgICBQdUJ1R246IFsnI2ZmZjdmYicsICcjZWNlMmYwJywgJyNkMGQxZTYnLCAnI2E2YmRkYicsICcjNjdhOWNmJywgJyMzNjkwYzAnLCAnIzAyODE4YScsICcjMDE2YzU5JywgJyMwMTQ2MzYnXSxcbiAgICAgICAgVmlyaWRpczogWycjNDQwMTU0JywgJyM0ODI3NzcnLCAnIzNmNGE4YScsICcjMzE2NzhlJywgJyMyNjgzOGYnLCAnIzFmOWQ4YScsICcjNmNjZTVhJywgJyNiNmRlMmInLCAnI2ZlZTgyNSddLFxuXG4gICAgICAgIC8vIGRpdmVyZ2luZ1xuXG4gICAgICAgIFNwZWN0cmFsOiBbJyM5ZTAxNDInLCAnI2Q1M2U0ZicsICcjZjQ2ZDQzJywgJyNmZGFlNjEnLCAnI2ZlZTA4YicsICcjZmZmZmJmJywgJyNlNmY1OTgnLCAnI2FiZGRhNCcsICcjNjZjMmE1JywgJyMzMjg4YmQnLCAnIzVlNGZhMiddLFxuICAgICAgICBSZFlsR246IFsnI2E1MDAyNicsICcjZDczMDI3JywgJyNmNDZkNDMnLCAnI2ZkYWU2MScsICcjZmVlMDhiJywgJyNmZmZmYmYnLCAnI2Q5ZWY4YicsICcjYTZkOTZhJywgJyM2NmJkNjMnLCAnIzFhOTg1MCcsICcjMDA2ODM3J10sXG4gICAgICAgIFJkQnU6IFsnIzY3MDAxZicsICcjYjIxODJiJywgJyNkNjYwNGQnLCAnI2Y0YTU4MicsICcjZmRkYmM3JywgJyNmN2Y3ZjcnLCAnI2QxZTVmMCcsICcjOTJjNWRlJywgJyM0MzkzYzMnLCAnIzIxNjZhYycsICcjMDUzMDYxJ10sXG4gICAgICAgIFBpWUc6IFsnIzhlMDE1MicsICcjYzUxYjdkJywgJyNkZTc3YWUnLCAnI2YxYjZkYScsICcjZmRlMGVmJywgJyNmN2Y3ZjcnLCAnI2U2ZjVkMCcsICcjYjhlMTg2JywgJyM3ZmJjNDEnLCAnIzRkOTIyMScsICcjMjc2NDE5J10sXG4gICAgICAgIFBSR246IFsnIzQwMDA0YicsICcjNzYyYTgzJywgJyM5OTcwYWInLCAnI2MyYTVjZicsICcjZTdkNGU4JywgJyNmN2Y3ZjcnLCAnI2Q5ZjBkMycsICcjYTZkYmEwJywgJyM1YWFlNjEnLCAnIzFiNzgzNycsICcjMDA0NDFiJ10sXG4gICAgICAgIFJkWWxCdTogWycjYTUwMDI2JywgJyNkNzMwMjcnLCAnI2Y0NmQ0MycsICcjZmRhZTYxJywgJyNmZWUwOTAnLCAnI2ZmZmZiZicsICcjZTBmM2Y4JywgJyNhYmQ5ZTknLCAnIzc0YWRkMScsICcjNDU3NWI0JywgJyMzMTM2OTUnXSxcbiAgICAgICAgQnJCRzogWycjNTQzMDA1JywgJyM4YzUxMGEnLCAnI2JmODEyZCcsICcjZGZjMjdkJywgJyNmNmU4YzMnLCAnI2Y1ZjVmNScsICcjYzdlYWU1JywgJyM4MGNkYzEnLCAnIzM1OTc4ZicsICcjMDE2NjVlJywgJyMwMDNjMzAnXSxcbiAgICAgICAgUmRHeTogWycjNjcwMDFmJywgJyNiMjE4MmInLCAnI2Q2NjA0ZCcsICcjZjRhNTgyJywgJyNmZGRiYzcnLCAnI2ZmZmZmZicsICcjZTBlMGUwJywgJyNiYWJhYmEnLCAnIzg3ODc4NycsICcjNGQ0ZDRkJywgJyMxYTFhMWEnXSxcbiAgICAgICAgUHVPcjogWycjN2YzYjA4JywgJyNiMzU4MDYnLCAnI2UwODIxNCcsICcjZmRiODYzJywgJyNmZWUwYjYnLCAnI2Y3ZjdmNycsICcjZDhkYWViJywgJyNiMmFiZDInLCAnIzgwNzNhYycsICcjNTQyNzg4JywgJyMyZDAwNGInXSxcblxuICAgICAgICAvLyBxdWFsaXRhdGl2ZVxuXG4gICAgICAgIFNldDI6IFsnIzY2YzJhNScsICcjZmM4ZDYyJywgJyM4ZGEwY2InLCAnI2U3OGFjMycsICcjYTZkODU0JywgJyNmZmQ5MmYnLCAnI2U1YzQ5NCcsICcjYjNiM2IzJ10sXG4gICAgICAgIEFjY2VudDogWycjN2ZjOTdmJywgJyNiZWFlZDQnLCAnI2ZkYzA4NicsICcjZmZmZjk5JywgJyMzODZjYjAnLCAnI2YwMDI3ZicsICcjYmY1YjE3JywgJyM2NjY2NjYnXSxcbiAgICAgICAgU2V0MTogWycjZTQxYTFjJywgJyMzNzdlYjgnLCAnIzRkYWY0YScsICcjOTg0ZWEzJywgJyNmZjdmMDAnLCAnI2ZmZmYzMycsICcjYTY1NjI4JywgJyNmNzgxYmYnLCAnIzk5OTk5OSddLFxuICAgICAgICBTZXQzOiBbJyM4ZGQzYzcnLCAnI2ZmZmZiMycsICcjYmViYWRhJywgJyNmYjgwNzInLCAnIzgwYjFkMycsICcjZmRiNDYyJywgJyNiM2RlNjknLCAnI2ZjY2RlNScsICcjZDlkOWQ5JywgJyNiYzgwYmQnLCAnI2NjZWJjNScsICcjZmZlZDZmJ10sXG4gICAgICAgIERhcmsyOiBbJyMxYjllNzcnLCAnI2Q5NWYwMicsICcjNzU3MGIzJywgJyNlNzI5OGEnLCAnIzY2YTYxZScsICcjZTZhYjAyJywgJyNhNjc2MWQnLCAnIzY2NjY2NiddLFxuICAgICAgICBQYWlyZWQ6IFsnI2E2Y2VlMycsICcjMWY3OGI0JywgJyNiMmRmOGEnLCAnIzMzYTAyYycsICcjZmI5YTk5JywgJyNlMzFhMWMnLCAnI2ZkYmY2ZicsICcjZmY3ZjAwJywgJyNjYWIyZDYnLCAnIzZhM2Q5YScsICcjZmZmZjk5JywgJyNiMTU5MjgnXSxcbiAgICAgICAgUGFzdGVsMjogWycjYjNlMmNkJywgJyNmZGNkYWMnLCAnI2NiZDVlOCcsICcjZjRjYWU0JywgJyNlNmY1YzknLCAnI2ZmZjJhZScsICcjZjFlMmNjJywgJyNjY2NjY2MnXSxcbiAgICAgICAgUGFzdGVsMTogWycjZmJiNGFlJywgJyNiM2NkZTMnLCAnI2NjZWJjNScsICcjZGVjYmU0JywgJyNmZWQ5YTYnLCAnI2ZmZmZjYycsICcjZTVkOGJkJywgJyNmZGRhZWMnLCAnI2YyZjJmMiddLFxuICAgIH07XG5cbiAgICAvLyBhZGQgbG93ZXJjYXNlIGFsaWFzZXMgZm9yIGNhc2UtaW5zZW5zaXRpdmUgbWF0Y2hlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsaXN0ID0gT2JqZWN0LmtleXMoY29sb3JicmV3ZXIpOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIga2V5ID0gbGlzdFtpXTtcblxuICAgICAgICBjb2xvcmJyZXdlcltrZXkudG9Mb3dlckNhc2UoKV0gPSBjb2xvcmJyZXdlcltrZXldO1xuICAgIH1cblxuICAgIHZhciBjb2xvcmJyZXdlcl8xID0gY29sb3JicmV3ZXI7XG5cbiAgICB2YXIgY2hyb21hID0gY2hyb21hXzE7XG5cbiAgICAvLyBmZWVsIGZyZWUgdG8gY29tbWVudCBvdXQgYW55dGhpbmcgdG8gcm9sbHVwXG4gICAgLy8gYSBzbWFsbGVyIGNocm9tYS5qcyBidWlsdFxuXG4gICAgLy8gaW8gLS0+IGNvbnZlcnQgY29sb3JzXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIC8vIG9wZXJhdG9ycyAtLT4gbW9kaWZ5IGV4aXN0aW5nIENvbG9yc1xuXG5cblxuXG5cblxuXG5cblxuXG4gICAgLy8gaW50ZXJwb2xhdG9yc1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIC8vIGdlbmVyYXRvcnMgLS0gPiBjcmVhdGUgbmV3IGNvbG9yc1xuICAgIGNocm9tYS5hdmVyYWdlID0gYXZlcmFnZTtcbiAgICBjaHJvbWEuYmV6aWVyID0gYmV6aWVyXzE7XG4gICAgY2hyb21hLmJsZW5kID0gYmxlbmRfMTtcbiAgICBjaHJvbWEuY3ViZWhlbGl4ID0gY3ViZWhlbGl4O1xuICAgIGNocm9tYS5taXggPSBjaHJvbWEuaW50ZXJwb2xhdGUgPSBtaXgkMTtcbiAgICBjaHJvbWEucmFuZG9tID0gcmFuZG9tXzE7XG4gICAgY2hyb21hLnNjYWxlID0gc2NhbGUkMjtcblxuICAgIC8vIG90aGVyIHV0aWxpdHkgbWV0aG9kc1xuICAgIGNocm9tYS5hbmFseXplID0gYW5hbHl6ZV8xLmFuYWx5emU7XG4gICAgY2hyb21hLmNvbnRyYXN0ID0gY29udHJhc3Q7XG4gICAgY2hyb21hLmRlbHRhRSA9IGRlbHRhRTtcbiAgICBjaHJvbWEuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICBjaHJvbWEubGltaXRzID0gYW5hbHl6ZV8xLmxpbWl0cztcbiAgICBjaHJvbWEudmFsaWQgPSB2YWxpZDtcblxuICAgIC8vIHNjYWxlXG4gICAgY2hyb21hLnNjYWxlcyA9IHNjYWxlcztcblxuICAgIC8vIGNvbG9yc1xuICAgIGNocm9tYS5jb2xvcnMgPSB3M2N4MTFfMTtcbiAgICBjaHJvbWEuYnJld2VyID0gY29sb3JicmV3ZXJfMTtcblxuICAgIHZhciBjaHJvbWFfanMgPSBjaHJvbWE7XG5cbiAgICByZXR1cm4gY2hyb21hX2pzO1xuXG59KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBjb252ZXJ0RmlnbWFDb2xvclRvUmdiLCBwYXJzZUNvbG9yVG9rZW4gfSBmcm9tICcuL3V0aWxzL2ZpZ21hLWNvbG9ycyc7XG5pbXBvcnQgeyBnZXRDb21wb25lbnRDb2xvcnMsIGdldEdsb2JhbE5ldXRyYWxzLCBnZXRUaGVtZUNvbG9ycyB9IGZyb20gJy4vY29sb3ItdG9rZW5zJztcbmltcG9ydCB7IGdldEZpZ21hQ29sbGVjdGlvbiwgcmVzb2x2ZVZhcmlhYmxlVHlwZSwgc2V0RmlnbWFWYXJpYWJsZSB9IGZyb20gXCIuL3V0aWxzL2ZpZ21hLXZhcmlhYmxlc1wiO1xuaW1wb3J0IHsgc29ydENvbG9yVG9rZW5zIH0gZnJvbSAnLi91dGlscy9zb3J0LXBhbGV0dGUnO1xuaW1wb3J0IGNocm9tYSBmcm9tICdjaHJvbWEtanMnO1xuaW1wb3J0ICogYXMgc3BhY2luZyBmcm9tICcuL3NwYWNpbmctdG9rZW5zJztcbmltcG9ydCAqIGFzIHJhZGlpIGZyb20gJy4vcmFkaWktdG9rZW5zJztcbmltcG9ydCAqIGFzIHR5cGVzY2FsZSBmcm9tICcuL3R5cGVzY2FsZS10b2tlbnMnO1xuaW1wb3J0ICogYXMgc2l6aW5nIGZyb20gJy4vc2l6aW5nLXRva2Vucyc7XG5pbXBvcnQgKiBhcyBlZmZlY3RzIGZyb20gJy4vZWZmZWN0LXRva2Vucyc7XG5pbXBvcnQgeyBzb3J0U2l6ZVRva2VucyB9IGZyb20gJy4vdXRpbHMvc29ydC1zaXplcyc7XG5pbXBvcnQgeyBpbXBvcnRUZXh0U3R5bGVzIH0gZnJvbSAnLi91dGlscy9maWdtYS10ZXh0LXN0eWxlcyc7XG5pbXBvcnQgeyByZW5kZXJBY2NlbnRzIH0gZnJvbSBcIi4vY29sb3ItZ2VuZXJhdG9ycy9yZW5kZXItYWNjZW50c1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVHbG9iYWxBY2NlbnRQYWxldHRlLCBnZXRHbG9iYWxBY2NlbnQgfSBmcm9tICcuL2NvbG9yLWdlbmVyYXRvcnMvYWNjZW50LXBhbGV0dGUtZ2VuZXJhdG9yJztcbmltcG9ydCB7IGdlbmVyYXRlTmV1dHJhbHMsIHJlbmRlck5ldXRyYWxzIH0gZnJvbSAnLi9jb2xvci1nZW5lcmF0b3JzL25ldXRyYWxzLXBhbGV0dGUtZ2VuZXJhdG9yJztcbmltcG9ydCB7IGJpbmRWYXJpYWJsZXNBbmRTdHlsZXMgfSBmcm9tICcuL3V0aWxzL3ZhcmlhYmxlcy10by1zdHlsZXMnO1xuaW1wb3J0IHsgcGFyc2VSZWZlcmVuY2VHbG9iYWwsIGZpbmRWYXJpYWJsZUJ5UmVmZXJlbmNlcyB9IGZyb20gJy4vdXRpbHMvdG9rZW4tcmVmZXJlbmNlcyc7XG5pbXBvcnQgeyB0b1RpdGxlQ2FzZSB9IGZyb20gJy4vdXRpbHMvdGV4dC10by10aXRsZS1jYXNlJztcbmltcG9ydCB7IGljb25TaXplTmFtZSwgcmFkaWlTaXplTmFtZSwgc3BhY2luZ1NpemVOYW1lLCB0eXBvZ3JhcGh5U2l6ZU5hbWUgfSBmcm9tICcuL2RlZmF1bHRzJztcbmltcG9ydCB7IHByb2Nlc3NDb21wb25lbnRzIH0gZnJvbSAnLi9maXgtbGF5ZXJzJztcbmltcG9ydCB7IGltcG9ydEVmZmVjdFN0eWxlcyB9IGZyb20gJy4vdXRpbHMvZmlnbWEtZWZmZWN0LXN0eWxlcyc7XG5pbXBvcnQgeyB1cGRhdGVFbGV2YXRpb25Db21wb25lbnRzIH0gZnJvbSAnLi91dGlscy91cGRhdGUtZWxldmF0aW9uLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZmxhdHRlbk9iamVjdCB9IGZyb20gJy4vdXRpbHMvZmxhdHRlbi1vYmplY3QnO1xuaW1wb3J0IHsgcm91bmRUd29EaWdpdHMgfSBmcm9tICcuL3V0aWxzL3JvdW5kLXR3by1kaWdpdHMnO1xuaW1wb3J0IHsgc3dhcFZhcmlhYmxlcyB9IGZyb20gJy4vdXRpbHMvc3dhcC12YXJpYWJsZXMnO1xuaW1wb3J0IHsgZXhwb3J0U3R5bGVUZW1wbGF0ZXMgfSBmcm9tICcuL3V0aWxzL2V4cG9ydC1zdHlsZS10ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgaW1wb3J0U3R5bGVUZW1wbGF0ZXMgfSBmcm9tICcuL3V0aWxzL2ltcG9ydC1zdHlsZS10ZW1wbGF0ZXMnO1xuY29uc29sZS5jbGVhcigpO1xubGV0IGdsb2JhbFRva2VucztcbmNvbnN0IGNvbGxlY3Rpb25OYW1lcyA9IG5ldyBNYXAoW1xuICAgIFtcImJyYW5kQ29sb3JzXCIsIFwiQ29sb3IgVGhlbWVcIiAvKlwiQnJhbmQgQ29sb3JcIiovXSxcbiAgICBbXCJ0aGVtZUNvbG9yc1wiLCBcIkNvbG9yIFRoZW1lXCJdLFxuICAgIFtcImNvbXBvbmVudENvbG9yc1wiLCBcIkNvbXBvbmVudCBUb2tlbnNcIl0sXG4gICAgW1wic3BhY2luZ1wiLCBcIlNwYWNpbmdcIl0sXG4gICAgW1wicmFkaWlcIiwgXCJSYWRpaVwiXSxcbiAgICBbXCJpY29uU2NhbGVcIiwgXCJJY29uIFNjYWxlXCJdLFxuXSk7XG4oKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgeWllbGQgUHJvbWlzZS5hbGwodHlwZXNjYWxlLmdldEZvbnREZXRhaWxzKCkubWFwKChpdGVtKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMoaXRlbSk7IH0pKSk7XG4gICAgaWYgKGZpZ21hLmNvbW1hbmQgPT09IFwiaW1wb3J0XCIpIHtcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fW1wiaW1wb3J0XCJdLCB7XG4gICAgICAgICAgICB3aWR0aDogNTYwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3MjAsXG4gICAgICAgICAgICB0aGVtZUNvbG9yczogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChmaWdtYS5jb21tYW5kID09PSBcImV4cG9ydFwiKSB7XG4gICAgICAgIGZpZ21hLnNob3dVSShfX3VpRmlsZXNfX1tcImV4cG9ydFwiXSwge1xuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICAgICAgdGhlbWVDb2xvcnM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZmlnbWEuY29tbWFuZCA9PSBcImJpbmRUb1N0eWxlc1wiKSB7XG4gICAgICAgIGJpbmRWYXJpYWJsZXNBbmRTdHlsZXMoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgaWYgKGZpZ21hLmNvbW1hbmQgPT0gXCJ1cGRhdGVFbGV2YXRpb25Db21wb25lbnRzXCIpIHtcbiAgICAgICAgdXBkYXRlRWxldmF0aW9uQ29tcG9uZW50cyhlZmZlY3RzLmdldEVsZXZhdGlvblRva2VucygpKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgaWYgKGZpZ21hLmNvbW1hbmQgPT0gXCJzZXRQbGF5Z3JvdW5kXCIpIHtcbiAgICAgICAgY29uc3QgaXNQbGF5Z3JvdW5kID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCdTRFNQbGF5Z3JvdW5kJykgIT09ICcnO1xuICAgICAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoJ1NEU1BsYXlncm91bmQnLCBpc1BsYXlncm91bmQgPyAnJyA6ICd0cnVlJyk7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgJHtpc1BsYXlncm91bmQgPyAn4p2OJyA6ICfinIUnfSBQbGF5Z3JvdW5kIGlzICR7aXNQbGF5Z3JvdW5kID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJ31gKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgaWYgKGZpZ21hLmNvbW1hbmQgPT0gXCJmaXhMYXllcnNcIikge1xuICAgICAgICB5aWVsZCBwcm9jZXNzQ29tcG9uZW50cygpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICBpZiAoZmlnbWEuY29tbWFuZCA9PSBcImV4cG9ydFN0eWxlVGVtcGxhdGVzXCIpIHtcbiAgICAgICAgeWllbGQgZXhwb3J0U3R5bGVUZW1wbGF0ZXMoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oJ1N0eWxlIHRlbXBsYXRlcyBleHBvcnRlZCcpO1xuICAgIH1cbiAgICBpZiAoZmlnbWEuY29tbWFuZCA9PSBcImltcG9ydFN0eWxlVGVtcGxhdGVzXCIpIHtcbiAgICAgICAgeWllbGQgaW1wb3J0U3R5bGVUZW1wbGF0ZXMoKTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oJ1N0eWxlIHRlbXBsYXRlcyBpbXBvcnRlZCcpO1xuICAgIH1cbiAgICBpZiAoZmlnbWEuY29tbWFuZCA9PSBcInN3YXBWYXJpYWJsZXNcIikge1xuICAgICAgICBjb25zdCBsYXllcnNDb3VudCA9IHlpZWxkIHN3YXBWYXJpYWJsZXMoKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KGVyciwgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKGAke2xheWVyc0NvdW50fSBsYXllcihzKSBwcm9jZXNzZWQuIGApO1xuICAgIH1cbn0pKSgpO1xuZmlnbWEudWkub25tZXNzYWdlID0gKGV2ZW50RGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY29kZSByZWNlaXZlZCBtZXNzYWdlXCIsIGV2ZW50RGF0YSk7XG4gICAgY29uc3QgcGFyYW1zID0gZXZlbnREYXRhLnBhcmFtcztcbiAgICBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiSU1QT1JUXCIpIHtcbiAgICAgICAgaW5pdGlhdGVJbXBvcnQocGFyYW1zKTtcbiAgICAgICAgaW1wb3J0QWxsVG9rZW5zKHBhcmFtcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50RGF0YS50eXBlID09PSBcIkVYUE9SVFwiKSB7XG4gICAgICAgIC8vIGV4cG9ydFRvSlNPTihldmVudERhdGEuZm9ybWF0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiQUxFUlRcIikge1xuICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZXZlbnREYXRhLnBhcmFtc31gKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiUkVOREVSX0FDQ0VOVFNcIikge1xuICAgICAgICBjb25zdCBsaWdodEFjY2VudFRva2VucyA9IGdlbmVyYXRlR2xvYmFsQWNjZW50UGFsZXR0ZSgnbGlnaHQnLCBwYXJhbXMpO1xuICAgICAgICBjb25zdCBkYXJrQWNjZW50VG9rZW5zID0gZ2VuZXJhdGVHbG9iYWxBY2NlbnRQYWxldHRlKCdkYXJrJywgcGFyYW1zKTtcbiAgICAgICAgY29uc3QgZnJhbWVMaWdodFBhbGV0dGUgPSByZW5kZXJBY2NlbnRzKGxpZ2h0QWNjZW50VG9rZW5zLCAnTGlnaHQgTW9kZSBBY2NlbnRzJyk7XG4gICAgICAgIGNvbnN0IGZyYW1lRGFya1BhbGV0dGUgPSByZW5kZXJBY2NlbnRzKGRhcmtBY2NlbnRUb2tlbnMsICdEYXJrIE1vZGUgQWNjZW50cycpO1xuICAgICAgICBmcmFtZURhcmtQYWxldHRlLnkgPSBmcmFtZUxpZ2h0UGFsZXR0ZS5oZWlnaHQgKyA2NDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT09IFwiUkVOREVSX05FVVRSQUxTXCIpIHtcbiAgICAgICAgY29uc3QgbmV1dHJhbFRva2VucyA9IGdlbmVyYXRlTmV1dHJhbHMocGFyYW1zKTtcbiAgICAgICAgcmVuZGVyTmV1dHJhbHMobmV1dHJhbFRva2VucywgYEdsb2JhbCBOZXV0cmFsc2ApO1xuICAgIH1cbiAgICBlbHNlIGlmIChldmVudERhdGEudHlwZSA9PT0gXCJMT0FERURcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luRGF0YSA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YSgnU0RTJyk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShwbHVnaW5EYXRhKTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZhaWxlZCB0byByZWFkIHBsdWdpbiBkYXRhJywgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnREYXRhLnR5cGUgPT0gJ1JFU0laRScpIHtcbiAgICAgICAgc3dpdGNoIChwYXJhbXMuYmFzZUZvbnRTaXplKSB7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgZmlnbWEudWkucmVzaXplKDUwMCwgODAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2xhcmdlJzoge1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnJlc2l6ZSg1NjAsIDgwMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gaW5pdGlhdGVJbXBvcnQocGFyYW1zKSB7XG4gICAgZ2V0Q29sbGVjdGlvbkFuZFByZXBhcmVUb2tlbnMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgnY29tcG9uZW50Q29sb3JzJyksXG4gICAgICAgIG1vZGVOYW1lOiBcIkRlZmF1bHRcIixcbiAgICAgICAgZGF0YTogZ2V0Q29tcG9uZW50Q29sb3JzKCksXG4gICAgICAgIHNvcnRGbjogc29ydENvbG9yVG9rZW5zXG4gICAgfSk7XG4gICAgZ2V0Q29sbGVjdGlvbkFuZFByZXBhcmVUb2tlbnMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgndGhlbWVDb2xvcnMnKSxcbiAgICAgICAgbW9kZU5hbWU6IFwiTGlnaHQgQmFzZVwiLFxuICAgICAgICBkYXRhOiBnZXRUaGVtZUNvbG9ycygnbGlnaHRCYXNlJywgcGFyYW1zKSxcbiAgICAgICAgc29ydEZuOiBzb3J0Q29sb3JUb2tlbnNcbiAgICB9KTtcbiAgICAvLyBnZXRDb2xsZWN0aW9uQW5kUHJlcGFyZVRva2Vucyh7XG4gICAgLy8gICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZXMuZ2V0KCdicmFuZENvbG9ycycpLFxuICAgIC8vICAgICBtb2RlTmFtZTogdG9UaXRsZUNhc2UocGFyYW1zLnByaW1hcnkpLFxuICAgIC8vICAgICBkYXRhOiBnZXRCcmFuZENvbG9ycyhwYXJhbXMucHJpbWFyeSksXG4gICAgLy8gICAgIHNvcnRGbjogc29ydENvbG9yVG9rZW5zXG4gICAgLy8gfSk7XG4gICAgZ2V0Q29sbGVjdGlvbkFuZFByZXBhcmVUb2tlbnMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgnc3BhY2luZycpLFxuICAgICAgICBtb2RlTmFtZTogdG9UaXRsZUNhc2UocGFyYW1zLnNwYWNpbmcpLFxuICAgICAgICBkYXRhOiBzcGFjaW5nW3BhcmFtcy5zcGFjaW5nXSxcbiAgICAgICAgc29ydEZuOiBzb3J0U2l6ZVRva2VucyxcbiAgICB9KTtcbiAgICBnZXRDb2xsZWN0aW9uQW5kUHJlcGFyZVRva2Vucyh7XG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZXMuZ2V0KCdyYWRpaScpLFxuICAgICAgICBtb2RlTmFtZTogdG9UaXRsZUNhc2UocGFyYW1zLnJhZGlpKSxcbiAgICAgICAgZGF0YTogcmFkaWlbcGFyYW1zLnJhZGlpXSxcbiAgICAgICAgc29ydEZuOiBzb3J0U2l6ZVRva2VucyxcbiAgICB9KTtcbiAgICBnZXRDb2xsZWN0aW9uQW5kUHJlcGFyZVRva2Vucyh7XG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZXMuZ2V0KCdpY29uU2NhbGUnKSxcbiAgICAgICAgbW9kZU5hbWU6IHRvVGl0bGVDYXNlKFwiYmFzZVwiKSxcbiAgICAgICAgZGF0YTogc2l6aW5nW1wiYmFzZVwiXSxcbiAgICAgICAgc29ydEZuOiBzb3J0U2l6ZVRva2VucyxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlVmFyaWFibGVzRm9yUGxheWdyb3VuZChkYXRhLCBpc1BsYXlncm91bmQgPSBmYWxzZSkge1xuICAgIGlmIChpc1BsYXlncm91bmQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgO1xuICAgIGNvbnN0IGNvbnRyYXN0UmF0aW9zID0ge307XG4gICAgY29uc3QgcHJpbWFyeUNvbG9ySFVFID0gZGF0YS5wcmltYXJ5O1xuICAgIGNvbnN0IHNoYWRlcyA9IGdldEdsb2JhbEFjY2VudChkYXRhW3ByaW1hcnlDb2xvckhVRV0sIGRhdGEuYWNjZW50U2F0dXJhdGlvbiwgZGF0YS5hY2NlbnRNaW5MdW1pbmFuY2UsIGRhdGEuYWNjZW50TWlkTHVtaW5hbmNlLCBkYXRhLmFjY2VudE1heEx1bWluYW5jZSk7XG4gICAgT2JqZWN0LmVudHJpZXMoc2hhZGVzKS5mb3JFYWNoKChbbmFtZSwgdG9rZW5dKSA9PiB7XG4gICAgICAgIHRva2VuLnNjb3BlcyA9IFtdO1xuICAgICAgICBsZXQgY2hyb21hQ29sb3IgPSBjaHJvbWEodG9rZW4uJHZhbHVlKTtcbiAgICAgICAgY29uc3QgY29udHJhc3QxID0gcm91bmRUd29EaWdpdHMoY2hyb21hLmNvbnRyYXN0KGNocm9tYS5oc2woWzAsIDAsIDFdKSwgY2hyb21hQ29sb3IpKTtcbiAgICAgICAgY29uc3QgY29udHJhc3QyID0gcm91bmRUd29EaWdpdHMoY2hyb21hLmNvbnRyYXN0KGNocm9tYS5oc2woWzAsIDAsIDAuMjJdKSwgY2hyb21hQ29sb3IpKTtcbiAgICAgICAgY29udHJhc3RSYXRpb3NbYF9hY2NlbnRfJHtuYW1lfV92c19saWdodGBdID0ge1xuICAgICAgICAgICAgXCIkdmFsdWVcIjogY29udHJhc3QxLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBcIiR0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcInNjb3Blc1wiOiBbXVxuICAgICAgICB9O1xuICAgICAgICBjb250cmFzdFJhdGlvc1tgX2FjY2VudF8ke25hbWV9X3ZzX2RhcmtgXSA9IHtcbiAgICAgICAgICAgIFwiJHZhbHVlXCI6IGNvbnRyYXN0Mi50b1N0cmluZygpLFxuICAgICAgICAgICAgXCIkdHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJzY29wZXNcIjogW11cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBpbXBvcnRWYXJpYWJsZXMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogXCJfUGxheWdyb3VuZFwiLFxuICAgICAgICBtb2RlTmFtZTogXCJEZWZhdWx0XCIsXG4gICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmbGF0dGVuT2JqZWN0KHsgJ19nbG9iYWwtYWNjZW50Jzogc2hhZGVzIH0pKSwgY29udHJhc3RSYXRpb3MpLCB7ICdfcHJpbWFyeS1jb2xvci1odWUnOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogZGF0YVtkYXRhLnByaW1hcnldLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwic2NvcGVzXCI6IFtdXG4gICAgICAgICAgICB9LCAnX3ByaW1hcnktY29sb3InOiB7XG4gICAgICAgICAgICAgICAgXCIkdmFsdWVcIjogZGF0YS5wcmltYXJ5LFxuICAgICAgICAgICAgICAgIFwiJHR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBcInNjb3Blc1wiOiBbXVxuICAgICAgICAgICAgfSwgJ19zdWNjZXNzLWNvbG9yJzoge1xuICAgICAgICAgICAgICAgIFwiJHZhbHVlXCI6IGRhdGEuc3VjY2VzcyxcbiAgICAgICAgICAgICAgICBcIiR0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJzY29wZXNcIjogW11cbiAgICAgICAgICAgIH0sICdfd2FybmluZy1jb2xvcic6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBkYXRhLndhcm5pbmcsXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwic2NvcGVzXCI6IFtdXG4gICAgICAgICAgICB9LCAnX2Rhbmdlci1jb2xvcic6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBkYXRhLmRhbmdlcixcbiAgICAgICAgICAgICAgICBcIiR0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJzY29wZXNcIjogW11cbiAgICAgICAgICAgIH0sICdfaW5mby1jb2xvcic6IHtcbiAgICAgICAgICAgICAgICBcIiR2YWx1ZVwiOiBkYXRhLmluZm8sXG4gICAgICAgICAgICAgICAgXCIkdHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFwic2NvcGVzXCI6IFtdXG4gICAgICAgICAgICB9IH0pXG4gICAgfSk7XG59XG5mdW5jdGlvbiBpbXBvcnRBbGxUb2tlbnMocGFyYW1zKSB7XG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKCdTRFMnLCBKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcbiAgICBjb25zdCBpc1BsYXlncm91bmQgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ1NEU1BsYXlncm91bmQnKSAhPT0gJyc7XG4gICAgZ2VuZXJhdGVWYXJpYWJsZXNGb3JQbGF5Z3JvdW5kKHBhcmFtcywgaXNQbGF5Z3JvdW5kKTtcbiAgICBpbXBvcnRDb2xvclRoZW1lKHBhcmFtcyk7XG4gICAgLy8gaW1wb3J0VmFyaWFibGVzKHtcbiAgICAvLyAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lcy5nZXQoJ2JyYW5kQ29sb3JzJyksXG4gICAgLy8gICAgIG1vZGVOYW1lOiB0b1RpdGxlQ2FzZShwYXJhbXMucHJpbWFyeSksXG4gICAgLy8gICAgIGRhdGE6IGdldEJyYW5kQ29sb3JzKHBhcmFtcy5wcmltYXJ5KVxuICAgIC8vIH0pO1xuICAgIGltcG9ydFZhcmlhYmxlcyh7XG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZXMuZ2V0KCdjb21wb25lbnRDb2xvcnMnKSxcbiAgICAgICAgbW9kZU5hbWU6IFwiRGVmYXVsdFwiLFxuICAgICAgICBkYXRhOiBnZXRDb21wb25lbnRDb2xvcnMoKVxuICAgIH0pO1xuICAgIGltcG9ydFNpemVUb2tlbnMoe1xuICAgICAgICB0eXBlOiAnc3BhY2luZycsXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZXMuZ2V0KCdzcGFjaW5nJyksXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBkZWZhdWx0TW9kZTogcGFyYW1zLnNwYWNpbmcsXG4gICAgICAgIGRlZmF1bHRPcmRlcjogc3BhY2luZ1NpemVOYW1lLFxuICAgICAgICB0b2tlbnM6IHNwYWNpbmdcbiAgICB9KTtcbiAgICBpbXBvcnRTaXplVG9rZW5zKHtcbiAgICAgICAgdHlwZTogJ3JhZGlpJyxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lcy5nZXQoJ3JhZGlpJyksXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBkZWZhdWx0TW9kZTogcGFyYW1zLnJhZGlpLFxuICAgICAgICBkZWZhdWx0T3JkZXI6IHJhZGlpU2l6ZU5hbWUsXG4gICAgICAgIHRva2VuczogcmFkaWlcbiAgICB9KTtcbiAgICBpbXBvcnRTaXplVG9rZW5zKHtcbiAgICAgICAgdHlwZTogJ3R5cGVTY2FsZScsXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiAnVHlwZSBTY2FsZScsXG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBkZWZhdWx0TW9kZTogcGFyYW1zLmJhc2VGb250U2l6ZSxcbiAgICAgICAgZGVmYXVsdE9yZGVyOiB0eXBvZ3JhcGh5U2l6ZU5hbWUsXG4gICAgICAgIHRva2VuczogdHlwZXNjYWxlLFxuICAgICAgICBpc1NpbmdsZU1vZGU6IHRydWVcbiAgICB9KTtcbiAgICAvLyBJQ09OUyBTQ0FMRVxuICAgIGltcG9ydFNpemVUb2tlbnMoe1xuICAgICAgICB0eXBlOiAnaWNvblNjYWxlJyxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lcy5nZXQoJ2ljb25TY2FsZScpLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgZGVmYXVsdE1vZGU6ICdiYXNlJyxcbiAgICAgICAgZGVmYXVsdE9yZGVyOiBpY29uU2l6ZU5hbWUsXG4gICAgICAgIHRva2Vuczogc2l6aW5nXG4gICAgfSk7XG4gICAgZ2xvYmFsVG9rZW5zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnbG9iYWxUb2tlbnMpLCB0eXBlc2NhbGUuZ2V0VHlwb2dyYW9oeVRva2VucyhwYXJhbXMuYmFzZUZvbnRTaXplLCBwYXJhbXMudHlwZVNjYWxlKSk7XG4gICAgaW1wb3J0VGV4dFN0eWxlcyh0eXBlc2NhbGUuZ2V0VHlwb2dyYW9oeVRva2VucyhwYXJhbXMuYmFzZUZvbnRTaXplLCBwYXJhbXMudHlwZVNjYWxlKSk7XG4gICAgaW1wb3J0RWZmZWN0cygpO1xuICAgIGZpZ21hLm5vdGlmeShcIkZpZ21hIHZhcmlhYmxlcyBoYXMgYmVlbiBpbXBvcnRlZFwiKTtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShcImltcG9ydENvbXBsZXRlZFwiKTtcbn1cbmZ1bmN0aW9uIGltcG9ydEVmZmVjdHMoKSB7XG4gICAgLy8gaW1wb3J0IGVmZmVjdHMgZm9yIGRlZmF1bHQgdGhlbWUgd2hpY2ggaXMgbGlnaHQgb25lXG4gICAgaW1wb3J0RWZmZWN0U3R5bGVzKGVmZmVjdHMuZWxldmF0aW9uKTtcbiAgICB1cGRhdGVFbGV2YXRpb25Db21wb25lbnRzKGVmZmVjdHMuZ2V0RWxldmF0aW9uVG9rZW5zKCkpO1xufVxuZnVuY3Rpb24gaW1wb3J0Q29sb3JUaGVtZShwYXJhbXMpIHtcbiAgICBsZXQgdGhlbWVDb2xvcnMgPSBnZXRUaGVtZUNvbG9ycygnbGlnaHRCYXNlJywgcGFyYW1zKTtcbiAgICBnbG9iYWxUb2tlbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0R2xvYmFsTmV1dHJhbHMoKSksIGdldENvbXBvbmVudENvbG9ycygpKSwgdGhlbWVDb2xvcnMpO1xuICAgIGNvbnNvbGUubG9nKCdJbXBvcnRpbmcgTGlnaHQgQmFzZScsIHRoZW1lQ29sb3JzKTtcbiAgICBpbXBvcnRWYXJpYWJsZXMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgndGhlbWVDb2xvcnMnKSxcbiAgICAgICAgbW9kZU5hbWU6IFwiTGlnaHQgQmFzZVwiLFxuICAgICAgICBkYXRhOiB0aGVtZUNvbG9ycyxcbiAgICAgICAgc29ydEZuOiBzb3J0Q29sb3JUb2tlbnNcbiAgICB9KTtcbiAgICB0aGVtZUNvbG9ycyA9IGdldFRoZW1lQ29sb3JzKCdkYXJrQmFzZScsIHBhcmFtcyk7XG4gICAgZ2xvYmFsVG9rZW5zID0gT2JqZWN0LmFzc2lnbihnbG9iYWxUb2tlbnMsIHRoZW1lQ29sb3JzKTtcbiAgICBjb25zb2xlLmxvZygnSW1wb3J0aW5nIERhcmsgQmFzZScsIHRoZW1lQ29sb3JzKTtcbiAgICBpbXBvcnRWYXJpYWJsZXMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgndGhlbWVDb2xvcnMnKSxcbiAgICAgICAgbW9kZU5hbWU6IFwiRGFyayBCYXNlXCIsXG4gICAgICAgIGRhdGE6IHRoZW1lQ29sb3JzXG4gICAgfSk7XG4gICAgdGhlbWVDb2xvcnMgPSBnZXRUaGVtZUNvbG9ycygnZGFya0VsZXZhdGVkJywgcGFyYW1zKTtcbiAgICBnbG9iYWxUb2tlbnMgPSBPYmplY3QuYXNzaWduKGdsb2JhbFRva2VucywgdGhlbWVDb2xvcnMpO1xuICAgIGNvbnNvbGUubG9nKCdJbXBvcnRpbmcgRGFyayBFbGV2YXRlZCcsIHRoZW1lQ29sb3JzKTtcbiAgICBpbXBvcnRWYXJpYWJsZXMoe1xuICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWVzLmdldCgndGhlbWVDb2xvcnMnKSxcbiAgICAgICAgbW9kZU5hbWU6IFwiRGFyayBFbGV2YXRlZFwiLFxuICAgICAgICBkYXRhOiB0aGVtZUNvbG9yc1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaW1wb3J0U2l6ZVRva2VucyhkYXRhKSB7XG4gICAgY29uc3QgdG9rZW5zID0gZGF0YS50b2tlbnM7XG4gICAgY29uc3QgaXNTaW5nbGVNb2RlID0gZGF0YS5pc1NpbmdsZU1vZGUgfHwgZmFsc2U7XG4gICAgY29uc3Qgc2luZ2xlQ29sbGVjdGlvbiA9IGRhdGEucGFyYW1zLnNpbmdsZUNvbGxlY3Rpb247XG4gICAgY29uc3QgZGVmYXVsdE1vZGUgPSBkYXRhLmRlZmF1bHRNb2RlO1xuICAgIGNvbnN0IGRlZmF1bHRPcmRlciA9IGRhdGEuZGVmYXVsdE9yZGVyLmZpbHRlcihpdGVtID0+IGl0ZW0gIT0gZGVmYXVsdE1vZGUpO1xuICAgIGRlZmF1bHRPcmRlci5zcGxpY2UoMCwgMCwgZGVmYXVsdE1vZGUpO1xuICAgIGRlZmF1bHRPcmRlci5sZW5ndGggPSBpc1NpbmdsZU1vZGUgPyAxIDogZGVmYXVsdE9yZGVyLmxlbmd0aDtcbiAgICBkZWZhdWx0T3JkZXIuZm9yRWFjaCgobW9kZU5hbWUsIGluZGV4KSA9PiB7XG4gICAgICAgIGltcG9ydFZhcmlhYmxlcyh7XG4gICAgICAgICAgICBjb2xsZWN0aW9uTmFtZTogc2luZ2xlQ29sbGVjdGlvbiA/IFwiVUkgU2NhbGVcIiA6IGRhdGEuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgICBtb2RlTmFtZTogdG9UaXRsZUNhc2UobW9kZU5hbWUpLFxuICAgICAgICAgICAgbW9kZUluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGRhdGE6IHRva2Vuc1ttb2RlTmFtZV0sXG4gICAgICAgICAgICBpc1NpbmdsZU1vZGU6IGlzU2luZ2xlTW9kZVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25BbmRQcmVwYXJlVG9rZW5zKHsgY29sbGVjdGlvbk5hbWUsIG1vZGVOYW1lLCBtb2RlSW5kZXggPSAtMSwgZGF0YSwgc29ydEZuID0gbnVsbCwgaXNTaW5nbGVNb2RlID0gZmFsc2UgfSkge1xuICAgIGxldCBtb2RlSWQ7XG4gICAgY29uc3QgeyBjb2xsZWN0aW9uLCBpc05ldyB9ID0gZ2V0RmlnbWFDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBpZiAoaXNOZXcgfHwgaXNTaW5nbGVNb2RlKSB7XG4gICAgICAgIG1vZGVJZCA9IGNvbGxlY3Rpb24ubW9kZXNbMF0ubW9kZUlkO1xuICAgICAgICBjb2xsZWN0aW9uLnJlbmFtZU1vZGUobW9kZUlkLCBtb2RlTmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBtb2RlID0gbW9kZUluZGV4IDwgMCA/IGNvbGxlY3Rpb24ubW9kZXMuZmluZChtb2RlID0+IG1vZGUubmFtZSA9PT0gbW9kZU5hbWUpIDogY29sbGVjdGlvbi5tb2Rlc1ttb2RlSW5kZXhdO1xuICAgICAgICBpZiAoIW1vZGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbW9kZUlkID0gY29sbGVjdGlvbi5hZGRNb2RlKG1vZGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiQ2Fubm90IGNyZWF0ZSBtb3JlIHRoYW4gb25lIG1vZGUuIElzIHlvdXIgZmlsZSB1bmRlciBQcm8gdGVhbSBvciBvcmcgcGxhbj9cIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW9kZUlkID0gbW9kZS5tb2RlSWQ7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnJlbmFtZU1vZGUobW9kZUlkLCBtb2RlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHRyYW5zZm9ybWVkVG9rZW5zID0gT2JqZWN0LmVudHJpZXMoZGF0YSkubWFwKChba2V5LCBvYmplY3RdKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgbmFtZToga2V5IH0sIG9iamVjdCk7XG4gICAgfSk7XG4gICAgbGV0IHNvcnRlZFRva2VucyA9IHRyYW5zZm9ybWVkVG9rZW5zO1xuICAgIGlmIChzb3J0Rm4gIT0gbnVsbCkge1xuICAgICAgICBzb3J0ZWRUb2tlbnMgPSB0cmFuc2Zvcm1lZFRva2Vucy5zb3J0KHNvcnRGbik7XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgICAvLyBjcmVhdGUgdmFyaWFibGVzIHN0cmFpZ2h0IGF3YXkgc28gdGhlcmUgaXMgYSB3YXkgdG8gbWFrZSBcbiAgICAgICAgLy8gcmVmZXJlbmNlcyAvIGFsaWFzZXMgd2l0aG91dCBhZGRpdGlvbmFsIHBhc3NcbiAgICAgICAgc29ydGVkVG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHJlc29sdmVWYXJpYWJsZVR5cGUodG9rZW4uJHR5cGUpO1xuICAgICAgICAgICAgc2V0RmlnbWFWYXJpYWJsZShjb2xsZWN0aW9uLCBtb2RlSWQsIHR5cGUsIHRva2VuLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5zOiBzb3J0ZWRUb2tlbnMsXG4gICAgICAgIGNvbGxlY3Rpb24sXG4gICAgICAgIG1vZGVJZCxcbiAgICAgICAgdHlwZTogZGF0YS4kdHlwZVxuICAgIH07XG59XG5mdW5jdGlvbiBpbXBvcnRWYXJpYWJsZXMoeyBjb2xsZWN0aW9uTmFtZSwgbW9kZU5hbWUsIG1vZGVJbmRleCA9IC0xLCBkYXRhLCBzb3J0Rm4gPSBudWxsLCBpc1NpbmdsZU1vZGUgPSBmYWxzZSB9KSB7XG4gICAgY29uc3QgeyB0b2tlbnMsIGNvbGxlY3Rpb24sIG1vZGVJZCwgdHlwZSB9ID0gZ2V0Q29sbGVjdGlvbkFuZFByZXBhcmVUb2tlbnMoeyBjb2xsZWN0aW9uTmFtZSwgbW9kZU5hbWUsIG1vZGVJbmRleCwgZGF0YSwgc29ydEZuLCBpc1NpbmdsZU1vZGUgfSk7XG4gICAgcmV0dXJuIHRva2Vucy5tYXAoKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzVG9rZW4oe1xuICAgICAgICAgICAgY29sbGVjdGlvbixcbiAgICAgICAgICAgIG1vZGVJZCxcbiAgICAgICAgICAgIHR5cGU6IHRva2VuLiR0eXBlLFxuICAgICAgICAgICAgdmFyaWFibGVOYW1lOiB0b2tlbi5uYW1lLFxuICAgICAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcHJvY2Vzc1Rva2VuKHsgY29sbGVjdGlvbiwgbW9kZUlkLCB0eXBlLCB2YXJpYWJsZU5hbWUsIHRva2VuIH0pIHtcbiAgICB0eXBlID0gdHlwZSB8fCB0b2tlbi4kdHlwZTtcbiAgICAvLyBpZiBrZXkgaXMgYSBtZXRhIGZpZWxkLCBtb3ZlIG9uXG4gICAgaWYgKHZhcmlhYmxlTmFtZS5jaGFyQXQoMCkgPT09IFwiJFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRva2VuLiR2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0eXBlID09PSBcImNvbG9yXCIpIHtcbiAgICAgICAgICAgIGxldCBjb2xvclZhbHVlID0gcGFyc2VDb2xvclRva2VuKHRva2VuLCBnbG9iYWxUb2tlbnMpO1xuICAgICAgICAgICAgbGV0IHJlZmVyZW5jZVZhciA9IGZpbmRWYXJpYWJsZUJ5UmVmZXJlbmNlcyh0b2tlbi4kdmFsdWUudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VWYXIpIHtcbiAgICAgICAgICAgICAgICBjb2xvclZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlZBUklBQkxFX0FMSUFTXCIsXG4gICAgICAgICAgICAgICAgICAgIGlkOiByZWZlcmVuY2VWYXIuaWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXRGaWdtYVZhcmlhYmxlKGNvbGxlY3Rpb24sIG1vZGVJZCwgXCJDT0xPUlwiLCB2YXJpYWJsZU5hbWUsIGNvbG9yVmFsdWUsIHRva2VuLnNjb3BlcyB8fCBbJ0FMTF9TQ09QRVMnXSwgdG9rZW4uZGVzY3JpcHRpb24gfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRGaWdtYVZhcmlhYmxlKGNvbGxlY3Rpb24sIG1vZGVJZCwgXCJGTE9BVFwiLCB2YXJpYWJsZU5hbWUsIHBhcnNlSW50KHRva2VuLiR2YWx1ZSksIHRva2VuLnNjb3BlcywgdG9rZW4uZGVzY3JpcHRpb24gfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBzZXRGaWdtYVZhcmlhYmxlKGNvbGxlY3Rpb24sIG1vZGVJZCwgXCJTVFJJTkdcIiwgdmFyaWFibGVOYW1lLCBwYXJzZVJlZmVyZW5jZUdsb2JhbCh0b2tlbi4kdmFsdWUsIGdsb2JhbFRva2VucyksIHRva2VuLnNjb3BlcywgdG9rZW4uZGVzY3JpcHRpb24gfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1bnN1cHBvcnRlZCB0eXBlXCIsIHR5cGUsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdyZWN1cnNpb24gaW4gJywgdG9rZW4pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGV4cG9ydFRvSlNPTihjb2xvckZvcm1hdCkge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucygpO1xuICAgIGNvbnN0IGZpbGVzID0gW107XG4gICAgY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbikgPT4gZmlsZXMucHVzaCguLi5leHBvcnRDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGNvbG9yRm9ybWF0KSkpO1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJFWFBPUlRfUkVTVUxUXCIsIGZpbGVzIH0pO1xufVxuZnVuY3Rpb24gZXhwb3J0Q29sbGVjdGlvbih7IG5hbWUsIG1vZGVzLCB2YXJpYWJsZUlkcyB9LCBjb2xvckZvcm1hdCkge1xuICAgIGNvbnN0IGZpbGVzID0gW107XG4gICAgbW9kZXMuZm9yRWFjaCgobW9kZSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlID0geyBmaWxlTmFtZTogYCR7bmFtZX0uJHttb2RlLm5hbWV9LnRva2Vucy5qc29uYCwgYm9keToge30gfTtcbiAgICAgICAgdmFyaWFibGVJZHMuc29ydCgpLmZvckVhY2goKHZhcmlhYmxlSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgcmVzb2x2ZWRUeXBlLCB2YWx1ZXNCeU1vZGUgfSA9IGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUJ5SWQodmFyaWFibGVJZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIFtcIkNPTE9SXCIsIFwiRkxPQVRcIl0uaW5jbHVkZXMocmVzb2x2ZWRUeXBlKSkge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSBmaWxlLmJvZHk7XG4gICAgICAgICAgICAgICAgbmFtZS5zcGxpdChcIi9cIikuZm9yRWFjaCgoZ3JvdXBOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtncm91cE5hbWVdID0gb2JqW2dyb3VwTmFtZV0gfHwge307XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IG9ialtncm91cE5hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9iai4kdHlwZSA9IHJlc29sdmVkVHlwZSA9PT0gXCJDT0xPUlwiID8gXCJjb2xvclwiIDogXCJudW1iZXJcIjtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai4kdmFsdWUgPSBgeyR7ZmlnbWEudmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VmFyaWFibGVCeUlkKHZhbHVlLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5hbWUucmVwbGFjZSgvXFwvL2csIFwiLlwiKX19YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai4kdmFsdWUgPSByZXNvbHZlZFR5cGUgPT09IFwiQ09MT1JcIiA/IGNvbnZlcnRGaWdtYUNvbG9yVG9SZ2IodmFsdWUsIGNvbG9yRm9ybWF0KSA6IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZpbGVzLnB1c2goZmlsZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbGVzO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9