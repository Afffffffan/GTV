// GTV - Police AI
// Cops that actually chase you based on wanted level

class PoliceCar {
    constructor(scene, THREE, x, z) {
        this.x = x;
        this.z = z;
        this.vx = 0;
        this.vz = 0;
        this.angle = 0;
        this.speed = 0;
        this.MAX_SPEED = 0.45;
        this.state = 'patrol';
        this.patrolAngle = Math.random() * Math.PI * 2;
        this.sirenTimer = 0;

        // Build mesh
        const group = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.5, 4),
            new THREE.MeshLambertMaterial({ color: 0x111188 })
        );
        body.position.y = 0.5;
        group.add(body);

        const top = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.4, 1.8),
            new THREE.MeshLambertMaterial({ color: 0x0000aa })
        );
        top.position.set(0, 0.95, -0.2);
        group.add(top);

        // Siren lights
        this.sirenRed = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.2, 0.4),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        this.sirenRed.position.set(-0.4, 1.2, -0.2);
        group.add(this.sirenRed);

        this.sirenBlue = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.2, 0.4),
            new THREE.MeshBasicMaterial({ color: 0x0000ff })
        );
        this.sirenBlue.position.set(0.4, 1.2, -0.2);
        group.add(this.sirenBlue);

        // Wheels
        const wGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 12);
        const wMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
        [[-1, 0.3, 1.3],[1, 0.3, 1.3],[-1, 0.3, -1.3],[1, 0.3, -1.3]].forEach(([wx,wy,wz]) => {
            const w = new THREE.Mesh(wGeo, wMat);
            w.rotation.z = Math.PI / 2;
            w.position.set(wx, wy, wz);
            group.add(w);
        });

        group.position.set(x, 0, z);
        scene.add(group);
        this.mesh = group;
        this.active = true;
    }

    update(playerX, playerZ, wantedLevel) {
        if (!this.active) return;

        const dx = playerX - this.x;
        const dz = playerZ - this.z;
        const dist = Math.sqrt(dx*dx + dz*dz);

        // Siren flash
        this.sirenTimer++;
        if (this.sirenTimer % 20 < 10) {
            this.sirenRed.material.color.setHex(0xff0000);
            this.sirenBlue.material.color.setHex(0x111111);
        } else {
            this.sirenRed.material.color.setHex(0x111111);
            this.sirenBlue.material.color.setHex(0x0000ff);
        }

        if (wantedLevel === 0) {
            this.state = 'patrol';
        } else if (dist < 150) {
            this.state = 'chase';
        } else {
            this.state = 'patrol';
        }

        const maxSpeed = this.MAX_SPEED * (0.7 + wantedLevel * 0.06);

        if (this.state === 'chase') {
            const targetAngle = Math.atan2(dx, dz);
            let angleDiff = targetAngle - this.angle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            this.angle += angleDiff * 0.05;
            this.speed = Math.min(this.speed + 0.01, maxSpeed);
        } else {
            // Patrol: circle around
            this.patrolAngle += 0.003;
            this.angle += (this.patrolAngle - this.angle) * 0.02;
            this.speed = maxSpeed * 0.4;
        }

        this.x += Math.sin(this.angle) * this.speed;
        this.z += Math.cos(this.angle) * this.speed;

        this.mesh.position.set(this.x, 0, this.z);
        this.mesh.rotation.y = -this.angle;
    }

    distanceTo(px, pz) {
        return Math.sqrt((this.x-px)**2 + (this.z-pz)**2);
    }
}

class PoliceAISystem {
    constructor(scene, THREE) {
        this.scene = scene;
        this.THREE = THREE;
        this.cops = [];
        this.spawnPositions = [
            [100, 100], [-100, 100], [100, -100], [-100, -100],
            [0, 120], [120, 0], [-120, 0], [0, -120]
        ];
    }

    update(playerX, playerZ, wantedLevel) {
        // Spawn cops based on wanted level
        const targetCops = wantedLevel * 1;
        while (this.cops.length < targetCops) {
            const [sx, sz] = this.spawnPositions[this.cops.length % this.spawnPositions.length];
            this.cops.push(new PoliceCar(this.scene, this.THREE, sx, sz));
        }

        // Despawn if wanted level drops
        while (this.cops.length > targetCops) {
            const cop = this.cops.pop();
            this.scene.remove(cop.mesh);
        }

        this.cops.forEach(cop => cop.update(playerX, playerZ, wantedLevel));
    }

    checkCollision(playerX, playerZ) {
        return this.cops.some(cop => cop.distanceTo(playerX, playerZ) < 3.5);
    }
}
