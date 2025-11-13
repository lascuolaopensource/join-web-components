<script lang="ts">
	import { getLocalTimeZone, today, type DateValue, DateFormatter } from '@internationalized/date';
	import { Calendar, Day } from '$lib/components/ui/calendar/index.js';
	import { JoinCalendar } from './join-calendar.svelte.js';
	import { acitivitiesUrl, activityImage, activityUrl } from './utils.js';
	import { ArrowRightIcon } from '@lucide/svelte';
	import JoinCalendarCard from './join-calendar-card.svelte';

	//

	let value: DateValue = $state(today(getLocalTimeZone()));
	const cal = new JoinCalendar(() => value);

	const formatter = new DateFormatter('it-IT', { dateStyle: 'full' });
	const formattedDate = $derived(formatter.format(value.toDate(getLocalTimeZone())));
</script>

<div class="@container">
	<div class="flex flex-col items-start gap-4 @3xl:flex-row">
		<Calendar
			type="single"
			{value}
			class={[
				'w-full rounded-md border shadow-sm [--cell-size:--spacing(12)] @3xl:w-auto',
				'[&>div>div>table]:mx-auto! [&>div>div>table]:w-fit!'
			]}
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
						'data-selected:bg-cc-lime! data-selected:hover:bg-cc-lime!',
						'hover:bg-cc-lime-light! data-selected:text-primary!'
					]}
				>
					{day.day}

					{#if activities.length > 0}
						<span class={['rounded-full bg-primary px-2 text-primary-foreground opacity-100!']}>
							{activities.length}
						</span>
					{/if}
				</Day>
			{/snippet}</Calendar
		>

		<div
			class="flex grow flex-col gap-3 self-stretch rounded-md border bg-background p-3 shadow-sm"
		>
			<div class="flex items-center justify-between">
				<p class="font-bold capitalize">{formattedDate}</p>
				<a
					href={acitivitiesUrl()}
					target="_blank"
					class="flex flex-nowrap items-center gap-1 text-cc-teal hover:underline"
				>
					<span> Tutte le attività </span>
					<ArrowRightIcon class="size-4" />
				</a>
			</div>
			{#each cal.currentActivities as activity}
				<JoinCalendarCard {activity} />
			{:else}
				<div
					class="bg-slate-100 text-slate-500 grow rounded-md p-3 flex items-center justify-center"
				>
					<p>Nessuna attività trovata</p>
				</div>
			{/each}
		</div>
	</div>
</div>
