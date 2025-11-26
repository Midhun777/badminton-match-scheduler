import './style.css';
import { getState, subscribe, resetState } from './state.js';
import { getStep1HTML, attachStep1Listeners } from './components/Step1.js';
import { getStep2HTML, attachStep2Listeners } from './components/Step2.js';
import { getStep3HTML, attachStep3Listeners } from './components/Step3.js';
import { getScheduleHTML, attachScheduleListeners } from './components/Schedule.js';
import { getFunFactHTML } from './components/FunFact.js';
import { getLuckBoosterHTML, attachLuckBoosterListeners } from './components/LuckBooster.js';

const app = document.querySelector('#app');

function render() {
  const state = getState();

  app.innerHTML = `
    <div class="min-h-screen font-sans pb-20">
      <!-- Header -->
      <header class="glass-panel sticky top-0 z-10 mb-6">
        <div class="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            🏸 Padamughal Badminton Club
          </h1>
          ${state.step > 1 ? `<button id="reset-btn" class="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">Reset</button>` : ''}
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-md mx-auto px-4">
        <div id="step-container" class="animate-fade-in">
          ${getStepContent(state)}
          
          <!-- Fun Features -->
          <div class="mt-8 space-y-6">
            ${getFunFactHTML()}
            ${getLuckBoosterHTML()}
          </div>
        </div>
      </main>
    </div>
  `;

  // Attach Event Listeners
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Start over? All data will be lost.')) {
        resetState();
      }
    });
  }

  attachStepListeners(state);
  attachLuckBoosterListeners();
}

function getStepContent(state) {
  switch (state.step) {
    case 1:
      return getStep1HTML();
    case 2:
      return getStep2HTML();
    case 3:
      return getStep3HTML();
    case 4:
      return getScheduleHTML();
    default:
      return `<div>Unknown Step</div>`;
  }
}

function attachStepListeners(state) {
  switch (state.step) {
    case 1:
      attachStep1Listeners();
      break;
    case 2:
      attachStep2Listeners();
      break;
    case 3:
      attachStep3Listeners();
      break;
    case 4:
      attachScheduleListeners();
      break;
  }
}

// Initial Render
render();

// Subscribe to state changes
subscribe(render);
