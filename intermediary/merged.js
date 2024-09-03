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

// let level = {"vertices":[-403,200,-400,-403,0,-400,-110,200,-400,-110,0,-400,-110,102,-400,0,199,-400,-75,153,-400,-39,168,-400,0,170,-400,-110,200,-699,-110,0,-699,-110,102,-700,0,199,-699,-75,154,-700,-39,169,-700,0,170,-700,-270,200,-699,-270,0,-699,-270,200,-1200,-270,0,-1200,0,0,0,-1200,0,-1199,0,0,-1200,0,200,0,-1200,199,-1199,0,199,-1200],"normals":[],"indices":[0,3,1,9,15,14,6,11,13,7,13,14,8,14,15,4,10,11,2,7,5,16,19,17,9,17,10,20,22,21,23,25,24,0,2,3,13,11,9,9,12,15,14,13,9,6,4,11,7,6,13,8,7,14,4,3,10,2,4,6,7,8,5,2,6,7,16,18,19,9,16,17,19,25,22,19,18,25],"colors":[["#6C6367",26]]};
let gem = { "vertices": [0, 0, -150, -86, 0, -75, -86, 0, 75, 0, 0, 150, 86, 0, 75, 86, 0, -75, 0, 50, -96, -55, 50, -48, -55, 50, 48, 0, 50, 96, 55, 50, 48, 55, 50, -48, 0, -50, -96, -55, -50, -48, -55, -50, 48, 0, -50, 96, 55, -50, 48, 55, -50, -48], "normals": [], "indices": [4, 9, 3, 2, 7, 1, 5, 10, 4, 3, 8, 2, 1, 6, 0, 0, 11, 5, 8, 10, 6, 15, 4, 3, 1, 14, 2, 4, 17, 5, 2, 15, 3, 12, 1, 0, 5, 12, 0, 12, 16, 14, 4, 10, 9, 2, 8, 7, 5, 11, 10, 3, 9, 8, 1, 7, 6, 0, 6, 11, 6, 7, 8, 8, 9, 10, 10, 11, 6, 15, 16, 4, 1, 13, 14, 4, 16, 17, 2, 14, 15, 12, 13, 1, 5, 17, 12, 14, 13, 12, 12, 17, 16, 16, 15, 14], "colors": [["#80D08C", 32]] };
let spider_body = { "vertices": [-91, 208, 125, -91, 338, -4, -91, 78, -4, -206, 208, -257, 0, 208, 154, 0, 367, -4, -112, 288, 75, -112, 129, 75, -124, 295, -67, -124, 120, -67, 0, 50, -4, -202, 212, -397, 0, 318, 104, -154, 208, -4, 0, 87, -100, 0, 99, 104, 0, 328, -100, -107, 296, -582, -88, 220, -631, -107, 144, -582, 0, 220, -658, 0, 115, -611, 0, 325, -611, -150, 345, -261, 0, 395, -312, 0, 28, -312, -188, 78, -261], "normals": [], "indices": [12, 1, 6, 12, 0, 4, 0, 13, 7, 1, 13, 6, 8, 9, 13, 13, 2, 7, 2, 14, 10, 11, 17, 18, 0, 15, 4, 2, 15, 7, 24, 17, 23, 1, 16, 8, 18, 21, 19, 18, 22, 20, 11, 19, 26, 25, 19, 21, 14, 26, 25, 3, 26, 9, 16, 23, 8, 3, 23, 11, 12, 5, 1, 12, 6, 0, 0, 6, 13, 1, 8, 13, 8, 3, 9, 13, 9, 2, 2, 9, 14, 11, 23, 17, 0, 7, 15, 2, 10, 15, 24, 22, 17, 1, 5, 16, 18, 20, 21, 18, 17, 22, 11, 18, 19, 25, 26, 19, 14, 9, 26, 3, 11, 26, 16, 24, 23, 3, 8, 23], "colors": [["#442424", 40]] };
let spider_leg = { "vertices": [-328, 194, -200, -326, 234, -200, -324, 194, -160, -322, 234, -160, -167, 165, -168, -161, 223, -168, -172, 165, -221, -166, 223, -222, -442, 195, -185, -450, 227, -184, -439, 195, -153, -446, 227, -152, -569, 143, -170, -589, 161, -168, -567, 143, -144, -586, 161, -142, -627, 0, -158, -640, 5, -157, -625, 0, -144, -639, 5, -143], "normals": [], "indices": [5, 2, 4, 3, 10, 2, 2, 6, 4, 5, 1, 3, 0, 7, 6, 11, 14, 10, 1, 8, 9, 2, 8, 0, 1, 11, 3, 13, 19, 15, 9, 12, 13, 10, 12, 8, 9, 15, 11, 14, 19, 18, 12, 17, 13, 14, 16, 12, 5, 3, 2, 3, 11, 10, 2, 0, 6, 5, 7, 1, 0, 1, 7, 11, 15, 14, 1, 0, 8, 2, 10, 8, 1, 9, 11, 13, 17, 19, 9, 8, 12, 10, 14, 12, 9, 13, 15, 14, 15, 19, 12, 16, 17, 14, 18, 16], "colors": [["#5d5775", 32]] };
let cube = { "vertices": [0, -26, -200, 84, -26, -97, 226, -26, 0, 84, -26, 97, 0, -26, 200, -84, -26, 97, -173, -26, 0, -84, -26, -97, 0, 1015, 0], "normals": [], "indices": [0, 8, 1, 1, 8, 2, 2, 8, 3, 3, 8, 4, 4, 8, 5, 5, 8, 6, 6, 8, 7, 7, 8, 0], "colors": [["#247BA0", 8]] };
let plane = { "vertices": [-100, 0, 100, 100, 0, 100, -100, 0, -100, 100, 0, -100], "normals": [], "indices": [1, 2, 0, 1, 3, 2], "colors": [["#70C1B3", 2]] };
let circle = { "vertices": [-70, 0, 70, -100, 0, 0, -100, 23, 0, -70, 23, 70, 0, 0, 0, 0, 23, 0, -35, 0, 35, -50, 0, 0, -50, 23, 0, -35, 23, 35, -82, 0, 82, -116, 0, 0, -116, 13, 0, -82, 13, 82], "normals": [], "indices": [5, 3, 9, 3, 4, 5, 3, 6, 0, 5, 1, 2, 8, 6, 9, 1, 8, 2, 2, 9, 3, 1, 12, 11, 0, 13, 3, 3, 12, 2, 13, 11, 12, 8, 2, 5, 9, 8, 5, 3, 0, 4, 3, 9, 6, 5, 4, 1, 8, 7, 6, 1, 7, 8, 2, 8, 9, 1, 2, 12, 0, 10, 13, 3, 13, 12, 13, 10, 11], "colors": [["#778899", 23]] };
let star = { "vertices": [0, 0, -100, -86, 0, 50, 86, 0, 50, 0, 0, 100, 86, 0, -50, -86, 0, -50], "normals": [], "indices": [4, 5, 3, 1, 2, 0], "colors": [["#FFFFFF", 2]] };
let sun = { "vertices": [0, 0, -100, -28, 0, -95, -54, 0, -84, -75, 0, -65, -90, 0, -41, -98, 0, -14, -98, 0, 14, -90, 0, 41, -75, 0, 65, -54, 0, 84, -28, 0, 95, 0, 0, 99, 28, 0, 95, 54, 0, 84, 75, 0, 65, 90, 0, 41, 98, 0, 14, 98, 0, -14, 90, 0, -41, 75, 0, -65, 54, 0, -84, 28, 0, -95], "normals": [], "indices": [2, 21, 0, 0, 1, 2, 2, 20, 21, 5, 18, 3, 3, 4, 5, 5, 17, 18, 18, 19, 3, 8, 15, 6, 6, 7, 8, 8, 14, 15, 15, 16, 6, 11, 13, 9, 9, 10, 11, 11, 12, 13], "colors": [["#E87C00", 3], ["#E85F5A", 4], ["#E81F67", 4], ["#E700B5", 3]] };
let ray = { "vertices": [-92, -2, -38, 12, 197, 99, -83, 2, -55, -6, 202, 99, -21, 164, 97, -53, 131, 84, -79, 97, 60, -95, 64, 29, -99, 31, -4, -40, 168, 91, -68, 135, 72, -89, 102, 44, -99, 68, 11, -97, 35, -23], "normals": [], "indices": [0, 13, 2, 7, 11, 12, 5, 9, 10, 0, 8, 13, 7, 6, 11, 5, 4, 9, 4, 3, 9, 8, 12, 13, 6, 10, 11, 4, 1, 3, 8, 7, 12, 6, 5, 10], "colors": [["#73E1E733", 6], ["#50BEEF22", 6]] };
let ufo = { "vertices": [0, 1950, 0, -578, 2156, 0, -408, 2156, 408, 0, 2156, 0, -460, 1806, 460, -650, 1806, 0, 0, 1806, 0, -358, 2446, 367, -506, 2480, 0, 0, 2337, 0, -151, 2718, 0, -107, 2685, 132, 0, 2608, 0, 0, 2718, 0, -1237, 1973, 0, -1236, 1930, 0, -1240, 1950, 0, -874, 1930, 874, -875, 1973, 875, -877, 1950, 877, -1374, 0, 0, -971, 0, 971], "normals": [], "indices": [3, 7, 9, 1, 9, 8, 1, 7, 2, 9, 11, 12, 9, 10, 8, 8, 11, 7, 10, 12, 13, 12, 11, 13, 11, 10, 13, 5, 4, 6, 4, 20, 5, 3, 2, 7, 1, 3, 9, 1, 8, 7, 9, 7, 11, 9, 12, 10, 8, 10, 11, 4, 21, 20, 16, 3, 1, 19, 6, 4, 19, 2, 3, 16, 5, 6, 15, 4, 5, 14, 15, 16, 17, 18, 19, 15, 18, 17, 18, 1, 2, 1, 14, 16, 16, 0, 3, 4, 17, 19, 19, 0, 6, 3, 0, 19, 19, 18, 2, 6, 0, 16, 16, 15, 5, 15, 17, 4, 15, 14, 18, 18, 14, 1], "colors": [["#10E70022", 18], ["#6FB2BE", 20]] };
let mine = { "vertices": [-70, 0, 70, 0, 0, 100, 0, 0, 0, -56, -16, 56, 0, -16, 80, 0, -16, 44, -31, -16, 31, 0, -9, 44, -31, -9, 31, 0, -9, 0], "normals": [], "indices": [7, 9, 8, 4, 6, 3, 0, 4, 3, 5, 8, 6, 4, 5, 6, 0, 1, 4, 5, 7, 8], "colors": [["#E7000E", 1], ["#E7B500", 6]] };
let particle = { "vertices": [0, -70, -100, 86, -70, 50, -86, -70, 50, 0, 70, 0], "normals": [], "indices": [0, 3, 1, 0, 1, 2, 1, 3, 2, 2, 3, 0], "colors": [["#FFFFFF", 4]] };
let hypercube = { "vertices": [-70, -100, -70, -70, 100, -70, -70, -70, -100, -70, 70, -100, -100, 100, -100, -100, -100, -100, 0, -100, -100, 0, 100, -100, 0, -100, -70, 0, 100, -70, 0, -70, -100, 0, 70, -100], "normals": [], "indices": [0, 6, 8, 2, 4, 3, 3, 7, 11, 2, 6, 5, 1, 7, 4, 0, 5, 6, 2, 5, 4, 3, 4, 7, 2, 10, 6, 1, 9, 7], "colors": [["#006699", 10]] };
let bush = { "vertices": [-98, 0, 89, -1, 0, 110, -100, 0, -100, 0, 0, -100, -175, 0, 268, -78, 0, 292, -432, 0, 425, -350, 0, 483, -125, 0, 532, -25, 0, 535, -544, 0, 858, -447, 0, 882, -227, 0, 906, -130, 0, 932], "normals": [], "indices": [0, 3, 2, 0, 5, 1, 4, 7, 5, 5, 8, 4, 7, 10, 11, 8, 13, 12, 0, 1, 3, 0, 4, 5, 4, 6, 7, 5, 9, 8, 7, 6, 10, 8, 9, 13], "colors": [["#deadbeef", 12]] };
let question_mark = { "vertices": [26, 0, 123, 25, 0, 36, 26, 0, 11, 118, 0, -15, 85, 0, -113, -65, 0, -130, -122, 0, -53, -65, 0, -18, -32, 0, -73, 36, 0, -68, 43, 0, -42, -34, 0, -19, -36, 0, 34, 26, 0, 64, -39, 0, 59, -44, 0, 116], "normals": [], "indices": [15, 13, 0, 10, 9, 4, 15, 14, 13, 2, 1, 12, 12, 11, 10, 2, 12, 10, 4, 3, 2, 6, 5, 4, 8, 7, 6, 8, 6, 4, 4, 2, 10, 9, 8, 4], "colors": [["#66ccff", 12]] };
const debug_narrative = false;
const Gem = () => {
    let x = rand(50),
        z =rand(50);
    if (!pointIsOnMap(x, z) && Math.hypot(x, z) > 10) return Gem();
    const mesh = Mesh(gem.vertices, gem.indices, gem.colors, vector3(x, 0, z), vector3(Math.PI / 2, 0, 0), vector3(.25, .25, .25));
    meshes.push(mesh);

    const st = Mesh(star.vertices, star.indices, star.colors, vector3(x, 30, z), vector3(Math.PI / 2, 0, 0), vector3(2, 2, 2));
    meshes.push(st);

    return deltaTime => {
        mesh.position.y = Math.sin(timeStamp / 1000) * .25 + 1;
        mesh.rotation.y += deltaTime;

        st.rotation.y += deltaTime*Math.random();
        if (!mesh.off && distanceTo(mesh.position, camera.position) < 10) 
            if (Math.random() < deltaTime) Particle(clone(mesh.position), vector3(rand(.005), rand(.025), rand(.005)), "#80D08C");
    

        if (!mesh.off && distanceTo(mesh.position, camera.position) < 3) {

            
            mesh.off = true;
            gemsFound++;

            zzfx(...[,,539,0,.04,.29,1,1.92,,,567,.02,.02,,,,.04]);

            if (gemsFound == 7) speak("You found all gems, return to the teleporter!");

            if (gemsFound == 5) {
                speak("Is it a bird? Is it a plane? It's a UFO", 1.2);
                ufos.push(Ufo());
                ufos.push(Ufo());
                ufos.push(Ufo());
                ufos.push(Ufo());
                ufos.push(Ufo());
            }
            if (gemsFound == 1) {
                speak("By the way, watch out for the Arachnoids", 1.2);
                for (let i = 0; i < 70; i++) {
                    let x = rand(100);
                    let z = rand(100);
                    if (pointIsOnMap(x, z) && distanceTo(vector3(u, u, u), vector3(x, 0, z)) > 10) {
                      spiders.push(Spider(vector3(x, 0, z)));
                    }
                  }
            }
            if (gemsFound == 3) {
                speak("The spirits are watching...", 1.2);
                for (let i = 0; i < 50; i++) {
                    let x = rand(100);
                    let z = rand(100);
                    if (pointIsOnMap(x, z) && distanceTo(vector3(u, u, u), vector3(x, 0, z)) > 10) {
                      spiders.push(Spider(vector3(x, 0, z), 1));
                    }
                  }
            }
        }
    };
}
// Of course there is nothing here, ghosts don't exist
const Landmine = pos => {
    const m = Mesh(mine.vertices, mine.indices, mine.colors, pos, u, vector3(1, -1, 1), 1, 1);
    meshes.push(m);

    console.log(`Landmine: ${pos.x} ${pos.y} ${pos.z}`);

    return deltaTime => {
        if (distanceTo(camera.position, m.position) < 2.5) {
            console.log("stepped on landmine")
            zzfx(...[2,,45,.01,.27,.49,3,1.6,-9,,,,,1.3,.4,.8,.2,.41,.15]); // Explosion 237
            health = -.1;
        }
    };
};
let map = [];

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
function generateMaze(w, h) {
    const m = Array.from({ length: h }, () => Array(w).fill(1));
    const dirs = [[0,2], [2,0], [0,-2], [-2,0]];
  
    function inBounds(x, y) {
      return x >= 0 && y >= 0 && x < w && y < h;
    }
  
    function dfs(x, y) {
      m[y][x] = 0;
      dirs.sort(() => Math.random() - 0.5).forEach(([dx, dy]) => {
        const [nx, ny] = [x + dx, y + dy];
        const [mx, my] = [x + dx / 2, y + dy / 2];
        if (inBounds(nx, ny) && m[ny][nx]) {
          m[my][mx] = 0;
          dfs(nx, ny);
        }
      });
    }
  
    dfs(1, 1);
  
    // Create a 3x3 hole in the middle
    const cx = w >> 1;
    const cy = w >> 1;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2 ; dx++) {
        if (inBounds(cx + dx, cy + dy)) {
          m[cy + dy][cx + dx] = 0;
        }
      }
    }
  
    m[0][1] = m[h-1][w-2] = 0;
  
    return m;
  }
  


