export function generateSchedule(teams) {
    // Round Robin Algorithm
    // If odd number of teams, add a dummy team (bye)
    let scheduleTeams = [...teams];
    if (scheduleTeams.length % 2 !== 0) {
        scheduleTeams.push({ id: 'bye', name: 'Bye' });
    }

    const n = scheduleTeams.length;
    const rounds = n - 1;
    const matchesPerRound = n / 2;
    const matches = [];

    for (let round = 0; round < rounds; round++) {
        for (let i = 0; i < matchesPerRound; i++) {
            const team1 = scheduleTeams[i];
            const team2 = scheduleTeams[n - 1 - i];

            // If neither team is 'bye', add match
            if (team1.id !== 'bye' && team2.id !== 'bye') {
                matches.push({
                    id: `match_${round}_${i}`,
                    round: round + 1,
                    team1: team1,
                    team2: team2,
                    score1: null,
                    score2: null,
                    completed: false
                });
            }
        }

        // Rotate teams (keep first team fixed, rotate others)
        // [0, 1, 2, 3] -> [0, 3, 1, 2]
        scheduleTeams.splice(1, 0, scheduleTeams.pop());
    }

    return matches;
}
