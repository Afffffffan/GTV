// GTV - Mission System

class Mission {
    constructor(name, description, type, goal) {
        this.name = name;
        this.description = description;
        this.type = type; // 'drift', 'escape', 'reach', 'survive'
        this.goal = goal;
        this.progress = 0;
        this.completed = false;
        this.failed = false;
        this.timeLimit = goal.timeLimit || null;
        this.timer = 0;
    }

    checkProgress(gameState) {
        if (this.completed || this.failed) return;
        this.timer++;

        if (this.timeLimit && this.timer > this.timeLimit) {
            this.failed = true;
            gameState.emit('missionFailed', this);
            return;
        }

        if (this.type === 'drift') {
            this.progress = Math.min(gameState.score / this.goal.score, 1);
            if (gameState.score >= this.goal.score) this.complete(gameState);
        }

        if (this.type === 'escape') {
            if (gameState.wantedLevel === 0 && this.timer > 120) this.complete(gameState);
        }

        if (this.type === 'survive') {
            this.progress = Math.min(this.timer / this.goal.duration, 1);
            if (this.timer >= this.goal.duration) this.complete(gameState);
        }
    }

    complete(gameState) {
        this.completed = true;
        gameState.score += this.goal.reward || 500;
        gameState.emit('missionComplete', this);
    }
}

class MissionSystem {
    constructor() {
        this.missions = [];
        this.currentIndex = 0;
        this.active = false;

        // Define missions
        this.allMissions = [
            new Mission('First Drift', 'Earn 500 drift points', 'drift', { score: 500, reward: 300 }),
            new Mission('Street King', 'Earn 2000 drift points', 'drift', { score: 2000, reward: 800 }),
            new Mission('Escape!', 'Lose the cops after getting 2 stars', 'escape', { reward: 600 }),
            new Mission('Survive', 'Stay alive for 60 seconds with cops chasing you', 'survive', { duration: 3600, reward: 1000 }),
            new Mission('Drift Master', 'Earn 5000 drift points', 'drift', { score: 5000, reward: 2000 }),
        ];
    }

    startNext(gameState) {
        if (this.currentIndex >= this.allMissions.length) return null;
        const mission = this.allMissions[this.currentIndex];
        gameState.activeMission = mission;
        this.active = true;
        gameState.emit('missionStart', mission);
        return mission;
    }

    advance() {
        this.currentIndex++;
        this.active = false;
    }

    getCurrent() {
        return this.allMissions[this.currentIndex] || null;
    }

    addMission(name, description) {
        this.allMissions.push(new Mission(name, description, 'drift', { score: 1000, reward: 500 }));
    }

    getMissions() { return this.allMissions; }
    completeMission(name) {
        const m = this.allMissions.find(m => m.name === name);
        if (m) m.completed = true;
    }
}
