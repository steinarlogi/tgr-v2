const tempNrOfGrid = 10;
const tempHorizontalNrOfGrid = 9;

function createLevel1(scene) {
    let walls = [];

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x11FF11, shininess: 10 });
    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const starTexture = new THREE.TextureLoader().load('../res/textures/stars.jpg');
    starTexture.wrapS = THREE.repeatWrapping;
    starTexture.wrapT = THREE.repeatWrapping;
    starTexture.repeat.set(100, 100);
    const starMaterial = new THREE.MeshStandardMaterial({ 
        map: starTexture
    });


    // Bakgrunnur
    const backgroundMesh = new THREE.Mesh(planeGeometry, starMaterial);
    backgroundMesh.scale.set(1000, 1000, 1);
    backgroundMesh.position.set(0, 0, -100);
    scene.add(backgroundMesh);

    // Vinstri veggur
    const leftMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    leftMesh.scale.set(1, 52, 1);
    leftMesh.position.set(-20.5, 0, 0);
    scene.add(leftMesh);
    walls.push(leftMesh);

    // Hægri veggur
    const rightMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    rightMesh.scale.set(1, 52, 1);
    rightMesh.position.set(20.5, 0, 0);
    scene.add(rightMesh);
    walls.push(rightMesh);

    // Efri veggur
    const topMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    topMesh.scale.set(40, 1, 1);
    topMesh.position.set(0, 25.5, 0);
    scene.add(topMesh);
    walls.push(topMesh);

    // Neðri veggur
    const bottomMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    bottomMesh.scale.set(40, 1, 1);
    bottomMesh.position.set(0, -25.5, 0);
    scene.add(bottomMesh);
    walls.push(bottomMesh);

    // Völundarhús

    // Horizontal walls
    const topWallHor = new THREE.Mesh(boxGeometry, boxMaterial);
    topWallHor.scale.set(4.1 * 8, 1, 1);
    topWallHor.position.set(0, 5.6666/2 + 5.6666 * 3, 0);
    scene.add(topWallHor);
    walls.push(topWallHor);

    const smallTopWallHor = new THREE.Mesh(boxGeometry, boxMaterial);
    smallTopWallHor.scale.set(4.1 * 2, 1, 1);
    smallTopWallHor.position.set(0, 5.6666/2 + 5.6666 * 2, 0);
    scene.add(smallTopWallHor);
    walls.push(smallTopWallHor);

    const smallTopBottomWallLeftHor = new THREE.Mesh(boxGeometry, boxMaterial);
    smallTopBottomWallLeftHor.scale.set(4.1, 1, 1);
    smallTopBottomWallLeftHor.position.set(-4.1/2 - 4.1, 5.6666/2 + 5.6666, 0);
    scene.add(smallTopBottomWallLeftHor);
    walls.push(smallTopBottomWallLeftHor);

    const smallTopBottomWallRightHor = new THREE.Mesh(boxGeometry, boxMaterial);
    smallTopBottomWallRightHor.scale.set(4.1, 1, 1);
    smallTopBottomWallRightHor.position.set(4.1/2 + 4.1, 5.6666/2 + 5.6666, 0);
    scene.add(smallTopBottomWallRightHor);
    walls.push(smallTopBottomWallRightHor);

    const leftGateHor = new THREE.Mesh(boxGeometry, boxMaterial);
    leftGateHor.scale.set(4.1, 1, 1);
    leftGateHor.position.set(-4.1/2 - 4.1, 5.6666/2, 0);
    scene.add(leftGateHor);
    walls.push(leftGateHor);

    const rightGateHor = new THREE.Mesh(boxGeometry, boxMaterial);
    rightGateHor.scale.set(4.1, 1, 1);
    rightGateHor.position.set(4.1/2 + 4.1, 5.6666/2, 0);
    scene.add(rightGateHor);
    walls.push(rightGateHor);

    const bottomGateHor = new THREE.Mesh(boxGeometry, boxMaterial);
    bottomGateHor.scale.set(4.1 * 4, 1, 1);
    bottomGateHor.position.set(0, -5.6666/2, 0);
    scene.add(bottomGateHor);
    walls.push(bottomGateHor);

    const leftBottomTopHor = new THREE.Mesh(boxGeometry, boxMaterial);
    leftBottomTopHor.scale.set(4.1 * 2, 1, 1);
    leftBottomTopHor.position.set(-4.1 * 3, -5.6666/2 - 5.6666*2, 0);
    scene.add(leftBottomTopHor);
    walls.push(leftBottomTopHor);

    const leftBottomBottomHor = new THREE.Mesh(boxGeometry, boxMaterial);
    leftBottomBottomHor.scale.set(4.1 * 2, 1, 1);
    leftBottomBottomHor.position.set(-4.1 * 3, -5.6666/2 - 5.6666*3, 0);
    scene.add(leftBottomBottomHor);
    walls.push(leftBottomBottomHor);

    const rightBottomTopHor = new THREE.Mesh(boxGeometry, boxMaterial);
    rightBottomTopHor.scale.set(4.1 * 2, 1, 1);
    rightBottomTopHor.position.set(4.1 * 3, -5.6666/2 - 5.6666*2, 0);
    scene.add(rightBottomTopHor);
    walls.push(rightBottomTopHor);

    const rightBottomBottomHor = new THREE.Mesh(boxGeometry, boxMaterial);
    rightBottomBottomHor.scale.set(4.1 * 2, 1, 1);
    rightBottomBottomHor.position.set(4.1 * 3, -5.6666/2 - 5.6666*3, 0);
    scene.add(rightBottomBottomHor);
    walls.push(rightBottomBottomHor);

    // Vertical walls
    const leftBiggestWallVer = new THREE.Mesh(boxGeometry, boxMaterial);
    leftBiggestWallVer.scale.set(1, 5.6*4, 1);
    leftBiggestWallVer.position.set(-4.1 * 4, 5.6666/2, 0);
    scene.add(leftBiggestWallVer);
    walls.push(leftBiggestWallVer);

    const leftBigWall = new THREE.Mesh(boxGeometry, boxMaterial);
    leftBigWall.scale.set(1, 5.6 * 2, 1);
    leftBigWall.position.set(-4.1 * 3, -5.6666 / 2, 0);
    scene.add(leftBigWall);
    walls.push(leftBigWall);

    const leftSmallWall = new THREE.Mesh(boxGeometry, boxMaterial);
    leftSmallWall.scale.set(1, 5.6, 1);
    leftSmallWall.position.set(-4.1 * 3, 5.666 * 2, 0);
    scene.add(leftSmallWall);
    walls.push(leftSmallWall);

    const leftBigWall2 = new THREE.Mesh(boxGeometry, boxMaterial);
    leftBigWall2.scale.set(1, 5.6 * 2, 1);
    leftBigWall2.position.set(-4.1 * 2, -5.6666 / 2, 0);
    scene.add(leftBigWall2);
    walls.push(leftBigWall2);

    const leftSmallWall2 = new THREE.Mesh(boxGeometry, boxMaterial);
    leftSmallWall2.scale.set(1, 5.6, 1);
    leftSmallWall2.position.set(-4.1 * 2, 5.666 * 2, 0);
    scene.add(leftSmallWall2);
    walls.push(leftSmallWall2);

    const middleSmallWallVer = new THREE.Mesh(boxGeometry, boxMaterial);
    middleSmallWallVer.scale.set(1, 5.6, 1);
    middleSmallWallVer.position.set(0, 2 * 5.6666, 0);
    scene.add(middleSmallWallVer);
    walls.push(middleSmallWallVer);

    const rightBiggestWallVer = new THREE.Mesh(boxGeometry, boxMaterial);
    rightBiggestWallVer.scale.set(1, 5.6*4, 1);
    rightBiggestWallVer.position.set(4.1 * 4, 5.6666/2, 0);
    scene.add(rightBiggestWallVer);
    walls.push(rightBiggestWallVer);

    const rightBigWall = new THREE.Mesh(boxGeometry, boxMaterial);
    rightBigWall.scale.set(1, 5.6 * 2, 1);
    rightBigWall.position.set(4.1 * 3, -5.6666 / 2, 0);
    scene.add(rightBigWall);
    walls.push(rightBigWall);

    const rightSmallWall = new THREE.Mesh(boxGeometry, boxMaterial);
    rightSmallWall.scale.set(1, 5.6, 1);
    rightSmallWall.position.set(4.1 * 3, 5.666 * 2, 0);
    scene.add(rightSmallWall);
    walls.push(rightSmallWall);

    const rightBigWall2 = new THREE.Mesh(boxGeometry, boxMaterial);
    rightBigWall2.scale.set(1, 5.6 * 2, 1);
    rightBigWall2.position.set(4.1 * 2, -5.6666 / 2, 0);
    scene.add(rightBigWall2);
    walls.push(rightBigWall2);

    const rightSmallWall2 = new THREE.Mesh(boxGeometry, boxMaterial);
    rightSmallWall2.scale.set(1, 5.6, 1);
    rightSmallWall2.position.set(4.1 * 2, 5.666 * 2, 0);
    scene.add(rightSmallWall2);
    walls.push(rightSmallWall2);

    // Stóri kassinn.
    const bigBox = new THREE.Mesh(boxGeometry, boxMaterial);
    bigBox.scale.set(2 * 4.1, 2 * 5.6666, 1);
    bigBox.position.set(0, -5.6666/2  - 5.6666 * 2);
    scene.add(bigBox);
    walls.push(bigBox);

    return walls;
}

