// helper functions
const convertHexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )})` :
        null;
};

const convertHslToRgb = (hsl) => {
    const hslArray = hsl.split(",");
    const h = parseInt(hslArray[0].replace("hsl(", ""));
    const s = parseInt(hslArray[1].replace("%", ""));
    const l = parseInt(hslArray[2].replace("%", ""));
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
};

const isColorDark = (color) => {
    // convert color to rgb if hex
    if (color.includes("#")) {
        color = convertHexToRgb(color);
    }
    // convert color to rgb if hsl
    if (color.includes("hsl")) {
        color = convertHslToRgb(color);
    }

    // get rgb values
    const rgb = color.match(/\d+/g);
    // calculate brightness
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 128;
};

module.exports = {
    isColorDark,
};