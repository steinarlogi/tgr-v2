class Enemy {

    speed = 0.2;

    targetPositionX;
    targetPositionY;

    currentPosX;
    currentPosY;

    targetVertex;

    goingHome;
    pathHome;

    mesh;

    constructor(x, y) {
        this.currentPosX = x;
        this.currentPosY = y;

        this.targetPositionX = x;
        this.targetPositionY = y;

        const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
        const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xEEEEEE });
        this.mesh = new THREE.Mesh(enemyGeometry, enemyMaterial);
        this.mesh.scale.set(2, 2, 1);
        this.mesh.position.set(this.currentPosX, this.currentPosY, 0.1);

        this.targetVertex = 21;
    }

    isMoving() {
        return !((Math.sqrt((this.targetPositionX-this.currentPosX)**2 + (this.targetPositionY - this.currentPosY)**2)) <= this.speed / 2 + 0.1);
    }

    currentPosition() {
        return new THREE.Vector3(this.currentPosX, this.currentPosY);
    }

    move() {
        if(!this.isMoving()) {
            return;
        }

        const direction = [this.targetPositionX - this.currentPosX, this.targetPositionY - this.currentPosY];

        const length = Math.sqrt(direction[0]**2 + direction[1]**2);

        const unitDirection = [direction[0] / length, direction[1] / length];

        this.currentPosX = this.currentPosX + unitDirection[0] * this.speed;
        this.currentPosY = this.currentPosY + unitDirection[1] * this.speed;

        this.mesh.position.set(this.currentPosX, this.currentPosY, 0.1);
    }

    moveTo(x, y) {
        this.targetPositionX = x;
        this.targetPositionY = y;
    }

    getMesh() {
        return this.mesh;
    }

    getTargetVertex() {
        return this.targetVertex;
    }

    setTargetVertex(v) {
        this.targetVertex = v;
    }

    setPosition(x, y) {
        this.currentPosX = x;
        this.currentPosY = y;

        this.mesh.position.set(this.currentPosX, this.currentPosY, 0.1);
    }

    goHome() {
        this.goingHome = true;
    }

    arrivedHome() {
        this.goingHome = false;
    }

    setPathHome(p) {
        this.pathHome = p;
    }

    getNextInPathHome() {
        return this.pathHome.shift();
    }

    setSuperSpeed() {
        this.speed = 0.5;
    }

    resetSpeed() {
        this.speed = 0.2;
    }

    getGoingHome() {
        return this.goingHome;
    }
}