var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");
var theBody = document.getElementsByTagName("body")[0];
var numberImg = 6;
var i;
function generateFace() {
    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }
    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    for (i = 1; i <= numberImg; i++ ) {
        var newImg = document.createElement("img");
        newImg.setAttribute("src", "smile.png");
        newImg.style.top =  Math.floor(Math.random() * 400) + "px";
        newImg.style.left = Math.floor(Math.random() * 400) + "px";
        theLeftSide.appendChild(newImg);
    }
    var theLeftSideImg = theLeftSide.cloneNode(true);
    theLeftSideImg.removeChild(theLeftSideImg.lastChild);
    theLeftSideImg.removeAttribute("id");
    theRightSide.appendChild(theLeftSideImg);
    theLeftSide.lastChild.onclick = function nextLevel(event) {
        event.stopPropagation();
        numberImg += 5;
        generateFace();
    };
}

theBody.onclick = function gameOver() {
        alert("Game Over!");
        theBody.onclick = null;
        theLeftSide.lastChild.onclick = null;
};
generateFace();
