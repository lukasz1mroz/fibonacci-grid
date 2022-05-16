const container = document.getElementById('grid');

const startColIdx = (id) => id % 50;
const startRowIdx = (id) => id - (id % 50) || 0;
const getGridValues = (nodes) => Array.from(nodes).map((node) => Number(node.innerText));

const isRowFib = (idx) => {
  const gridValues = getGridValues(container.childNodes);

  // Edge cases: row break, first values
  if (idx % 50 < 4 || idx < 6) return false;

  // Check fibonacci conditions
  for (let i = 0; i < 5; i++) {
    if (gridValues[idx - i] !== gridValues[idx - i - 1] + gridValues[idx - i - 2] || gridValues[idx] < 3) {
      return false;
    }
  }

  // Return child nodes to change
  const result = Array.from(container.childNodes).slice(idx - 4, idx + 1);
  return result;
};

const isColFib = (idx) => {
  const gridValues = getGridValues(container.childNodes);

  if (idx < 300) return false;

  for (let i = 0; i < 5; i++) {
    if (
      gridValues[idx - i * 50] !== gridValues[idx - (i + 1) * 50] + gridValues[idx - (i + 2) * 50] ||
      gridValues[idx] < 3
    ) {
      return false;
    }
  }

  const result = Array.from(container.childNodes).filter(
    (node, nodeIdx) => nodeIdx >= idx - 200 && nodeIdx <= idx && nodeIdx % 50 === 0
  );
  return result;
};

const highlightRowsColsFib = (e, id) => {
  let divCol = [];
  let divRow = [];
  let fibNodes = [];
  let startColFromId = startColIdx(id);
  let startRowFromId = startRowIdx(id);

  // Constraints: directly pushing without filtering from querySelectorAll
  for (startColFromId; startColFromId < 2500; startColFromId += 50) {
    divCol.push(document.getElementById(startColFromId));
    divRow.push(document.getElementById(startRowFromId));
    startRowFromId++;
  }

  divCol.concat(divRow).forEach((elem) => {
    elem.innerText = Number(elem.innerText) + 1;
    elem.style.backgroundColor = 'yellow';
  });

  for (let i = 0; i < 50; i++) {
    isRowFib(startRowFromId) && fibNodes.push(isRowFib(startRowFromId));
    isColFib(startRowFromId) && fibNodes.push(isColFib(startRowFromId));
  }

  fibNodes.forEach((elem) => {
    elem.innerText = 0;
    elem.style.backgroundColor = 'green';
  });
};

const makeRows = (rows, cols) => {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);

  for (let c = 0; c < rows * cols; c++) {
    let cell = document.createElement('div');
    cell.className = 'grid-item';
    cell.id = c;
    cell.innerText = 0;
    cell.addEventListener('click', (e) => highlightRowsColsFib(e, cell.id));
    container.appendChild(cell);
  }
};

makeRows(50, 50);
