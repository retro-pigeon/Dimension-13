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