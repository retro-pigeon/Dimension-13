var initialiseWinScene = () => {
    messages = [];
    showMessage("𝔈𝔳𝔞𝔡𝔢𝔡", halfWidth, halfHeight - 15, 30);
    showMessage("GG, you win.", halfWidth, halfHeight + 25, 15);
}

var updateWinScene = () => {
    console.log(messages);
    context.clearRect(0, 0, width, height);
    updateMessages();
    if (enter) showScene(playScene(), true);
} 