import { setState } from '../state.js';

export function getStep1HTML() {
  return `
    <div class="space-y-8 animate-slide-up">
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-bold text-gray-800 tracking-tight">Select Mode</h2>
        <p class="text-gray-500 font-medium">What kind of match are you playing?</p>
      </div>

      <div class="grid grid-cols-1 gap-5">
        <button data-mode="singles" class="mode-btn group relative p-6 glass-panel rounded-2xl border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 text-left hover:-translate-y-1">
          <div class="flex items-center gap-5">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Singles</h3>
              <p class="text-sm text-gray-500 font-medium">1 vs 1</p>
            </div>
            <div class="absolute right-6 text-gray-300 group-hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        <button data-mode="doubles" class="mode-btn group relative p-6 glass-panel rounded-2xl border-2 border-transparent hover:border-purple-500/50 transition-all duration-300 text-left hover:-translate-y-1">
          <div class="flex items-center gap-5">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Doubles</h3>
              <p class="text-sm text-gray-500 font-medium">2 vs 2</p>
            </div>
            <div class="absolute right-6 text-gray-300 group-hover:text-purple-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  `;
}

export function attachStep1Listeners() {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.dataset.mode;
      setState({ mode, step: 2 });
    });
  });
}
