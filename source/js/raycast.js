const raycast = (camera, points) => { 
    let cameraDirection = substract(camera.position, camera.target)
    for (index in points) {
        let direction = normalize(substract(camera.position, points[index]));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, points[index]);

        if (distance < 5 && difference < 3 && spider_death[index]) {
            spider_healths[index] -= .5;zzfx(...[1,,240,.02,.05,.08,4,3.1,,,,,.07,.2,9.4,.5,.03,.97,,.2]); // Hit 201

if (spider_healths[index] <= 0)            
            for (let i = 0; i < 100; i++)
                Particle(clone(points[index]), vector3(rand(.05), rand(.05), rand(.05)), "#FF0000",u, .2, true);

            spider_ricoshate = 1;

            return;
        }
    }
}