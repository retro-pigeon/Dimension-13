// Global Variables
var playSceneCounter, cameraPos;
var timerBreathe = 0, timer = 0;
var heartbeat = 0.2;
var energy = 1;
var u; // undefined
var points = [vector3(0, 0, 0)];
var spiders = [];
var health = 1;
var sword = 0.99;
var gems = [];
var gemsFound = 0;
var leftJoystick, rightJoystick, xButtonPressed, yButtonPressed;
var previousX;
var spiralGroup;
var starGroup = Group([]);
var ufos = [];
var landmines = [];
var red = 0;
const drawUI = true;
var particleGroup;
var meshes;

// Initialize Play Scene
const initialisePlayScene = () => {
  if (debug_narrative)
  speak(`
    Hey, Comrade.

Your teleporter's dead, and you're now stranded in the 13th dimension thanks to the Poland Space Program. To escape, find seven power gems.

Also, that timer? If it hits 13, run back to the teleporter or face an epic ending.

Good luck, which you don't need because you will die anyway!`, 1.2);
  // Hide messages
  messages = [];

  // Create spiral
  spiralGroup = Group([]);
  for (let i = 0; i < 10; i++) spiralGroup.meshes.push(
    Mesh(ray.vertices, ray.indices, ray.colors, vector3(0, 0, 0), vector3(0, i / 10 * Math.PI * 2, 0), vector3(4.5, 4.5, 4.5))
  );

  // Initialize meshes
  meshes = [
    Mesh(plane.vertices, plane.indices, plane.colors, u, u, vector3(1000, 1000, 1000)),
    Mesh(circle.vertices, circle.indices, circle.colors, vector3(0, 0.1, 0), vector3(0, Math.PI / 4, 0), vector3(4.5, 1, 4.5), 1, 1),
    Group([Mesh(sun.vertices, sun.indices, sun.colors, vector3(0, 90, 0), u, vector3(30, 30, 30))])
  ];

  // landmines.push(Landmine(vector3(10, 0, 10)));

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
        red = .5;
        redShift = 2;
        ufos.push(Ufo());
        //zzfx(...[5, 0.1, 261.6256, , , 0.5, , 10, , 1.2, 19, 1, , , , , 0.05, 0.6, 0.3, 1]); // Random 141
        for (let i = 0; i < timer * timer / 10; i++) {
          let x = 100 - Math.random() * 200;
          let z = 100 - Math.random() * 200;
          if (pointIsOnMap(x, z) && distanceTo(vector3(u, u, u), vector3(x, 0, z)) > 1 && distanceTo(camera.position, vector3(x, 0, z)) > 10) {
            spiders.push(Spider(vector3(x, 0, z), Math.random() < .3));
          }
        }
        zzfx(...[2.1, 0, 1e6, , .5, 0, 3, 2.6, , , , , , , , .5]); // Hit 203
      } else redShift = 1;
      zzfx(...[2, 0.8, 100, , , , , 1.5, , 0.3, -99, 0.1, 1.63, , , 0.11, 0.22]);
      timerBreathe = 1;
      timer++;
      if (timer == 13) speak("Run back");
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


  for (let i = 0; i < 100; i++) {
    let x = 100 - Math.random() * 200;
    let z = 100 - Math.random() * 200;
    if (pointIsOnMap(x, z) && distanceTo(vector3(u, u, u), vector3(x, 0, z)) > 10)
      landmines.push(Landmine(vector3(x, 0, z)));
  }


  for (let i = 0; i < 7; i++)
    gems.push(Gem());


  for (let i = 0; i < 1000; i++)
    starGroup.meshes.push(Mesh(star.vertices, star.indices, star.colors, vector3(rand(150), 30, rand(150)), u, vector3(.5, .5, .5)))

  meshes.push(starGroup);

  meshes.push(spiralGroup);


  particleGroup = Group([]);
  meshes.push(particleGroup);
};

