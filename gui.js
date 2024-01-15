export function drawBlocksToContainer(coordinates) {
  const colorMap = {};
  if (!coordinates) {
    return alert("no coordinates given");
  }
  const container = document.getElementById("container");

  coordinates.forEach((coord) => {
    const rectangle = document.createElement("div");
    const blockKey = JSON.stringify({
      width: coord.right - coord.left,
      height: coord.top - coord.bottom,
    });
    const color = colorMap[blockKey] || generateUniqueColor(blockKey, colorMap);

    rectangle.style.cssText = `
      bottom: ${coord.bottom}px;
      left: ${coord.left}px;
      width: ${coord.right - coord.left}px;
      height: ${coord.top - coord.bottom}px;
      background-color: ${color};
    `;
    rectangle.classList.add("block");
    rectangle.innerHTML = coord.initialOrder.toString();
    container.appendChild(rectangle);
  });
}

function generateUniqueColor(blockKey, colorMap) {
  let color;
  do {
    color = getRandomColor();
  } while (Object.values(colorMap).includes(color));
  colorMap[blockKey] = color;
  return color;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function showFullness(fullness) {
  const infoBlock = document.createElement("div");
  if (fullness < 0 || fullness > 1) {
    console.log("Invalid fullness value");
  }
  const percentage = Math.round(fullness * 100);
  const htmlString = `Fullness: ${percentage}%`;
  infoBlock.innerHTML = htmlString;
  document.getElementById("info").appendChild(infoBlock);
}

export function showUnfittedBlocks(unfittedBlocks) {
  const infoBlock = document.createElement("div");
  infoBlock.innerHTML =
    "Due to blocks size or quantity, some of the blocks were not placed:";

  for (const block of unfittedBlocks) {
    infoBlock.innerHTML += `<br>№${block.initialOrder + 1} (width: ${
      block.width
    }, height: ${block.height})`;
  }

  document.getElementById("info").appendChild(infoBlock);
}

export function clearGUI() {
  const container = document.getElementById("container");
  const info = document.getElementById("info");
  container.innerHTML = ``;
  info.innerHTML = ``;
}
