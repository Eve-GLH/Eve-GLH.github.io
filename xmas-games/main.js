// main.js — Santa’s Satellite Network (placeholder data)

const gameData = {
  intro: {
    title: "🎄 Santa’s Satellite Network",
    text: `Santa’s Christmas empire has grown out of control.\n\nToy Hire, Reindeer Rentals, Hot Tubs for Elves — all running on one booking system.\n\nYour job is to manage Santa’s Satellite Site Network without breaking bookings, prices, or Christmas itself.`,
    button: "▶ Start Shift"
  },
  phases: [
    {
      header: "🧩 Phase 1: Build Santa’s Network",
      prompt: "Santa already has a Mega Pack main site:\n🎄 Santa’s Toy Hire\n\nHe now wants to add new websites. Decide how each should be set up.",
      questions: [
        {
          scenario: "🦌 Reindeer Rentals\nSame products, same diary, different branding.",
          choices: [
            { text: "Satellite Site", correct: true, feedback: "Correct! Satellite sites share products and bookings with the main site." },
            { text: "Stand-alone Website", correct: false, feedback: "Not quite — this would risk double bookings or duplicate setups." },
            { text: "Quick Book", correct: false, feedback: "Not quite — this would risk double bookings or duplicate setups." }
          ]
        },
        {
          scenario: "🛁 Elf Hot Tub Hire\nSame owner, different business focus, shared availability.",
          choices: [
            { text: "Satellite Site", correct: true, feedback: "Correct! Satellite sites share products and bookings with the main site." },
            { text: "Separate Mega Pack", correct: false, feedback: "Not quite — this would risk double bookings or duplicate setups." },
            { text: "Stand-alone Website", correct: false, feedback: "Not quite — this would risk double bookings or duplicate setups." }
          ]
        },
        {
          scenario: "🎪 Elf Party Hire\nAlready a satellite site; he'd like to split this off into a standalone site.",
          choices: [
            { text: "Convert to a stand-alone website", correct: false, feedback: "Not possible — you can't split a satellite site into a stand-alone site." },
            { text: "Not possible", correct: true, feedback: "Correct — satellite sites cannot be split off into stand-alone sites." },
            { text: "Send to development", correct: false, feedback: "There is no supported workaround for this scenario." }
          ]
        }
      ]
    },
    {
      header: "❄️ Phase 2: The Booking Blizzard",
      prompt: "Bookings are coming in fast from Santa’s network.\nRemember: one shared database, multiple front ends.",
      questions: [
        {
          scenario: "Product: Santa’s Sleigh\nBooking came from: 🦌 Reindeer Rentals\n\nWhere will this booking appear?",
          choices: [
            { text: "Only on the Reindeer site", correct: false, feedback: "Not quite — all satellite sites share the same booking list." },
            { text: "On all linked sites", correct: true, feedback: "Correct — all satellite sites share the same booking list." },
            { text: "Only on the main site", correct: false, feedback: "Not quite — all satellite sites share the same booking list." }
          ]
        },
        {
          scenario: "You rename “Santa’s Sleigh” to “Deluxe Sleigh” on the Reindeer site.\n\nWhat happens?",
          choices: [
            { text: "Name changes only on that site", correct: true, feedback: "Correct — names can be site-specific." },
            { text: "Name changes everywhere", correct: false, feedback: "Not quite — names can be site-specific." },
            { text: "Booking breaks", correct: false, feedback: "Not quite — names can be site-specific." }
          ]
        }
      ]
    },
    {
      header: "🎁 Phase 3: The Pricing Trap",
      prompt: "Elf Finance has an idea…\n\nScenario:\n“Let’s increase prices on the corporate site only.”",
      questions: [
        {
          scenario: "Should you allow this?",
          choices: [
            { text: "Sounds good", correct: false, feedback: "🚨 Price mismatches cause booking conflicts across shared databases." },
            { text: "Not allowed", correct: true, feedback: "Correct — prices must be the same across all satellite sites." }
          ]
        }
      ]
    },
    {
      header: "🎄 Phase 4: The Cancellation Catastrophe",
      prompt: "Santa wants to cancel the main site but keep the satellite sites live.",
      questions: [
        {
          scenario: "What should you do?",
          choices: [
            { text: "Allow it", correct: false, feedback: "👻 ORPHANED SATELLITE CREATED\nThis causes bugs, broken links, and chaos.\nRewind and try again." },
            { text: "Explain satellites must be cancelled too", correct: true, feedback: "Correct — cancelling the main site means cancelling all satellites." }
          ],
          rewindOnWrong: true
        }
      ]
    },
    {
      header: "🎅 Phase 5: Santa’s Final Test",
      prompt: "Decide whether each change is Site-Specific or Global.",
      questions: [
        {
          scenario: "Change delivery area on Site 2",
          choices: [
            { text: "Site-specific", correct: true, feedback: "Correct!" },
            { text: "Global", correct: false, feedback: "Not quite." }
          ]
        },
        {
          scenario: "Change product price",
          choices: [
            { text: "Site-specific", correct: false, feedback: "Not quite." },
            { text: "Global", correct: true, feedback: "Correct!" }
          ]
        },
        {
          scenario: "Change product image on Site 3",
          choices: [
            { text: "Site-specific", correct: true, feedback: "Correct!" },
            { text: "Global", correct: false, feedback: "Not quite." }
          ]
        },
        {
          scenario: "Change parent/child relationship",
          choices: [
            { text: "Site-specific", correct: false, feedback: "Not quite." },
            { text: "Global", correct: true, feedback: "Correct!" }
          ]
        }
      ]
    },
    {
      header: "🎁 Phase 6: Product Management",
      prompt: "Santa's elves are getting creative with product customization.\n\nRemember: some settings are site-specific, others are global.",
      questions: [
        {
          scenario: "🎁 Editing a Product Name\n\nSanta wants to rename\n'Princess Bouncy Castle'\nto\n'Disney Princess Bouncy Castle'\non Reindeer Rentals only.\n\nWhat's the quickest way to do this?",
          choices: [
            { text: "Edit the product on the main site", correct: false, feedback: "Not quite — this would change it everywhere." },
            { text: "Use Edit Site dropdown to switch to Reindeer Rentals, then edit product", correct: true, feedback: "Correct! Use the Edit Site dropdown to switch to Reindeer Rentals, then edit the product name. Product names can be site-specific when edited while switched to that site." },
            { text: "Edit the price on the Reindeer site", correct: false, feedback: "Not quite — price changes won't help with renaming." }
          ]
        },
        {
          scenario: "🎁 Editing Product Price\n\nSanta wants higher prices on the corporate site only.",
          choices: [
            { text: "Edit the price on the corporate site", correct: false, feedback: "Not quite — prices are shared across all satellite sites." },
            { text: "Duplicate the product", correct: false, feedback: "Not quite — prices must match across all sites." },
            { text: "Explain prices must match across all sites", correct: true, feedback: "Correct — prices are shared across all satellite sites. Prices are global, always." }
          ]
        },
        {
          scenario: "🎁 Editing a Product Image\n\nThe Hot Tub site needs winter-themed images, but the Toy site should stay the same.",
          choices: [
            { text: "Upload image on the main site", correct: false, feedback: "Not quite — this would change it on all sites." },
            { text: "Log out and switch to the hot tub site", correct: false, feedback: "Not quite — you don't need to log out to switch sites." },
            { text: "Use the Edit Site dropdown to switch to the hot tub site", correct: true, feedback: "Correct — use the Edit Site dropdown to switch to the hot tub site, then upload the image. Images can be different per site." }
          ]
        },
        {
          scenario: "🎁 Parent / Child Relationship\n\nSanta sets a product as a child of another product on Site 2.\n\nWhat happens?",
          choices: [
            { text: "Only Site 2 is affected", correct: false, feedback: "Not quite — relationships are global." },
            { text: "All sites are affected", correct: true, feedback: "Correct — parent/child relationships are global. Logic relationships apply everywhere." },
            { text: "The product becomes unavailable", correct: false, feedback: "Not quite — relationships don't affect availability." }
          ]
        },
        {
          scenario: "🎁 Category Visibility\n\nSanta wants a category to appear on the Hot Tub site only.",
          choices: [
            { text: "Hide the products on the main site", correct: false, feedback: "Not quite — this doesn't address category visibility." },
            { text: "Set category display options in the site drop down", correct: true, feedback: "Correct — categories can be shown or hidden per site. Category visibility is site-specific." },
            { text: "Create a new category", correct: false, feedback: "Not quite — this doesn't help with category visibility." }
          ]
        },
        {
          scenario: "🎁 Category Description\n\nSanta wants different category descriptions for SEO on each site.",
          choices: [
            { text: "Not possible", correct: false, feedback: "Not quite — this is possible per site." },
            { text: "Requires a new category", correct: false, feedback: "Not quite — existing categories can have different descriptions." },
            { text: "Edit description per site", correct: true, feedback: "Correct — category descriptions and meta descriptions can differ per site." }
          ]
        },
        {
          scenario: "🎁 Clearing Cache\n\nA product name changed on Site 1 but didn't update on Site 2.",
          choices: [
            { text: "Wait 24 hours", correct: false, feedback: "Not quite — this might fix caching issues, but we can't wait that long every time!" },
            { text: "Re-save the product", correct: false, feedback: "Not quite — caching is the issue here." },
            { text: "Clear cache on both admins", correct: true, feedback: "Correct — caching can stop site-specific changes appearing." }
          ]
        },
        {
          scenario: "🎁 Deleting vs Editing Products\n\nSanta replaces a bouncy castle with a deck chair by editing the same product.\n\nWhat's the risk?",
          choices: [
            { text: "No risk", correct: false, feedback: "Not quite — this is risky for bookings." },
            { text: "Wrong price on one site", correct: false, feedback: "Not quite — this affects all sites." },
            { text: "Product mismatch across sites", correct: true, feedback: "Correct — this can cause different products to appear under the same booking. Never reuse old products for new ones." }
          ]
        }
      ]
    }
  ]
};

