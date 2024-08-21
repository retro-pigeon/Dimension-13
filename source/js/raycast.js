const raycast = (camera, points) => { 
    let cameraDirection = substract(camera.position, camera.target)
    for (index in points) {
        let direction = normalize(substract(camera.position, points[index]));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, points[index]);

        if (distance < 3 && difference < 3 && spider_death[index]) {
            spider_healths[index] -= .5;
            
            zzfx(...[1.1,,219,,.01,.03,4,4.2,,,,,,,,,,.67,,,198]);

            return;
        }
    }
}