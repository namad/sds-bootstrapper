import { EffectToken } from "../effect-tokens";
import { DesignToken } from "../main";

export function updateElevationComponents(tokens) {
    figma.skipInvisibleInstanceChildren = true;
    const pageComponents = figma.currentPage.findAllWithCriteria({types: ['COMPONENT']});
    const elevationComponents = pageComponents.filter(node => {
        const name = node.name.toLocaleLowerCase();
        return name.startsWith('elevation');
    });

    if (elevationComponents.length == 0) {
        return console.warn('No elevation components has been found');
    }

    Object.keys(tokens.elevation).forEach(name => {
        const variants = tokens.elevation[name];
        const [ shade, token ] = Object.entries(variants)[0];
        const settings = token['$value'] as EffectToken[];
        
        const elevationComponent = elevationComponents.find(node => {
            return node.name.indexOf(name) > -1;
        })

        processComponent(settings, elevationComponent);

    })
}

function processComponent(effects: EffectToken[], component: ComponentNode) {

    const shadowLayers = component.findChildren(node => {
        const name = node.name.toLocaleLowerCase();
        return name.startsWith('shadow');
    });

    effects.forEach((shadowSettings, index) => {
        const shadowLayer = shadowLayers[index] as VectorNode;

        const x = parseFloat(shadowSettings.x);
        const y = parseFloat(shadowSettings.y);
        const radius = parseFloat(shadowSettings.blur);
        const spread = parseFloat(shadowSettings.spread);


        const width = component.width + (2 * spread);
        const height = component.height + (2 * spread);
        const left = x - spread;
        const top = y - spread;

        const blur: Effect = {
            type: "LAYER_BLUR",
            radius: radius,
            visible: true
        };

        shadowLayer.effects = [blur];
        shadowLayer.resize(width, height);
        shadowLayer.x = left;
        shadowLayer.y = top;
    })
}