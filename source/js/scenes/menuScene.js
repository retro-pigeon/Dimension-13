
const initialiseMenuScene = () => {
    messages = [];
    setInterval(f=>zzfx(...[1.6,0,65.40639,,,1,,.6,,,,,.5,,,,,.8,.03]), 800);

    showMessage("13th Second of Terror", halfWidth, halfHeight - 100, 100, 100000, 30);
    showMessage('Escape the lair of Triskaideka', halfWidth, halfHeight, 30, 300, 60);
}

const updateMenuScene = (deltaTime) => {
    context.clearRect(0, 0, 1e6, 1e6);
    updateMessages();
    if (enter) {
        showScene(playScene(), true);
    }

};

