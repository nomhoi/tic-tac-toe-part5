import { writable, derived } from 'svelte/store';
import { calculateWinner } from './helpers.js';

class History {
	constructor(state) {
		this.history = new Array;
		this.current = -1;
		this.state = state;
	}

	currentCommand() {
		return this.history[this.current];
	}

	push(command) {
		// remove all redo commands
		if (this.canRedo()) 
			this.history.splice(this.current + 1);
		
		// add a new command
		this.current++;
		this.history.push(command);
		command.redo(this.state);
	}
	
	canUndo() {
		return this.current >= 0;
	}
	
	canRedo() {
		return this.current < this.history.length - 1;
	}
	
	undo() {
		if (this.canUndo()) {
			this.history[this.current].undo(this.state);
			this.current--;
		}
	}
	
	redo() {
		if (this.canRedo()) {
			this.current++;
			this.history[this.current].redo(this.state);
		}
	}

	setCurrent(current) {
		if (current >= -1 && current < this.history.length) {
			if (current < this.current) {
				while (current < this.current) {
					this.undo();
				}
			} else if (current > this.current) {
				while (current > this.current) {
					this.redo();
				}
			}
		}
	}
}

let State = {
	squares: Array(9).fill(''),
	xIsNext: true,
};

function createHistory() {
	const { subscribe, set, update } = writable(new History(State));

	return {
		subscribe,
		push: (command) => update(h => { 
			h.push(command); 
			console.log(h);
			return h; 
		}),
		undo: () => update(h => { h.undo(); return h; }),
		redo: () => update(h => { h.redo(); return h; }),
		setCurrent: (current) => update(h => { 
			h.setCurrent(current); 
			return h; 
		}),
	};
}

export const history = createHistory();

export const status = derived(
	history,
	$history => { 
		if (calculateWinner($history.state.squares))
			return 1;
		else if ($history.current == 8)
			return 2;
		else
			return 0;
	}
);