const maze = () => {
    var mz = Group([]);

    var size = 50;

    var mazeMap = generateMaze(50, 50).flat().map(f=>Math.random() < .2 ? 0 : f);


    for (let i = 0; i < size * size; i++) {
        const x = 4 * (i % size) - size * 2 + 3;
        const y = Math.floor(i / size) * 4 - size * 2 + 3;
        if (mazeMap[i]) {
            mz.meshes.push(Mesh(cube.vertices, cube.indices, cube.colors, vector3(x, 0, y), vector3(.2-Math.random()*.4,Math.random()*Math.PI*2,0), vector3(1, 1, 1)));
        }

        else {
            let yN = .2 * mazeMap[i - size];
            let yP = -.2 * mazeMap[i + size];
            let xN = .2 * mazeMap[i - 1];
            let xP = -.2 * mazeMap[i + 1];

            map.push([
                x - 2 + xN, y - 2 + yN, x - 2 + xN, y + 2 + yP,
                x - 2 + xN, y + 2 + yP, x + 2 + xP, y + 2 + yP,
                x + 2 + xP, y + 2 + yP, x + 2 + xP, y - 2 + yN,
                x + 2 + xP, y - 2 + yN, x - 2 + xN, y - 2 + yN
            ]);
        }
    }
    meshes.push(mz);
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

const font = 'serif';

let particles = [];

let updateParticles = (counter) => {
    let wind = vector3(Math.cos(timeStamp / 1000) / 10 + .025 - Math.random() / 20, 0, Math.sin(timeStamp / 1000) / 10 + .025 - Math.random() / 20);

    // Array to keep track of indices of particles to remove
    let indicesToRemove = [];

    particles.forEach((particle, index) => {
        particle.mesh.position = add(particle.mesh.position, particle.velocity);
        particle.mesh.position = add(particle.mesh.position, multiplyBy(wind, deltaTime));
        particle.mesh.rotation = add(particle.mesh.rotation, particle.rotationalVelocity);
        particle.counter -= deltaTime / 20;
        particle.mesh.opacity = Math.max(particle.counter / particle.initialCounter, 0);

        if (particle.counter <= 0) {
            particle.mesh.off = true;
            indicesToRemove.push(index); // Mark this particle for removal
        } else {
            if (particle.gravityAffected) {
                particle.velocity.y -= .02 * deltaTime;
            }
        }
    });

    // Remove dead particles from particles array and particleGroup.meshes
    indicesToRemove.reverse().forEach(index => {
        // Remove the corresponding mesh from the particleGroup.meshes
        particleGroup.meshes.splice(index, 1);
        // Remove the particle from the particles array
        particles.splice(index, 1);
    });
};

/**
 * 
 * @param {vector3} pos 
 * @param {vector3} velocity 
 * @param {String} color 
 * @param {vector3} rotationalVelocity 
 * @param {Number} counter 
 */

const Particle = (pos, velocity, color = "#FFFFFF", rotationalVelocity = vector3(.005 - Math.random() * .01, .05 - Math.random() * .01, .005 - Math.random() * .01), counter = 1, gravityAffected = false, scale = .2) => {
    let mesh = Mesh(particle.vertices, particle.indices, [[color, 4]], pos, u, vector3(scale, scale, scale));
    particleGroup.meshes.push(mesh);
    particles.push({ mesh, velocity, counter, rotationalVelocity, initialCounter: counter, gravityAffected });
};
const Prize = (pos) => {
    let group = Group([
        Mesh(question_mark.vertices, question_mark.indices, question_mark.colors, u, vector3(Math.PI / 2, 0, 0), vector3(.2, .2, .2)),
        Mesh(hypercube.vertices, hypercube.indices, hypercube.colors, u, u, vector3(.4, .4, .4), 1, 1)
    ]);
    group.position = pos;
    meshes.push(group);

    return deltaTime => {
        group.meshes[0].rotation.y = angleBetween(group.position, camera.position);
        group.meshes[1].rotation.x += deltaTime / 5;
        group.meshes[1].rotation.z += deltaTime / 5;

        group.position.y = 1.5 + Math.sin(timeStamp / 500) / 2;

        if (!group.off && distanceTo(camera.position, group.position) < 1) {
            wheelSize = .999;
            wheel = 1;
            group.off = true;
            group.meshes[0].off = true;
            group.meshes[1].off = true;
            zzfx(...[, , 105, .06, .36, .001, 1, 2.3, , , 10, , .06, , , , , .96, .47, 1]);
        }

        if (!group.off && distanceTo(camera.position, group.position) < 10 && Math.random() < deltaTime) {
            Particle(clone(group.position), vector3(rand(.05), .1, rand(.05)), "#66ccff", u, u, 1);
        }

    }
}
const raycast = (camera, points) => {
    let cameraDirection = substract(camera.position, camera.target)
    for (index in points) {
        let direction = normalize(substract(camera.position, points[index]));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, points[index]);

        if (distance < 5 && difference < 3 && spider_death[index]) {
            for (let i = 0; i < 20; i++)
                Particle(clone(points[index]), vector3(rand(.2), rand(.2), rand(.2)), "#FF0000", u, .8, true);
            spider_healths[index] -= .5; zzfx(...[1, , 240, .02, .05, .08, 4, 3.1, , , , , .07, .2, 9.4, .5, .03, .97, , .2]); // Hit 201

            if (spider_healths[index] <= 0) {
                zzfx(...[1.9,,729,,.04,.09,2,1.9,-7,50,-70,.08,.02,,,,,.72,.15,.14,411]); // Random 247
                for (let i = 0; i < 100; i++)
                    Particle(clone(points[index]), vector3(rand(.2), rand(.2), rand(.2)), "#FF0000", u, .8, true);
            }
            spider_ricoshate = 1;

            return;
        }
    }
}
var spider_positions = [];
var spider_healths = [];
var spider_death = [];
var spider_ricoshate = 0;

