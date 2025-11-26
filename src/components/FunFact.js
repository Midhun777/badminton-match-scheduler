const predictions = [
    "Experts predict 92% chance someone will forget whose serve it is.",
    "Analysts report a 73% possibility of a player arguing with themselves about a line call.",
    "Forecast shows an 88% chance someone shouts “OUT!” before the shuttle even lands.",
    "Data indicates a 64% likelihood of two players apologizing to each other at the same time.",
    "AI models show a 91% chance someone will swing at air and pretend it was a warm-up.",
    "Probability suggests a 79% chance a player blames the shuttle for their mistake.",
    "New studies reveal a 67% chance someone says “nice one” sarcastically.",
    "Experts warn of an 82% possibility of someone celebrating… only to learn the rally isn’t over.",
    "Simulations show a 55% chance the quietest player suddenly becomes a smash monster.",
    "Predictions show a 93% chance someone will say “last game” and then play three more."
];

export function getFunFactHTML() {
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];

    return `
    <div class="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm text-center animate-fade-in">
      <h3 class="text-lg font-bold text-indigo-600 mb-2 font-hand">🏸 Match Prediction</h3>
      <p class="text-gray-700 italic text-lg font-hand leading-relaxed">"${randomPrediction}"</p>
    </div>
  `;
}
