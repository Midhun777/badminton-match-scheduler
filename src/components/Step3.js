import { setState, getState } from '../state.js';
import { generateSchedule } from '../logic/scheduler.js';
import { players as playerList } from '../data/players.js';

const AVATARS = ['🦁', '🐯', '🐻', '🦅', '🦈', '🐉', '🚀', '⚡', '🔥', '🌟', '👑', '🎩', '🕶️', '🦄', '🐼', '🦊', '🐺', '🐗', '🐴', '🦖', '🐙', '🦋', '🐞', '🐢', '🐬'];

const getRandomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];

export function getStep3HTML() {
  const state = getState();
  const teamCount = state.teamCount;
  const isDoubles = state.mode === 'doubles';

  const teamsToRender = state.teams.length > 0 ? state.teams : Array.from({ length: teamCount }, (_, i) => ({
    id: i,
    name: '',
    players: [''],
    avatars: [getRandomAvatar()]
  }));

  return `
    <div class="space-y-8 animate-slide-up">
      <div class="text-center space-y-2">
        <h2 class="text-3xl font-bold text-gray-800 tracking-tight">Team Details</h2>
        <p class="text-gray-500 font-medium">Enter names for ${isDoubles ? 'pairs' : 'players'}.</p>
      </div>

      <!-- Quick Add Section -->
      <div class="glass-panel p-4 rounded-2xl space-y-3">
        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider">Quick Add Players</h3>
        <div class="flex flex-wrap gap-2" id="quick-add-container">
          ${playerList.map(player => {
    // Check if player is already selected
    const isSelected = state.teams.some(t => t.players.includes(player));
    return `
              <button type="button" 
                data-player="${player}" 
                class="quick-add-btn px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 active:scale-95 border border-blue-100'}"
                ${isSelected ? 'disabled' : ''}>
                ${player}
                ${isSelected ? '<span class="ml-1">✓</span>' : '<span class="ml-1">+</span>'}
              </button>
            `;
  }).join('')}
        </div>
      </div>

      <form id="teams-form" class="space-y-4">
        ${teamsToRender.map((team, index) => `
          <div class="glass-panel p-5 rounded-2xl relative group transition-all duration-300 hover:shadow-md">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">Team ${index + 1}</span>
              ${teamsToRender.length > 2 ? `
              <button type="button" data-index="${index}" class="remove-team-btn text-gray-300 hover:text-red-500 transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>` : ''}
            </div>
            
            <div class="space-y-3">
              ${isDoubles ? `
                <div class="grid grid-cols-2 gap-3">
                  <div class="relative flex items-center gap-2">
                    <button type="button" data-index="${index}" data-player-idx="0" class="avatar-btn text-2xl hover:scale-110 transition-transform" title="Change Avatar">
                      ${team.avatars?.[0] || '👤'}
                    </button>
                    <div class="relative w-full">
                      <input type="text" name="p1_${index}" placeholder="Player 1" value="${team.players[0] || ''}" autocomplete="off" class="player-input w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all" required>
                      <div class="suggestions-container absolute z-20 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-1 max-h-60 overflow-y-auto hidden"></div>
                    </div>
                  </div>
                  <div class="relative flex items-center gap-2">
                    <button type="button" data-index="${index}" data-player-idx="1" class="avatar-btn text-2xl hover:scale-110 transition-transform" title="Change Avatar">
                      ${team.avatars?.[1] || '👤'}
                    </button>
                    <div class="relative w-full">
                      <input type="text" name="p2_${index}" placeholder="Player 2" value="${team.players[1] || ''}" autocomplete="off" class="player-input w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all" required>
                      <div class="suggestions-container absolute z-20 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-1 max-h-60 overflow-y-auto hidden"></div>
                    </div>
                  </div>
                </div>
              ` : `
                <div class="relative flex items-center gap-2">
                  <button type="button" data-index="${index}" data-player-idx="0" class="avatar-btn text-2xl hover:scale-110 transition-transform" title="Change Avatar">
                    ${team.avatars?.[0] || '👤'}
                  </button>
                  <div class="relative w-full">
                    <input type="text" name="p1_${index}" placeholder="Player Name" value="${team.players[0] || ''}" autocomplete="off" class="player-input w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" required>
                    <div class="suggestions-container absolute z-20 w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-1 max-h-60 overflow-y-auto hidden"></div>
                  </div>
                </div>
              `}
              <input type="text" name="team_name_${index}" placeholder="Team Name (Optional)" value="${team.name || ''}" class="w-full px-2 py-2 border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none text-sm text-gray-600 bg-transparent transition-colors placeholder-gray-400">
            </div>
          </div>
        `).join('')}
        
        <button type="button" id="add-team-btn" class="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-blue-500 hover:text-blue-600 font-medium transition-all hover:bg-blue-50/30">
          + Add Team
        </button>
      </form>

      <div class="flex gap-4 pt-4 pb-8">
        <button id="back-btn-3" class="flex-1 py-3.5 px-6 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          Back
        </button>
        <button id="generate-btn" class="flex-[2] py-3.5 px-6 rounded-xl btn-primary font-bold tracking-wide">
          Generate Schedule
        </button>
      </div>
    </div>
  `;
}

