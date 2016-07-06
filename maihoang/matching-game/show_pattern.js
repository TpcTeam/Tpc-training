function show() {
    var xPos = 50;
    var yPos = 50;
    var squareLength = 300;
    var color = ["red", "blue", "cyan", "orange", "black", "yellow", "white", "mangeto"];
    var theBody = document.getElementById("theBody");
    while (squareLength > 50) {
        this_div = document.createElement("div");
        this_div.style.top = xPos + "px";
        this_div.style.left = yPos + "px";
        this_div.style.width = squareLength + "px";
        this_div.style.height = squareLength + "px";
        colorIndex = Math.floor(Math.random() * color.length);
        this_div.style.background = color[colorIndex];
        xPos += 10;
        yPos += 10;
        squareLength -= 20;
        theBody.appendChild(this_div);
    }
}
