function generateFaces() {
    numberOfFaces += 5;
    while (leftSide.firstChild)
        leftSide.removeChild(leftSide.firstChild);
    for(var i = 0; i < numberOfFaces; i++) {
        var new_img = faceImg.cloneNode();
        new_img.style.top = Math.floor(Math.random() * 400);
        new_img.style.left = Math.floor(Math.random() * 400);
        leftSide.appendChild(new_img);
    }
    rightSide.removeChild(rightSide.firstChild);
    var cloneSide = leftSide.cloneNode(true);
    cloneSide.removeChild(cloneSide.lastChild);
    rightSide.appendChild(cloneSide);
    leftSide.lastChild.onclick = function nextLevel(event) {
        event.stopPropagation();
        generateFaces();
    }
}

function startGame() {
    leftSide = document.getElementById("left-side");
    rightSide = document.getElementById("right-side");
    theBody = document.getElementById("the-body");
    numberOfFaces = 0;
    faceImg = document.createElement("img");
    faceImg.src = "smile.png";
    generateFaces();
    theBody.onclick = function gameOver(event) {
        alert("Game Over!!!");
        leftSide.lastChild.onclick = null;
        theBody.onclick = null;
    }
}
