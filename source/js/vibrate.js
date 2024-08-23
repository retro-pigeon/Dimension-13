/**
 * Vibrates the specified gamepad.
 * @param {number} gamepadIndex - Index of the gamepad to vibrate.
 * @param {number} duration - Duration of the vibration in milliseconds.
 * @param {number} weakMagnitude - Magnitude of the weak motor (0.0 to 1.0).
 * @param {number} strongMagnitude - Magnitude of the strong motor (0.0 to 1.0).
 */
function vibrate(gamepadIndex, duration = 1000, weakMagnitude = 1.0, strongMagnitude = 1.0) {
    // Get the list of gamepads
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[gamepadIndex];
    
    if (gamepad) {
        // Ensure the gamepad supports vibration
        if (gamepad.vibrationActuator) {
            gamepad.vibrationActuator.playEffect('dual-rumble', {
                startDelay: 0,
                duration: duration, // Vibration duration in milliseconds
                weakMagnitude: weakMagnitude, // Weak motor magnitude
                strongMagnitude: strongMagnitude // Strong motor magnitude
            }).catch(err => console.log('Vibration error:', err));
        } else {
            console.log('Vibration actuator not available on this gamepad.');
        }
    } else {
        console.log(`Gamepad with index ${gamepadIndex} not found.`);
    }
}