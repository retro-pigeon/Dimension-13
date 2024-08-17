const Spider = (pos) => {
    let index = meshes.length;
    let time = 0;
    let rotation = 0;

    let group = Group([
        Mesh(spider_body.vertices, spider_body.indices, spider_body.colors, add(pos, vector3(0, 0, .8)), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, add(pos, vector3(0, 0, 0)), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, add(pos, vector3(0, 0, .4)), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, add(pos, vector3(0, 0, .8)), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, add(pos, vector3(0, 0, 1.2)), u, vector3(.25, .25, .25), 1)
    ]
    );

    group.scale = vector3(.5, .5, .5);

    meshes.push(group);

    return deltaTime => {
        time += deltaTime;

        group.meshes[1].rotation = vector3(0, Math.cos(time) * .05, Math.sin(time) * .15);
        group.meshes[2].rotation = vector3(0, Math.sin(time) * .05, Math.cos(time) * .15);
        group.meshes[3].rotation = vector3(0, Math.cos(time) * .05, Math.sin(time) * .15);
        group.meshes[4].rotation = vector3(0, Math.sin(time) * .05, Math.cos(time) * .15);

        group.rotation.y = Math.atan2(camera.position.x - group.position.x, camera.position.z - group.position.z);
    }
}