// Global Variables
let playSceneCounter, cameraPos;
let timerBreathe = 0, timer = 0;
let heartbeat = 0.2;
let energy = 1;
let u; // undefined
let points = [vector3(0, 0, 0)];
let spiders = [];
let health = 1  ;
let sword = 0.99;
let gems = [];
var gemsFound = 0;

// Initialize Play Scene
const initialisePlayScene = () => {
  // Hide messages
  messages = [];

  // Initialize meshes
  meshes = [
    Mesh(plane.vertices, plane.indices, plane.colors, u, u, vector3(1000, 1000, 1000)),
    Mesh(plane.vertices, plane.indices, plane.colors, vector3(0, 5, 0), u, vector3(1000, 1000, 1000)),
    Mesh(circle.vertices, circle.indices, circle.colors, vector3(0, 0.1, 0), vector3(0, Math.PI / 4, 0), vector3(5, 5, 5), 1, 1)
  ];

  // Initialize camera
  camera = {
    position: vector3(0, 1.69, 0),
    direction: vector3(0, 0, 1),
    forwardSpeed: 1.4,
    yaw: 0,
    pitch: 0,
    target: vector3(0, 0, 0),
    fov: Math.PI / 2,
    aspect: width / height,
    near: 0.1,
    far: 200,
    up: vector3(0, 1, 0)
  };

  // Set up intervals
  setInterval(() => {
    if (distanceTo(vector3(u, u, u), camera.position) > 4.358) {
      if (timer >= 12) {
        zzfx(...[5, 0.1, 261.6256, , , 0.5, , 10, , 1.2, 19, 1, , , , , 0.05, 0.6, 0.3, 1]); // Random 141
        for (let i = 0; i < timer * timer / 10; i++) {
          let x = 100 - Math.random() * 200;
          let z = 100 - Math.random() * 200;
          if (pointIsOnMap(x, z)) {
            spiders.push(Spider(vector3(x, 0, z)));
          }
        }
      }
      zzfx(...[2, 0.8, 100, , , , , 1.5, , 0.3, -99, 0.1, 1.63, , , 0.11, 0.22]);
      timerBreathe = 1;
      timer++;
    }
  }, 950);

  setInterval(() => {
    zzfx(...[0.4, 0.1, 10, , 0.07, 0.26, , 5, , , -100, 0.01, , , , , 0.25, 0.73, , , -1473]); // Random 107
    heartbeat = 0.8;
    health += 0.05;
  }, 1200);

  initialiseWebGl();

  // Event Listeners
  document.addEventListener('click', enterPointerLock);
  document.addEventListener('mousemove', onMouseMove);

  // Maze and initial spiders
  maze();
  for (let i = 0; i < 50; i++) {
    let x = 50 - Math.random() * 100;
    let z = 50 - Math.random() * 100;
    if (pointIsOnMap(x, z)) {
      spiders.push(Spider(vector3(x, 0, z)));
    }
  }

  for (let i = 0; i < 7; i++)
  gems.push(Gem());
};

// Update Play Scene
const updatePlayScene = (deltaTime) => {
  fog = Math.sin(timeStamp / 200) * 2 + 20 + Math.random() * 0.4 - 0.8;
  playSceneCounter++;
  heartbeat *= heartbeat;

  processInputPlayScene(deltaTime);
  render(meshes, camera);

  spiders.forEach(spider => spider(deltaTime));
  gems.forEach(gem => gem(deltaTime));

  context.globalAlpha = 0.4;
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
  context.fillRect(width / 4 - 10, 10, halfWidth * health, 5);
  context.font = `${15 * (1 + heartbeat)}px sans-serif`;
  context.fillText("❤️", width / 4 - 10, 15);

  context.fillStyle = "#E8C165";
  context.fillRect(width / 4 - 10, 25, halfWidth * energy, 5);
  context.font = `${15}px sans-serif`;
  context.fillText("⚡", width / 4 - 10, 30);

  context.strokeStyle = "#BFDDE722";
  context.lineWidth = (halfWidth >> 1) * sword;
  context.beginPath();
  context.arc(halfWidth, height * 1.5, halfWidth, 0, sword * Math.PI + Math.PI);
  context.stroke();

  context.fillStyle = "#80D08C";
  context.fillText("⬡⬡⬡⬡⬡⬡⬡".replace(/⬡/g, (match, offset) => offset < gemsFound ? '⬢' : match), width - 40, 10);

  sword *= sword * sword;

  if (health > 1) health = 1;
  if (distanceTo(vector3(u, u, u), camera.position) < 4.358) {
    timer = 0;
  }

  if (gemsFound > 0) {
    showScene(winScene(), true);
  }

  updateMessages();

  if (health < 0) {
    showScene(gameOverScene(), true);
  }
};

// Process Input Play Scene
const processInputPlayScene = (deltaTime) => {
  let direction = vector3(0, 0, 0);
  if (up) {
    direction = vector3(0, 0, 1 + (shift && energy > 0));
  } else if (down) {
    direction = vector3(0, 0, -2 / 3);
  } else if (left) {
    direction = vector3(2 / 3, 0, 0);
  } else if (right) {
    direction = vector3(-2 / 3, 0, 0);
  } else {
    energy = Math.min(energy + deltaTime / 100, 1);
  }

  if (shift && energy > 0) {
    energy -= deltaTime / 100;
  }


  cameraPos = add(camera.position, multiplyBy(rotY(direction, camera.yaw), camera.forwardSpeed * deltaTime));
  if (pointIsOnMap(cameraPos.x, cameraPos.z)) camera.position = cameraPos;

  camera.direction = add(rotY(vector3(0, 0, 1), camera.yaw), vector3(0, camera.pitch, 0));
  camera.target = add(camera.position, camera.direction);
};

// Mouse and Pointer Lock Events
const onMouseMove = (event) => {
  camera.yaw += event.movementX / 500;
  camera.pitch -= event.movementY / 500;
};

const enterPointerLock = () => {
  if (energy < 0) return;
  document.documentElement.requestPointerLock();
  raycast(camera, spider_positions);
  zzfx(...[0.8, , 1000, 0.11, 0.01, 0.21, 4, 0.2, -0.1, , , , , 0.4, 0.1, , , 0.59, , , 19]);
  energy -= 0.05;
  sword = 0.99;
};
