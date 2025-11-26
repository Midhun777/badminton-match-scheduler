export function getLuckBoosterHTML() {
    return `
    <div class="mt-6 text-center animate-fade-in">
      <button id="luck-booster-btn" 
        class="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full hover:from-amber-500 hover:to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
        <span class="relative flex items-center gap-2 text-xl font-hand">
          BOOST MY LUCK ✨💫
        </span>
      </button>
    </div>
  `;
}

export function attachLuckBoosterListeners() {
    const btn = document.getElementById('luck-booster-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            // Create a custom toast/notification instead of a boring alert if possible, 
            // but for now user asked for "show", alert is simplest, let's try a custom toast if we can easily add it, 
            // or just a simple alert as requested. The request said "It does absolutely nothing except show...".
            // Let's stick to a simple alert for now to match "useless" vibe, or maybe a temporary text change.

            alert("Luck boosted! (Confidence: 0%)");

            // Optional: Add a little sparkle effect or console log
            console.log("Luck confidence increased from 0% to 0%");
        });
    }
}
