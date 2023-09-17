// gameConfig.js - Determines game settings like resolution.

const BASE_WIDTH = 640;
const BASE_HEIGHT = 360;

let scaler;

export const multiplier = 2; // Change this value to 1, 2, 3, or 4 for 640x360, 1280x720, 1920x1080, 2560x1440 respectively

if (multiplier === 1) {
    scaler = 0.0625;
} else if (multiplier === 2) {
    scaler = 0.125;
} else if (multiplier === 3) {
    scaler = 0.25;
} else if (multiplier === 4) {
    scaler = 0.5;
}

export const scale = scaler;

export const width = BASE_WIDTH * multiplier;
export const height = BASE_HEIGHT * multiplier;
