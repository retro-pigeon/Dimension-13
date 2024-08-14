// zzfx() - the universal entry point -- returns a AudioBufferSourceNode
zzfx = (...t) => zzfxP(zzfxG(...t))

// zzfxP() - the sound player -- returns a AudioBufferSourceNode
zzfxP = (...t) => { let e = zzfxX.createBufferSource(), f = zzfxX.createBuffer(t.length, t[0].length, zzfxR); t.map((d, i) => f.getChannelData(i).set(d)), e.buffer = f, e.connect(zzfxX.destination), e.start(); return e }

// zzfxG() - the sound generator -- returns an array of sample data
zzfxG = (q = 1, k = .05, c = 220, e = 0, t = 0, u = .1, r = 0, F = 1, v = 0, z = 0, w = 0, A = 0, l = 0, B = 0, x = 0, G = 0, d = 0, y = 1, m = 0, C = 0) => { let b = 2 * Math.PI, H = v *= 500 * b / zzfxR ** 2, I = (0 < x ? 1 : -1) * b / 4, D = c *= (1 + 2 * k * Math.random() - k) * b / zzfxR, Z = [], g = 0, E = 0, a = 0, n = 1, J = 0, K = 0, f = 0, p, h; e = 99 + zzfxR * e; m *= zzfxR; t *= zzfxR; u *= zzfxR; d *= zzfxR; z *= 500 * b / zzfxR ** 3; x *= b / zzfxR; w *= b / zzfxR; A *= zzfxR; l = zzfxR * l | 0; for (h = e + m + t + u + d | 0; a < h; Z[a++] = f)++K % (100 * G | 0) || (f = r ? 1 < r ? 2 < r ? 3 < r ? Math.sin((g % b) ** 3) : Math.max(Math.min(Math.tan(g), 1), -1) : 1 - (2 * g / b % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(g / b) - g / b) : Math.sin(g), f = (l ? 1 - C + C * Math.sin(2 * Math.PI * a / l) : 1) * (0 < f ? 1 : -1) * Math.abs(f) ** F * q * zzfxV * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - y) : a < e + m + t ? y : a < h - d ? (h - a - d) / u * y : 0), f = d ? f / 2 + (d > a ? 0 : (a < h - d ? 1 : (h - a) / d) * Z[a - d | 0] / 2) : f), p = (c += v += z) * Math.sin(E * x - I), g += p - p * B * (1 - 1E9 * (Math.sin(a) + 1) % 2), E += p - p * B * (1 - 1E9 * (Math.sin(a) ** 2 + 1) % 2), n && ++n > A && (c += w, D += w, n = 0), !l || ++J % l || (c = D, v = H, n = n || 1); return Z }

// zzfxV - global volume
zzfxV = .5

// zzfxR - global sample rate
zzfxR = 44100

// zzfxX - the common audio context
zzfxX = new (window.AudioContext || webkitAudioContext);
const map = {};
var pointIsOnMap = (x, y) => {
    //for each polygon on the walking map verify if the count of intersecting edges is odd or not. 
    //If it's not odd the point is inside one of the polygons of the walking map.
    for (const polygon of map) {
        let count = 0;
        for (let i = 0; i < polygon.length; i += 4) {
            let edgeStartX = polygon[i], edgeStartY = polygon[i + 1], edgeEndX = polygon[i + 2], edgeEndY = polygon[i + 3];
            if ((y < edgeStartY !== y < edgeEndY) && x < edgeStartX + ((y - edgeStartY) / (edgeEndY - edgeStartY)) * (edgeEndX - edgeStartX)) count += 1;
        }
        // when we find the first non odd value we get out of the function and say the point is inside the map
        if (count % 2 !== 0) return true;
    }
    return false;
}


drawMap = (context, camera) => {
    // x and y offset of the map relative to screen top
    const xOffset = 70, yOffset = 100;
    // draw the map
    context.fillStyle = "rgba(191, 191, 191,.2)";
    map.forEach(polygon => {
        context.beginPath();
        for (let i = 0; i < polygon.length; i += 2) context.lineTo(xOffset + polygon[i], yOffset + polygon[i + 1]);
        context.fill();
    });
    // draw the player as a blue square
    let playerX = xOffset + camera.position.x;
    let playerZ = yOffset + camera.position.z;
    context.fillStyle = "blue";
    context.fillRect(playerX - 2, playerZ - 2, 4, 4);
    // draw player direction as a white line
    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(playerX, playerZ);
    context.lineTo(playerX + 10 * Math.cos(camera.yaw + Math.PI / 2), playerZ + 10 * Math.sin(camera.yaw + Math.PI / 2));
    context.stroke();
    // draw all npcs
    context.fillStyle = "red";
    npcs.forEach(npc => { context.fillRect(xOffset + npc.position.x - 2, yOffset + npc.position.z - 2, 4, 4); });

    // draw npc count
    context.fillText(npcs.length, 60, 20);

    context.fillText(Math.round(camera.position.x), 30, 200);
    context.fillText(Math.round(camera.position.z), 30, 250);
}
messages = [];

