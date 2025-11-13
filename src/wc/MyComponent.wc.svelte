<svelte:options customElement="my-component" />

<script lang="ts">
  export let name: string = "World";
</script>

<p class="text-red-500 font-bold p-5 bg-amber-200">Hello, {name}!</p>

<style>
  @import "./tailwind.css";
</style>
