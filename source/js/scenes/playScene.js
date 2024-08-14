var meshes, swordAngle, playerHealth, playerTargetHealth, canHit, potions, katanaIsShown, katanaIsFound, katanaSword, grassBunches, playSceneCounter;

const initialisePlayScene = () => {
    messages = [];
    meshes = [];

    camera = { position: vector3(-12, 15, -66), direction: vector3(0, 0, 1), forwardSpeed: 1, yaw: 0, target: vector3(0, 0, 0), yaw: 0, fov: Math.PI / 2, aspect: width / height, near: .1, far: 200, up: vector3(0, 1, 0) };

}

updatePlayScene = (deltaTime) => {
    playSceneCounter++;

    processInputPlayScene(deltaTime);

    render(meshes, camera);

    context.globalAlpha = .4;
    context.drawImage(glCanvas, 0, 0);
    context.globalAlpha = 1;

    updateMessages();
}

const processInputPlayScene = (deltaTime) => {
    // Process input here
}


