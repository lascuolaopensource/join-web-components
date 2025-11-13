import type { Activity } from './types';
import { getActivities } from './utils';
import {
	CalendarDate,
	type DateValue,
	fromDate,
	isEqualDay,
	getLocalTimeZone
} from '@internationalized/date';
import { resource } from 'runed';
import { isEqual } from 'lodash';

//

export class JoinCalendar {
	constructor(private dateRef: () => DateValue | undefined) {}

	private currentPeriod = $derived.by(() => {
		const date = this.dateRef();
		if (!date) return undefined;
		return {
			start: date.month,
			end: date.year
		};
	});

	private activities = resource(
		() => this.currentPeriod,
		async (period, previousPeriod, { data }) => {
			if (!period) {
				if (data) return data as Activity[];
				return [];
			}
			if (isEqual(period, previousPeriod)) return data as Activity[];
			return await getActivities(period.start, period.end);
		}
	);

	currentActivities = $derived.by(() =>
		filterActivitiesByDate(this.activities.current, this.dateRef())
	);

	getActivitiesByDay(day: DateValue) {
		return filterActivitiesByDate(this.activities.current, day);
	}
}

function filterActivitiesByDate(
	activities: Activity[] | undefined,
	date: CalendarDate | DateValue | undefined
) {
	if (!activities) return [];
	if (!date) return [];
	return activities.filter((activity) =>
		activity.program?.appointments?.some((appointment) => {
			const start = fromDate(new Date(appointment.start), getLocalTimeZone());
			return isEqualDay(date, start);
		})
	);
}
