// gameConfig.js - Determines game settings like resolution.

const BASE_WIDTH = 640;
const BASE_HEIGHT = 360;

export const multiplier = 1; // Change this value to 1, 2, 3, or 4 for 640x360, 1280x720, 1920x1080, 2560x1440 respectively

export const width = BASE_WIDTH * multiplier;
export const height = BASE_HEIGHT * multiplier;
