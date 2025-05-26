function generateGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (let i = 1; i <= 25; i++) {
    const cell = document.createElement('div');
    cell.textContent = i;
    grid.appendChild(cell);
  }
}

function predictSafeTiles() {
  generateGrid();
  const mines = parseInt(document.getElementById('mines').value);
  const gridCells = document.querySelectorAll('#grid div');

  let safeCount = 1;
  if (mines <= 4) safeCount = 3;
  else if (mines <= 15) safeCount = 2;

  // AI-style weighted logic
  const weights = [
    3, 2, 2, 2, 3,
    2, 1, 1, 1, 2,
    2, 1, 5, 1, 2,
    2, 1, 1, 1, 2,
    3, 2, 2, 2, 3
  ];

  const tileIndices = weights
    .map((weight, index) => ({ index, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, safeCount)
    .map(obj => obj.index);

  tileIndices.forEach(index => {
    gridCells[index].classList.add('safe');
  });
}

window.onload = generateGrid;
