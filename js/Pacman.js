let renderer;
let scene;
let camera;

let keysDown = [false, false, false, false];

// pacman mesh
let pacmanMesh;

// Staðsetning pacman.
let pacmanStartX = 0;
let pacmanStartY = -5.6666;
let pacmanPosX = pacmanStartX;
let pacmanPosY = pacmanStartY;
const pacmanSpeed = 0.2;
let pacmanLight;

// Eiginleikar pacman
let pacmanSuperPower = false;
let superClock = new THREE.Clock();
const superPowerTime = 7; // Tími sem pacman hefur ofureiginleikann.

// Líf
let livesLeft = 3;

// Stig
let points = 0;

// Enemies
const nrOfEnemies = 4;
let enemies = [];

// Staðsetning myndavélar
// Reyni að ná smooth hreyfingu myndavélarinnar
let cameraPositionX = 0;
let cameraPositionY = 0;

let origX = 0;
let rotation = 0;

let viewPoint = 0;

// Fylki sem geymir alla veggi í borðinu
let wallMeshes = [];
let levelGraph;

// coins
let smallerCoins;
let biggerCoins;

let pathsHome;

// Stöður fyrir leikinn:
let gamePaused = true;
let lost = false;
let won = false;

window.onload = function init() {
    // Setja upp scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x555555);

    // Camera byrjar þannig að hún horfi ofaná pacman leikvanginn
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    renderer = new THREE.WebGLRenderer({ antialiasing: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.PointLight(0xFFFFFF, 0.5);
    light.position.set(0, 60, 100);

    scene.add(light);

    document.body.appendChild(renderer.domElement);

    // Pacman
    // TODO: Hér get ég hlaðið inn betri skrá sem ég bý til í blender
    const sphereGeometry = new THREE.SphereGeometry(1, 10, 10);
    const pacmanMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00, emissive: 0xFFFF00 });
    pacmanMesh = new THREE.Mesh(sphereGeometry, pacmanMaterial);
    pacmanMesh.position.set(pacmanStartX, pacmanStartY, 0);
    scene.add(pacmanMesh);
    
    pacmanLight = new THREE.PointLight(0xfffffff, 3, 100);
    scene.add(pacmanLight);

    // Enemies
    for(let i = 0; i < nrOfEnemies; i++) {
        const enemy = new Enemy(0, 0);
        enemies.push(enemy);
        scene.add(enemy.getMesh());
    }

    wallMeshes = createLevel1(scene);
    levelGraph = level1Graph();
    const { coins, bigCoins } = addCoins(scene, levelGraph);
    smallerCoins = coins;
    biggerCoins = bigCoins;

    pathsHome = new shortestPathHomeUtil(levelGraph);

    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 37: // Vinstri ör
                keysDown[0] = true;
                break;

            case 39: // Hægri ör
                keysDown[2] = true;
                break;

            case 38: // Upp ör
                keysDown[1] = true;
                break;

            case 40: // Niður ör
                keysDown[3] = true;
                break;

            case 65: // a fyrir debug
                enemy.moveTo(14, 11);
                break;

            case 83: // s fyrir debug
                enemy.moveTo(0, 0)
                break;

            case 82: // r fyrir viewpoint 0
                setViewPoint(0);
                break;

            case 84: //t fyrir viewpoint 1
                setViewPoint(1);
                break;

            case 89: // y fyrir viewpoint 2
                setViewPoint(2);
                break;
        }
    });

    window.addEventListener('keyup', function(e) {
        switch(e.keyCode) {
            case 37: // Vinstri ör
                keysDown[0] = false;
                break;

            case 39: // Hægri ör
                keysDown[2] = false;
                break;

            case 38: // Upp ör
                keysDown[1] = false;
                break;

            case 40: // Niður ör
                keysDown[3] = false;
                break;
        }
    });

    window.addEventListener('mousemove', function(e) {
        rotation += 0.3 * (origX - e.clientX);
        rotation %= 360.0;
        console.log(rotation);
        origX = e.clientX;
    });

    animate();
}

// Athugar hvort að færsla á pakkman valdi collision við veggi
function nextMoveCollisionWalls(x, y) {
    for (let i = 0; i < wallMeshes.length; i++) {
        const currentWall = wallMeshes[i];
        const currentBox = new THREE.Box3().setFromObject(currentWall);
        
        const minX = currentBox.min.x;
        const minY = currentBox.min.y;
        const maxX = currentBox.max.x;
        const maxY = currentBox.max.y;

        if(x - (1-pacmanSpeed) <= maxX && x + (1-pacmanSpeed) >= minX && y - (1 - pacmanSpeed) <= maxY && y + (1 - pacmanSpeed) >= minY) {
            return true;
        }
    }

    return false;
}

