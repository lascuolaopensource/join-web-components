import type { Activity } from './types.ts';

export const BASE_URL = 'http://localhost:3000';

export async function getActivities(month: number, year: number) {
	const response = await fetch(`${BASE_URL}/api/public-activities`, {
		method: 'POST',
		body: JSON.stringify({
			month,
			year
		})
	});
	return (await response.json()) as Activity[];
}

export function acitivitiesUrl() {
	return `${BASE_URL}/activities`;
}

export function activityUrl(activity: Activity) {
	return `${acitivitiesUrl()}/${activity.slug}`;
}

export function activityImage(activity: Activity) {
	if (typeof activity.image === 'string') return activity.image;
	return activity.image.url;
}
