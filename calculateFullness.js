export function calculateFullness(blocks, container) {
  const totalFilledArea = blocks.reduce((accumulator, block) => {
    const blockArea = (block.right - block.left) * (block.top - block.bottom);
    return accumulator + blockArea;
  }, 0);

  let totalEnclosedArea = 0;
  let currentLine = [{ x1: 0, x2: container.width, enclosed: false }];

  for (let i = container.height; i > 0; i--) {
    const intersectedBlocks = blocks
      .filter((block) => block.bottom <= i && block.top >= i)
      .sort((a, b) => a.left - b.left);

    const newLine = [];

    let currentX = 0;
    intersectedBlocks.forEach((block) => {
      if (currentX < block.left) {
        newLine.push({
          x1: currentX,
          x2: block.left,
          enclosed: checkSegmentEnclosement({ x1: currentX, x2: block.left }),
        });
      }
      currentX = block.right;
    });

    if (currentX < container.width) {
      newLine.push({
        x1: currentX,
        x2: container.width,
        enclosed: checkSegmentEnclosement({
          x1: currentX,
          x2: container.width,
        }),
      });
    }
    newLine.forEach((segment) => {
      if (segment.enclosed === true) {
        totalEnclosedArea += segment.x2 - segment.x1;
      }
    });

    currentLine = newLine;
  }
  return 1 - totalEnclosedArea / (totalEnclosedArea + totalFilledArea);

  function checkSegmentEnclosement(segment) {
    for (const existingSegment of currentLine) {
      if (
        segment.x1 <= existingSegment.x2 &&
        segment.x2 >= existingSegment.x1
      ) {
        return existingSegment.enclosed;
      }
    }
    return true;
  }
}