const Spider = (pos, ghost = false) => {
    let index = spiders.length;
    let time = 0;
    let rotation = 0;
    let cooldown = 3;

    spider_positions.push(pos);
    spider_healths.push(1 + Math.random() / 2);
    spider_death.push(1);

    let group = Group([
        Mesh(spider_body.vertices, spider_body.indices, spider_body.colors, vector3(0, 0, .8), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, 0), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, .4), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, .8), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, 1.2), u, vector3(.25, .25, .25), 1)
    ]
    );

    group.scale = vector3(spider_healths[index], spider_healths[index], spider_healths[index]);
    group.position = pos;

    if (!ghost) meshes.push(group);

    return deltaTime => {
        
        if (spider_healths[index] <= 0) {
            group.off = true;
            spider_death[index] = 0;
            return;
        }


        cooldown -= deltaTime;
        time += deltaTime;

        group.meshes[1].rotation = vector3(0, Math.cos(time) * .05, Math.sin(time) * .15);
        group.meshes[2].rotation = vector3(0, Math.sin(time) * .05, Math.cos(time) * .15);
        group.meshes[3].rotation = vector3(0, Math.cos(time) * .05, Math.sin(time) * .15);
        group.meshes[4].rotation = vector3(0, Math.sin(time) * .05, Math.cos(time) * .15);

        group.rotation.y = Math.atan2(camera.position.x - group.position.x, camera.position.z - group.position.z);

        if (distanceTo(vector3(u, u, u), camera.position) <= 4.358) return;

        if (distanceTo(group.position, camera.position) > 3 && distanceTo(vector3(u, u, u), group.position) > 5 && distanceTo(group.position, camera.position) <= 10) {
            let p = clone(group.position);
            p.x += Math.sin(group.rotation.y) * deltaTime;
            p.z += Math.cos(group.rotation.y) * deltaTime;
            if ((ghost ||pointIsOnMap(p.x, p.z)) && distanceTo(vector3(u, u, u), group.position) > 5) group.position = p;
        }
        if (spider_ricoshate > .1) {
            let p = clone(group.position);
            p.x -= Math.sin(group.rotation.y) * deltaTime * spider_ricoshate * 5;
            p.z -= Math.cos(group.rotation.y) * deltaTime * spider_ricoshate * 5;
            zzfx(...[,,73,,.02,.07,4,3.6,,,,,.03,.5,14,.8,.01,.62]);
            if (pointIsOnMap(p.x, p.z) && distanceTo(vector3(u, u, u), group.position) > 5) group.position = p;
            spider_ricoshate -= deltaTime / 10;

        }
        if (distanceTo(group.position, camera.position) < 4) {
            if (cooldown <= 0) {
                health -= .05;
                cooldown = 3;
                zzfx(...[, , 100, , .04, , 4, 5, , , , , , 1.4, , .1, , .89, , , -2247]);
                vibrate(0, 1, 0, 0.1);

            }
        }

        
       if (ghost && distanceTo(group.position, camera.position) <= 10) for (let i = 0; i < 1; i++) Particle(add(group.position, vector3(0, 1.80, 0)), vector3(rand(.1), rand(.1),rand(.1)),"#FFFFFF",u,1, true, .3);
       if (distanceTo(group.position, camera.position) <= 10 && Math.random() < deltaTime/20) zzfx(...[,,770,.3,,.22,2,4.6,-87,,48,.52,.06,,,,,.54,.14,.13,-554]);
        spider_positions[index] = group.position;

    }
}
const Ufo = (u, deltaTime) => {
    // Create the mesh and set initial position
    const m = Mesh(ufo.vertices, ufo.indices, ufo.colors, u,u, vector3(0.56, 0.56, 0.56), 1,1);
    m.position = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);
    meshes.push(m);

    // Define the target position
    let target = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);

    // Return an update function that moves the UFO towards the target
    return (deltaTime) => {
        const speed = 1; // Adjust speed as needed
        let direction = substract(target, m.position);
        const distance = length(direction);

        if (distance < 1) {
            // When close to the target, choose a new random target
            target = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);
        } else {
            // Normalize the direction and move towards the target
            direction = normalize(direction);
            const movement = multiplyBy(direction, speed * deltaTime);
            m.position = add(m.position, movement);
        }

        let distanceFromCamera = distanceTo(camera.position, m.position);
        if (distanceFromCamera < 6) health -= 1 * deltaTime;
    };
};
/**
 * Vibrates the specified gamepad.
 * @param {number} gamepadIndex - Index of the gamepad to vibrate.
 * @param {number} duration - Duration of the vibration in milliseconds.
 * @param {number} weakMagnitude - Magnitude of the weak motor (0.0 to 1.0).
 * @param {number} strongMagnitude - Magnitude of the strong motor (0.0 to 1.0).
 */
