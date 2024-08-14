const Mesh = (vertices, indices, colors, position = vector3(), rotation = vector3(), scale = vector3(1, 1, 1)) => {
    let finalColors = [];
    for (let color of colors) for (let i = 0; i < color[1]; i++) finalColors.push(...hexToRgbArray(color[0]));
    return ({ geometry: Geometry(vertices.map(v => v / 100), indices, finalColors), position, rotation, scale });
},

    hexToRgbArray = hex => [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255];