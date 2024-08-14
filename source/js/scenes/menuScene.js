
const initialiseMenuScene = () => {
    messages = [];

    showMessage("13th Second of Terror", halfWidth, halfHeight - 100, 100, 100000, 30);
    showMessage('Escape the lair of Triskaideka', halfWidth, halfHeight, 30, 300, 60);}

const updateMenuScene = (deltaTime) => {
    context.clearRect(0, 0, 1e6, 1e6);
    updateMessages();
    if (enter) {
        showScene(playScene(), true);
    }

};
