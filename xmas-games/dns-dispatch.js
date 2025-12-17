const dispatchScenarios = [
  {
    clientMessage: `My business is brand new and has never had a website before.\nCan you sort the domain and set me up with email too?`,
    correctActions: ["nameservers", "a-records"],
    feedbackCorrect: "Correct — we’re handling everything, so nameservers point to us and the site points to our server.",
    feedbackIncorrect: "Email is handled automatically here — changing MX records isn’t needed."
  },
  {
    clientMessage: `My domain and email are with Google.\nI want to keep all my email exactly as it is, but I need a new website.`,
    correctActions: ["a-records"],
    feedbackCorrect: "Exactly — website moves, email stays. No nameserver or MX changes.",
    feedbackIncorrect: "Changing nameservers or MX records here would risk breaking email."
  },
  {
    clientMessage: `My domain’s with Wix. They won’t let me change my nameservers,\nbut I want a website and email with you.`,
    correctActions: ["a-records", "mx-records"],
    feedbackCorrect: "Right — since nameservers can’t move, we update records directly in Wix.",
    feedbackIncorrect: "Nameservers aren’t an option here, so everything happens at record level."
  },
  {
    clientMessage: `My email is already set up in Fastmail.\nI just need you to launch the website.`,
    correctActions: ["a-records"],
    feedbackCorrect: "Correct — email is already sorted, just point the site.",
    feedbackIncorrect: "MX records are already in place — changing them adds risk."
  },
  {
    clientMessage: `You’ve transferred my domain to your provider.\nWhat needs changing to get the site live?`,
    correctActions: ["nameservers", "a-records"],
    feedbackCorrect: "Correct — after transfer, set BCN nameservers and point the site.",
    feedbackIncorrect: "Both nameservers and A records need to be set after a transfer."
  },
  {
    clientMessage: `I don’t know where anything is hosted.\nI just want everything managed by you.`,
    correctActions: ["nameservers", "a-records"],
    feedbackCorrect: "When in doubt and taking full control, nameservers + site pointing covers it.",
    feedbackIncorrect: "Email will be handled automatically once nameservers move."
  },
  {
    clientMessage: `Email is critical — it cannot go down.\nThe website can change whenever.`,
    correctActions: ["a-records"],
    feedbackCorrect: "Perfect — moving only the site avoids any email disruption.",
    feedbackIncorrect: "Nameserver or MX changes introduce unnecessary risk here."
  },
  {
    clientMessage: `I want to move my website to BCN, but I want to keep my email with my current provider.`,
    correctActions: ["a-records"],
    feedbackCorrect: "Correct — just update the A records to point the website, and leave email settings alone.",
    feedbackIncorrect: "Changing nameservers or MX records could disrupt email. Only update the A records for the website."
  },
  {
    clientMessage: `We’re moving email hosting from Google to Fastmail.`,
    correctActions: ["mx-records"],
    feedbackCorrect: "Exactly — email provider changes = MX record changes.",
    feedbackIncorrect: "Website pointing doesn’t affect where email is delivered."
  },
  {
    clientMessage: `Everything’s working fine — I was just checking in.`,
    correctActions: ["none"],
    feedbackCorrect: "Correct — the best DNS change is sometimes no change at all 😌",
    feedbackIncorrect: "Unnecessary DNS changes create unnecessary problems."
  }
];

let current = 0;
let answered = false;
let score = 0;
let answeredScenarios = [];

const cardDiv = document.getElementById('dispatch-card');
const progressDiv = document.getElementById('dispatch-progress');
const feedbackDiv = document.getElementById('dispatch-feedback');
const form = document.getElementById('dispatch-form');
const checkboxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
const backBtn = document.getElementById('dispatch-backBtn');
const nextBtn = document.getElementById('dispatch-nextBtn');
const replayBtn = document.getElementById('dispatch-replayBtn');
const conceptBtn = document.getElementById('dispatch-conceptBtn');

function showScenario(idx) {
  if (idx >= dispatchScenarios.length) {
    cardDiv.innerHTML = `<div class="dns-end">Nice work 👏<br><br><strong>Score: ${score} / ${dispatchScenarios.length}</strong><br><br>You've practiced the DNS decisions you’ll make with real clients.</div>`;
    progressDiv.textContent = '';
    feedbackDiv.textContent = '';
    feedbackDiv.className = 'dns-feedback';
    form.style.display = 'none';
    backBtn.disabled = false;
    nextBtn.disabled = true;
    replayBtn.style.display = 'inline-block';
    conceptBtn.style.display = 'inline-block';
    return;
  }
    cardDiv.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="text-align:center; width:100%;"><strong>Client says:</strong></div>
      <div style="margin-top:12px; text-align:center; width:100%;">"${dispatchScenarios[idx].clientMessage.replace(/\n/g, '<br>')}"</div>
    </div>`;
  progressDiv.textContent = `Scenario ${idx + 1} of ${dispatchScenarios.length}`;
  feedbackDiv.textContent = '';
  feedbackDiv.className = 'dns-feedback';
  form.style.display = '';
  checkboxes.forEach(cb => { cb.checked = false; cb.disabled = false; });
  answered = false;
  backBtn.disabled = idx === 0;
  nextBtn.disabled = true;
  replayBtn.style.display = 'none';
  conceptBtn.style.display = 'none';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (answered) return;
  answered = true;
  const selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
  const correct = dispatchScenarios[current].correctActions;
  const isCorrect = selected.length === correct.length && selected.every(val => correct.includes(val));
  checkboxes.forEach(cb => cb.disabled = true);
  if (isCorrect) {
    feedbackDiv.textContent = dispatchScenarios[current].feedbackCorrect;
    feedbackDiv.className = 'dns-feedback success';
    if (!answeredScenarios[current]) {
      score++;
      answeredScenarios[current] = true;
    }
  } else {
    feedbackDiv.textContent = dispatchScenarios[current].feedbackIncorrect;
    feedbackDiv.className = 'dns-feedback error';
    if (answeredScenarios[current]) {
      score--;
      answeredScenarios[current] = false;
    }
  }
  nextBtn.disabled = false;
});

backBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    showScenario(current);
  }
});

nextBtn.addEventListener('click', () => {
  if (answered && current < dispatchScenarios.length) {
    current++;
    showScenario(current);
  }
});

replayBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  answeredScenarios = [];
  showScenario(current);
});

showScenario(current);
