const style = 'font-size: 20px; color: red;';
console.log("%cIntellectual property of @retro-pigeon", style);

var glCanvas = document.getElementById("glCanvas");
var gl = glCanvas.getContext("webgl2");

var glCanvas = document.getElementById("glCanvas");
var gl = glCanvas.getContext("webgl2");

var hudCanvas = document.getElementById("hudCanvas");
var context = hudCanvas.getContext("2d");

var width, height, halfWidth, halfHeight;

function resize() {
    width = window.innerWidth / 4;
    height = window.innerHeight / 4;
    halfWidth = width * .5;
    halfHeight = height * .5;
    hudCanvas.width = width;
    hudCanvas.height = height;
    glCanvas.width = width;
    glCanvas.height = height;

    if (camera !== undefined && projectionMatrixLocation !== undefined) {
        camera.aspect = width / height;
        gl.uniformMatrix4fv(projectionMatrixLocation, false, perspective(camera.fov, camera.aspect, camera.near, camera.far));
    }
}
resize();
onresize = resize;


var meshMatrixLocation, cameraMatrixLocation, projectionMatrixLocation, camera, meshes, program;

var currentScene = menuScene();
currentScene.initialise();

var deltaTime, previousTime = 0;
const gameLoop = (timeStamp) => {

    deltaTime = (timeStamp - previousTime) * .01;
    previousTime = timeStamp;
    window.timeStamp = timeStamp;

    currentScene.update(deltaTime);

    if (isInTransition) updateTransition(deltaTime);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

var left, right, up, down, space, esc, enter, shift;
const updateKeys = (code, val) => { switch (code) { case 65: left = val; break; case 16: shift = val;  break; case 87: up = val; break; case 68: right = val; break; case 32: space = val; break; case 27: esc = val; break; case 13: enter = val; break; case 83: down = val; break; default: break; } }
onkeydown = e => updateKeys(e.keyCode, true);
onkeyup = e => updateKeys(e.keyCode, false);

