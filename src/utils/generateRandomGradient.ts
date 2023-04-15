
import tinycolor from 'tinycolor2';
const generateRandomGradient = () => {
    const steps = 3; 
    const hueStart = Math.floor(Math.random() * 120) + 330; 
    const hueEnd = (hueStart + 120) % 360; 
    const saturation = Math.floor(Math.random() * 51) + 90; 
    const lightness = Math.floor(Math.random() * 21) + 50; 

    const colorStops = new Array(steps).fill(0).map((_, i) => {
        const mixAmount = i / (steps - 1);
        const hue = hueStart + mixAmount * (hueEnd - hueStart);
        const color = tinycolor({ h: hue, s: saturation, l: lightness });
        const brightColor = color.isDark() ? color.lighten(15) : color.darken(15);
        return brightColor.toHexString();
    });
    return `linear-gradient(to bottom right, ${colorStops.join(', ')})`;
};

export default generateRandomGradient;