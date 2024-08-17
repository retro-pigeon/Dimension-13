var meshes, camera, playSceneCounter, cameraPos;
var timerBreathe = 0, timer = 0;
var heartbeat = .2;
var u;//undefined
var points = [
    vector3(0,0,0)
];
var spiders = [];
var health = 1;

const initialisePlayScene = () => {
    messages = [];
    meshes = [
       
    ];

    camera = { position: vector3(0, 1,69, 0), direction: vector3(0, 0, 1), forwardSpeed: 1.4, yaw: 0, pitch: 0, target: vector3(0, 0, 0), yaw: 0, fov: Math.PI / 2, aspect: width / height, near: .1, far: 200, up: vector3(0, 1, 0) };
    
    setInterval(f=>{
        zzfx(...[2,.8,100,,,,,1.5,,.3,-99,.1,1.63,,,.11,.22]);
        timerBreathe = 1;
        timer++;
    }, 950);
    setInterval(f => {
      zzfx(...[0.4,.1,10,,.07,.26,,5,,,-100,.01,,,,,.25,.73,,,-1473]); // Random 107
      heartbeat = .8;
    }, 1200);
    
    //spiders.push(Spider(vector3(0, 0, 0)));

    initialiseWebGl();

    function onMouseMove(event) {
       camera.yaw += event.movementX / 500;
       camera.pitch -= event.movementY / 500;
      }
  
      function enterPointerLock() {
        document.documentElement.requestPointerLock();
      }
  
      document.addEventListener('click', enterPointerLock);
      document.addEventListener('mousemove', onMouseMove);
  
      document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.documentElement) {
          console.log('Pointer lock engaged');
        } else {
          console.log('Pointer lock released');
        }
      });
  
      document.addEventListener('pointerlockerror', () => {
        console.log('Pointer lock failed');
      });

      maze();

}

updatePlayScene = (deltaTime) => {
    playSceneCounter++;
    heartbeat = heartbeat * heartbeat;

    processInputPlayScene(deltaTime);

    render(meshes, camera);

    spiders.forEach(spider => spider(deltaTime));

    context.globalAlpha = .4;
    context.drawImage(glCanvas, 0, 0);
    context.globalAlpha = 1;
    
    context.fillStyle = "white";
    context.font = `${15 * (1+timerBreathe)}px monospace`;
    timerBreathe -= deltaTime;
    timerBreathe *= timerBreathe;
    context.fillText(timer, 10, 20);

    context.fillRect(halfWidth - 0.5, halfHeight - 3.5, 0.5, 7);
    context.fillRect(halfWidth - 3.5, halfHeight - 0.5, 7, 0.5);


    context.fillStyle = "#E37E90";
    context.fillRect(width / 4, 10, halfWidth, 5);
    context.font = `${15*(1+heartbeat)}px sans-serif`;
    context.fillText("❤️", width / 4, 15);

    raycast(camera, points);

    updateMessages();
}

const processInputPlayScene = (deltaTime) => {
    let direction = vector3(0, 0, 0);
    if (up) {
        direction = vector3(0, 0, 1);
    }

    if (down) {
        direction = vector3(0, 0, -2/3);
    }

    if (left) {
        direction = vector3(2/3, 0, 0);
    }

    if (right) {
        direction = vector3(-2/3, 0, 0);
    }

    cameraPos = add(camera.position, multiplyBy(rotY(direction, camera.yaw), camera.forwardSpeed * deltaTime));
    if (pointIsOnMap(cameraPos.x, cameraPos.z)) camera.position = cameraPos;

    camera.direction = add(rotY(vector3(0, 0, 1), camera.yaw), vector3(0, camera.pitch, 0));
    camera.target = add(camera.position, camera.direction);
}