showMessage = (text, x, y, size = 50, duration = 1000000, delay = 0) => messages.push({ text, x, y, size, duration, delay, counter: 0, ySpeed: Math.max(random(3), 1) });

updateMessages = () => {
    messages.forEach((message, i) => {
        if (message.delay-- > 0) return;
        message.counter += 1;
        context.font = `${message.size}px ${font}`;
        context.textAlign = 'center'
        context.textBaseline = "middle";
        if (message.duration < 100) message.y -= message.ySpeed;

        if (message.counter <= 20) context.fillStyle = `rgba(255,255,255 ,${message.counter / 20})`;
        if (message.counter > 20 && message.counter <= message.duration - 60) context.fillStyle = "white";
        if (message.counter > message.duration - 60) context.fillStyle = `rgba(255,255,255,${(-(message.counter - message.duration) / 60)})`;

        context.fillText(message.text, message.x, message.y);
        if (message.counter > message.duration) messages.splice(i, 1);
    });
}

const font = 'Luminari, Baskerville, serif';

const Geometry = (vertices, indices, colors) => {
    // Necessary for webgl calls, update if IBO is modified
    var indicesLength = indices.length;

    let finalVertices = [], finalColors = [];

    for (let index of indices) finalVertices.push(vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2]);

    for (let i = 0; i < colors.length; i += 3)  finalColors.push(colors[i], colors[i + 1], colors[i + 2], colors[i], colors[i + 1], colors[i + 2], colors[i], colors[i + 1], colors[i + 2]);

    //Set up VBO
    const vertexBuffer = CreateAndBindBufferData(finalVertices);
    //Color buffer
    const colorBuffer = CreateAndBindBufferData(finalColors);
    //Normal buffer
    const normalBuffer = CreateAndBindBufferData(getNormals(finalVertices));
    //Cleanup
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return { vertices, indices, colors, indicesLength, vertexBuffer, colorBuffer, normalBuffer };
}

getNormals = (vertices) => {
    let normals = [];
    for (let index = 0; index < vertices.length; index += 9) {
        let faceNormal = cross(normalize(vector3(vertices[index + 3] - vertices[index], vertices[index + 3 + 1] - vertices[index + 1], vertices[index + 3 + 2] - vertices[index + 2])), normalize(vector3(vertices[index + 6] - vertices[index], vertices[index + 6 + 1] - vertices[index + 1], vertices[index + 6 + 2] - vertices[index + 2])));
        normals.push(faceNormal.x, faceNormal.y, faceNormal.z, faceNormal.x, faceNormal.y, faceNormal.z, faceNormal.x, faceNormal.y, faceNormal.z);
    }
    return normals;
}

