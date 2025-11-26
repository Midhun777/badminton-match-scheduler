import { setState } from '../state.js';

export function getStep2HTML() {
  return `
    <div class="space-y-8 animate-slide-up">
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-bold text-gray-800 tracking-tight">How many teams?</h2>
        <p class="text-gray-500 font-medium">Select the total number of teams playing.</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        ${[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => `
          <button data-count="${num}" class="count-btn h-20 rounded-2xl glass-panel border-2 border-transparent hover:border-blue-500 hover:bg-blue-50/50 text-2xl font-bold text-gray-700 hover:text-blue-600 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md">
            ${num}
          </button>
        `).join('')}
      </div>
      
      <div class="mt-8 text-center">
         <button id="back-btn" class="text-gray-400 hover:text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">Back</button>
      </div>
    </div>
  `;
}

export function attachStep2Listeners() {
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const count = parseInt(e.currentTarget.dataset.count);
      setState({ teamCount: count, step: 3 });
    });
  });

  document.getElementById('back-btn')?.addEventListener('click', () => {
    setState({ step: 1 });
  });
}
