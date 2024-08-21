initialiseGameOverScene = () => {
    messages = [];
    showMessage("You will never get back home to see your wife and kids again.", halfWidth, halfHeight, 100);
    showMessage("Press enter to suffer again!", halfWidth, halfHeight + 100, 50);
}

updateGameOverScene = () => {
    updateMessages();
    if (enter) showScene(playScene(), true);
} 