let state = {
  phaseIndex: -1, // Start at -1 to show intro screen
  questionIndex: 0,
  score: 0,
  completed: false,
  answered: false,
  rewindPending: false
};

const scenarioDiv = document.getElementById('scenario');
const choicesDiv = document.getElementById('choices');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const arcadeBtn = document.getElementById('arcade-btn');
const gameTitle = document.getElementById('game-title');
let santaShocked = null, santaShockedRight = null, santaThumbsUp = null, santaGreat = null, santaCool = null;
try {
  santaShocked = document.getElementById('santa-shocked');
  santaShockedRight = document.getElementById('santa-shocked-right');
  santaThumbsUp = document.getElementById('santa-thumbs-up');
  santaGreat = document.getElementById('santa-great');
  santaCool = document.getElementById('santa-cool');
} catch (e) {
  santaShocked = santaShockedRight = santaThumbsUp = santaGreat = santaCool = null;
}

// Navigation buttons
let nextBtn, backBtn;

// Hide error message if JS runs
window.addEventListener('DOMContentLoaded', function() {
  var errMsg = document.getElementById('js-error-message');
  if (errMsg) errMsg.style.display = 'none';
});

function render() {
  feedbackDiv.textContent = '';
  // Show shocked Santa on left when showing questions
  hideAllSantas();
  if (santaShocked) {
    santaShocked.classList.add('active');
    santaShocked.classList.remove('right');
  }
  // Always show intro if game not started
  if (state.phaseIndex === -1 && !state.completed) {
    gameTitle.textContent = gameData.intro.title;
    scenarioDiv.innerHTML = `<p>${gameData.intro.text.replace(/\n/g, '<br>')}</p>`;
    choicesDiv.innerHTML = `<button id="start-btn" class="choice-btn">${gameData.intro.button}</button>`;
    // Attach event listener for Start Shift button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) startBtn.onclick = startGame;
    scoreDiv.textContent = '';
    restartBtn.style.display = 'none';
    arcadeBtn.style.display = 'none';
    removeNavButtons();
    return;
  }
  // Otherwise show questions
  const phase = gameData.phases[state.phaseIndex];
  gameTitle.textContent = phase.header;
  const question = phase.questions[state.questionIndex];
  const santaSad = document.getElementById('santa-sad');
  scenarioDiv.innerHTML = `<p>${phase.prompt.replace(/\n/g, '<br>')}</p><hr><p>${question.scenario.replace(/\n/g, '<br>')}</p>`;
  choicesDiv.innerHTML = question.choices.map((choice, idx) =>
    `<button class="choice-btn mc-btn" onclick="handleChoice(${idx})" ${state.answered ? 'disabled' : ''}>${choice.text}</button>`
  ).join('');
  hideAllSantas();
  if (santaShocked) {
    santaShocked.classList.add('active');
    santaShocked.classList.remove('right');
  }
  renderNavButtons();
  updateProgress();
}

