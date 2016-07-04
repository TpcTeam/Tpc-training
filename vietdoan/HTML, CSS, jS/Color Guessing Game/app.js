var colors = ["blue", "cyan", "gold", "gray", "green", "magenta", "orange", "red", "white", "yellow"];
var targetIndex = Math.floor(Math.random() * 10);
var target = colors[targetIndex];
var finished = false;
var guessColor;
var cnt = 0;
var guessColorIndex;
while (!finished) {
    cnt++;
    guessColor = prompt("I am thinking of one of those colors:\n" 
                         + "blue, cyan, gold, gray, green, magenta, orange, white, yellow\n"
                         + "What color am I thinking of?");
    guessColorIndex = colors.indexOf(guessColor);
    if (guessColorIndex != -1) checkGuess();
    else alert("Sorry, I don't recognize your color.\n" + "Please try again.");
}

function checkGuess() {
    if (guessColorIndex == targetIndex) {
        myBody=document.getElementsByTagName("body")[0];
        myBody.style.background = target;
        alert("Congratulations! You have guessed the color!\n" + "It took you " + cnt + " guesses to finish the game!\n"
              + "You can see the colour in the background.");
        finished = true;
        return;
    }
    var str;
    if (guessColorIndex < targetIndex) str = "lower";
    else str = "higher";
    alert("Sorry, your guess is not correct!\n" + "Hint: your color is alphabetically " + str + " than mine.\n" 
          + "Please try again.");
}
