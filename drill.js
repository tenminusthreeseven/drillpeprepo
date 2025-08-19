// Generate 50 random colors
const colors = Array.from({ length: 50 }, () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
});

window.addEventListener("scroll", updateBackground);
window.addEventListener("load", updateBackground); // run on page load too

function updateBackground() {
  const scrollTop = window.scrollY; 
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  // find which 2 colors we should be between
  const index = Math.floor(scrollPercent * (colors.length - 1));
  const nextIndex = Math.min(index + 1, colors.length - 1);

  // parse rgb values
  const [r1, g1, b1] = colors[index].match(/\d+/g).map(Number);
  const [r2, g2, b2] = colors[nextIndex].match(/\d+/g).map(Number);

  // progress between these two colors
  const percentBetween = (scrollPercent * (colors.length - 1)) - index;
  const r = Math.floor(r1 * (1 - percentBetween) + r2 * percentBetween);
  const g = Math.floor(g1 * (1 - percentBetween) + g2 * percentBetween);
  const b = Math.floor(b1 * (1 - percentBetween) + b2 * percentBetween);

  // apply bg
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  // check brightness (perceived luminance)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness > 150) {
    document.body.style.color = "black"; // bright bg → black text
  } else {
    document.body.style.color = "white"; // dark bg → white text
  }
}
