const Gem = () => {
    let x = 50 - 100 * Math.random(),
        z = 50 - 100 * Math.random();
    if (!pointIsOnMap(x, z)) return Gem();
    const mesh = Mesh(gem.vertices, gem.indices, gem.colors, vector3(x, 0, z), vector3(Math.PI / 2, 0, 0), vector3(.25, .25, .25));
    meshes.push(mesh);

    const st = Mesh(star.vertices, star.indices, star.colors, vector3(x, 30, z), vector3(Math.PI / 2, 0, 0), vector3(2, 2, 2));
    meshes.push(st);

    return deltaTime => {
        mesh.position.y = Math.sin(timeStamp / 1000) * .25 + 1;
        mesh.rotation.y += deltaTime;

        st.rotation.y += deltaTime*Math.random();

        if (!mesh.off && distanceTo(mesh.position, camera.position) < 3) {
            mesh.off = true;
            gemsFound++;

            zzfx(...[,,539,0,.04,.29,1,1.92,,,567,.02,.02,,,,.04]);

            if (gemsFound == 7) Message("You found all gems, return to the teleporter!")
        }
    };
}