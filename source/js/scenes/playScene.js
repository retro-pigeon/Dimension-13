var meshes, camera, playSceneCounter, cameraPos;
var timerBreathe = 0, timer = 0;
var heartbeat = .2;
var energy = 1;
var u;//undefined
var points = [
  vector3(0, 0, 0)
];
var spiders = [];
var health = 1;

const initialisePlayScene = () => {
  messages = [];
  meshes = [
    Mesh(plane.vertices, plane.indices, plane.colors, u, u, vector3(1e3, 1e3, 1e3)),
    Mesh(plane.vertices, plane.indices, plane.colors, vector3(0, 5, 0), u, vector3(1e3, 1e3, 1e3)),
    Mesh(circle.vertices, circle.indices, circle.colors, vector3(0, 0.1, 0), vector3(0, Math.PI/4, 0), vector3(5, 5, 5), 1, 1)
  ];

  camera = { position: vector3(0, 1.69, 0), direction: vector3(0, 0, 1), forwardSpeed: 1.4, yaw: 0, pitch: 0, target: vector3(0, 0, 0), yaw: 0, fov: Math.PI / 2, aspect: width / height, near: .1, far: 200, up: vector3(0, 1, 0) };

  setInterval(f => {
    if (distanceTo(vector3(u, u, u), camera.position) > 4.358) {
      if (timer >= 12) {
        zzfx(...[5, .1, 261.6256, , , .5, , 10, , 1.2, 19, 1, , , , , .05, .6, .3, 1]); // Random 141
        for (let i = 0; i < 5; i++) {
          let x = 100 - Math.random() * 200;
          let z = 100 - Math.random() * 200;
          if (pointIsOnMap(x, z)) {
            spiders.push(Spider(vector3(x, 0, z)));
          }
        }
      }
      zzfx(...[2, .8, 100, , , , , 1.5, , .3, -99, .1, 1.63, , , .11, .22]);
      timerBreathe = 1;
      timer++;
    }
  }, 950);
  setInterval(f => {
    zzfx(...[0.4, .1, 10, , .07, .26, , 5, , , -100, .01, , , , , .25, .73, , , -1473]); // Random 107
    heartbeat = .8;
    health += .05;
  }, 1200);

  initialiseWebGl();

  function onMouseMove(event) {
    camera.yaw += event.movementX / 500;
    camera.pitch -= event.movementY / 500;
  }

  function enterPointerLock() {
    document.documentElement.requestPointerLock();
    raycast(camera, spider_positions);
    
  }

  document.addEventListener('click', enterPointerLock);
  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === document.documentElement) {
      console.log('Pointer lock engaged');
    }

    
  });

  document.addEventListener('pointerlockerror', () => {
    console.log('Pointer lock failed');
  });

  maze();

  for (let i = 0; i < 20; i++) {
    let x = 50 - Math.random() * 100;
    let z = 50 - Math.random() * 100;
    if (pointIsOnMap(x, z)) {
      spiders.push(Spider(vector3(x, 0, z)));
    }
  }

 
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
  context.font = `${15 * (1 + timerBreathe)}px monospace`;
  timerBreathe -= deltaTime;
  timerBreathe *= timerBreathe;
  context.fillText(timer, 10, 20);

  context.fillRect(halfWidth - 0.5, halfHeight - 3.5, 0.5, 7);
  context.fillRect(halfWidth - 3.5, halfHeight - 0.5, 7, 0.5);


  context.fillStyle = "#E37E90";
  context.fillRect(width / 4, 10, halfWidth * health, 5);
  context.font = `${15 * (1 + heartbeat)}px sans-serif`;
  context.fillText("❤️", width / 4, 15);

  context.fillStyle = "#E8C165";
  context.fillRect(width / 4, 25, halfWidth * energy, 5);
  context.font = `${15}px sans-serif`;
  context.fillText("⚡", width / 4, 30);

  if (health > 1) health = 1;
  if (distanceTo(vector3(u, u, u), camera.position) < 4.358) {
    timer = 0;
  }

    updateMessages();

    if (health < 0) {
      showScene(gameOverScene(), false);
    }
}

const processInputPlayScene = (deltaTime) => {
  let direction = vector3(0, 0, 0);
  if (up) {
    direction = vector3(0, 0, 1 + (shift & (energy > 0)));
  }

  else if (down) {
    direction = vector3(0, 0, -2 / 3);
  }

  else if (left) {
    direction = vector3(2 / 3, 0, 0);
  }

  else if (right) {
    direction = vector3(-2 / 3, 0, 0);
  }

  else energy = Math.min(energy + deltaTime / 100, 1);

  if (shift && energy > 0) {
    energy -= deltaTime / 100;
  }


  cameraPos = add(camera.position, multiplyBy(rotY(direction, camera.yaw), camera.forwardSpeed * deltaTime));
  if (pointIsOnMap(cameraPos.x, cameraPos.z)) camera.position = cameraPos;

  camera.direction = add(rotY(vector3(0, 0, 1), camera.yaw), vector3(0, camera.pitch, 0));
  camera.target = add(camera.position, camera.direction);
}


