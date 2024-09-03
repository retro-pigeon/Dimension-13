
const initialiseMenuScene = () => {
    messages = [];

    showMessage("𝕯𝖎𝖒𝖊𝖓𝖘𝖎𝖔𝖓", halfWidth, halfHeight * 0.5, halfHeight * 0.4, 1e7, 30);
    showMessage("𝕿𝖍𝖎𝖗𝖙𝖊𝖊𝖓", halfWidth, halfHeight * 0.85, halfHeight * 0.4, 1e7, 35);
    showMessage('Escape the thirteenth dimension', halfWidth, halfHeight * 1.2, halfHeight * 0.2, 1e7, 60);
}

const updateMenuScene = (deltaTime) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    updateMessages();
    if (enter || xButtonPressed || yButtonPressed) {
        showScene(playScene(), true);
    }
};

document.onclick = f => {
    document.documentElement.requestPointerLock();

    
}

