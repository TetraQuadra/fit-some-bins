import { PackBlocks } from "./packing.js";
import { calculateFullness } from "./calculateFullness.js";
import {
  drawBlocksToContainer,
  clearGUI,
  showFullness,
  showUnfittedBlocks,
} from "./gui.js";
import { debounce, generateBlocks } from "./helpers.js";

const container = { width: window.innerWidth, height: window.innerHeight };
const blocks = generateBlocks(25, 10, 100);

function startPacking(blocks, container) {
  const blockCoordinates = PackBlocks(blocks, container);
  drawBlocksToContainer(blockCoordinates.placedBlocks);

  const fullness = calculateFullness(blockCoordinates.placedBlocks, container);
  showFullness(fullness);
  if (blockCoordinates.unfitBlocks.length > 0) {
    showUnfittedBlocks(blockCoordinates.unfitBlocks);
  }
}

const debouncedStartPacking = debounce(startPacking, 50);

startPacking(blocks, container);

window.addEventListener("resize", () => {
  clearGUI();
  container.width = window.innerWidth;
  container.height = window.innerHeight;
  debouncedStartPacking(blocks, container);
});
