// Physics module for car movement

class Car {
    constructor() {
        this.position = { x: 0, y: 0 }; // Position of the car
        this.velocity = { x: 0, y: 0 }; // Velocity of the car
        this.acceleration = { x: 0, y: 0 }; // Acceleration of the car
        this.speed = 0; // Current speed
    }

    update(deltaTime) {
        // Update position based on velocity
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        // Update velocity based on acceleration
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;

        // Limit the speed
        this.limitSpeed();
    }

    applyForce(force) {
        // Apply force to the car, changing acceleration
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }

    limitSpeed() {
        const maxSpeed = 100; // Maximum speed limit
        this.speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (this.speed > maxSpeed) {
            this.velocity.x = (this.velocity.x / this.speed) * maxSpeed;
            this.velocity.y = (this.velocity.y / this.speed) * maxSpeed;
        }
    }
}

// Example of how to use the Car class
const myCar = new Car();

// Apply some forces
myCar.applyForce({ x: 10, y: 0 }); // Accelerating in positive x direction

setInterval(() => {
    myCar.update(0.016); // Update at 60 FPS (approx 16ms per frame)
    console.log(myCar.position);
}, 16);