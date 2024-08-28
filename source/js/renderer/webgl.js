var uFogLocation;

const initialiseWebGl = () => {
    gl.clearColor(0.2, 0.094, 0.196, 1);
gl.enable(gl.DEPTH_TEST);
gl.clearDepth(1.0);
gl.depthFunc(gl.LEQUAL);

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

gl.disable(gl.CULL_FACE);

    // Create a shader program
    program = gl.createProgram();

    const vertexShaderSource =
        `#version 300 es
precision mediump float;uniform mat4 uMeshMatrix,uCameraMatrix,uProjectionMatrix;in vec3 B,D;in vec4 C;out vec4 A,E,Z;out vec3 F;void main(){gl_Position=uProjectionMatrix*uCameraMatrix*uMeshMatrix*vec4(B,1);E=C;A=gl_Position;Z=uMeshMatrix*vec4(B,1.0);}`

    // Create a vertex shader and compile it
    compileShader(vertexShaderSource, gl.VERTEX_SHADER, program);

    const fragmentShaderSource =
        `#version 300 es
precision mediump float;in vec4 A;in vec3 F;in vec4 Z,E;uniform float G,O;out vec4 fragColor;void main(){float P=max(min(1.-A.z/G,1.),.05)+.05-fract(sin(dot(A.xy.xy,vec2(12.9898,78.233)))*43758.5453123)*.1;P*=P;if(Z.y>10.1)P=1.;fragColor=mix(vec4(.2,.094,.196,1.0),E,P);fragColor.w*=O;}
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

    uFogLocation = gl.getUniformLocation(program, 'G');
    gl.uniform1f(uFogLocation, 15);

    uOpacityLocation = gl.getUniformLocation(program, 'O');
    gl.uniform1f(uOpacityLocation, 1);

    //Bind projection matrix (must do when fov changes or when resizing)
    gl.uniformMatrix4fv(projectionMatrixLocation, false, perspective(camera.fov, camera.aspect, camera.near, camera.far));

    // Get attribute location
    program.aVertexPosition = gl.getAttribLocation(program, 'B');
    gl.enableVertexAttribArray(program.aVertexPosition);
    program.aVertexColor = gl.getAttribLocation(program, 'C');
    gl.enableVertexAttribArray(program.aVertexColor);
    program.aNormal = gl.getAttribLocation(program, 'D');
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