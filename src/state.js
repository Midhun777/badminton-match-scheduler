// State Management
const STORAGE_KEY = 'badminton_scheduler_state';

const initialState = {
    step: 1, // 1: Mode, 2: Team Count, 3: Team Details, 4: Schedule
    mode: null, // 'singles' | 'doubles'
    teamCount: 0,
    teams: [], // Array of { id, name, players: [] }
    schedule: [], // Array of { id, team1, team2, score1, score2, completed }
};

let state = loadState();
const listeners = [];

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : initialState;
    } catch (e) {
        console.error('Failed to load state', e);
        return initialState;
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() {
    return state;
}

export function setState(newState) {
    state = { ...state, ...newState };
    saveState();
    notify();
}

export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
}

function notify() {
    listeners.forEach(listener => listener(state));
}

export function resetState() {
    state = initialState;
    saveState();
    notify();
}
