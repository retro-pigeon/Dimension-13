const Ufo = (u, deltaTime) => {
    // Create the mesh and set initial position
    const m = Mesh(ufo.vertices, ufo.indices, ufo.colors, u,u, vector3(0.56, 0.56, 0.56), 1,1);
    m.position = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);
    meshes.push(m);

    // Define the target position
    let target = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);

    // Return an update function that moves the UFO towards the target
    return (deltaTime) => {
        const speed = 1; // Adjust speed as needed
        let direction = substract(target, m.position);
        const distance = length(direction);

        if (distance < 1) {
            // When close to the target, choose a new random target
            target = vector3(100 - Math.random() * 200, u, 100 - Math.random() * 200);
        } else {
            // Normalize the direction and move towards the target
            direction = normalize(direction);
            const movement = multiplyBy(direction, speed * deltaTime);
            m.position = add(m.position, movement);
        }

        let distanceFromCamera = distanceTo(camera.position, m.position);
        if (distanceFromCamera < 6) health -= 1 * deltaTime;
    };
};
