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
            mz.meshes.push(Mesh(cube.vertices, cube.indices, cube.colors, vector3(x, 0, y), vector3(0, 0, 0), vector3(2, 2, 2)));
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