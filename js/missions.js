// Mission System

class Mission {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.completed = false;
    }
    complete() {
        this.completed = true;
    }
}

class MissionSystem {
    constructor() {
        this.missions = [];
    }
    addMission(name, description) {
        const mission = new Mission(name, description);
        this.missions.push(mission);
    }
    completeMission(name) {
        const mission = this.missions.find(m => m.name === name);
        if (mission) {
            mission.complete();
        }
    }
    getMissions() {
        return this.missions;
    }
}

// Example Usage
const missionSystem = new MissionSystem();
missionSystem.addMission('Rescue the Princess', 'Save the princess from the dragon.');
missionSystem.addMission('Find the Lost Treasure', 'Search for the hidden treasure in the cave.');
console.log(missionSystem.getMissions());