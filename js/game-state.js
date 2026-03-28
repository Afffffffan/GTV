// GTV - Game State Manager

class GameState {
    constructor() {
        this.score = 0;
        this.driftScore = 0;
        this.wantedLevel = 0;
        this.multiplier = 1;
        this.combo = 0;
        this.comboTimer = 0;
        this.activeMission = null;
        this.missionComplete = false;
        this.gameTime = 0;

        this.listeners = {};
    }

    on(event, cb) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(cb);
    }

    emit(event, data) {
        (this.listeners[event] || []).forEach(cb => cb(data));
    }

    addDriftPoints(driftAngle, speed) {
        if (Math.abs(driftAngle) > 0.05 && Math.abs(speed) > 0.05) {
            const pts = Math.abs(driftAngle) * Math.abs(speed) * 200 * this.multiplier;
            this.driftScore += pts;
            this.comboTimer = 90;
        }
    }

    endDrift() {
        if (this.driftScore > 50) {
            const earned = Math.floor(this.driftScore);
            this.score += earned;
            this.combo++;
            this.multiplier = Math.min(this.combo, 5);
            this.wantedLevel = Math.min(5, Math.floor(this.score / 2000));
            this.emit('driftEnd', { earned, combo: this.combo, multiplier: this.multiplier });
        }
        this.driftScore = 0;
    }

    update(isDrifting, driftAngle, speed) {
        this.gameTime++;

        if (isDrifting) {
            this.addDriftPoints(driftAngle, speed);
        } else if (this.driftScore > 0) {
            this.endDrift();
        }

        if (this.comboTimer > 0) {
            this.comboTimer--;
        } else if (!isDrifting) {
            this.combo = 0;
            this.multiplier = 1;
        }

        // Mission progress check
        if (this.activeMission) {
            this.activeMission.checkProgress(this);
        }
    }

    setState(key, value) { this[key] = value; }
    getState(key) { return this[key]; }
    resetState() {
        this.score = 0; this.driftScore = 0; this.wantedLevel = 0;
        this.multiplier = 1; this.combo = 0; this.gameTime = 0;
    }
}
