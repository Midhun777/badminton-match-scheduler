import { setState, getState } from '../state.js';

export function getScheduleHTML() {
    const state = getState();
    const matches = state.schedule;
    const teams = state.teams;

    const standings = teams.map(team => {
        let played = 0;
        let wins = 0;
        let losses = 0;
        let points = 0;

        matches.forEach(match => {
            if (match.completed) {
                if (match.team1.id === team.id || match.team2.id === team.id) {
                    played++;
                    const isTeam1 = match.team1.id === team.id;
                    const myScore = isTeam1 ? parseInt(match.score1) : parseInt(match.score2);
                    const oppScore = isTeam1 ? parseInt(match.score2) : parseInt(match.score1);

                    if (myScore > oppScore) {
                        wins++;
                        points += 3;
                    } else if (myScore < oppScore) {
                        losses++;
                    } else {
                        points += 1;
                    }
                }
            }
        });

        return { ...team, played, wins, losses, points };
    }).sort((a, b) => b.points - a.points || b.wins - a.wins);

    return `
    <div class="space-y-8 animate-slide-up">
      
      <!-- Leaderboard -->
      <div class="glass-panel rounded-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100/50">
          <h3 class="font-bold text-blue-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Leaderboard
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th class="px-6 py-3 font-semibold">Team</th>
                <th class="px-2 py-3 text-center font-semibold">P</th>
                <th class="px-2 py-3 text-center font-semibold">W</th>
                <th class="px-2 py-3 text-center font-semibold">L</th>
                <th class="px-4 py-3 text-center font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${standings.map((team, i) => `
                <tr class="hover:bg-blue-50/30 transition-colors ${i < 3 ? 'bg-yellow-50/20' : ''}">
                  <td class="px-6 py-3 font-medium text-gray-900 truncate max-w-[140px]">
                    <div class="flex items-center gap-2">
                      ${i === 0 ? '<span class="text-yellow-500">👑</span>' : ''}
                      ${team.name}
                    </div>
                  </td>
                  <td class="px-2 py-3 text-center text-gray-500">${team.played}</td>
                  <td class="px-2 py-3 text-center text-green-600 font-bold">${team.wins}</td>
                  <td class="px-2 py-3 text-center text-red-400">${team.losses}</td>
                  <td class="px-4 py-3 text-center font-bold text-blue-600 text-base">${team.points}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Matches -->
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-gray-800 px-1">Matches</h3>
        ${matches.length === 0 ? '<p class="text-gray-500 text-center py-8 glass-panel rounded-xl">No matches scheduled.</p>' : ''}
        ${matches.map((match, index) => {
        const s1 = match.score1 !== null ? parseInt(match.score1) : null;
        const s2 = match.score2 !== null ? parseInt(match.score2) : null;
        const isComplete = match.completed;
        const winner = isComplete ? (s1 > s2 ? 1 : (s2 > s1 ? 2 : 0)) : null;

        return `
          <div class="match-card glass-panel p-5 rounded-2xl ${isComplete ? 'opacity-80 bg-gray-50/50' : ''} transition-all duration-300 hover:shadow-md">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Match ${index + 1}</span>
              <span class="text-xs px-2.5 py-1 rounded-full font-medium ${isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}">
                ${isComplete ? 'Finished' : 'Upcoming'}
              </span>
            </div>
            
            <div class="flex items-center justify-between gap-4">
              <!-- Team 1 -->
              <div class="flex-1 text-center group">
                <div class="font-semibold text-sm mb-2 truncate px-1 ${winner === 1 ? 'text-green-600 font-bold' : 'text-gray-900'}" title="${match.team1.name}">
                  ${match.team1.name}
                  ${winner === 1 ? '🏆' : ''}
                </div>
                <input type="number" min="0" data-id="${match.id}" data-team="1" value="${match.score1 !== null ? match.score1 : ''}" 
                  class="score-input w-14 h-12 text-center bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-xl transition-all ${winner === 1 ? 'bg-green-50 border-green-200 text-green-700' : ''}" placeholder="-">
              </div>

              <div class="text-gray-300 font-bold text-xl">VS</div>

              <!-- Team 2 -->
              <div class="flex-1 text-center group">
                <div class="font-semibold text-sm mb-2 truncate px-1 ${winner === 2 ? 'text-green-600 font-bold' : 'text-gray-900'}" title="${match.team2.name}">
                  ${match.team2.name}
                  ${winner === 2 ? '🏆' : ''}
                </div>
                <input type="number" min="0" data-id="${match.id}" data-team="2" value="${match.score2 !== null ? match.score2 : ''}" 
                  class="score-input w-14 h-12 text-center bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-xl transition-all ${winner === 2 ? 'bg-green-50 border-green-200 text-green-700' : ''}" placeholder="-">
              </div>
            </div>
          </div>
        `}).join('')}
      </div>

      <div class="pt-4 pb-8 text-center">
        <button id="share-btn" class="text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share Schedule
        </button>
      </div>
    </div>
  `;
}

export function attachScheduleListeners() {
    const state = getState();

    document.querySelectorAll('.score-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const matchId = e.target.dataset.id;
            const teamNum = e.target.dataset.team;
            let val = e.target.value;

            // Prevent negative scores
            if (val && parseInt(val) < 0) val = "0";

            const newSchedule = state.schedule.map(m => {
                if (m.id === matchId) {
                    const updatedMatch = { ...m };
                    if (teamNum === "1") updatedMatch.score1 = val;
                    else updatedMatch.score2 = val;

                    if (updatedMatch.score1 !== '' && updatedMatch.score1 !== null &&
                        updatedMatch.score2 !== '' && updatedMatch.score2 !== null) {
                        updatedMatch.completed = true;
                    } else {
                        updatedMatch.completed = false;
                    }
                    return updatedMatch;
                }
                return m;
            });

            setState({ schedule: newSchedule });
        });
    });

    document.getElementById('share-btn')?.addEventListener('click', () => {
        const text = state.schedule.map(m =>
            `${m.team1.name} vs ${m.team2.name} ${m.completed ? `(${m.score1}-${m.score2})` : ''}`
        ).join('\n');

        navigator.clipboard.writeText(text).then(() => {
            alert('Schedule copied to clipboard!');
        });
    });
}
