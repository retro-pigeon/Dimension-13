const raycast = (camera, points) => {
    let cameraDirection = substract(camera.position, camera.target)
    for (index in points) {
        let direction = normalize(substract(camera.position, points[index]));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, points[index]);

        if (distance < 5 && difference < 3 && spider_death[index]) {
            for (let i = 0; i < 20; i++)
                Particle(clone(points[index]), vector3(rand(.2), rand(.2), rand(.2)), "#FF0000", u, .8, true);
            spider_healths[index] -= .5; zzfx(...[1, , 240, .02, .05, .08, 4, 3.1, , , , , .07, .2, 9.4, .5, .03, .97, , .2]); // Hit 201

            if (spider_healths[index] <= 0) {
                zzfx(...[1.9,,729,,.04,.09,2,1.9,-7,50,-70,.08,.02,,,,,.72,.15,.14,411]); // Random 247
                for (let i = 0; i < 100; i++)
                    Particle(clone(points[index]), vector3(rand(.2), rand(.2), rand(.2)), "#FF0000", u, .8, true);
            }
            spider_ricoshate = 1;

            return;
        }
    }
}