function vibrate(gamepadIndex, duration = 1000, weakMagnitude = 1.0, strongMagnitude = 1.0) {
    // Get the list of gamepads
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[gamepadIndex];
    
    if (gamepad) {
        // Ensure the gamepad supports vibration
        if (gamepad.vibrationActuator) {
            gamepad.vibrationActuator.playEffect('dual-rumble', {
                startDelay: 0,
                duration: duration, // Vibration duration in milliseconds
                weakMagnitude: weakMagnitude, // Weak motor magnitude
                strongMagnitude: strongMagnitude // Strong motor magnitude
            }).catch(err => console.log('Vibration error:', err));
        } else {
            console.log('Vibration actuator not available on this gamepad.');
        }
    } else {
        console.log(`Gamepad with index ${gamepadIndex} not found.`);
    }
}
const Geometry = (vertices, indices, colors, mx = 0, my = 0) => {
    // Necessary for WebGL calls, update if IBO is modified
    var indicesLength = indices.length;

    let finalVertices = [], finalColors = [];

    // Populate final vertices
    for (let index of indices) {
        finalVertices.push(vertices[index * 3], vertices[index * 3 + 1], vertices[index * 3 + 2]);
    }

    // Populate final colors with alpha channel
    for (let i = 0; i < colors.length; i += 4) { // Changed step from 3 to 4 to handle RGBA
        finalColors.push(
            colors[i], colors[i + 1], colors[i + 2], colors[i + 3], // first vertex
            colors[i], colors[i + 1], colors[i + 2], colors[i + 3], // second vertex
            colors[i], colors[i + 1], colors[i + 2], colors[i + 3]  // third vertex
        );
    }

    if (mx) {
        finalVertices = [...finalVertices, ...(finalVertices.map((x, i) => (i % 3 ? x : -x)))];
        
        finalColors = [...finalColors, ...finalColors];
        indicesLength *= 2;
    }

    if (my) {
        finalVertices = [...finalVertices, ...(finalVertices.map((y, i) => (i % 3 == 2 ? -y : y)))];
        finalVertices = [...finalVertices, ...(finalVertices.map((k, i, m) => {
            if (i % 3 == 1) return k;
            if (i % 3 == 2) return m[i - 2];
            else return m[i + 2];
        }))];

        finalColors = [...finalColors, ...finalColors, ...finalColors, ...finalColors];
        indicesLength *= 4;
    }

    // Set up VBO 
    const vertexBuffer = CreateAndBindBufferData(finalVertices);
    // Color buffer
    const colorBuffer = CreateAndBindBufferData(finalColors);
    // Normal buffer
    const normalBuffer = CreateAndBindBufferData(getNormals(finalVertices));
    // Cleanup
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return { vertices, indices, colors, indicesLength, vertexBuffer, colorBuffer, normalBuffer };
}

