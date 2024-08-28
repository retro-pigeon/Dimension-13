let particles = [];

let updateParticles = (counter) => {
    let wind = vector3(Math.cos(timeStamp / 1000) / 10 + .025 - Math.random() / 20, 0, Math.sin(timeStamp / 1000) / 10 + .025 - Math.random() / 20);

    // Array to keep track of indices of particles to remove
    let indicesToRemove = [];

    particles.forEach((particle, index) => {
        particle.mesh.position = add(particle.mesh.position, particle.velocity);
        particle.mesh.position = add(particle.mesh.position, multiplyBy(wind, deltaTime));
        particle.mesh.rotation = add(particle.mesh.rotation, particle.rotationalVelocity);
        particle.counter -= deltaTime / 20;
        particle.mesh.opacity = Math.max(particle.counter / particle.initialCounter, 0);

        if (particle.counter <= 0) {
            particle.mesh.off = true;
            indicesToRemove.push(index); // Mark this particle for removal
        } else {
            if (particle.gravityAffected) {
                particle.velocity.y -= .02 * deltaTime;
            }
        }
    });

    // Remove dead particles from particles array and particleGroup.meshes
    indicesToRemove.reverse().forEach(index => {
        // Remove the corresponding mesh from the particleGroup.meshes
        particleGroup.meshes.splice(index, 1);
        // Remove the particle from the particles array
        particles.splice(index, 1);
    });
};

/**
 * 
 * @param {vector3} pos 
 * @param {vector3} velocity 
 * @param {String} color 
 * @param {vector3} rotationalVelocity 
 * @param {Number} counter 
 */

const Particle = (pos, velocity, color = "#FFFFFF", rotationalVelocity = vector3(.005 - Math.random() * .01, .05 - Math.random() * .01, .005 - Math.random() * .01), counter = 1, gravityAffected = false, scale = .2) => {
    let mesh = Mesh(particle.vertices, particle.indices, [[color, 4]], pos, u, vector3(scale, scale, scale));
    particleGroup.meshes.push(mesh);
    particles.push({ mesh, velocity, counter, rotationalVelocity, initialCounter: counter, gravityAffected });
};
