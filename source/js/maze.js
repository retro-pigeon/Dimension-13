const maze = () => {
    var mz = Group([]);

    var size = 26;
    
    var mazeMap = `1111111111111111111111111111000000000000000000000011101101001001001001001011111011000000000000000000100110101100100100100100111101101011000000000000001000011010101010010010010111011110101011000000000010000001101010101001001001111111011010101011000000100000000110001000101100111101111101101010101010000100000010011010101010000000000000100110101010100000000000001001101000101010000100000010011010101000110011111101111110101010110000001000000001101010101001111001111111011010101100100001001000000110101010010011001001110111101011000001001001001000011010100100100001001001110110110010010011001001001001101001001000001000001001111100100100100001001001001111111111111111111111111111`.split("").map(x=>+x);

    for (let i = 0; i < size * size; i++) {
        const x = 4 * (i % size) - size;
        const y = Math.floor(i / size) * 4 - size;
        if (mazeMap[i]) {
            mz.meshes.push(Mesh(cube.vertices, cube.indices, cube.colors, vector3(x, 0, y), vector3(0, 0, 0), vector3(2, 2, 2)));
        }
        else map.push([
            x - 2, y - 2, x - 2, y + 2,
            x - 2, y + 2, x + 2, y + 2,
            x + 2, y + 2, x + 2, y - 2,
            x + 2, y - 2, x - 2, y - 2
        ]);
    }
    meshes.push(mz);
}