export function attachStep3Listeners() {
  const state = getState();

  if (state.teams.length === 0) {
    const initialTeams = Array.from({ length: state.teamCount }, (_, i) => ({
      id: Date.now() + i,
      name: '',
      players: state.mode === 'doubles' ? ['', ''] : [''],
      avatars: state.mode === 'doubles' ? [getRandomAvatar(), getRandomAvatar()] : [getRandomAvatar()]
    }));
    setState({ teams: initialTeams });
  }

  document.getElementById('teams-form')?.addEventListener('input', (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    const parts = name.split('_');
    const index = parseInt(parts[parts.length - 1]);

    const newTeams = [...state.teams];
    if (!newTeams[index]) return;

    if (name.startsWith('p1_')) {
      newTeams[index].players[0] = value;
    } else if (name.startsWith('p2_')) {
      newTeams[index].players[1] = value;
    } else if (name.startsWith('team_name_')) {
      newTeams[index].name = value;
    }
  });

  document.getElementById('add-team-btn')?.addEventListener('click', () => {
    const newTeam = {
      id: Date.now(),
      name: '',
      players: state.mode === 'doubles' ? ['', ''] : [''],
      avatars: state.mode === 'doubles' ? [getRandomAvatar(), getRandomAvatar()] : [getRandomAvatar()]
    };
    setState({ teams: [...state.teams, newTeam], teamCount: state.teams.length + 1 });
  });

  // Avatar Click Logic
  document.querySelectorAll('.avatar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      const playerIdx = parseInt(e.currentTarget.dataset.playerIdx);
      const newTeams = [...state.teams];

      // Cycle avatar
      const currentAvatar = newTeams[index].avatars[playerIdx];
      let avatarIdx = AVATARS.indexOf(currentAvatar);
      avatarIdx = (avatarIdx + 1) % AVATARS.length;

      // Ensure avatars array exists
      if (!newTeams[index].avatars) {
        newTeams[index].avatars = state.mode === 'doubles' ? [getRandomAvatar(), getRandomAvatar()] : [getRandomAvatar()];
      }

      newTeams[index].avatars[playerIdx] = AVATARS[avatarIdx];
      setState({ teams: newTeams });
    });
  });

  document.querySelectorAll('.remove-team-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      const newTeams = state.teams.filter((_, i) => i !== index);
      setState({ teams: newTeams, teamCount: newTeams.length });
    });
  });

  // Quick Add Logic
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const player = e.currentTarget.dataset.player;
      const inputs = Array.from(document.querySelectorAll('.player-input'));

      // Find first empty input
      const emptyInput = inputs.find(input => !input.value.trim());

      if (emptyInput) {
        emptyInput.value = player;
        emptyInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Update button state visually (re-render will happen on state change, but for instant feedback)
        e.currentTarget.classList.remove('bg-blue-50', 'text-blue-600', 'hover:bg-blue-100', 'hover:scale-105', 'active:scale-95', 'border-blue-100');
        e.currentTarget.classList.add('bg-gray-100', 'text-gray-400', 'cursor-not-allowed');
        e.currentTarget.disabled = true;
        e.currentTarget.innerHTML = `${player} <span class="ml-1">✓</span>`;
      } else {
        // Optional: Shake animation or toast to indicate no empty slots
        alert('No empty slots available! Add more teams first.');
      }
    });
  });

  // Autocomplete Logic
  const inputs = document.querySelectorAll('.player-input');

  const closeAllSuggestions = () => {
    document.querySelectorAll('.suggestions-container').forEach(el => el.classList.add('hidden'));
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      closeAllSuggestions();
    }
  });

  inputs.forEach(input => {
    const container = input.nextElementSibling;

    const showSuggestions = (value) => {
      const filtered = playerList.filter(p =>
        p.toLowerCase().includes(value.toLowerCase())
      );

      if (filtered.length === 0) {
        container.classList.add('hidden');
        return;
      }

      container.innerHTML = filtered.map(player => `
        <div class="suggestion-item px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors">
          ${player}
        </div>
      `).join('');

      container.classList.remove('hidden');

      // Add click listeners to items
      container.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          input.value = item.innerText.trim();
          // Trigger input event to update state
          input.dispatchEvent(new Event('input', { bubbles: true }));
          closeAllSuggestions();
        });
      });
    };

    input.addEventListener('focus', () => {
      showSuggestions(input.value);
    });

    input.addEventListener('input', (e) => {
      showSuggestions(e.target.value);
    });
  });

  document.getElementById('back-btn-3')?.addEventListener('click', () => {
    setState({ step: 2 });
  });

  document.getElementById('generate-btn')?.addEventListener('click', () => {
    const form = document.getElementById('teams-form');
    const formData = new FormData(form);
    const finalTeams = state.teams.map((team, index) => {
      const p1 = formData.get(`p1_${index}`)?.trim();
      const p2 = formData.get(`p2_${index}`)?.trim();
      const tName = formData.get(`team_name_${index}`)?.trim();

      const players = state.mode === 'doubles' ? [p1, p2] : [p1];
      const avatars = team.avatars || (state.mode === 'doubles' ? [getRandomAvatar(), getRandomAvatar()] : [getRandomAvatar()]);

      let name = tName;
      if (!name || name === '') {
        name = players.filter(Boolean).join(' & ');
      }

      return { ...team, name, players, avatars };
    });

    // Validation
    const isValid = finalTeams.every(t => t.players.every(p => p && p.length > 0));

    if (!isValid) {
      alert('Please fill in all player names.');
      return;
    }

    const schedule = generateSchedule(finalTeams);
    setState({ teams: finalTeams, schedule, step: 4 });
  });
}
