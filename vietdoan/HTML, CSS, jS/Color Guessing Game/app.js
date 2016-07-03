var colors = ["blue", "cyan", "gold", "gray", "green", "magenta", "orange", "red", "white", "yellow"];
var target_index = Math.floor(Math.random() * 10);
var target = colors[target_index];
var finished = false;
var guess_color;
var cnt = 0;
var guess_color_index;
while (!finished) {
    cnt++;
    guess_color = prompt("I am thinking of one of those colors:\n" 
                         + "blue, cyan, gold, gray, green, magenta, orange, white, yellow\n"
                         + "What color am I thinking of?");
    guess_color_index = colors.indexOf(guess_color);
    if (guess_color_index != -1) check_guess();
    else alert("Sorry, I don't recognize your color.\n" + "Please try again.");
}

function check_guess() {
    if (guess_color_index == target_index) {
        myBody=document.getElementsByTagName("body")[0];
        myBody.style.background = target;
        alert("Congratulations! You have guessed the color!\n" + "It took you " + cnt + " guesses to finish the game!\n"
              + "You can see the colour in the background.");
        finished = true;
        return;
    }
    var str;
    if (guess_color_index < target_index) str = "lower";
    else str = "higher";
    alert("Sorry, your guess is not correct!\n" + "Hint: your color is alphabetically " + str + " than mine.\n" 
          + "Please try again.");
}
