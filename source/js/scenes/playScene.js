// Global Variables
var angle = Math.random() * Math.PI * 2,
  cameraPos,
  drawUI = true,
  energy = 1,
  gems = [],
  gemsFound = 0,
  health = 1,
  heartbeat = 0.2,
  items = [],
  landmines = [],
  leftJoystick,
  meshes,
  particleGroup,
  playSceneCounter,
  points = [vector3(0, 0, 0)],
  powerup = -1,
  powerupTimer = 1,
  previousX,
  red = 0,
  rightJoystick,
  spiders = [],
  spiralGroup,
  starGroup = Group([]),
  sword = 0.99,
  timer = 0,
  timerBreathe = 0,
  ufos = [],
  u, // undefined
  wheel = 1,
  wheelSize = .999,
  xButtonPressed,
  yButtonPressed,
  effect = -1,
  effectDuration = 0,
  drops = ['💩', '❤️', '👁️', '🛡️', '🪽', '⏳', '⚡', '⚔️'];;


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

  for (let i = 0; i < 200; i++) {
    let scale = Math.random() / 10 + .1;
    meshes.push(Mesh(bush.vertices, bush.indices, [["#382847", 12]], vector3(rand(100), 0, rand(100)), vector3(-  Math.PI / 2, rand(Math.PI), 0), vector3(scale, scale, scale), 1));
  }
  meshes.push(starGroup);

  meshes.push(spiralGroup);


  particleGroup = Group([]);

  meshes.push(particleGroup);

  items = [
    Prize(vector3(0, 2, 0))
  ];

  for (let i = 0; i < 100; i++) {
    let x = 100 - Math.random() * 200;
    let z = 100 - Math.random() * 200;
    if (pointIsOnMap(x, z) && distanceTo(vector3(u, u, u), vector3(x, 0, z)) > 10)
      items.push(Prize(vector3(x, 0, z)));
  }
};

// Update Play Scene
const updatePlayScene = (deltaTime) => {
  fog = Math.sin(timeStamp / 200) * 2 + 10 + Math.random() * 0.4 - 0.8;
  effectDuration -= deltaTime / 10;
  if (effectDuration > 0) {
    switch (effect) {
      case 0:
        effectDuration = 0;
        break;
      case 1:
        health += .5;
        break;
      case 2:
        fog = 100;
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        timer = 13;
        break;
      case 6:
        energy = 1;
        break;
      case 7:


    }
  }


  context.globalAlpha = 1;
  wheel -= deltaTime / 20;
  wheel = Math.max(wheel, 0);
  playSceneCounter++;
  heartbeat *= heartbeat;
  red -= deltaTime / 10;

  if (Math.random() < deltaTime / 1000) zzfx(...[1.6, , 182, , .05, .25, 1, 3.5, , 7, , , .09, .4, , .1, .04, .81, .31, .03, -1260]);

  meshes[2].rotation.x += deltaTime / 40;
  spiralGroup.rotation.y += deltaTime / 40;


  spiders.forEach(spider => spider(deltaTime));
  gems.forEach(gem => gem(deltaTime));
  ufos.forEach(ufo => ufo(deltaTime));
  landmines.forEach(l => l(deltaTime));
  items.forEach(p => p(deltaTime));

  context.drawImage(glCanvas, 0, 0);

  if (drawUI) {
    //#region bars
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

    if (effectDuration > 0) context.fillText(drops[effect], 10, height - 10);

    context.fillStyle = "#80D08C";
    context.fillText("⬡⬡⬡⬡⬡⬡⬡".replace(/⬡/g, (match, offset) => offset < gemsFound ? '⬢' : match), width - 40, 10);
    //#endregion bars

    //#region wheel
    var drop = -1;

    angle += wheel * wheel * deltaTime * Math.random() * 5;

    for (let [index, item] of drops.entries()) {
      context.strokeStyle = ((index & 1) ? "#886CDB" : "#9880E0");
      if ((angle + ((index + drops.length + 1) * Math.PI * 2 / drops.length + Math.PI / 2)) % (Math.PI * 2) < Math.PI * 2 / drops.length && wheel >= .01) {
        drop = index;
      }
      context.strokeStyle
      context.lineWidth = halfHeight * .7;
      context.beginPath();
      context.arc(
        halfWidth,
        halfHeight + 15,
        halfHeight / 2 * .7 * wheelSize,
        Math.PI * 2 / drops.length * index + angle,
        Math.PI * 2 / drops.length * (index + 1) + angle
      );
      context.stroke();
      if (wheelSize > .01)
        context.fillText(
          item,
          halfWidth + halfHeight * .6 * wheelSize * Math.cos(Math.PI * 2 / drops.length * (.5 + index) + angle),
          halfHeight + halfHeight * .6 * wheelSize * Math.sin(Math.PI * 2 / drops.length * (.5 + index) + angle) + 15,
        );
    }
  }

  if (wheel < .01 && drop != -1) {
    effect = drop;
    console.log("DROPPED", drop);
    effectDuration = 1;
    drop = -1;

  }
  if (wheel < .01) {
    wheelSize *= wheelSize;
  }
  //#endregion wheel

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

  if (effect == 3 && effectDuration > 0)
    health = 1;

  updateParticles();

  previousX = xButtonPressed;


  processInputPlayScene(deltaTime);
  render(meshes, camera);
};

var walkCooldown = 0;
// Process Input Play Scene
const processInputPlayScene = (deltaTime) => {
  walkCooldown -= deltaTime / 10;
  let direction = vector3(0, 0, 0);
  if (up) {
    if (walkCooldown <= 0) {
      zzfx(...[2.3, , 201, , , .002, , 4.5, , 2, , , , , , , , .98, , , 178]);

      if (shift) walkCooldown = .3;
      else walkCooldown = .5;
    }
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
