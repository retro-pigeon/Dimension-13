const Gem = () => {
    let x = 50 - 100 * Math.random(),
        z = 50 - 100 * Math.random();
    if (!pointIsOnMap(x, z)) return Gem();
    const mesh = Mesh(gem.vertices, gem.indices, gem.colors, vector3(x, 0, z), vector3(Math.PI / 2, 0, 0), vector3(.25, .25, .25));
    meshes.push(mesh);

    return deltaTime => {
        mesh.position.y = Math.sin(timeStamp / 1000) * .25 + 1;
        mesh.rotation.y += deltaTime;

        if (!mesh.off && distanceTo(mesh.position, camera.position) < 3) {
            mesh.off = true;
            gemsFound++;
        }
    };
}