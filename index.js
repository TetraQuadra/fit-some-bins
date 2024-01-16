import { packBlocks } from "./packing.js";
import { calculateFullness } from "./calculateFullness.js";
import { checkInput, debounce, generateBlocks } from "./helpers.js";
import {
  drawBlocksToContainer,
  clearGUI,
  showFullness,
  showUnfittedBlocks,
} from "./gui.js";
import input from "./blocks.json" assert { type: "json" };

// const blocks = generateBlocks(25, 10, 100);
const blocks = input;

function startPacking(blocks, container) {
  const isInputCorrect = checkInput(blocks);
  if (!isInputCorrect) {
    return;
  }

  const blockCoordinates = packBlocks(blocks, container);
  drawBlocksToContainer(blockCoordinates.placedBlocks);

  const fullness = calculateFullness(blockCoordinates.placedBlocks, container);
  showFullness(fullness);

  if (blockCoordinates.unfitBlocks.length > 0) {
    showUnfittedBlocks(blockCoordinates.unfitBlocks);
  }
}

const debouncedStartPacking = debounce(startPacking, 50);

const refreshLoop = () => {
  clearGUI();
  const container = { width: window.innerWidth, height: window.innerHeight };
  debouncedStartPacking(blocks, container);
};

refreshLoop();

window.addEventListener("resize", refreshLoop);