// Athugar hvort pacman hafi rekist á draug
function checkEnemyCollision() {
    for (let i = 0; i < enemies.length; i++) {
        const currentEnemy = enemies[i];
        const currentBox = new THREE.Box3().setFromObject(currentEnemy.getMesh());

        const minX = currentBox.min.x;
        const minY = currentBox.min.y;
        const maxX = currentBox.max.x;
        const maxY = currentBox.max.y;

        const x = pacmanMesh.position.x;
        const y = pacmanMesh.position.y;

        if (currentEnemy.getGoingHome()) {
            continue;
        }

        if (x - 1 <= maxX && x + 1 > minX && y - 1 <= maxY && y + 1 >= minY) {
            // Collision við enemy.
            // pacman deyr og fer aftur á byrjunarreit.
            if (!pacmanSuperPower) {
                decreaseLives();
                if (livesLeft === 0) {
                    gameOver();
                }
                resetBoard();
                pacmanPosX = pacmanStartX;
                pacmanPosY = pacmanStartY;
            } else {
                currentEnemy.goHome();
                currentEnemy.setSuperSpeed();
                currentEnemy.setPathHome(pathsHome.pathTo(currentEnemy.getTargetVertex()));
            }
        }
    }
}

function checkCoinCollision() {
    for (let i = 0; i < smallerCoins.length; i++) {
        const currentCoin = smallerCoins[i];
        const currentBox = new THREE.Box3().setFromObject(currentCoin);

        const minX = currentBox.min.x;
        const minY = currentBox.min.y;
        const maxX = currentBox.max.x;
        const maxY = currentBox.max.y;

        const x = pacmanMesh.position.x;
        const y = pacmanMesh.position.y;

        if (x - 1 <= maxX && x + 1 > minX && y - 1 <= maxY && y + 1 >= minY) {
            currentCoin.geometry.dispose();
            currentCoin.material.dispose();
            smallerCoins.splice(i, 1);
            scene.remove(currentCoin);
            increasePoints(10);
        }
    }

    if (smallerCoins.length === 0 && biggerCoins.length === 0) {
        gameWon();
    }
}

function checkBigCoinCollision() {
    for (let i = 0; i < biggerCoins.length; i++) {
        const currentCoin = biggerCoins[i];
        const currentBox = new THREE.Box3().setFromObject(currentCoin);

        const minX = currentBox.min.x;
        const minY = currentBox.min.y;
        const maxX = currentBox.max.x;
        const maxY = currentBox.max.y;

        const x = pacmanMesh.position.x;
        const y = pacmanMesh.position.y;

        if (x - 1 <= maxX && x + 1 > minX && y - 1 <= maxY && y + 1 >= minY) {
            pacmanSuperPower = true;
            currentCoin.geometry.dispose();
            currentCoin.material.dispose();
            biggerCoins.splice(i, 1);
            scene.remove(currentCoin);
            superClock.start();
            pacmanSuperPower = true;
        }
    }

    if (smallerCoins.length === 0 && biggerCoins.length === 0) {
        gameWon();
    }
}

function changeEnemyColors(c) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].getMesh().material.color.setHex(c);
    }
}

function flashGhosts() {
    if (!pacmanSuperPower) {
        return;
    }

    if (superClock.getElapsedTime() >= superPowerTime) {
        changeEnemyColors(0xEEEEEE);
        pacmanSuperPower = false;
        return;
    }

    if (Math.floor(superClock.getElapsedTime()) % 2 == 0) {
        changeEnemyColors(0x0000FF);
    } else {
        changeEnemyColors(0xFF0000);
    }
}

function decreaseLives() {
    const div = document.getElementById('lives');
    livesLeft--;

    div.innerHTML = 'Líf: ' + livesLeft;
}

function increasePoints(additionalPoints) {
    points += additionalPoints;

    const div = document.getElementById('points');

    div.innerHTML = 'Stig: ' + points;
}

function resetBoard() {
    for(let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];

        enemy.setPosition(0, 0);
        enemy.moveTo(levelGraph.getCoords(21)[0], levelGraph.getCoords(21)[1]);
        enemy.setTargetVertex(21);
    }
}

function movePacMan() {
    // Áður en að ég færi pacman þá tékka ég hvort næsta move valdi collision og færi þá ekkiki
    if (viewPoint === 0) {
        if (keysDown[0]) {
            if (!nextMoveCollisionWalls(pacmanPosX - pacmanSpeed, pacmanPosY)) {
                pacmanPosX -= pacmanSpeed;
            }
        }

        if (keysDown[1]) {
            if (!nextMoveCollisionWalls(pacmanPosX, pacmanPosY + pacmanSpeed)) {
                pacmanPosY += pacmanSpeed;
            }
        }

        if (keysDown[2]) {
            if (!nextMoveCollisionWalls(pacmanPosX + pacmanSpeed, pacmanPosY)) {
                pacmanPosX += pacmanSpeed;
            }
        }

        if (keysDown[3]) {
            if (!nextMoveCollisionWalls(pacmanPosX, pacmanPosY - pacmanSpeed)) {
                pacmanPosY -= pacmanSpeed;
            }
        }
    } else if (viewPoint === 1 || viewPoint === 2) {   
        if (keysDown[1]) {
            const movementX = Math.cos(rotation * Math.PI / 180) * pacmanSpeed;
            const movementY = Math.sin(rotation * Math.PI / 180) * pacmanSpeed;
            if (!nextMoveCollisionWalls(pacmanPosX + movementX, pacmanPosY + movementY)) {
                pacmanPosX += movementX;
                pacmanPosY += movementY;
            }
        }
    } else if (viewPoint === 2) {

    }

    pacmanMesh.position.set(pacmanPosX, pacmanPosY, 0);
    pacmanLight.position.set(pacmanPosX, pacmanPosY, 0);
}

