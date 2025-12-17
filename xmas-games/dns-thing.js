const dnsCards = [
  {
    prompt: "Decides which provider’s DNS records the domain should listen to.",
    correctAnswer: "Nameservers",
    feedbackCorrect: "Yep — nameservers decide which ‘address book’ the internet uses 📘",
    feedbackIncorrect: "This one isn’t about addresses or email yet — it’s about which provider’s records to trust."
  },
  {
    prompt: "Always an IP address, like 78.136.6.76.",
    correctAnswer: "A Record",
    feedbackCorrect: "Correct! A records always point to a physical IP address 🏠",
    feedbackIncorrect: "If you see an IP address, you’re looking at an A record."
  },
  {
    prompt: "Tells email servers where messages should be delivered.",
    correctAnswer: "MX Record",
    feedbackCorrect: "Exactly — MX records control where email goes ✉️",
    feedbackIncorrect: "This one doesn’t control websites — it controls email delivery."
  },
  {
    prompt: "If these point to the wrong place, everything breaks.",
    correctAnswer: "Nameservers",
    feedbackCorrect: "Correct — nameservers are the top-level decision 🧠",
    feedbackIncorrect: "This happens before A or MX records even matter."
  },
  {
    prompt: "Controls where the website loads from.",
    correctAnswer: "A Record",
    feedbackCorrect: "Yep — A records tell browsers where the site lives 🌍",
    feedbackIncorrect: "Email records won’t affect where a website loads from."
  },
  {
    prompt: "Multiple providers listed here can cause confusion and failure.",
    correctAnswer: "Nameservers",
    feedbackCorrect: "Exactly — mixing nameservers is like using three address books at once 📕📗📘",
    feedbackIncorrect: "This problem happens at the provider-selection level."
  },
  {
    prompt: "Already set up by default when a domain is added to Fastmail.",
    correctAnswer: "MX Record",
    feedbackCorrect: "Right — Fastmail handles the MX records automatically 👍",
    feedbackIncorrect: "This one relates to email, not websites or providers."
  },
  {
    prompt: "Usually doesn’t change unless email hosting changes.",
    correctAnswer: "MX Record",
    feedbackCorrect: "Correct — changing MX records can disrupt email, so we avoid it 🔒",
    feedbackIncorrect: "This one isn’t about where a website loads from."
  },
  {
    prompt: "Like choosing which address book to trust.",
    correctAnswer: "Nameservers",
    feedbackCorrect: "Exactly — that’s the core nameserver analogy 📖",
    feedbackIncorrect: "Before you look up addresses, you choose the book."
  },
  {
    prompt: "Like the physical street address of a building.",
    correctAnswer: "A Record",
    feedbackCorrect: "Yep — A records are physical locations 🏢",
    feedbackIncorrect: "This isn’t about email routing."
  },
  {
    prompt: "Only affects email, not websites.",
    correctAnswer: "MX Record",
    feedbackCorrect: "Correct — MX records won’t change how a website loads 📬",
    feedbackIncorrect: "Websites and email use different records."
  },
  {
    prompt: "Points a domain to the server hosting the site.",
    correctAnswer: "A Record",
    feedbackCorrect: "Correct — that’s the website pointer 📍",
    feedbackIncorrect: "Email records don’t control website hosting."
  },
  {
    prompt: "Determines which set of DNS records should be used at all.",
    correctAnswer: "Nameservers",
    feedbackCorrect: "Exactly — without this, nothing else matters 🚦",
    feedbackIncorrect: "This decision comes before any individual record."
  }
];

let current = 0;
let answered = false;
let score = 0;
let answeredCards = [];

const cardDiv = document.getElementById('card');
const progressDiv = document.getElementById('progress');
const feedbackDiv = document.getElementById('feedback');
const btns = Array.from(document.getElementsByClassName('dns-btn'));
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const replayBtn = document.getElementById('replayBtn');

function showCard(idx) {
  if (idx >= dnsCards.length) {
    cardDiv.innerHTML = `<div class=\"dns-end\">Nice work 👏<br><br><strong>Score: ${score} / ${dnsCards.length}</strong><br><br>You've just reinforced the core DNS concepts we use every day.</div>`;
    progressDiv.textContent = '';
    btns.forEach(btn => btn.disabled = true);
    feedbackDiv.textContent = '';
    feedbackDiv.className = 'dns-feedback';
    backBtn.disabled = false;
    nextBtn.disabled = true;
    replayBtn.style.display = 'inline-block';
    const dispatchBtn = document.getElementById('dispatchBtn');
    if (dispatchBtn) dispatchBtn.style.display = 'inline-block';
    return;
  }
  cardDiv.textContent = dnsCards[idx].prompt;
  progressDiv.textContent = `Progress: Card ${idx + 1} of ${dnsCards.length}`;
  feedbackDiv.textContent = '';
  feedbackDiv.className = 'dns-feedback';
  btns.forEach(btn => btn.disabled = false);
  answered = false;
  backBtn.disabled = idx === 0;
  nextBtn.disabled = true;
  replayBtn.style.display = 'none';
  const dispatchBtn = document.getElementById('dispatchBtn');
  if (dispatchBtn) dispatchBtn.style.display = 'none';
}

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    btns.forEach(b => b.disabled = true);
    const picked = btn.getAttribute('data-answer');
    const card = dnsCards[current];
    if (picked === card.correctAnswer) {
      feedbackDiv.textContent = card.feedbackCorrect;
      feedbackDiv.className = 'dns-feedback success';
      if (!answeredCards[current]) {
        score++;
        answeredCards[current] = true;
      }
    } else {
      feedbackDiv.textContent = card.feedbackIncorrect;
      feedbackDiv.className = 'dns-feedback error';
      if (answeredCards[current]) {
        score--;
        answeredCards[current] = false;
      }
    }
    nextBtn.disabled = false;
  });
});

backBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    showCard(current);
  }
});

nextBtn.addEventListener('click', () => {
  if (answered && current < dnsCards.length) {
    current++;
    showCard(current);
  }
});

replayBtn.addEventListener('click', () => {
  current = 0;
  score = 0;
  answeredCards = [];
  showCard(current);
});

showCard(current);