// Skilar neti fyrir borðið.
function level1Graph() {
    const graph = new LevelGraph(42);

    // Setja hnitin á hnútunum.
    graph.setCoords(0, [-4.1 / 2 - 4.1 * 4, 5.6666 * 4]);
    graph.setCoords(1, [4.1/ 2 + 4.1 * 4, 5.6666 * 4]);
    graph.setCoords(2, [-4.1 / 2 - 4.1 * 4, 5.6666 * 3]);
    graph.setCoords(3, [-4.1 / 2 - 4.1 * 3, 5.6666 * 3]);
    graph.setCoords(4, [-4.1 / 2 - 4.1 * 2, 5.6666 * 3]);
    graph.setCoords(5, [-4.1 / 2 - 4.1, 5.6666 * 3]);
    graph.setCoords(6, [4.1 / 2 + 4.1, 5.6666 * 3]);
    graph.setCoords(7, [4.1 / 2 + 4.1 * 2, 5.6666 * 3]);
    graph.setCoords(8, [4.1 / 2 + 4.1 * 3, 5.6666 * 3]);
    graph.setCoords(9, [4.1 / 2 + 4.1 * 4, 5.6666 * 3]);
    graph.setCoords(10, [-4.1 / 2 - 4.1, 5.6666 * 2]);
    graph.setCoords(11, [-4.1 / 2, 5.6666 * 2]);
    graph.setCoords(12, [4.1 / 2, 5.6666 * 2]);
    graph.setCoords(13, [4.1 / 2 + 4.1, 5.6666 * 2]);
    graph.setCoords(14, [-4.1 / 2 - 4.1 * 3, 5.6666]);
    graph.setCoords(15, [-4.1 / 2 - 4.1 * 2, 5.6666]);
    graph.setCoords(16, [-4.1 / 2, 5.6666]);
    graph.setCoords(17, [4.1 / 2, 5.6666]);
    graph.setCoords(18, [4.1 / 2 + 4.1 * 2, 5.6666]);
    graph.setCoords(19, [4.1 / 2 + 4.1 * 3, 5.6666]);
    graph.setCoords(20, [-4.1 / 2 - 4.1, 0]);
    graph.setCoords(21, [-4.1 / 2, 0]);
    graph.setCoords(22, [4.1 / 2, 0]);
    graph.setCoords(23, [4.1 / 2 + 4.1, 0]);
    graph.setCoords(24, [-4.1 / 2 - 4.1, -5.6666]);
    graph.setCoords(25, [4.1 / 2 + 4.1, -5.6666]);
    graph.setCoords(26, [-4.1 / 2 - 4.1 * 4, -5.6666 * 2]);
    graph.setCoords(27, [-4.1 / 2 - 4.1 * 3, -5.6666 * 2]);
    graph.setCoords(28, [-4.1 / 2 - 4.1 * 2, -5.6666 * 2]);
    graph.setCoords(29, [-4.1 / 2 - 4.1, -5.6666 * 2]);
    graph.setCoords(30, [4.1 / 2 + 4.1, -5.6666 * 2]);
    graph.setCoords(31, [4.1 / 2 + 4.1 * 2, -5.6666 * 2]);
    graph.setCoords(32, [4.1 / 2 + 4.1 * 3, -5.6666 * 2]);
    graph.setCoords(33, [4.1 / 2 + 4.1 * 4, -5.6666 * 2]);
    graph.setCoords(34, [-4.1 / 2 - 4.1 * 4, -5.6666 * 3]);
    graph.setCoords(35, [-4.1 / 2 - 4.1, -5.6666 * 3]);
    graph.setCoords(36, [4.1 / 2 + 4.1, -5.6666 * 3]);
    graph.setCoords(37, [4.1 / 2 + 4.1 * 4, -5.6666 * 3]);
    graph.setCoords(38, [-4.1 / 2 - 4.1 * 4, -5.6666 * 4]);
    graph.setCoords(39, [-4.1 / 2 - 4.1, -5.6666 * 4]);
    graph.setCoords(40, [4.1 / 2 + 4.1, -5.6666 * 4]);
    graph.setCoords(41, [4.1 / 2 + 4.1 * 4, -5.6666 * 4]);
    

    // Tengja hnútana saman.
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(1, 9);
    graph.addEdge(2, 3);
    graph.addEdge(2, 26);
    graph.addEdge(9, 33);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(5, 6);
    graph.addEdge(6, 7);
    graph.addEdge(7, 8);
    graph.addEdge(8, 9);
    graph.addEdge(3, 14);
    graph.addEdge(4, 15);
    graph.addEdge(5, 10);
    graph.addEdge(6, 13);
    graph.addEdge(7, 18);
    graph.addEdge(8, 19);
    graph.addEdge(10, 11);
    graph.addEdge(12, 13);
    graph.addEdge(14, 15);
    graph.addEdge(15, 16);
    graph.addEdge(16, 17);
    graph.addEdge(17, 18);
    graph.addEdge(18, 19);
    graph.addEdge(14, 27);
    graph.addEdge(15, 28);
    graph.addEdge(16, 21);
    graph.addEdge(17, 22);
    graph.addEdge(18, 31);
    graph.addEdge(19, 32);
    graph.addEdge(20, 21);
    graph.addEdge(21, 22);
    graph.addEdge(22, 23);
    graph.addEdge(24, 25);
    graph.addEdge(24, 29);
    graph.addEdge(25, 30);
    graph.addEdge(26, 27);
    graph.addEdge(27, 28);
    graph.addEdge(28, 29);
    graph.addEdge(30, 31);
    graph.addEdge(31, 32);
    graph.addEdge(32, 33);
    graph.addEdge(26, 34);
    graph.addEdge(29, 35);
    graph.addEdge(30, 36);
    graph.addEdge(33, 37);
    graph.addEdge(34, 35);
    graph.addEdge(36, 37);
    graph.addEdge(34, 38);
    graph.addEdge(35, 39);
    graph.addEdge(36, 40);
    graph.addEdge(37, 41);
    graph.addEdge(38, 39);
    graph.addEdge(39, 40);
    graph.addEdge(40, 41);

    return graph;
}