function startGame() {
  state.phase = 0;
  state.phaseIndex = 0;
  state.questionIndex = 0;
  state.score = 0;
  state.completed = false;
  render();
}

function handleChoice(idx) {
  if (state.answered) return;
  const phase = gameData.phases[state.phaseIndex];
  const question = phase.questions[state.questionIndex];
  const choice = question.choices[idx];
  feedbackDiv.textContent = choice.feedback;
  feedbackDiv.style.opacity = 1;
  state.answered = true;
  // Only increment score on first correct answer
  if (choice.correct && !question.answeredCorrect) {
    state.score++;
    question.answeredCorrect = true;
  }
  
  // Show appropriate Santa based on answer
  hideAllSantas();
  if (choice.correct) {
    showCorrectSanta();
  } else {
    // For wrong answers: slide left Santa out left, slide right Santa in from right
    if (santaShocked && santaShockedRight) {
      // Santa is already visible on left, slide it out to the left
      santaShocked.classList.remove('active');
      
      // Simultaneously slide in the right shocked Santa from the right
      santaShockedRight.classList.add('active');
    }
  }
  // Special rewind logic for orphaned satellite (Phase 4)
  if (question.rewindOnWrong && !choice.correct) {
    state.rewindPending = true;
  } else {
    state.rewindPending = false;
  }
  renderNavButtons();
}

