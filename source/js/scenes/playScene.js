var meshes, camera, playSceneCounter;
var u;//undefined

const initialisePlayScene = () => {
    messages = [];
    meshes = [Mesh(level.vertices, level.indices, level.colors, u, u, u, 1)];

    camera = { position: vector3(0, 0, -64), direction: vector3(0, 0, 1), forwardSpeed: 1, yaw: 0, target: vector3(0, 0, 0), yaw: 0, fov: Math.PI / 2, aspect: width / height, near: .1, far: 200, up: vector3(0, 1, 0) };
    
    initialiseWebGl();
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
    if (left) camera.yaw -= deltaTime * 0.5;
    if (right) camera.yaw += deltaTime * 0.5;

    if (up) camera.position = add(camera.position, multiplyBy(camera.direction, camera.forwardSpeed * deltaTime))

    camera.direction = rotY(vector3(0, 0, 1), camera.yaw)
    camera.target = add(camera.position, camera.direction);
}


