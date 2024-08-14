initialiseGameOverScene = () => {
    messages = [];
    showMessage("Triskaideka murdered you in cold blood", halfWidth, halfHeight, 100);
    showMessage("Press enter to suffer again!", halfWidth, halfHeight + 100, 50);
}

updateGameOverScene = () => {
    updateMessages();
    if (enter) showScene(playScene(), true);
} 