const raycast = (camera, points) => { 
    let cameraDirection = substract(camera.position, camera.target)
    for (index in points) {
        let direction = normalize(substract(camera.position, points[index]));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, points[index]);

        if (distance < .70 && difference < .2) {
            spider_healths[index] -= .5;
        }
    }
}