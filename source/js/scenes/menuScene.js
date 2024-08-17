
const initialiseMenuScene = () => {
    messages = [];

    showMessage("𝕿𝖍𝖎𝖗𝖙𝖊𝖊𝖓 𝖘𝖊𝖈𝖔𝖓𝖉𝖘", halfWidth, halfHeight * 0.8, halfHeight * 0.4, 1e7, 30);
    showMessage('Escape the lair of Triskaideka', halfWidth, halfHeight * 1.2, halfHeight * 0.2, 1e7, 60);
}

const updateMenuScene = (deltaTime) => {
    context.clearRect(0, 0, 1e6, 1e6);
    updateMessages();
    if (enter) {
        showScene(playScene(), true);
    }

};

