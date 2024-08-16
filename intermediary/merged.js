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
// Here we can include all of our raw data

let level = {"vertices":[-403,200,-400,-403,0,-400,-110,200,-400,-110,0,-400,-110,102,-400,0,199,-400,-75,153,-400,-39,168,-400,0,170,-400,-110,200,-699,-110,0,-699,-110,102,-700,0,199,-699,-75,154,-700,-39,169,-700,0,170,-700,-270,200,-699,-270,0,-699,-270,200,-1200,-270,0,-1200,0,0,0,-1200,0,-1199,0,0,-1200,0,200,0,-1200,199,-1199,0,199,-1200],"normals":[],"indices":[0,3,1,9,15,14,6,11,13,7,13,14,8,14,15,4,10,11,2,7,5,16,19,17,9,17,10,20,22,21,23,25,24,0,2,3,13,11,9,9,12,15,14,13,9,6,4,11,7,6,13,8,7,14,4,3,10,2,4,6,7,8,5,2,6,7,16,18,19,9,16,17,19,25,22,19,18,25],"colors":[["#6C6367",26]]};
let map = [[0,0,-6,-6,-6,-6,-6,0,-6,0,0,0],[0,-6,-4,-18,-4,-18,-1.67,-10.5,-1.67,-10.5,0,-6],[-18,0,-6,-1.67,-6,-1.67,-10.5,-1.67,-10.5,-1.67,-18,0],[0,0,0,-6,0,-6,-6,-6,-6,-6,0,0],[-1.67,-10.5,-1.67,-6,-1.67,-6,0,-6,0,-6,-1.67,-10.5],[0,-6,0,-18,0,-18,-4,-18,-4,-18,0,-6],[-4,-18,-4,-10.5,-4,-10.5,-1.67,-10.5,-1.67,-10.5,-4,-18],[-10.5,-4,-18,-4,-18,-4,-18,0,-18,0,-10.5,-4],[-18,0,-6,0,-6,0,-6,-1.67,-6,-1.67,-18,0],[-10.5,-1.67,-10.5,-4,-10.5,-4,-18,0,-18,0,-10.5,-1.67]];

map = [...map, ...(map.map(a=>a.map((x,i)=>i%2?x:-x)))];
map = [...map, ...(map.map(a=>a.map((y,i)=>i%2?-y:y)))];

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

const raycast = (camera, points) => { 
    let cameraDirection = substract(camera.position, camera.target)
    for (point of points) {
        let direction = normalize(substract(camera.position, point));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, point);

        

        if (distance < .70 && difference < .2) {
            return point;
        }
    }
}
const Geometry = (vertices, indices, colors, mir = 0) => {
    // Necessary for webgl calls, update if IBO is modified
    var indicesLength = indices.length;

    let finalVertices = [], finalColors = [];

    for (let index of indices) finalVertices.push(vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2]);

    for (let i = 0; i < colors.length; i += 3)  finalColors.push(colors[i], colors[i + 1], colors[i + 2], colors[i], colors[i + 1], colors[i + 2], colors[i], colors[i + 1], colors[i + 2]);

    if (mir) {
        finalVertices = [...finalVertices, ...(finalVertices.map((x, i) => (i % 3 ? x : -x)))];
        finalVertices = [...finalVertices, ...(finalVertices.map((y, i) => (i % 3 == 2 ? -y : y)))];
        finalVertices = [...finalVertices, ...(finalVertices.map((k, i, m) => {
            if (i % 3 == 1)return k;
            if (i % 3 == 2)return m[i-2];
            else return m[i+2]
        }))];
        finalColors = [...finalColors, ...finalColors, ...finalColors, ...finalColors, ...finalColors, ...finalColors, ...finalColors, ...finalColors, ];
        indicesLength*=8;
    }

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
    summate = (a) => abs(a.x) + abs(a.y) + abs(a.z)
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
    angleBetween = (a, b) => Math.atan2(a.x - b.x, a.z - b.z),
    abs = Math.abs;
const Mesh = (vertices, indices, colors, position = vector3(), rotation = vector3(), scale = vector3(1, 1, 1), mir = 0) => {
    let finalColors = [];
    for (let color of colors) for (let i = 0; i < color[1]; i++) finalColors.push(...hexToRgbArray(color[0]));
    return ({ geometry: Geometry(vertices.map(v => v / 100), indices, finalColors, mir), position, rotation, scale });
},

    hexToRgbArray = hex => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255];
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
    gl.disable(gl.CULL_FACE);

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
            float fog = max(min(1.0 - vPosition.z / 10.0, 1.0), 0.05);
            float light = max(dot(normalize(vNormal), normalize(vec3(6.0, 6.0, 6.0))), .3);
            fragColor = vec4(vColor * fog, 1.0);
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
    showMessage("Triskaideka murdered you in cold blood", halfWidth, halfHeight, 100);
    showMessage("Press enter to suffer again!", halfWidth, halfHeight + 100, 50);
}

updateGameOverScene = () => {
    updateMessages();
    if (enter) showScene(playScene(), true);
} 

const initialiseMenuScene = () => {
    messages = [];

    showMessage("13th Second of Terror", halfWidth, halfHeight * 0.8, halfHeight * 0.4, 1e7, 30);
    showMessage('Escape the lair of Triskaideka', halfWidth, halfHeight * 1.2, halfHeight * 0.2, 1e7, 60);
}

const updateMenuScene = (deltaTime) => {
    context.clearRect(0, 0, 1e6, 1e6);
    updateMessages();
    if (enter) {
        showScene(playScene(), true);
    }

};

var meshes, camera, playSceneCounter, cameraPos;
var timerBreathe = 0, timer = 0;
var u;//undefined
var points = [
    vector3(0,0,0)
];

const initialisePlayScene = () => {
    messages = [];
    meshes = [Mesh(level.vertices, level.indices, level.colors, u, u, vector3(1.5, 1.5, 1.5), 1)];

    camera = { position: vector3(0, 1.73, 0), direction: vector3(0, 0, 1), forwardSpeed: 1.4, yaw: 0, pitch: 0, target: vector3(0, 0, 0), yaw: 0, fov: Math.PI / 2, aspect: width / height, near: .1, far: 200, up: vector3(0, 1, 0) };
    
    setInterval(f=>{
     //   zzfx(...[2,.8,100,,,,,1.5,,.3,-99,.1,1.63,,,.11,.22]);
        timerBreathe = 1;
        timer++;
    }, 950);    

    initialiseWebGl();

    function onMouseMove(event) {
       camera.yaw += event.movementX / 500;
       camera.pitch += event.movementY / 500;
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
}

updatePlayScene = (deltaTime) => {
    playSceneCounter++;

    processInputPlayScene(deltaTime);

    render(meshes, camera);

    context.globalAlpha = .4;
    context.drawImage(glCanvas, 0, 0);
    context.globalAlpha = 1;
    
    context.fillStyle = "white";
    context.font = `${15 * (1+timerBreathe)}px monospace`;
    timerBreathe -= deltaTime;
    timerBreathe *= timerBreathe;
    context.fillText(timer, 10, 20);

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
            width = window.innerWidth / 4;
            height = window.innerHeight / 4;
            halfWidth = width * .5 ;
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

        
