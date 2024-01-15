export function PackBlocks(blocks, container) {
  const sortedBlocks = blocks
    .map((block, index) => ({
      ...block,
      initialOrder: index,
    }))
    .sort((a, b) => b.width * b.height - a.width * a.height);
  const placedBlocks = [];
  const unfitBlocks = [];

  let availableCoordinatesToPlace = [
    { x: 0, y: 0, maxHeight: container.height, maxWidth: container.width },
  ];

  for (const block of sortedBlocks) {
    const coordinatesToPlace = findCoordinatesToPlace(block);
    if (!Object.values(coordinatesToPlace).some((val) => val === null)) {
      placeBlock(block, coordinatesToPlace, availableCoordinatesToPlace);
    } else {
      unfitBlocks.push(block);
    }
  }

  function findCoordinatesToPlace(block) {
    const blocks = [block, { width: block.height, height: block.width }];

    let mostOptimalPosition = {
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      addedHeight: Infinity,
    };

    for (const blockToPlace of blocks) {
      mostOptimalPosition = tryToFit(
        blockToPlace,
        mostOptimalPosition,
        availableCoordinatesToPlace
      );
    }
    return mostOptimalPosition;
  }

  function tryToFit(
    blockToPlace,
    mostOptimalPosition,
    availableCoordinatesToPlace
  ) {
    for (let i = 0; i < availableCoordinatesToPlace.length; i++) {
      if (
        availableCoordinatesToPlace[i].maxHeight >= blockToPlace.height &&
        availableCoordinatesToPlace[i].maxWidth >= blockToPlace.width
      ) {
        const addedHeight =
          availableCoordinatesToPlace[i].y + blockToPlace.height;
        if (addedHeight < mostOptimalPosition.addedHeight) {
          const newCoordinates = {
            x1: availableCoordinatesToPlace[i].x,
            x2: availableCoordinatesToPlace[i].x + blockToPlace.width,
            y1: availableCoordinatesToPlace[i].y,
            y2: availableCoordinatesToPlace[i].y + blockToPlace.height,
            addedHeight: addedHeight,
          };
          if (!isOverlapping(newCoordinates)) {
            mostOptimalPosition = newCoordinates;
          }
        }
      }
    }
    return mostOptimalPosition;
  }

  function isOverlapping(coordinatesToPlace) {
    return placedBlocks.some((block) => {
      const notIntersecting =
        coordinatesToPlace.x2 <= block.left ||
        coordinatesToPlace.x1 >= block.right ||
        coordinatesToPlace.y2 <= block.bottom ||
        coordinatesToPlace.y1 >= block.top;

      return !notIntersecting;
    });
  }

  function placeBlock(blockToPlace, coordinatesToPlace) {
    const left = coordinatesToPlace.x1;
    const bottom = coordinatesToPlace.y1;
    const right = coordinatesToPlace.x2;
    const top = coordinatesToPlace.y2;

    placedBlocks.push({
      left,
      bottom,
      right,
      top,
      x: coordinatesToPlace.x1,
      y: coordinatesToPlace.y1,
      initialOrder: blockToPlace.initialOrder,
    });

    availableCoordinatesToPlace = availableCoordinatesToPlace.filter(
      (coords) => {
        return (
          coords.x !== coordinatesToPlace.x1 ||
          coords.y !== coordinatesToPlace.y1
        );
      }
    );

    availableCoordinatesToPlace.push(
      {
        x: left,
        y: top,
        maxHeight: container.height - top,
        maxWidth: container.width - left,
      },
      {
        x: right,
        y: bottom,
        maxHeight: container.height - bottom,
        maxWidth: container.width - right,
      }
    );
  }
  return {
    placedBlocks: placedBlocks.map(
      ({ top, left, right, bottom, initialOrder }) => ({
        top,
        left,
        right,
        bottom,
        initialOrder,
      })
    ),
    unfitBlocks: unfitBlocks,
  };
}