CreateAndBindBufferData = (bufferArray) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferArray), gl.STATIC_DRAW);
    return buffer;
}
const
    // vector3
    vector3 = (x = 0.0, y = 0.0, z = 0.0) => ({ x, y, z }),
    set = (v, x, y, z) => { v.x = x; v.y = y; v.z = z },
    clone = (v) => vector3(v.x, v.y, v.z),
    copy = (v) => vector3(v.x, v.y, v.z),
    add = (a, b) => vector3(a.x + b.x, a.y + b.y, a.z + b.z),
    substract = (a, b) => vector3(a.x - b.x, a.y - b.y, a.z - b.z),
    multiplyBy = (v, f) => vector3(v.x * f, v.y * f, v.z * f),
    divide = (v, f) => vector3(v.x / f, v.y / f, v.z / f),
    length = (v) => Math.hypot(v.x, v.y, v.z),
    cross = (a, b) => vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x),
    dot = (a, b) => (a.x * b.x + a.y * b.y + a.z * b.z),
    normalize = (v) => divide(v, length(v)),
    rotX = (v, a) => vector3(v.x, v.y * Math.cos(a) - v.z * Math.sin(a), v.y * Math.sin(a) + v.z * Math.cos(a)),
    rotY = (v, a) => vector3(v.x * Math.cos(a) - v.z * Math.sin(a), v.y, v.x * Math.sin(a) + v.z * Math.cos(a)),
    rotZ = (v, a) => vector3(v.x * Math.cos(a) - v.y * Math.sin(a), v.x * Math.sin(a) + v.y * Math.cos(a), v.z),
    distanceTo = (a, b) => length(substract(a, b)),

    // matrix4 
    translate = (v) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1]),
    scale = (v) => new Float32Array([v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1]),
    rotateX = (rad) => { const s = Math.sin(rad), c = Math.cos(rad); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]) },
    rotateY = (rad) => { const s = Math.sin(rad), c = Math.cos(rad); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]) },
    rotateZ = (rad) => { const s = Math.sin(rad), c = Math.cos(rad); return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) },
    perspective = (fovy, aspect, near, far) => { const f = 1.0 / Math.tan(fovy / 2), nf = 1 / (near - far); return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]); },
    lookAt = (eye, target, up) => { const z = normalize(substract(eye, target)), x = normalize(cross(up, z)), y = cross(z, x); return new Float32Array([x.x, y.x, z.x, 0, x.y, y.y, z.y, 0, x.z, y.z, z.z, 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]) },
    multiply = (a, b) => { const result = new Float32Array(16); for (let i = 0; i < 4; i++) { for (let j = 0; j < 4; j++) { let sum = 0; for (let k = 0; k < 4; k++) { sum += a[i * 4 + k] * b[k * 4 + j]; } result[i * 4 + j] = sum; } } return result; },
    transform = (position, rotation, transformScale) => multiply(multiply(scale(transformScale), multiply(multiply(rotateX(rotation.x), rotateY(rotation.y)), rotateZ(rotation.z))), translate(position)),

    //utils
    lerp = (a, b, t) => a + (b - a) * t,
    random = (v = 1) => Math.random() * v,
    randomBetween = v => v - Math.random() * v * 2,
    lerpColors = (a, b, t) => Color(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t),
    easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    angleBetween = (a, b) => Math.atan2(a.x - b.x, a.z - b.z);
const Mesh = (vertices, indices, colors, position = vector3(), rotation = vector3(), scale = vector3(1, 1, 1)) => {
    let finalColors = [];
    for (let color of colors) for (let i = 0; i < color[1]; i++) finalColors.push(...hexToRgbArray(color[0]));
    return ({ geometry: Geometry(vertices.map(v => v / 100), indices, finalColors), position, rotation, scale });
},

    hexToRgbArray = hex => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255],

    larchTree = position => {
        meshes.push(Mesh(trunk.v.randomise(.1), trunk.i, makeColors(trunk, '#cc7Fb3'), position, vector3(0, 0, 0), vector3(1, 1, 1)));
        for (let i = 0; i < 30; i++) meshes.push(Mesh(leaf.v, leaf.i, makeColors(leaf, '#01796f'), add(position, vector3(0, 10 - i / 5, 0)), vector3(0, i, 0), vector3((1 - 1 / i) ** 2, (1 - 1 / i) ** 2, (1 - 1 / i) ** 2)))
    },

    hazelTree = position => {
        meshes.push(Mesh(circleTree.v.randomise(.2), circleTree.i, makeColors(circleTree, '#cc7Fb3'), add(position, vector3(0, .5, 0)), vector3(0, 0, 0)));
        for (let i = 0; i < 6; i++) meshes.push(Mesh(ball.v, ball.i, makeColors(ball, '#01796f'), add(vector3(3 - random() * 6, 6 + 2.4 + random(), 2 - random() * 4), position), vector3(Math.PI - Math.PI * 2 * random(), Math.PI - Math.PI * 2 * random(), Math.PI - Math.PI * 2 * random()), vector3(2.4 + random() * 3, 2.4 + random() * 3, 2.4 + random() * 3)))

    },

    rocks = position => {
        for (let i = 0; i < 6; i++) meshes.push(Mesh(ball.v, ball.i, makeColors(ball, '#6f6786'), add(position, vector3(1.5 - random() * 3, .5 - random() * 1, 1.5 - random() * 3)), vector3(random() * 2 * Math.PI, random() * 2 * Math.PI, random() * 2 * Math.PI), vector3(.5 + random(), .5 + random(), .5 + random())));
    },

    grassBunch = position => {
        for (let i = 0; i < 5; i++) {
            let g = Mesh(grass.v, grass.i, makeColors(grass, '#32cd32'), add(position, vector3(.2 - random(.4), 0, .2 - random(.4))), vector3(0, Math.PI * 2 * random(), 0), vector3(1, .5 + random(.5), 1));
            meshes.push(g);
            grassBunches.push(g);
        }
    },
    SpawnPotionGlass = position => { let potionMesh = Mesh(potion.v, potion.i, potion.c, position); meshes.push(potionMesh), potions.push(potionMesh) },

    makeColors = (geometryData, hex) => [[hex, geometryData.i.length]];

