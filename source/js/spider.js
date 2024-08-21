var spider_positions = [];
var spider_healths = [];
var spider_death = [];
var spider_ricoshate = 1;

const Spider = (pos) => {
    let index = spiders.length;
    let time = 0;
    let rotation = 0;
    let cooldown = 3;

    spider_positions.push(pos);
    spider_healths.push(1);
    spider_death.push(1);

    let group = Group([
        Mesh(spider_body.vertices, spider_body.indices, spider_body.colors, vector3(0, 0, .8), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, 0), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, .4), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, .8), u, vector3(.25, .25, .25), 1),
        Mesh(spider_leg.vertices, spider_leg.indices, spider_leg.colors, vector3(0, 0, 1.2), u, vector3(.25, .25, .25), 1)
    ]
    );

    group.scale = vector3(1, 1, 1);
    group.position = pos;

    meshes.push(group);

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

        if (distanceTo(group.position, camera.position) > 3) {
            let p = clone(group.position);
            p.x += Math.sin(group.rotation.y) * deltaTime;
            p.z += Math.cos(group.rotation.y) * deltaTime;
            if (pointIsOnMap(p.x, p.z)) group.position = p;
        }
        if (distanceTo(group.position, camera.position) < 4) {
            if (cooldown <= 0) {
                health -= .05;
                cooldown = 3;
                zzfx(...[,,100,,.04,,4,5,,,,,,1.4,,.1,,.89,,,-2247]);
                
            }  
        }
        
        spider_positions[index] = group.position;
        
    }
}