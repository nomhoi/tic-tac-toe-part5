<script>
	import Board from './Board.svelte';
	import Dispatcher from './Dispatcher.svelte';
	import { history, status } from './stores.js';
</script>

<div class="game">
	<div class="game-board">
		<Board />
	</div>
	<div class="game-info">
		<div class="status">
			{#if $status === 1}
			 	<b>Winner: {!$history.state.xIsNext ? 'X' : 'O'}</b>
			{:else if $status === 2}
				<b>Draw</b>
			{:else}
				Next player: {$history.state.xIsNext ? 'X' : 'O'}
			{/if}
		</div>
		<div>
			{#if $history.canUndo()}
				<button on:click={history.undo}>Undo</button>
			{:else}
				<button disabled>Undo</button>
			{/if}
			{#if $history.canRedo()}
				<button on:click={history.redo}>Redo</button>
			{:else}
				<button disabled>Redo</button>
			{/if}
		</div>
		<ol>
			<li><button on:click={() => history.setCurrent(-1)}>Go to game start</button></li>
			{#each $history.history as value, i}
				<li><button on:click={() => history.setCurrent(i)}>Go to move #{i+1}</button></li>
			{/each}
		</ol>
	</div>
	<div class="game-info">
		<Dispatcher />
	</div>	
</div>

<style>
	.game {
		font: 14px "Century Gothic", Futura, sans-serif;
		margin: 20px;
		display: flex;
		flex-direction: row;
	}

	.game-info {
		margin-left: 20px;
	}

	.status {
		margin-bottom: 10px;
	}   

	ol {
		padding-left: 30px;
	}
</style>