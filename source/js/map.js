let map = [[0,0,-6,-6,-6,-6,-6,0,-6,0,0,0],[0,-6,-4,-18,-4,-18,-1.67,-10.5,-1.67,-10.5,0,-6],[-18,0,-6,-1.67,-6,-1.67,-10.5,-1.67,-10.5,-1.67,-18,0],[0,0,0,-6,0,-6,-6,-6,-6,-6,0,0],[-1.67,-10.5,-1.67,-6,-1.67,-6,0,-6,0,-6,-1.67,-10.5],[0,-6,0,-18,0,-18,-4,-18,-4,-18,0,-6],[-4,-18,-4,-10.5,-4,-10.5,-1.67,-10.5,-1.67,-10.5,-4,-18],[-10.5,-4,-18,-4,-18,-4,-18,0,-18,0,-10.5,-4],[-18,0,-6,0,-6,0,-6,-1.67,-6,-1.67,-18,0],[-10.5,-1.67,-10.5,-4,-10.5,-4,-18,0,-18,0,-10.5,-1.67]];

map = [...map, ...(map.map(a=>a.map((x,i)=>i%2?x:-x)))];
map = [...map, ...(map.map(a=>a.map((y,i)=>i%2?-y:y)))];

var pointIsOnMap = (x, y) => {
    //for each polygon on the walking map verify if the count of intersecting edges is odd or not. 
    //If it's not odd the point is inside one of the polygons of the walking map.
    for (const polygon of map) {
        let count = 0;
        for (let i = 0; i < polygon.length; i += 4) {
            let edgeStartX = polygon[i], edgeStartY = polygon[i + 1], edgeEndX = polygon[i + 2], edgeEndY = polygon[i + 3];
            if ((y < edgeStartY !== y < edgeEndY) && x < edgeStartX + ((y - edgeStartY) / (edgeEndY - edgeStartY)) * (edgeEndX - edgeStartX)) count += 1;
        }
        // when we find the first non odd value we get out of the function and say the point is inside the map
        if (count % 2 !== 0) return true;
    }
    return false;
}


drawMap = (context, camera) => {
    // x and y offset of the map relative to screen top
    const xOffset = 70, yOffset = 100;
    // draw the map
    context.fillStyle = "rgba(191, 191, 191,.2)";
    map.forEach(polygon => {
        context.beginPath();
        for (let i = 0; i < polygon.length; i += 2) context.lineTo(xOffset + polygon[i], yOffset + polygon[i + 1]);
        context.fill();
    });
    // draw the player as a blue square
    let playerX = xOffset + camera.position.x;
    let playerZ = yOffset + camera.position.z;
    context.fillStyle = "blue";
    context.fillRect(playerX - 2, playerZ - 2, 4, 4);
    // draw player direction as a white line
    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(playerX, playerZ);
    context.lineTo(playerX + 10 * Math.cos(camera.yaw + Math.PI / 2), playerZ + 10 * Math.sin(camera.yaw + Math.PI / 2));
    context.stroke();
    // draw all npcs
    context.fillStyle = "red";
    npcs.forEach(npc => { context.fillRect(xOffset + npc.position.x - 2, yOffset + npc.position.z - 2, 4, 4); });

    // draw npc count
    context.fillText(npcs.length, 60, 20);

    context.fillText(Math.round(camera.position.x), 30, 200);
    context.fillText(Math.round(camera.position.z), 30, 250);
}