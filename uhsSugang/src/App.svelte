<script>
	import Search from './components/Search/Search.svelte';
	import ResultTable from './components/ResultTable/Table.svelte';

	import Login from './components/Login.svelte';

	let login = true;
</script>

<div class="container">
	{#if login == true}
		<Search />
		<ResultTable />
	{:else}
		<Login bind:login={login} />
	{/if}
	
</div>

<style lang="scss">
	.container {
		max-width: 82em;
		margin: auto;
	}
</style>