getNormals = (vertices) => {
    let normals = [];
    for (let index = 0; index < vertices.length; index += 9) {
        let faceNormal = cross(
            normalize(vector3(
                vertices[index + 3] - vertices[index],
                vertices[index + 3 + 1] - vertices[index + 1],
                vertices[index + 3 + 2] - vertices[index + 2]
            )),
            normalize(vector3(
                vertices[index + 6] - vertices[index],
                vertices[index + 6 + 1] - vertices[index + 1],
                vertices[index + 6 + 2] - vertices[index + 2]
            ))
        );
        normals.push(
            faceNormal.x, faceNormal.y, faceNormal.z,
            faceNormal.x, faceNormal.y, faceNormal.z,
            faceNormal.x, faceNormal.y, faceNormal.z
        );
    }
    return normals;
}

CreateAndBindBufferData = (bufferArray) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferArray), gl.STATIC_DRAW);
    return buffer;
}
const Group = (meshes) => {
    return {isGroup:true, position:vector3(0, 0, 0), rotation: vector3(0, 0, 0), scale: vector3(1, 1, 1), meshes:meshes};
};
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
    abs = Math.abs,
    rand = x => x - x * 2 * Math.random();
const Mesh = (vertices, indices, colors, position = vector3(), rotation = vector3(), scale = vector3(1, 1, 1), mx = 0, my = 0) => {
    let finalColors = [];
    for (let color of colors) for (let i = 0; i < color[1]; i++) finalColors.push(...hexToRgbArray(color[0]));
    return ({ geometry: Geometry(vertices.map(v => v / 100), indices, finalColors, mx, my), position, rotation, scale });
},

    hexToRgbArray = hex => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255, parseInt(hex.slice(7, 9), 16) / 255 || 1];
