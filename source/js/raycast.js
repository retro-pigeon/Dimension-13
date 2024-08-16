const raycast = (camera, points) => { 
    let cameraDirection = substract(camera.position, camera.target)
    for (point of points) {
        let direction = normalize(substract(camera.position, point));
        let difference = summate(substract(cameraDirection, direction));
        let distance = distanceTo(camera.position, point);

        

        if (distance < .70 && difference < .2) {
            return point;
        }
    }
}