function nextStep() {
  const phase = gameData.phases[state.phaseIndex];
  // Handle rewind for orphaned satellite
  if (state.rewindPending) {
    state.questionIndex = 0;

    return;
  }
  if (state.questionIndex < phase.questions.length - 1) {
    state.questionIndex++;
    state.answered = false;
  } else if (state.phaseIndex < gameData.phases.length - 1) {
    state.phaseIndex++;
    state.questionIndex = 0;
    state.answered = false;
  } else {
    state.completed = true;
    showEndScreen();
    return;
  }
  render();
  updateProgress();
}

function prevStep() {
  if (state.questionIndex > 0) {
    state.questionIndex--;
    state.answered = false;
    render();
    updateProgress();
  } else if (state.phaseIndex > 0) {
    const prevPhase = gameData.phases[state.phaseIndex - 1];
    state.phaseIndex--;
    state.questionIndex = prevPhase.questions.length - 1;
    state.answered = false;
    render();
    updateProgress();
  }
}

function showEndScreen() {
  let title, message;
  
  if (state.score >= 17) {
    title = '🎄 Christmas Saved!';
    message = `<p>You successfully managed Santa's Satellite Network.<br>No orphaned sites. No double bookings.<br>The elves are proud of you.</p>`;
  } else if (state.score >= 14) {
    title = '🎅 Christmas Mostly Saved!';
    message = `<p>You managed Santa's Satellite Network pretty well.<br>A few hiccups along the way, but Christmas will go on.<br>The elves think you did okay.</p>`;
  } else {
    title = '🎄 Christmas in Chaos!';
    message = `<p>Santa's Satellite Network is in complete disarray.<br>Orphaned sites everywhere, bookings are broken.<br>The elves are very concerned about Christmas...</p>`;
  }
  
  gameTitle.textContent = title;
  scenarioDiv.innerHTML = message;
  choicesDiv.innerHTML = '';
  scoreDiv.textContent = `Satellite Stability Score: ${state.score}`;
  restartBtn.style.display = 'inline-block';
  arcadeBtn.style.display = 'inline-block';
  removeNavButtons();
  // Show final Santa based on perfect score
  hideAllSantas();
  showCorrectSanta();
  updateProgress();
}

restartBtn.onclick = startGame;
arcadeBtn.onclick = () => window.location.href = '../xmas-games/xmas-games-index.html';