function addCoins(scene, graph) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const coinMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF11});
    const bigCoinMaterial = new THREE.MeshPhongMaterial({ color: 0xBBBB14});
    const allEdges = graph.getAllEdges();
    const bigCoinProbability = 0.3;

    let coins = [];
    let bigCoins = [];
    
    // Litlir peningar
    for (let i = 0; i < allEdges.length; i++) {
        const edge = allEdges[i];

        const j = edge.vertex();
        const k = edge.other(j);

        const coordJ = graph.getCoords(j);
        const coordK = graph.getCoords(k);

        if (coordJ[0] == coordK[0]) {
            for (let pos = Math.min(coordJ[1], coordK[1]) + 5.6666; pos < Math.max(coordJ[1], coordK[1]) - 0.01; pos += 5.6666) {
                const coinMesh = new THREE.Mesh(boxGeometry, coinMaterial);
                coinMesh.position.set(coordJ[0], pos, 0);
                scene.add(coinMesh);
                coins.push(coinMesh);
            }
        } else if (coordJ[1] == coordK[1]) {
            for (let pos = Math.min(coordJ[0], coordK[0]) + 4.1; pos < Math.max(coordJ[0], coordK[0])-0.01; pos += 4.1) {
                const coinMesh = new THREE.Mesh(boxGeometry, coinMaterial);
                coinMesh.position.set(pos, coordJ[1], 0);
                scene.add(coinMesh);
                coins.push(coinMesh);
            }
        }
    }

    // Stórir peningar.
    for (let i = 0; i < graph.getV(); i++) {
        if (Math.random() < bigCoinProbability) {
            const coords = graph.getCoords(i);
            const coinMesh = new THREE.Mesh(boxGeometry, bigCoinMaterial);
            coinMesh.scale.set(2, 2, 1);
            coinMesh.position.set(coords[0], coords[1], 0);
            
            scene.add(coinMesh);
            bigCoins.push(coinMesh);
        } else {
            const coords = graph.getCoords(i);
            const coinMesh = new THREE.Mesh(boxGeometry, coinMaterial);
            coinMesh.position.set(coords[0], coords[1], 0);
            scene.add(coinMesh);
            coins.push(coinMesh);
        }
    }

    return { coins, bigCoins };
}