var fog = 15;

const render = (meshes, camera, clear = 1, additionalMatrix = null) => {
    if (clear) {
    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(uFogLocation, fog);
    
    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Set camera matrix (once per render). DO NOT BY ANY MEANS MOVE THE CAMERA DURING RENDERING.
    gl.uniformMatrix4fv(cameraMatrixLocation, false, lookAt(camera.position, camera.target, camera.up));
    }

    for (const mesh of meshes) {
        if (mesh.off) continue;
        if (mesh.isGroup) {
            render(mesh.meshes, camera, 0, transform(mesh.position,  mesh.rotation, mesh.scale));
            continue;
        }
        gl.uniform1f(uOpacityLocation, mesh.opacity || 1);

        // Bind vertex buffer for the current mesh
        bindBufferAttribute(mesh.geometry.vertexBuffer, program.aVertexPosition);
        // Bind color buffer for the current mesh
        bindBufferAttribute(mesh.geometry.colorBuffer, program.aVertexColor, 4);
        //Normal buffer 
        bindBufferAttribute(mesh.geometry.normalBuffer, program.aNormal);
        // Update the model-view matrix for the current mesh
        if (additionalMatrix)
            gl.uniformMatrix4fv(meshMatrixLocation, false, 
                multiply(transform(mesh.position, mesh.rotation, mesh.scale), additionalMatrix)
            );
        else gl.uniformMatrix4fv(meshMatrixLocation, false, transform(mesh.position, mesh.rotation, mesh.scale));
        // Draw the current mesh using gl.drawArrays
        gl.drawArrays(gl.TRIANGLES, 0, mesh.geometry.indicesLength);
        // Clean up
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}

bindBufferAttribute = (buffer, attribute, size = 3) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);
}
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
initialiseGameOverScene = () => {
    messages = [];
    showMessage("𝕲𝖍𝖔𝖘𝖙 𝖆𝖌𝖆𝖎𝖓", halfWidth, halfHeight - 15, 30);
    showMessage("Press enter to reincarnate!", halfWidth, halfHeight + 25, 15);
}

