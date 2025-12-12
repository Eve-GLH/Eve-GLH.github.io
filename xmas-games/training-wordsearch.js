// Training Wordsearch Game
// Words and clues from the training crossword

const WORDS_AND_CLUES = [
  { word: 'SATELLITE', clue: 'Secondary website that shares products and bookings with a main site.' },
  { word: 'ARECORD', clue: 'The DNS entry that sends a domain to the website\'s server IP.' },
  { word: 'DIRECTDEBIT', clue: 'The monthly payment method that must be set up before login details.' },
  { word: 'TIMESLOTS', clue: 'Restrictions that can limit bookings to certain dates and hours.' },
  { word: 'FRESHDESK', clue: 'The main platform where support tickets are managed.' },
  { word: 'CHILD', clue: 'Linked product that shares availability rules with its parent item.' },
  { word: 'CALENDLY', clue: 'Scheduling tool used to manage walkthrough appointments.' },
  { word: 'TEMPLATES', clue: 'Pre-made designs customers can choose for new sites.' },
  { word: 'CRM', clue: 'The system where you check business details, logs, and payment info.' },
  { word: 'SQUARE', clue: 'The system\'s most recommended payment provider.' },
  { word: 'PROPAGATION', clue: 'The delay while DNS changes spread across the internet.' },
  { word: 'NAMESERVERS', clue: 'DNS records that determine which provider controls a domain.' },
  { word: 'QUICKBOOKS', clue: 'Booking system without a website, embedded into external pages.' },
  { word: 'LOGISTICS', clue: 'Admin section for planning deliveries once the site goes live.' },
  { word: 'PRODUCTS', clue: 'Items a customer hires out, editable across multiple sites.' },
  { word: 'FUNNELS', clue: 'Optional add-on that allows operators to show popups and collect customer data.' },
  { word: 'WALKTHROUGH', clue: 'Guided setup calls that take customers from build to go-live.' },
  { word: 'PARENT', clue: 'Product setting used when items depend on each other for availability.' },
  { word: 'SNIPPETS', clue: 'Small editable blocks that control repeated text across a site.' },
  { word: 'FASTMAIL', clue: 'Service used for customer email accounts, including user setup.' },
  { word: 'PACKAGES', clue: 'Combined products that can be booked together using one calendar.' },
  { word: 'REACTIVATION', clue: 'Process of restoring a cancelled site if data is still available.' },
  { word: 'DRIVERS', clue: 'The people assigned to delivery jobs.' },
  { word: 'BROWSERSTACK', clue: 'Tool used to emulate a customer\'s browser when testing bugs.' },
  { word: 'CATEGORIES', clue: 'The product groupings customers add in Walkthrough 1.' },
  { word: 'RETENTION', clue: 'The attempt to persuade a customer not to leave.' },
  { word: 'REDESIGN', clue: 'Replacement of an existing site\'s look using a new layout.' },
  { word: 'DELIVERYAREAS', clue: 'Zones set up early on to calculate travel and eligibility.' },
  { word: 'ROUTEPLANNER', clue: 'Tool for assigning drivers and creating delivery routes.' },
  { word: 'DISCOUNTCODES', clue: 'Promotional settings that adjust pricing for customers.' }
];

const GRID_SIZE = 20;
const grid = [];
const placedWords = [];
const foundWords = new Set();

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function directions() {
  // [rowDelta, colDelta]
  return shuffle([
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
    [1, 1],   // down-right
    [-1, -1], // up-left
    [1, -1],  // down-left
    [-1, 1],  // up-right
  ]);
}

function canPlace(word, row, col, dr, dc) {
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(word) {
  for (let attempt = 0; attempt < 200; attempt++) {
    const [dr, dc] = directions()[0];
    const row = randomInt(GRID_SIZE);
    const col = randomInt(GRID_SIZE);
    if (canPlace(word, row, col, dr, dc)) {
      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        grid[r][c] = word[i];
      }
      placedWords.push({ word, row, col, dr, dc });
      return true;
    }
  }
  return false;
}

function fillGrid() {
  for (let r = 0; r < GRID_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      grid[r][c] = '';
    }
  }
  // Place all words
  for (const { word } of WORDS_AND_CLUES) {
    placeWord(word.toUpperCase());
  }
  // Fill empty cells
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) {
        grid[r][c] = alphabet[randomInt(alphabet.length)];
      }
    }
  }
}

function renderGrid() {
  const gridDiv = document.getElementById('wordsearchGrid');
  gridDiv.innerHTML = '';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = grid[r][c];
      cell.addEventListener('mousedown', handleMouseDown);
      cell.addEventListener('mouseenter', handleMouseEnter);
      cell.addEventListener('mouseup', handleMouseUp);
      gridDiv.appendChild(cell);
    }
  }
}

let selecting = false;
let selection = [];

function handleMouseDown(e) {
  selecting = true;
  selection = [[+this.dataset.row, +this.dataset.col]];
  highlightSelection();
}

function handleMouseEnter(e) {
  if (!selecting) return;
  const last = selection[0];
  const curr = [+this.dataset.row, +this.dataset.col];
  // Only allow straight lines
  if (selection.length === 1 || isStraightLine(selection[0], curr)) {
    selection = getLine(selection[0], curr);
    highlightSelection();
  }
}

function handleMouseUp(e) {
  selecting = false;
  checkSelection();
  selection = [];
  highlightSelection();
}

function isStraightLine([r1, c1], [r2, c2]) {
  return r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2);
}

function getLine([r1, c1], [r2, c2]) {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
  const line = [];
  for (let i = 0; i <= len; i++) {
    line.push([r1 + dr * i, c1 + dc * i]);
  }
  return line;
}

function highlightSelection() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('selected');
  });
  for (const [r, c] of selection) {
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cell.classList.add('selected');
  }
}

function checkSelection() {
  if (selection.length < 2) return;
  const letters = selection.map(([r, c]) => grid[r][c]).join('');
  const reversed = letters.split('').reverse().join('');
  for (const { word } of WORDS_AND_CLUES) {
    if ((letters === word || reversed === word) && !foundWords.has(word)) {
      foundWords.add(word);
      markFound(selection);
      markClueFound(word);
      break;
    }
  }
}

function markFound(cells) {
  for (const [r, c] of cells) {
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cell.classList.add('found');
  }
}

function markClueFound(word) {
  const clueDiv = document.querySelector(`.clue[data-word="${word}"]`);
  if (clueDiv) clueDiv.classList.add('found');
}

function renderClues() {
  const cluesDiv = document.getElementById('cluesList');
  cluesDiv.innerHTML = '';
  WORDS_AND_CLUES.forEach(({ word, clue }, idx) => {
    const div = document.createElement('div');
    div.className = 'clue';
    div.textContent = (idx + 1) + '. ' + clue;
    div.dataset.word = word.toUpperCase();
    cluesDiv.appendChild(div);
  });
}

// Initialize
fillGrid();
renderGrid();
renderClues();