Array.prototype.randomise = function (plusminus) { return this.map(v => v + (random() * plusminus - random() * 2 * plusminus)); };

const levelMeshes = [-1, 0, 0, 0, 0, -12, 0, 52, 0, -8, 0, 32, 0, -5, 0, 24, 0, -6, 0, 49, 0, 4, 0, 47, 0, 7, 0, 30, 0, 10, 0, 8, 0, 9, 0, 77, 0, 1, 0, 75, 0, 16, 0, -1, 0, -10, 0, -11, 0, -2, 0, -16, 0, 30, 0, -30, 0, 24, 0, -65, 0, -23, 0, -60, 0, -28, 0, -48, 0, -30, 0, -24, 1, 28, 0, -25, 1, -14, 0, 74, 1, -8, 0, 80, 1, 30, 0, -28, 1, 32, 0, -60, 1, -7, 0, -70, 1, -17, 0, -60, 1, -11, 0, 48, 1, 2, 0, 45, 1, -12, 0, 5, 2, 18, 0, -3, 2, 19, 0, -2, 2, 18, 0, -1, 2, 10, 0, 53, 2, 11, 0, 55, 2, 10, 0, 56, 2, 4, 0, -27, 2, 5, 0, -27, 2, 3, 0, -27, 2, 4, 0, 35, 2, 7, 0, 76, 2, 8, 0, 77, 3, -25, 0, -43, 3, - 9, 0, -5, 3, 19, 0, -10, 3, 24, 0, -41, 3, 15, 0, -53, 3, 5, 0, 20, 3, - 3, 0, 32, 3, - 1, 0, 46, 3, - 6, 0, 53, 3, - 2, 0, 64, 3, 0, 0, 38, 3, 0, 0, 20, 3, -7, 0, 78];

loadLevelMeshes = (meshesTypes) => {
    for (let i = 0; i < meshesTypes.length; i += 4) {
        let position = vector3(meshesTypes[i + 1], meshesTypes[i + 2], meshesTypes[i + 3]);
        switch (meshesTypes[i]) {
            case -1: meshes.push(Mesh(island.v, island.i, island.c));
            case 0: larchTree(position); break;
            case 1: hazelTree(position); break;
            case 2: rocks(position); break;
            case 3: let npc = Npc([samuraiBody, leftArm, rightArm, leftFoot, rightFoot], position); npcs.push(npc); break;
            default: break;
        }
    }
}
const render = (meshes, camera) => {
    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Set camera matrix (once per render). DO NOT BY ANY MEANS MOVE THE CAMERA DURING RENDERING.
    gl.uniformMatrix4fv(cameraMatrixLocation, false, lookAt(camera.position, camera.target, camera.up));

    for (const mesh of meshes) {
        if (mesh.off) continue;
        // Bind vertex buffer for the current mesh
        bindBufferAttribute(mesh.geometry.vertexBuffer, program.aVertexPosition);
        // Bind color buffer for the current mesh
        bindBufferAttribute(mesh.geometry.colorBuffer, program.aVertexColor);
        //Normal buffer
        bindBufferAttribute(mesh.geometry.normalBuffer, program.aNormal)
        // Update the model-view matrix for the current mesh
        gl.uniformMatrix4fv(meshMatrixLocation, false, transform(mesh.position, mesh.rotation, mesh.scale));
        // Draw the current mesh using gl.drawArrays
        gl.drawArrays(gl.TRIANGLES, 0, mesh.geometry.indicesLength);
        // Clean up
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}

bindBufferAttribute = (buffer, attribute) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);
}
const initialiseWebGl = () => {
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(1.0);
    gl.depthFunc(gl.LEQUAL);

    // Create a shader program
    program = gl.createProgram();

    const vertexShaderSource =
        `#version 300 es
        precision mediump float;
        uniform mat4 uMeshMatrix, uCameraMatrix, uProjectionMatrix;
        in vec3 aVertexPosition, aVertexColor,aNormal ;
        out vec4 vPosition;
        out vec3 vColor,vNormal;
        void main(void) {
            gl_Position = uProjectionMatrix * uCameraMatrix * uMeshMatrix * vec4(aVertexPosition, 1.0);
            vColor = aVertexColor;
            vPosition = gl_Position;
            vNormal = aNormal;
        }`

    // Create a vertex shader and compile it
    compileShader(vertexShaderSource, gl.VERTEX_SHADER, program);

    const fragmentShaderSource =
        `#version 300 es
        precision mediump float;
        in vec4 vPosition;
        in vec3 vNormal, vColor;
        out vec4 fragColor;
        void main(void) {
            float fog = max(min(1.0 - vPosition.z / 50.0, 1.0), 0.05);
            float light = max(dot(normalize(vNormal), normalize(vec3(6.0, 6.0, 6.0))), .3);
            fragColor = vec4(vColor * light * fog, 1.0);
        }
        `

    // Create a fragment shader and compile it
    compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER, program);

    // Link program
    gl.linkProgram(program);

    // Start using the program
    gl.useProgram(program);

    // Get uniform locations/pointers
    meshMatrixLocation = gl.getUniformLocation(program, 'uMeshMatrix');
    cameraMatrixLocation = gl.getUniformLocation(program, 'uCameraMatrix');
    projectionMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');

    const uLightPosition = new Float32Array(60).fill(0).map((v, i) => i % 3 == 1 ? 0 : 40 - Math.random() * 80);
    const uConstantColorLocation = gl.getUniformLocation(program, 'uLightPosition');
    gl.uniform3fv(uConstantColorLocation, uLightPosition);

    //Bind projection matrix (must do when fov changes or when resizing)
    gl.uniformMatrix4fv(projectionMatrixLocation, false, perspective(camera.fov, camera.aspect, camera.near, camera.far));

    // Get attribute location
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(program.aVertexPosition);
    program.aVertexColor = gl.getAttribLocation(program, 'aVertexColor');
    gl.enableVertexAttribArray(program.aVertexColor);
    program.aNormal = gl.getAttribLocation(program, 'aNormal');
    gl.enableVertexAttribArray(program.aNormal);
}

