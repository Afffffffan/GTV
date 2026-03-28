// GTV - Physics Engine
// Real drift physics with momentum, friction, and handbrake

class CarPhysics {
    constructor() {
        this.x = 0;
        this.z = 0;
        this.vx = 0;
        this.vz = 0;
        this.angle = 0;
        this.angularVel = 0;
        this.speed = 0;
        this.driftAngle = 0;
        this.isDrifting = false;
        this.driftAmount = 0;

        // Tuning
        this.ACCELERATION = 0.018;
        this.BRAKE_FORCE = 0.03;
        this.MAX_SPEED = 0.6;
        this.TURN_SPEED = 0.045;
        this.FRICTION = 0.96;
        this.DRIFT_FRICTION = 0.88;
        this.ANGULAR_FRICTION = 0.85;
        this.HANDBRAKE_FRICTION = 0.80;
    }

    update(keys) {
        const forward = keys['w'] || keys['W'] || keys['ArrowUp'];
        const backward = keys['s'] || keys['S'] || keys['ArrowDown'];
        const left = keys['a'] || keys['A'] || keys['ArrowLeft'];
        const right = keys['d'] || keys['D'] || keys['ArrowRight'];
        const handbrake = keys[' '];

        // Steering
        if (Math.abs(this.speed) > 0.01) {
            const turnFactor = Math.min(Math.abs(this.speed) / 0.2, 1);
            const dir = this.speed < 0 ? -1 : 1;
            if (left) this.angularVel -= this.TURN_SPEED * turnFactor * dir;
            if (right) this.angularVel += this.TURN_SPEED * turnFactor * dir;
        }

        // Acceleration / Braking
        if (forward) this.speed = Math.min(this.speed + this.ACCELERATION, this.MAX_SPEED);
        if (backward) this.speed = Math.max(this.speed - this.BRAKE_FORCE, -this.MAX_SPEED * 0.5);

        // Handbrake drift
        this.isDrifting = handbrake && Math.abs(this.speed) > 0.1;

        // Friction
        if (!forward && !backward) {
            this.speed *= this.isDrifting ? this.HANDBRAKE_FRICTION : this.FRICTION;
        }

        this.angularVel *= this.ANGULAR_FRICTION;
        this.angle += this.angularVel;

        // Drift angle
        if (this.isDrifting) {
            this.driftAngle += this.angularVel * 2.5;
            this.driftAngle *= 0.9;
        } else {
            this.driftAngle *= 0.88;
        }

        const effectiveAngle = this.angle + this.driftAngle;
        const dx = Math.sin(effectiveAngle) * this.speed;
        const dz = Math.cos(effectiveAngle) * this.speed;

        if (this.isDrifting) {
            this.vx = this.vx * this.DRIFT_FRICTION + dx * 0.15;
            this.vz = this.vz * this.DRIFT_FRICTION + dz * 0.15;
        } else {
            this.vx = dx;
            this.vz = dz;
        }

        this.x += this.vx;
        this.z += this.vz;

        // World boundary
        this.x = Math.max(-190, Math.min(190, this.x));
        this.z = Math.max(-190, Math.min(190, this.z));

        // Drift meter
        if (this.isDrifting && Math.abs(this.speed) > 0.05) {
            this.driftAmount = Math.min(this.driftAmount + 0.015, 1);
        } else {
            this.driftAmount *= 0.92;
        }

        this.speed_kmh = Math.abs(Math.round(this.speed * 300));
    }

    getSpeedKmh() {
        return Math.abs(Math.round(this.speed * 300));
    }
}
