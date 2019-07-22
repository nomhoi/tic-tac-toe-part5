<script>
    import { history, status } from './stores.js';
    import { Command } from './helpers.js';

	let promise = null;

	async function getRandomNumber() {
		const res = await fetch(`number`);
		const text = await res.text();

		if (res.ok) {
            let i = parseInt(text);
            if ($status === 1 || $history.state.squares[i])
                return text + ' - busy';

            history.push(new Command($history.state, i));

			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}

	//setInterval(handleClick, 500);
</script>

{#if $status > 0}
    <button disabled>
        Get random number
    </button>
{:else}
    <button on:click={handleClick}>
        Get random number
    </button>
{/if}

{#await promise}
	<p>...подождите</p>
{:then number}
	<p>Respond from backend: {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}