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