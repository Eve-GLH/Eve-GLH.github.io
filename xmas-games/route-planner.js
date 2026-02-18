// Route Planner: First Day Live - Interactive Game
class RoutePlannerGame {
    constructor() {
        this.confidence = 50;
        this.currentScenario = 0;
        this.shiftProgress = 0;
        this.moduleScores = { nav: [], jobs: [], map: [], vehicles: [] };
        this.scenarios = this.initializeScenarios();
        this.draggedElement = null;
        this.init();
    }

    init() {
        this.updateConfidence(0);
        this.updateShiftProgress();
        this.setupEventListeners();
        this.resetSkipButton(); // Initialize skip button
        this.startFirstScenario();
    }

    initializeScenarios() {
        return [
            // Module 1: The Morning Begins (Navigation)
            {
                module: 'nav',
                type: 'call-click',
                callMessage: '"Hi, I just want to check what\'s booked in for tomorrow."',
                callPrompt: 'Click the correct tool to help this customer:',
                correctTool: 'calendar',
                interface: 'header',
                feedback: {
                    correct: 'Correct! You navigate dates using the calendar.',
                    incorrect: 'That tool doesn\'t change dates. Try the calendar.'
                }
            },
            {
                module: 'nav',
                type: 'consequence',
                setup: () => this.simulateChanges(),
                callMessage: 'You adjusted a job setting. A warning banner appeared: "You are leaving the page..." Changes disappeared!',
                callPrompt: 'What did you forget?',
                correctTool: 'save',
                interface: 'header',
                feedback: {
                    correct: 'Exactly! Always save your changes before leaving.',
                    incorrect: 'The Save button stores your changes. Remember to use it!'
                }
            },
            {
                module: 'nav',
                type: 'call-click',
                setup: () => this.showNotification(),
                callMessage: '"Has the driver started the job yet?"',
                callPrompt: 'Where do you check for driver updates?',
                correctTool: 'notifications',
                interface: 'header',
                feedback: {
                    correct: 'Perfect! Notifications show real-time driver updates.',
                    incorrect: 'Check Notifications for real-time updates.'
                }
            },

            // Module 2: Job Control Chaos
            {
                module: 'jobs',
                type: 'drag-drop',
                callMessage: 'Things are speeding up! Match each tool to its purpose.',
                callPrompt: 'Drag tools to their correct functions:',
                interface: 'drag-drop',
                feedback: {
                    correct: 'Great job matching the tools!',
                    incorrect: 'Not quite right. Try again.'
                }
            },
            {
                module: 'jobs',
                type: 'crisis',
                callMessage: '"How do I assign a job?"',
                callPrompt: 'Show the customer how to assign jobs:',
                correctTools: ['unassigned-job', 'auto-assign'], // Accept multiple correct answers
                interface: 'jobs',
                feedback: {
                    correct: 'Correct! You can either click the + next to a job or use Auto Assign.',
                    incorrect: 'Try clicking the + next to a job or using Auto Assign to allocate jobs to vehicles.'
                }
            },

            // Module 3: Map Mayhem
            {
                module: 'map',
                type: 'map-fix',
                setup: () => this.zoomMapOut(),
                callMessage: 'The map is zoomed way out and you can\'t see the jobs properly.',
                callPrompt: 'Fix the map view:',
                correctTool: 'reset-map',
                interface: 'map',
                feedback: {
                    correct: 'Perfect! Reset Map centers the view on all jobs.',
                    incorrect: 'Use Reset Map to center the view properly.'
                }
            },
            {
                module: 'map',
                type: 'scroll-chaos',
                setup: () => this.enableScrollZoom(),
                callMessage: 'The map keeps zooming when you scroll the page. This is annoying!',
                callPrompt: 'Stop the scroll zoom behavior:',
                correctTools: ['map-settings', 'lock-scroll'],
                interface: 'map',
                feedback: {
                    correct: 'Great! You can either use Map Settings or the Lock scroll zoom checkbox.',
                    incorrect: 'Try using Map Settings or the Lock scroll zoom checkbox to prevent unwanted zooming.'
                }
            },
            {
                module: 'map',
                type: 'call-click',
                callMessage: '"The driver starts from home, not the depot."',
                callPrompt: 'How do you change where a vehicle starts?',
                correctTool: 'map-settings',
                interface: 'map',
                feedback: {
                    correct: 'Correct! Map Settings lets you change start/end locations.',
                    incorrect: 'You need Map Settings to change vehicle start locations.'
                }
            },

            // Module 4: Fleet Control
            {
                module: 'vehicles',
                type: 'drag-assignment',
                setup: () => this.setupVehicleAssignment(),
                callMessage: 'A new job needs to be assigned. Choose the correct vehicle.',
                callPrompt: 'Drag the job to the appropriate vehicle:',
                interface: 'vehicle-cards',
                feedback: {
                    correct: 'Perfect! Only vehicles with drivers can receive jobs.',
                    incorrect: 'This vehicle has no driver. Choose a vehicle that has a driver assigned.'
                }
            },
            {
                module: 'vehicles',
                type: 'unassign-all',
                callMessage: 'Vehicle C needs to send all jobs back for reassignment.',
                callPrompt: 'Send these jobs back to unassigned using the refresh button:',
                correctTool: 'unassign-jobs',
                interface: 'vehicle-cards-unassign',
                feedback: {
                    correct: 'Excellent! The refresh button unassigns all jobs from this vehicle.',
                    incorrect: 'Look for the refresh button next to the vehicle name to unassign all jobs.'
                }
            }
        ];
    }

