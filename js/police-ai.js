// Police AI for enemy cars in the game.

class PoliceCarAI {
    constructor() {
        this.speed = 50; // Speed of the police car
        this.chaseDistance = 200; // Distance at which police will chase an enemy
    }

    // Method to update the AI behavior
    update(playerPosition) {
        if (this.isChasing(playerPosition)) {
            this.chase(playerPosition);
        } else {
            this.patrol();
        }
    }

    // Check if the police car should chase the player
    isChasing(playerPosition) {
        const distance = this.calculateDistance(playerPosition);
        return distance < this.chaseDistance;
    }

    // Method to calculate distance from the player
    calculateDistance(playerPosition) {
        // Placeholder logic for distance calculation
        return Math.hypot(playerPosition.x - this.position.x, playerPosition.y - this.position.y);
    }

    // Method to chase the player
    chase(playerPosition) {
        // Logic to move towards the player
        console.log('Chasing player at position:', playerPosition);
    }

    // Patrol behavior for the police car
    patrol() {
        console.log('Patrolling the area.');
    }
}

// Example usage:
const policeCarAI = new PoliceCarAI();
const playerPosition = { x: 100, y: 100 };
policeCarAI.update(playerPosition);