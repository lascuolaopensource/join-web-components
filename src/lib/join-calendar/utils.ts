import type { Activity } from './types.ts';

export async function getActivities(month: number, year: number) {
	const response = await fetch('http://localhost:3000/api/public-activities', {
		method: 'POST',
		body: JSON.stringify({
			month,
			year
		})
	});
	return (await response.json()) as Activity[];
}