compileShader = (shaderSource, shaderType, program) => {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    else
        gl.attachShader(program, shader);
}
initialiseGameOverScene = () => {
    messages = [];
    showMessage("YOU HAVE DIED!", halfWidth, halfHeight, 100);
    showMessage("Press enter to try again!", halfWidth, halfHeight + 100, 50);
}

updateGameOverScene = () => {
    updateMessages();
    if (enter) showScene(playScene(), true);
} 

const initialiseMenuScene = () => {
    messages = [];

    showMessage("13th Second of Terror", halfWidth, halfHeight - 100, 100, 100000, 30);
    showMessage('Escape the lair of Triskaideka', halfWidth, halfHeight, 30, 300, 60);

    showMessage('Use wasd to move and space to attack!', halfWidth, halfHeight * 1.5, 30, 100000, 960);
}

const updateMenuScene = (deltaTime) => {
    context.clearRect(0, 0, 1e6, 1e6);
    updateMessages();
    if (enter) {
        showScene(playScene(), true);
    }

};
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



var isInTransition = false,
    transitionCounter = 0,
    sceneToShow = null;

showScene = (scene, withTransition) => {
    if (isInTransition) return;
    if (withTransition) {
        sceneToShow = scene;
        transitionCounter = 0;
        isInTransition = true;
    }
    else
        currentScene = scene;
}


updateTransition = () => {
    transitionCounter += 1;
    let opacity = transitionCounter <= 50 ? transitionCounter * 2 / 100 : 1 - ((transitionCounter) / 100)
    context.fillStyle = `rgba(0,0,0,${Math.max(opacity, 0)})`;
    context.fillRect(0, 0, width, height);

    if (transitionCounter == 50) { currentScene = sceneToShow; currentScene.initialise() }

    if (transitionCounter > 100) isInTransition = false;
}

menuScene = () => ({ initialise: initialiseMenuScene, update: updateMenuScene })
playScene = () => ({ initialise: initialisePlayScene, update: updatePlayScene })
gameOverScene = () => ({ initialise: initialiseGameOverScene, update: updateGameOverScene })
var glCanvas = document.getElementById("glCanvas");
        var gl = glCanvas.getContext("webgl2");

        var hudCanvas = document.getElementById("hudCanvas");
        var context = hudCanvas.getContext("2d");

        var width, height, halfWidth, halfHeight;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
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

        var left, right, up, down, space, esc, enter;
        const updateKeys = (code, val) => { switch (code) { case 65: left = val; break; case 87: up = val; break; case 68: right = val; break; case 32: space = val; break; case 27: esc = val; break; case 13: enter = val; break; case 83: down = val; break; default: break; } }
        onkeydown = e => updateKeys(e.keyCode, true);
        onkeyup = e => updateKeys(e.keyCode, false);
