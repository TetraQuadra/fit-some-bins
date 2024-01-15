import { addRectanglesToContainer } from "./gui.mjs";
import { PackBlocks } from "./packing.mjs";

const container = { width: 400, height: 400 };

const blocks = Array.from({ length: 30 }, () => ({
  width: getRandomInt(10, 100),
  height: getRandomInt(10, 120),
}));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const blockCoordinates = PackBlocks(blocks, container);
console.log(blockCoordinates);
addRectanglesToContainer(blockCoordinates);
