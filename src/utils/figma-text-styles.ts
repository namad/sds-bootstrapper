import { _clone } from "./clone";
import { findVariableByReferences, parseReferenceGlobal } from "./token-references";


export async function importTextStyles(tokens: any[]) {
    for(const [name, token] of Object.entries(tokens)) {
        if(token.$type == 'typography') {
            let textStyle = await getStyleByName(name);
            let newStyle = false;

            if(!textStyle) {
                textStyle = figma.createTextStyle();
                newStyle = true;
            }

            const resolved = parseValues(token.$value, tokens);
            const normalized = convertTextStyleToFigma(name, resolved);

            if(!newStyle) {
                normalized.fontName = _clone(textStyle.fontName);
            }

            Object.keys(normalized).forEach(key => {
                textStyle[key] = normalized[key];
            })

            textStyle.setBoundVariable('lineHeight', await findVariableByReferences(token.$value['lineHeight']));
            textStyle.setBoundVariable('fontSize', await findVariableByReferences(token.$value['fontSize']));
            textStyle.setBoundVariable('paragraphSpacing', await findVariableByReferences(token.$value['paragraphSpacing']));
            textStyle.setBoundVariable('fontFamily', await findVariableByReferences(token.$value['fontFamily']));
            textStyle.setBoundVariable('fontStyle', await findVariableByReferences(token.$value['fontWeight']));
        }    
    }
}

function parseValues(value, dictionary) {
    let output = {};
    for(const [key, tokenReference] of Object.entries(value)) {
        const resolvedValue = parseReferenceGlobal(tokenReference, dictionary);
        output[key] = resolvedValue;
    }


    return output;
}

async function getLocalStyles() {
  return await figma.getLocalTextStylesAsync();
};

async function getStyleByName(name) {
  const stylesByType = await getLocalStyles();
  const match = stylesByType.find((style) => style.name === name);

  if (match) {
    return match;
  } else {
    return null;
  }
};

function convertTextCaseToFigma(value: string): "UPPER" | "LOWER" | "TITLE" | "SMALL_CAPS" | "SMALL_CAPS_FORCED" | "ORIGINAL" {
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

function convertTextDecorationToFigma(value: string) {
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

export function convertTextStyleToFigma(name, values): TextStyle {
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
        listSpacing: parseFloat(values.lineHeight),
        hangingPunctuation: false,
        hangingList: false,
        'textCase': convertTextCaseToFigma(values.textCase)
    }

    return textStyle as TextStyle;
}