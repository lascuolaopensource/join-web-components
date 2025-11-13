<script lang="ts">
	import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import { Calendar, Day } from '$lib/components/ui/calendar/index.js';
	import { JoinCalendar } from './join-calendar.svelte.js';

	//

	let value: DateValue = $state(today(getLocalTimeZone()));
	const cal = new JoinCalendar(() => value);
</script>

<div class="flex items-start gap-4 bg-pink-50">
	<Calendar
		type="single"
		{value}
		class={['rounded-md border shadow-sm [--cell-size:--spacing(12)]']}
		captionLayout="dropdown"
		disableDaysOutsideMonth
		onValueChange={(v) => {
			if (!v) return;
			value = v;
		}}
		onNextClick={() => {
			value = value.add({ months: 1 });
		}}
		onPrevClick={() => {
			value = value.subtract({ months: 1 });
		}}
	>
		{#snippet day({ day })}
			{@const activities = cal.getActivitiesByDay(day)}
			<Day
				class={[
					'items-start! justify-between!',
					'rounded-none! border p-1 hover:cursor-pointer',
					'data-selected:hover:bg-primary! data-selected:hover:text-primary-foreground!',
					'group'
				]}
			>
				{day.day}

				{#if activities.length > 0}
					<span
						class={[
							'rounded-full bg-primary px-2 text-primary-foreground opacity-100!',
							'opacity-100! group-data-selected:bg-primary-foreground group-data-selected:text-primary!'
						]}
					>
						{activities.length}
					</span>
				{/if}
			</Day>
		{/snippet}</Calendar
	>

	<div class="grow rounded-md border bg-background p-3 shadow-sm">
		<pre>{JSON.stringify(value, null, 2)}</pre>
		{#each cal.currentActivities as activity}
			<div>
				<h3>{activity.name}</h3>
				<p>{activity.shortDescription}</p>
				{activity.topics
					?.filter((t) => typeof t !== 'string')
					.map((t) => t.name)
					.join(', ')}
			</div>
		{/each}
	</div>
</div>
