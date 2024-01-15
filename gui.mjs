export function addRectanglesToContainer(coordinates) {
  if (!coordinates) {
    return alert("no coordinates given");
  }
  const container = document.getElementById("container");

  coordinates.forEach((coord) => {
    const rectangle = document.createElement("div");
    const color = getRandomColor();

    rectangle.style.position = "absolute";
    rectangle.style.bottom = coord.bottom + "px";
    rectangle.style.left = coord.left + "px";
    rectangle.style.width = coord.right - coord.left + "px";
    rectangle.style.height = coord.top - coord.bottom + "px";
    rectangle.style.backgroundColor = color;
    rectangle.innerHTML = coord.initialOrder.toString();
    rectangle.style.display = "flex";
    rectangle.style.alignItems = "center";
    rectangle.style.justifyContent = "center";
    rectangle.style.color = "#ffffff";

    container.appendChild(rectangle);
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
