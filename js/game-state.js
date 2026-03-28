// Game State Management Code

class GameState {
    constructor() {
        this.state = {};
    }

    // Set the value of a state property
    setState(key, value) {
        this.state[key] = value;
    }

    // Get the value of a state property
    getState(key) {
        return this.state[key];
    }

    // Reset the game state
    resetState() {
        this.state = {};
    }

    // Get the entire game state
    getAllState() {
        return this.state;
    }
}

// Example usage:
const gameState = new GameState();

gameState.setState('score', 0);
console.log(gameState.getState('score')); // Output: 0