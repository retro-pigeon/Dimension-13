const style = 'font-size: 20px; color: red;';
console.log("%cIntellectual property of @retro-pigeon", style);

var glCanvas = document.getElementById("glCanvas");
var gl = glCanvas.getContext("webgl2");

var hudCanvas = document.getElementById("hudCanvas");
var context = hudCanvas.getContext("2d");

const speak=(p,r=1.5)=>{let u=new SpeechSynthesisUtterance(p);u.rate=r;window.speechSynthesis.speak(u)};

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
var redShift = 1;
const gameLoop = (timeStamp) => {

    deltaTime = (timeStamp - previousTime) * .01;
    previousTime = timeStamp;
    window.timeStamp = timeStamp;

    currentScene.update(deltaTime);

    if (isInTransition) updateTransition(deltaTime);

    const gamepads = navigator.getGamepads();
    
    // Iterate through all gamepads
    for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {

            // Log joystick positions
            leftJoystick = gamepad.axes.slice(0, 2); // Left joystick axes
            rightJoystick = gamepad.axes.slice(2, 4); // Right joystick axes
            
            // Check for X button state (typically button index 2)
            xButtonPressed = gamepad.buttons[4].pressed;// Check for X button state (typically button index 2)
            yButtonPressed = gamepad.buttons[5].pressed;
        }
    }

    let imageData = context.getImageData(0, 0, width, height);
  
    let r = Math.random() < deltaTime / 10;
    imageData = new ImageData(new Uint8ClampedArray(imageData.data.map((x, i) => {
      if (i % 4 == 0) return imageData.data[(i+(r ? 4*redShift : 8*redShift)) % (width * height * 4)];
      return x;
    })), width, height);
  
    context.putImageData(imageData, 0, 0);


    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

var left, right, up, down, space, esc, enter, shift;
const updateKeys = (code, val) => { switch (code) { case 65: left = val; break; case 16: shift = val;  break; case 87: up = val; break; case 68: right = val; break; case 32: space = val; break; case 27: esc = val; break; case 13: enter = val; break; case 83: down = val; break; default: break; } }
onkeydown = e => updateKeys(e.keyCode, true);
onkeyup = e => updateKeys(e.keyCode, false);

