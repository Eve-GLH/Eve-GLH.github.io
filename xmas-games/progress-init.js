// Add this to the end of main.js to initialize progress
setTimeout(updateProgress, 100);

// Add updateProgress calls to key functions
const originalRender = render;
render = function() {
  originalRender.call(this);
  updateProgress();
};

const originalNextStep = nextStep;
nextStep = function() {
  originalNextStep.call(this);
  updateProgress();
};

const originalPrevStep = prevStep;
prevStep = function() {
  originalPrevStep.call(this);
  updateProgress();
};

const originalStartGame = startGame;
startGame = function() {
  originalStartGame.call(this);
  updateProgress();
};