// Update Play Scene
const updatePlayScene = (deltaTime) => {
  fog = Math.sin(timeStamp / 200) * 2 + 10 + Math.random() * 0.4 - 0.8;
  playSceneCounter++;
  heartbeat *= heartbeat;
  red -= deltaTime / 10;

  meshes[2].rotation.x += deltaTime / 40;
  spiralGroup.rotation.y += deltaTime / 40;


  spiders.forEach(spider => spider(deltaTime));
  gems.forEach(gem => gem(deltaTime));
  ufos.forEach(ufo => ufo(deltaTime));
  landmines.forEach(l => l(deltaTime));

  context.globalAlpha = 0.8;
  context.drawImage(glCanvas, 0, 0);
  context.globalAlpha = 1;

  if (drawUI) {
    context.fillStyle = "white";
    context.font = `${15 * (1 + timerBreathe)}px monospace`;
    timerBreathe -= deltaTime;
    timerBreathe *= timerBreathe;
    context.fillText(timer, 10, 20);

    context.fillRect(halfWidth - 0.5, halfHeight - 3.5, 0.5, 7);
    context.fillRect(halfWidth - 3.5, halfHeight - 0.5, 7, 0.5);

    context.fillStyle = "#E37E90";
    context.fillRect(width / 4 - 10, 10, halfWidth * Math.max(Math.min(1, health), 0), 5);
    context.font = `${15 * (1 + heartbeat)}px sans-serif`;
    context.fillText("❤️", width / 4 - 10, 15);

    context.fillStyle = "#E8C165";
    context.fillRect(width / 4 - 10, 25, halfWidth * Math.max(Math.min(1, energy), 0), 5);
    context.font = `${15}px sans-serif`;
    context.fillText("⚡", width / 4 - 10, 30);

    context.strokeStyle = "#BFDDE722";
    context.lineWidth = (halfWidth >> 1) * sword;
    context.beginPath();
    context.arc(halfWidth, height * 1.5, halfWidth, 0, sword * Math.PI + Math.PI);
    context.stroke();

    context.fillStyle = "#FF000022";
    if (red > 0)
      context.fillRect(0, 0, width, height);

    context.fillStyle = "#80D08C";
    context.fillText("⬡⬡⬡⬡⬡⬡⬡".replace(/⬡/g, (match, offset) => offset < gemsFound ? '⬢' : match), width - 40, 10);
  }

  sword *= Math.pow(sword, 60 * deltaTime);

  if (health > 1) health = 1;
  if (distanceTo(vector3(u, u, u), camera.position) < 4.358) {
    timer = 0;
  }

  if (gemsFound > 6) {
    showScene(winScene(), true);
  }

  starGroup.rotation.y += deltaTime / 100;

  updateMessages();

  if (health < 0) {
    showScene(gameOverScene(), true);
  }

  updateParticles();



  previousX = xButtonPressed;


  processInputPlayScene(deltaTime);
  render(meshes, camera);
};

// Process Input Play Scene
const processInputPlayScene = (deltaTime) => {
  let direction = vector3(0, 0, 0);
  if (up) {
    direction = vector3(0, 0, 1 + ((shift) && energy > 0));
  } else if (down) {
    direction = vector3(0, 0, -2 / 3);
  } else if (left) {
    direction = vector3(2 / 3, 0, 0);
  } else if (right) {
    direction = vector3(-2 / 3, 0, 0);
  } else if (!yButtonPressed && (!leftJoystick || Math.abs(leftJoystick[1]) < .1)) {
    energy = Math.min(energy + deltaTime / 50, 1);
  }

  if (leftJoystick) {
    camera.yaw += leftJoystick[0] * 1 * deltaTime;
    direction.z = -leftJoystick[1] * (1 + yButtonPressed) * 1;
  }

  if (rightJoystick) {
    camera.yaw += rightJoystick[0] / 2 * deltaTime;
    camera.pitch -= rightJoystick[1] / 2 * deltaTime;
  }

  if (previousX == 0 && xButtonPressed == 1) {
    enterPointerLock();
  }

  if (yButtonPressed || shift) {
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