updateGameOverScene = () => {
    console.log(messages);
    context.clearRect(0, 0, width, height);
    updateMessages();
    if (enter) window.location.reload();
} 

const initialiseMenuScene = () => {
    messages = [];

    showMessage("𝕯𝖎𝖒𝖊𝖓𝖘𝖎𝖔𝖓", halfWidth, halfHeight * 0.5, halfHeight * 0.4, 1e7, 30);
    showMessage("𝕿𝖍𝖎𝖗𝖙𝖊𝖊𝖓", halfWidth, halfHeight * 0.85, halfHeight * 0.4, 1e7, 35);
    showMessage('Escape the thirteenth dimension', halfWidth, halfHeight * 1.2, halfHeight * 0.2, 1e7, 60);
}

const updateMenuScene = (deltaTime) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    updateMessages();
    if (enter || xButtonPressed || yButtonPressed) {
        showScene(playScene(), true);
    }
};

document.onclick = f => {
    document.documentElement.requestPointerLock();

    
}

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
  drops = ['💩', '❤️', '👁️', '🛡️', '🪽', '⏳', '⚡', '⚔️'],
  drop = -1;


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
  effectDuration -= deltaTime / 100;
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
  if (effectDuration < 0) {
    effectDuration = 1000;
    effect = -1;
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

    context.fillStyle = "#FFFFFF";
    context.fillText(drops[effect] || '🚫', 10, height - 10);

    context.fillStyle = "#80D08C";
    context.fillText("⬡⬡⬡⬡⬡⬡⬡".replace(/⬡/g, (match, offset) => offset < gemsFound ? '⬢' : match), width - 40, 10);
    //#endregion bars

    //#region wheel

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

  if (wheel < .01 && effect == -1 && drop != -1) {
    effect = drop;
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
winScene = () => ({ initialise: initialiseWinScene, update: updateWinScene })
var initialiseWinScene = () => {
    messages = [];
    showMessage("𝔈𝔳𝔞𝔡𝔢𝔡", halfWidth, halfHeight - 15, 30);
    showMessage("GG, you win.", halfWidth, halfHeight + 25, 15);
}

var updateWinScene = () => {
    console.log(messages);
    context.clearRect(0, 0, width, height);
    updateMessages();
    if (enter) showScene(playScene(), true);
} 
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
  
    context.clearRect(0, 0, width, height);
    let r = Math.random() < deltaTime / 10;
    imageData = new ImageData(new Uint8ClampedArray(imageData.data.map((x, i) => {
        if ((i % 4) == 3) return 200;
        if (Math.floor(i / 4 / width) % 3 == 0) return imageData.data[i] * .99;
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

