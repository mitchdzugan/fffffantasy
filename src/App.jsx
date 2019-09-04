import React from 'react';
import logo from './logo.svg';
import './App.css';
const isNull = a => a === null;

const players = [
	{ id: 0, name: 'alex ', d: 1 },
	{ id: 1, name: 'jack ', d: 1 },
	{ id: 2, name: 'brian', d: 1 },
	{ id: 3, name: 'nick ', d: 1 },
	{ id: 4, name: 'jeff ', d: 1 },
	{ id: 5, name: 'noah ', d: 2 },
	{ id: 6, name: 'reid ', d: 2 },
	{ id: 7, name: 'blake', d: 2 },
	{ id: 8, name: 'zach ', d: 2 },
	{ id: 9, name: 'ben  ', d: 2 },
];

const randomOne = arr => (
	arr[Math.floor(Math.random()*arr.length)]
);

const removeOne = (arr, target) => {
	let removed = false;
	return arr.filter(el => {
		if (el === target && !removed) {
			removed = true;
			return false;
		}

		return true;
	});
};

const pickOne = (a1, a2, not) => {
	const vals = {};
	a1.forEach(el => vals[el] = 1);
	a2.forEach(el => vals[el] = (vals[el] || 0) * (vals[el] || 0) * -1);
	vals[not] = 1;
	const inBoth = Object.keys(vals).filter(key => vals[key] < 0);
	const res = randomOne(inBoth);
	return parseInt(res, 10);
};

const genSchedule = () => {
	const schedule = [
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
	];

	const availByWeek = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	];

	const availById = [
		[1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9],
		[0, 0, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9],
		[0, 0, 1, 1, 3, 3, 4, 4, 5, 6, 7, 8, 9],
		[0, 0, 1, 1, 2, 2, 4, 4, 5, 6, 7, 8, 9],
		[0, 0, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9],
		[0, 1, 2, 3, 4, 6, 6, 7, 7, 8, 8, 9, 9],
		[0, 1, 2, 3, 4, 5, 5, 7, 7, 8, 8, 9, 9],
		[0, 1, 2, 3, 4, 5, 5, 6, 6, 8, 8, 9, 9],
		[0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 9, 9],
		[0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8],
	];

	let week = 0;
	while (week < schedule.length) {
		let pid = 0;
		while (pid < players.length) {
			if (isNull(schedule[week][pid])) {
				const opp = pickOne(availByWeek[week], availById[pid], (schedule[week - 1] || [])[pid]);
				if (isNaN(opp)) {
					return false;
				}
				availByWeek[week] = removeOne(availByWeek[week], pid);
				availByWeek[week] = removeOne(availByWeek[week], opp);
				availById[opp] = removeOne(availById[opp], pid);
				availById[pid] = removeOne(availById[pid], opp);
				schedule[week][pid] = opp;
				schedule[week][opp] = pid;
			}
			pid++;
		}
		week++;
	}

	return schedule;
};

const makeSched = () => {
	let attempt = 0;
	let finalSched = false;
	while (!finalSched && attempt < 10000) {
		finalSched = genSchedule();
		console.log({ attempt });
		attempt++;
	}
	return finalSched;
};

function App() {
	const [sched, setSched] = React.useState(false);

	const renderSchedule = (sched) => {
		console.log({ sched });
		const rows = players.map(({id, d, name}) => (
			<tr>
				<td style={{
							background: d === 1 ? 'rgba(250, 170, 176, 1)' : 'rgba(170, 176, 250, 1)',
							fontWeight: 'bold',
							borderRight: '1px solid black',
							borderBottom: '1px solid black',
							padding: '10px'
						}} >
					{name}
				</td>
				{sched.map(matches => (
					<td style={{
								borderRight: '1px solid black',
								borderBottom: '1px solid black',
								padding: '10px',
								background: players[matches[id]].d === 1 ? 'rgba(250, 170, 176, 0.6)' : 'rgba(170, 176, 250, 0.6)'
							}} >
						{players[matches[id]].d === d ? '' : '*'}
						{players[matches[id]].name}
					</td>
				))}
			</tr>
		));
		return (
			<table style={{ margin: '30px auto', borderLeft: '1px solid black', borderTop: '1px solid black'  }} >
				<thead>
					<tr>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >👽</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 1</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 2</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 3</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 4</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 5</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 6</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 7</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 8</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 9</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 10</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 11</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 12</th>
						<th style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '10px' }} >Week 13</th>
					</tr>
				</thead>
				<tbody> {rows} </tbody>
			</table>
		);
	};

  return (
		<div className="App" style={{ margin: '30px' }} >
			<button onClick={() => setSched(makeSched())} >Generate Schedule</button>
			{sched && renderSchedule(sched)}
    </div>
  );
}

export default App;
