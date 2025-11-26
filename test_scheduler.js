import { generateSchedule } from './src/logic/scheduler.js';

const teams4 = [
    { id: 1, name: 'T1' },
    { id: 2, name: 'T2' },
    { id: 3, name: 'T3' },
    { id: 4, name: 'T4' }
];

const matches4 = generateSchedule(teams4);
console.log('4 Teams Matches:', matches4.length); // Should be 6 (3 rounds * 2 matches)
matches4.forEach(m => console.log(`${m.team1.name} vs ${m.team2.name}`));

const teams3 = [
    { id: 1, name: 'T1' },
    { id: 2, name: 'T2' },
    { id: 3, name: 'T3' }
];

const matches3 = generateSchedule(teams3);
console.log('3 Teams Matches:', matches3.length); // Should be 3 (3 rounds * 1 match per round, bye ignored)
matches3.forEach(m => console.log(`${m.team1.name} vs ${m.team2.name}`));
