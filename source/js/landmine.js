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