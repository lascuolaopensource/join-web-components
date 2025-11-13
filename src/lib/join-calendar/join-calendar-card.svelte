<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import { activityUrl, activityImage } from './utils';
	import type { Activity } from './types';

	type Props = {
		activity: Activity;
	};

	let { activity }: Props = $props();

	const topics = $derived(activity.topics?.filter((t) => typeof t !== 'string') ?? []);
</script>

<a
	href={activityUrl(activity)}
	target="_blank"
	class={[
		'flex items-center justify-start gap-4 rounded-md border p-3',
		'border-cc-lime bg-cc-lime-light transition-colors hover:bg-cc-lime',
		'group'
	]}
>
	<div class="shrink-0 self-start pt-1">
		<img src={activityImage(activity)} alt={activity.name} class="size-16 rounded-md" />
	</div>

	<div class="grow">
		<h3 class="text-lg font-medium">{activity.name}</h3>
		<p class="text-sm opacity-80">{activity.shortDescription}</p>

		<div class="flex flex-wrap gap-1 pt-3">
			<span class="rounded-full border bg-cc-teal px-2 py-1 text-xs text-white">
				{activity.type}
			</span>
			{#each topics as topic}
				<span class="rounded-full border border-cc-teal bg-white px-2 py-1 text-xs text-cc-teal">
					{topic.name}
				</span>
			{/each}
		</div>
	</div>
	<ArrowRightIcon class="size-4 text-cc-teal transition-transform group-hover:translate-x-1" />
</a>
