var initialiseWinScene = () => {
    messages = [];
    showMessage("𝕲𝖍𝖔𝖘𝖙 𝖆𝖌𝖆𝖎𝖓", halfWidth, halfHeight - 15, 30);
    showMessage("Press enter to reincarnate!", halfWidth, halfHeight + 25, 15);
}

var updateWinScene = () => {
    console.log(messages);
    context.clearRect(0, 0, width, height);
    updateMessages();
    if (enter) showScene(playScene(), true);
} 