function moveEnemies() {

    for (let i = 0; i < nrOfEnemies; i++) {
        const enemy = enemies[i];
        if (!enemy.isMoving()) {
            if (!enemy.getGoingHome()) {
                const currentVertex = enemy.getTargetVertex();
                
                const edges = levelGraph.getEdges(currentVertex);

                // Hér finn ég bara nálægasta hnútinn.
                const randomNumber = Math.floor(Math.random() * edges.length);

                const nextVertex = edges[randomNumber].other(currentVertex);

                const nextCoordinates = levelGraph.getCoords(nextVertex);

                enemy.moveTo(nextCoordinates[0], nextCoordinates[1]);
                enemy.setTargetVertex(nextVertex);
            } else {
                const currentVertex = enemy.getTargetVertex();

                if (currentVertex === 21) {
                    enemy.arrivedHome();
                    enemy.setPathHome(null);
                    enemy.resetSpeed();
                } else {
                    const nextVertex = enemy.getNextInPathHome();

                    const nextCoordinates = levelGraph.getCoords(nextVertex);

                    enemy.moveTo(nextCoordinates[0], nextCoordinates[1]);
                    enemy.setTargetVertex(nextVertex);
                }
            }
        }

        enemy.move();
    }
}

function moveCamera() {
    if(viewPoint == 0) {
        camera.up.set(0, 1, 0);
        camera.position.lerp(new THREE.Vector3(pacmanPosX, pacmanPosY, 30), 0.05);
    } else if (viewPoint == 1) {
        const camLookX = pacmanPosX + 5 * Math.cos(rotation * Math.PI / 180);
        const camLookY = pacmanPosY + 5 * Math.sin(rotation * Math.PI / 180);
        camera.position.set(pacmanPosX, pacmanPosY, 1.5);
        camera.up.set(0, 0, 1);
        camera.lookAt(camLookX, camLookY, 0);
    } else if (viewPoint === 2) {
        const camLookX = pacmanPosX + 5 * Math.cos(rotation * Math.PI / 180);
        const camLookY = pacmanPosY + 5 * Math.sin(rotation * Math.PI / 180);
        camera.up.set(0, 0, 1);
        camera.position.set(pacmanPosX - 5 * Math.cos(rotation * Math.PI / 180), pacmanPosY - 5 * Math.sin(rotation * Math.PI / 180), 5);
        camera.lookAt(camLookX, camLookY, 0);
    }
}

function setViewPoint(point) {
    viewPoint = point;

    if (viewPoint === 0) {
        pacmanMesh.material.transparent = false;
        camera.lookAt(pacmanPosX, pacmanPosY, 0);
        camera.up.set(0, 1, 0);
    } else if (viewPoint === 1) {
        pacmanMesh.material.opacity = 0;
        camera.up.set(0, 0, 1);
    } else if (viewPoint === 2) {
        pacmanMesh.material.transparent = false;
        camera.up.set(0, 0, 1);
    }
}

function startNewGame() {
    document.getElementById('menu').style.display = 'none';

    for (let i = 0; i < smallerCoins.length; i++) {
        const currentCoin = smallerCoins[i];
        currentCoin.geometry.dispose();
        currentCoin.material.dispose();
        scene.remove(currentCoin);
    }

    for (let i = 0; i < biggerCoins.length; i++) {
        const currentCoin = biggerCoins[i];
        currentCoin.geometry.dispose();
        currentCoin.material.dispose();
        scene.remove(currentCoin);
    }

    smallerCoins = null;
    biggerCoins = null;

    const { coins, bigCoins } = addCoins(scene, levelGraph);
    smallerCoins = coins;
    biggerCoins = bigCoins;

    
    points = 0;
    livesLeft = 3;

    const div = document.getElementById('points');

    div.innerHTML = 'Stig: ' + points;

    gamePaused = false;
}

function gameOver() {
    pacmanPosX = pacmanStartX;
    pacmanPosY = pacmanStartY;

    points = 0;
    livesLeft = 3;

    document.getElementById('menu').style.display = 'flex';
    document.getElementById('menu-header').innerHTML = 'Þú tapaðir :(';

    gamePaused = true;
}

function gameWon() {
    pacmanPosX = pacmanStartX;
    pacmanPosY = pacmanStartY;

    points = 0;
    livesLeft = 3;

    document.getElementById('menu').style.display = 'flex';
    document.getElementById('menu-header').innerHTML = 'Þú vannst! :)';

    gamePaused = true;
}

function animate(time) {
    time *= 0.001;

    if (!gamePaused) {
        // Movements
        movePacMan();
        moveEnemies();
        moveCamera();

        // Collisions with enemies
        checkEnemyCollision();
        checkCoinCollision();
        checkBigCoinCollision();

        // Láta draugana blikka.
        flashGhosts();
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}