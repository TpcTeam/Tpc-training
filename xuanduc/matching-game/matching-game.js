var theLeftSide = document.getElementById("left-side");
var numberOfFaces = 6;
var theRightSide = document.getElementById("right-side");
var theBody = document.getElementsByTagName("body")[0];

function generateFaces() {
    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }
    if (theRightSide.firstChild)
    theRightSide.removeChild(theRightSide.firstChild);
    
    var ranNum;
    for (var i = 1; i <= numberOfFaces; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", "smile.png");
    ranNum =  Math.floor(Math.random() * 400) + "px";
    img.style.top = ranNum;
    ranNum =  Math.floor(Math.random() * 400) + "px";
    img.style.left = ranNum;
    theLeftSide.appendChild(img);
    }
    
    theRightSide.appendChild(theLeftSide.cloneNode(true));
    theRightSide.firstChild.removeChild(theRightSide.firstChild.lastChild);
    
    theLeftSide.lastChild.onclick =
        function nextLevel(event) {
        event.stopPropagation();
        numberOfFaces += 5;
        generateFaces();
    }
    
    theBody.onclick = function gameOver() {
        alert("Game Over!");
        theBody.onclick = null;
        theLeftSide.lastChild.onclick = null;
    }
}   

   
 

generateFaces();