    setupEventListeners() {
        // Tool click listeners
        document.addEventListener('click', (e) => {
            console.log('Click detected on:', e.target);
            if (e.target.closest('.clickable-tool')) {
                const toolElement = e.target.closest('.clickable-tool');
                const tool = toolElement.dataset.tool;
                console.log('Tool clicked:', tool);
                console.log('Current scenario:', this.currentScenario);
                this.handleToolClick(tool);
            }
        });

        // Drag and drop listeners
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        // Make draggable items draggable
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                this.draggedElement = e.target;
                e.target.classList.add('dragging');
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                e.target.classList.remove('dragging');
                this.draggedElement = null;
            }
        });

        // Handle drop zones
        document.addEventListener('dragover', (e) => {
            if (e.target.classList.contains('drop-zone')) {
                e.preventDefault();
                e.target.classList.add('drag-over');
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('drop-zone')) {
                e.target.classList.remove('drag-over');
            }
        });

        document.addEventListener('drop', (e) => {
            if (e.target.classList.contains('drop-zone')) {
                e.preventDefault();
                e.target.classList.remove('drag-over');
                this.handleDrop(e.target);
            }
        });
    }

    startFirstScenario() {
        this.loadScenario(0);
    }

    loadScenario(index) {
        console.log('Loading scenario:', index, 'Current scenario was:', this.currentScenario);
        if (index >= this.scenarios.length) {
            console.log('All scenarios complete, ending shift');
            this.completeShift();
            return;
        }

        this.currentScenario = index;
        const scenario = this.scenarios[index];
        console.log('Loaded scenario:', scenario.type, 'module:', scenario.module);

        // Run setup if exists
        if (scenario.setup) {
            scenario.setup();
        }

        // Update call panel
        this.updateCallPanel(scenario);

        // Show appropriate interface
        this.showInterface(scenario.interface);

        // Update progress
        this.updateShiftProgress();

        // Reset and show skip button
        this.resetSkipButton();
    }

    resetSkipButton() {
        const skipBtn = document.getElementById('skipBtn');
        if (skipBtn) {
            skipBtn.disabled = false;
            skipBtn.classList.remove('used');
            skipBtn.textContent = '⏭️ Skip (-5 Confidence)';
            skipBtn.style.display = 'block';
            skipBtn.style.visibility = 'visible';
        } else {
            console.log('Skip button not found - DOM may not be ready');
        }
    }

    skipQuestion() {
        console.log('Skip button clicked');
        const scenario = this.scenarios[this.currentScenario];
        const skipBtn = document.getElementById('skipBtn');
        
        if (!scenario) {
            console.log('No current scenario');
            return;
        }
        
        // Disable skip button
        if (skipBtn) {
            skipBtn.disabled = true;
            skipBtn.classList.add('used');
            skipBtn.textContent = '⏭️ Skipped';
        } else {
            console.log('Skip button not found when trying to disable');
        }
        
        // Deduct confidence
        this.updateConfidence(-5);
        this.recordScore(scenario.module, false);
        
        // Show correct answer with feedback
        this.showSkipFeedback(scenario);
        
        // Auto-advance after showing correct answer
        setTimeout(() => {
            this.nextScenario();
        }, 2500);
    }

    showSkipFeedback(scenario) {
        // Highlight correct tool(s) if applicable
        if (scenario.correctTool) {
            this.highlightCorrectTool(scenario.correctTool);
        } else if (scenario.correctTools) {
            // Highlight all correct tools
            scenario.correctTools.forEach(tool => this.highlightCorrectTool(tool));
        }
        
        // Show skip feedback message
        let correctAnswerText;
        if (scenario.correctTool) {
            correctAnswerText = this.getCorrectToolName(scenario.correctTool);
        } else if (scenario.correctTools) {
            correctAnswerText = scenario.correctTools.map(tool => this.getCorrectToolName(tool)).join(' or ');
        }
        
        const message = `Skipped! The correct answer was: ${correctAnswerText}. ${scenario.feedback.correct}`;
        this.showFeedback(message, 'error', '-5 Confidence');
    }

    getCorrectToolName(tool) {
        const toolNames = {
            'calendar': 'Calendar',
            'save': 'Save',
            'notifications': 'Notifications',
            'search': 'Search',
            'assign-all': 'Assign All',
            'auto-assign': 'Auto Assign',
            'full-screen': 'Full Screen',
            'balance': 'Today\'s Balance',
            'reset-map': 'Reset Map',
            'map-settings': 'Map Settings',
            'lock-scroll': 'Lock scroll zoom',
            'traffic-toggle': 'Traffic Toggle',
            'unassign-all': 'Unassign All',
            'unassign-jobs': 'Unassign Jobs (↻)',
            'complete-jobs': 'Complete Jobs',
            'unassigned-job': 'Job Assignment (+)'
        };
        return toolNames[tool] || tool;
    }

    updateCallPanel(scenario) {
        document.getElementById('callMessage').innerHTML = scenario.callMessage;
        document.getElementById('callPrompt').textContent = scenario.callPrompt;
    }

    showInterface(interfaceType) {
        // Hide all interface sections
        document.querySelectorAll('.mock-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show requested interface
        switch(interfaceType) {
            case 'header':
                // Header is always visible
                break;
            case 'jobs':
                document.getElementById('unassignedSection').style.display = 'block';
                break;
            case 'map':
                document.getElementById('mapSection').style.display = 'block';
                break;
            case 'vehicles':
                document.getElementById('vehiclesSection').style.display = 'block';
                break;
            case 'vehicle-cards':
                document.getElementById('vehicleCardsSection').style.display = 'block';
                break;
            case 'vehicle-cards-unassign':
                document.getElementById('vehicleCardsSection').style.display = 'block';
                this.setupVehicleUnassignment();
                break;
            case 'drag-drop':
                document.getElementById('dragDropSection').style.display = 'block';
                this.setupDragDropMatching();
                break;
            default:
                document.getElementById('unassignedSection').style.display = 'block';
        }
    }

    handleToolClick(tool) {
        const scenario = this.scenarios[this.currentScenario];
        
        // Check if the tool is correct - support both single correctTool and multiple correctTools
        const isCorrect = scenario.correctTool === tool || 
                         (scenario.correctTools && scenario.correctTools.includes(tool));
        
        if (isCorrect) {
            this.handleCorrectAction(scenario);
        } else {
            this.handleIncorrectAction(scenario);
        }
    }

    handleCorrectAction(scenario) {
        console.log('Correct action for scenario:', this.currentScenario, scenario.type);
        const points = 10;
        this.updateConfidence(points);
        this.recordScore(scenario.module, true);
        this.showFeedback(scenario.feedback.correct, 'success', `+${points} Confidence`);
        
        // Hide skip button
        const skipBtn = document.getElementById('skipBtn');
        if (skipBtn) skipBtn.style.display = 'none';
        
        // Visual feedback
        this.highlightCorrectTool(scenario.correctTool);
        
        console.log('Setting timeout to advance to next scenario...');
        setTimeout(() => {
            console.log('Timeout triggered, calling nextScenario');
            this.nextScenario();
        }, 2000);
    }

    handleIncorrectAction(scenario) {
        const points = -5;
        this.updateConfidence(points);
        this.recordScore(scenario.module, false);
        this.showFeedback(scenario.feedback.incorrect, 'error', `${points} Confidence`);
        
        // Don't hide skip button on incorrect - allow them to skip if still stuck
    }

    highlightCorrectTool(tool) {
        const element = document.querySelector(`[data-tool="${tool}"]`);
        if (element) {
            element.classList.add('highlighted');
            setTimeout(() => {
                element.classList.remove('highlighted');
            }, 1500);
        }
    }

    setupDragDropMatching() {
        // Shuffle the purposes on the right side
        const dropTargetsContainer = document.querySelector('.drop-targets');
        if (dropTargetsContainer) {
            const dropZones = Array.from(dropTargetsContainer.querySelectorAll('.drop-zone'));
            
            // Shuffle the drop zones array using Fisher-Yates algorithm
            for (let i = dropZones.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [dropZones[i], dropZones[j]] = [dropZones[j], dropZones[i]];
            }
            
            // Clear the container and re-append in shuffled order
            dropTargetsContainer.innerHTML = '';
            dropZones.forEach(zone => {
                dropTargetsContainer.appendChild(zone);
            });
        }
        
        // Enable dragging
        document.querySelectorAll('.draggable-item').forEach(item => {
            item.draggable = true;
        });
    }

    handleDrop(dropZone) {
        if (!this.draggedElement) return;

        const draggedTool = this.draggedElement.dataset.tool;
        const targetPurpose = dropZone.dataset.purpose;

        if (draggedTool === targetPurpose) {
            // Correct match
            dropZone.classList.add('matched');
            dropZone.textContent = this.draggedElement.textContent + ' ✓';
            this.draggedElement.style.display = 'none';
            
            // Check if all matched
            const allMatched = document.querySelectorAll('.drop-zone.matched').length === 4;
            if (allMatched) {
                this.handleCorrectAction(this.scenarios[this.currentScenario]);
            }
        } else {
            // Incorrect match
            dropZone.classList.add('incorrect');
            setTimeout(() => {
                dropZone.classList.remove('incorrect');
            }, 500);
        }
    }

    simulateChanges() {
        const saveBtn = document.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.classList.add('changed');
        }
    }

    showNotification() {
        document.getElementById('notificationBadge').textContent = '1';
        document.getElementById('notificationBadge').style.display = 'flex';
    }

    zoomMapOut() {
        document.getElementById('mapDisplay').classList.add('zoomed-out');
    }

    enableScrollZoom() {
        // Visual indicator that scroll zoom is annoying
        document.getElementById('mapDisplay').style.cursor = 'zoom-in';
    }

    setupVehicleAssignment() {
        // Set up drag and drop for job rows to vehicle assignment rows
        const vehicleDropTargets = document.querySelectorAll('.vehicle-drop-target');
        
        vehicleDropTargets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault();
                target.classList.add('drop-over');
            });
            
            target.addEventListener('dragleave', () => {
                target.classList.remove('drop-over');
            });
            
            target.addEventListener('drop', (e) => {
                e.preventDefault();
                target.classList.remove('drop-over');
                
                const vehicle = target.dataset.vehicle;
                const draggedJob = this.draggedElement;
                
                if (!draggedJob) return;
                
                if (vehicle === 'van1') {
                    // Van 1 has a driver - correct answer
                    this.handleCorrectAction(this.scenarios[this.currentScenario]);
                    
                    // Visual feedback - show job was assigned
                    target.style.background = '#e8f5e9';
                    target.querySelector('.driver-info').textContent = `Driver: Mike Johnson (+ Job ${draggedJob.dataset.job})`;
                    
                    // Hide the dragged job
                    draggedJob.style.display = 'none';
                } else {
                    // Van 2 or Van 3 have no driver - incorrect
                    this.showFeedback('This vehicle has no driver assigned. Choose a vehicle with a driver.', 'error');
                    
                    // Visual feedback for incorrect drop
                    target.style.background = '#fee';
                    setTimeout(() => {
                        target.style.background = '';
                    }, 1000);
                }
            });
        });
        
        // Make sure job rows are draggable
        document.querySelectorAll('.assignment-job-row').forEach(row => {
            row.addEventListener('dragstart', (e) => {
                this.draggedElement = row;
                row.classList.add('dragging');
            });
            
            row.addEventListener('dragend', (e) => {
                row.classList.remove('dragging');
                this.draggedElement = null;
            });
        });
    }

    setupVehicleUnassignment() {
        // Hide the unassigned jobs section for this scenario
        const unassignedSection = document.querySelector('.assignment-unassigned-section');
        if (unassignedSection) {
            unassignedSection.style.display = 'none';
        }

        // Update the vehicle assignment area to show Vehicle C with assigned jobs
        const vehicleArea = document.querySelector('.vehicle-assignment-area');
        if (vehicleArea) {
            vehicleArea.innerHTML = `
                <div class="vehicle-assignment-row">
                    <span class="vehicle-icon">⚙️</span>
                    <span class="vehicle-name">Van 1</span>
                    <span class="driver-info">Driver: Mike Johnson</span>
                    <div class="vehicle-controls">
                        <span class="control-icon">E..</span>
                        <span class="control-icon">📋</span>
                    </div>
                </div>
                <div class="vehicle-assignment-row">
                    <span class="vehicle-icon">⚙️</span>
                    <span class="vehicle-name">Van 2</span>
                    <button class="assign-driver-btn">Assign Driver</button>
                </div>
                <div class="vehicle-assignment-row vehicle-with-jobs">
                    <span class="vehicle-icon">⚙️</span>
                    <span class="vehicle-name">Vehicle C</span>
                    <button class="refresh-btn clickable-tool" data-tool="unassign-jobs" title="Unassign all jobs">↻</button>
                    <span class="driver-info">Driver: Sarah Wilson</span>
                </div>
                <div class="assigned-jobs-list">
                    <div class="assigned-job-row" data-job="27-9">
                        <span class="job-id">27-9</span>
                        <span class="job-name">Elaine Hines</span>
                        <span class="job-address">M40 5GH</span>
                        <span class="job-time">12:00 pm</span>
                    </div>
                    <div class="assigned-job-row" data-job="26-13">
                        <span class="job-id">26-13</span>
                        <span class="job-name">Lewis Bailey</span>
                        <span class="job-address">OL1 4BY</span>
                        <span class="job-time">03:00 pm</span>
                    </div>
                    <div class="assigned-job-row" data-job="30-15">
                        <span class="job-id">30-15</span>
                        <span class="job-name">Miss Dino Saur</span>
                        <span class="job-address">OL2 3BP</span>
                        <span class="job-time">03:00 pm</span>
                    </div>
                </div>
            `;
        }
    }

    updateConfidence(change) {
        this.confidence = Math.max(0, Math.min(100, this.confidence + change));
        const fill = document.getElementById('confidenceFill');
        const value = document.getElementById('confidenceValue');
        
        fill.style.width = `${this.confidence}%`;
        value.textContent = this.confidence;
        
        // Color based on confidence level
        if (this.confidence >= 70) {
            fill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (this.confidence >= 40) {
            fill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
        } else {
            fill.style.background = 'linear-gradient(90deg, #f44336, #e53935)';
        }
    }

    updateShiftProgress() {
        const progress = (this.currentScenario / this.scenarios.length) * 100;
        document.getElementById('shiftProgress').style.width = `${progress}%`;
    }

    showFeedback(message, type, points = '') {
        const feedbackMessage = document.getElementById('feedbackMessage');
        const pointsDisplay = document.getElementById('pointsDisplay');
        
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        
        if (points) {
            pointsDisplay.innerHTML = `<span class="points-${type === 'success' ? 'gain' : 'loss'}">${points}</span>`;
        }
    }

    recordScore(module, correct) {
        this.moduleScores[module].push(correct ? 1 : 0);
    }

    nextScenario() {
        console.log('nextScenario called, current:', this.currentScenario, 'advancing to:', this.currentScenario + 1);
        this.loadScenario(this.currentScenario + 1);
    }

    completeShift() {
        this.calculateFinalScores();
        document.getElementById('shiftSummary').style.display = 'flex';
    }

    calculateFinalScores() {
        const moduleKeys = ['nav', 'jobs', 'map', 'vehicles'];
        const scoreElements = ['navMastery', 'jobMastery', 'mapMastery', 'fleetMastery'];
        
        let totalScore = 0;
        let totalQuestions = 0;
        
        moduleKeys.forEach((key, index) => {
            const scores = this.moduleScores[key];
            if (scores.length > 0) {
                const percentage = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
                document.getElementById(scoreElements[index]).textContent = `${percentage}%`;
                
                totalScore += scores.reduce((a, b) => a + b, 0);
                totalQuestions += scores.length;
            }
        });
        
        const overallPercentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
        
        // Set badge based on overall performance
        const badgeAward = document.getElementById('badgeAward');
        const badgeIcon = badgeAward.querySelector('.badge-icon');
        const badgeName = badgeAward.querySelector('.badge-name');
        
        if (overallPercentage >= 90) {
            badgeIcon.textContent = '🥇';
            badgeName.textContent = 'Route Planner Pro';
        } else if (overallPercentage >= 75) {
            badgeIcon.textContent = '🥈';
            badgeName.textContent = 'Confident Operator';
        } else {
            badgeIcon.textContent = '🥉';
            badgeName.textContent = 'Planner in Training';
        }
    }

    // Confidence Mode (for explain-it scenarios)
    showConfidenceModal(question, modelAnswer) {
        document.getElementById('modalQuestion').textContent = question;
        document.getElementById('modelAnswerText').textContent = modelAnswer;
        document.getElementById('confidenceModal').style.display = 'flex';
        document.getElementById('explanationInput').value = '';
        document.getElementById('modalModelAnswer').style.display = 'none';
    }

    submitExplanation() {
        const userInput = document.getElementById('explanationInput').value;
        if (userInput.trim()) {
            document.getElementById('modalModelAnswer').style.display = 'block';
            this.updateConfidence(5); // Small confidence boost for attempting
        }
    }

    closeConfidenceModal() {
        document.getElementById('confidenceModal').style.display = 'none';
        this.nextScenario();
    }

    // Action methods for summary buttons
    replayWeakAreas() {
        // Find modules with scores below 80%
        const weakModules = [];
        const moduleKeys = ['nav', 'jobs', 'map', 'vehicles'];
        
        moduleKeys.forEach(key => {
            const scores = this.moduleScores[key];
            if (scores.length > 0) {
                const percentage = (scores.reduce((a, b) => a + b, 0) / scores.length) * 100;
                if (percentage < 80) {
                    weakModules.push(key);
                }
            }
        });
        
        if (weakModules.length > 0) {
            alert(`Replaying weak areas: ${weakModules.join(', ')}`);
            // Reset and replay only weak scenarios
            this.resetGame();
        } else {
            alert('Great job! No weak areas to replay.');
        }
    }

    startSpeedRound() {
        alert('Speed Round: Complete all scenarios in under 2 minutes!');
        this.resetGame();
        // Could implement time pressure here
    }

    resetGame() {
        this.confidence = 50;
        this.currentScenario = 0;
        this.shiftProgress = 0;
        this.moduleScores = { nav: [], jobs: [], map: [], vehicles: [] };
        
        document.getElementById('shiftSummary').style.display = 'none';
        this.updateConfidence(0);
        this.updateShiftProgress();
        this.startFirstScenario();
    }
}

// Global functions for HTML event handlers
function submitExplanation() {
    window.routePlannerGame.submitExplanation();
}

function closeConfidenceModal() {
    window.routePlannerGame.closeConfidenceModal();
}

function skipQuestion() {
    window.routePlannerGame.skipQuestion();
}

function replayWeakAreas() {
    window.routePlannerGame.replayWeakAreas();
}

function startSpeedRound() {
    window.routePlannerGame.startSpeedRound();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.routePlannerGame = new RoutePlannerGame();
});