function renderNavButtons() {
  removeNavButtons();
  const navRow = document.createElement('div');
  navRow.id = 'nav-row';
  navRow.style.display = 'flex';
  navRow.style.justifyContent = 'space-between';
  navRow.style.marginTop = '18px';
  // Back button
  backBtn = document.createElement('button');
  backBtn.textContent = '⬅ Back';
  backBtn.className = 'choice-btn';
  backBtn.style.flex = '1';
  backBtn.style.marginRight = '8px';
  
  // Disable and grey out back button if at the beginning
  const isAtBeginning = state.phaseIndex === 0 && state.questionIndex === 0;
  if (isAtBeginning) {
    backBtn.disabled = true;
    backBtn.style.opacity = '0.5';
    backBtn.style.cursor = 'not-allowed';
    backBtn.onclick = null;
  } else {
    backBtn.onclick = prevStep;
  }
  // Next button
  nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next ➡';
  nextBtn.className = 'choice-btn';
  nextBtn.style.flex = '1';
  nextBtn.disabled = !state.answered;
  nextBtn.onclick = nextStep;
  navRow.appendChild(backBtn);
  navRow.appendChild(nextBtn);
  // Insert nav row after choices
  choicesDiv.appendChild(navRow);
}

function removeNavButtons() {
  const navRow = document.getElementById('nav-row');
  if (navRow && navRow.parentNode) navRow.parentNode.removeChild(navRow);
  backBtn = null;
  nextBtn = null;
}

// Reset answered state on start
function startGame() {
  state.phaseIndex = 0;
  state.questionIndex = 0;
  state.score = 0;
  state.completed = false;
  state.answered = false;
  state.rewindPending = false;
  // Clear per-question correct flags
  gameData.phases.forEach(phase => phase.questions.forEach(q => { delete q.answeredCorrect; }));
  render();
  updateProgress();
}

// Update progress bar based on current position
function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  // Calculate total questions across all phases
  const totalQuestions = gameData.phases.reduce((sum, phase) => sum + phase.questions.length, 0);
  
  // Calculate current position
  let currentPosition = 0;
  
  // Handle intro screen (phase -1)
  if (state.phaseIndex === -1) {
    currentPosition = 0;
  } else if (state.completed) {
    // Game is completed, show 100%
    currentPosition = totalQuestions;
  } else {
    // Calculate progress through phases
    for (let i = 0; i < state.phaseIndex; i++) {
      currentPosition += gameData.phases[i].questions.length;
    }
    currentPosition += state.questionIndex + 1; // +1 because we're currently on this question
  }
  
  // Calculate percentage
  const percentage = (currentPosition / totalQuestions) * 100;
  
  // Update progress bar width
  progressBar.style.width = Math.min(100, percentage) + '%';
}

// Update progress bar based on current position\nfunction updateProgress() {\n  const progressBar = document.getElementById('progress-bar');\n  if (!progressBar) return;\n  \n  // Calculate total questions across all phases\n  const totalQuestions = gameData.phases.reduce((sum, phase) => sum + phase.questions.length, 0);\n  \n  // Calculate current position\n  let currentPosition = 0;\n  for (let i = 0; i < state.phaseIndex; i++) {\n    currentPosition += gameData.phases[i].questions.length;\n  }\n  currentPosition += state.questionIndex;\n  \n  // Handle intro screen (phase -1)\n  if (state.phaseIndex === -1) {\n    currentPosition = 0;\n  }\n  \n  // Calculate percentage\n  const percentage = state.completed ? 100 : (currentPosition / totalQuestions) * 100;\n  \n  // Update progress bar width\n  progressBar.style.width = percentage + '%';\n}\n\n// Helper functions for Santa image management
function hideAllSantas() {
  [santaShocked, santaShockedRight, santaThumbsUp, santaGreat, santaCool].forEach(santa => {
    if (santa) {
      santa.classList.remove('active', 'right');
    }
  });
}

function showCorrectSanta() {
  const totalQuestions = gameData.phases.reduce((sum, phase) => sum + phase.questions.length, 0);
  const scorePercentage = state.score / totalQuestions;
  
  if (scorePercentage === 1.0 && santaCool) {
    // Perfect score - show Santa Cool
    santaCool.classList.add('active');
  } else if (scorePercentage >= 0.75 && santaGreat) {
    // High score - show Santa Great
    santaGreat.classList.add('active');
  } else if (santaThumbsUp) {
    // Any correct answer - show Santa Thumbs Up
    santaThumbsUp.classList.add('active');
  }
}
render();