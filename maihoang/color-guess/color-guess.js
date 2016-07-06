function check(color) {
    var index = color.indexOf(color);
    if (index < 0) {
        alert("Sorry, I don't regconize your color.\nPlease try again.");
        return false;
    }
    if (color == target) {
        myBody = document.getElementsByTagName("body")[0];
        myBody.style.background = target;
        alert("Congratulations! You have guessed the color!\nIt took you " + count + " guesses to finish the game!\nYou can see the colour in the background.");
        return true;
    }
    if (color < target) {
        alert("Sorry, your guess is not correct!\nHint: your color is alphabetically lower than mine.\nPlease try again.");
        return false;
    }
    if (color > target) {
        alert("Sorry, your guess is not correct!\nHint: your color is alphabetically higher than mine.\nPlease try again.");
        return false;
    }
}

function do_game() {
    color = ["blue", "cyan", "gold", "gray", "green", "magenta", "orange", "red", "white", "yellow"];
    target = color[Math.floor(Math.random() * color.length)];
    stop = false;
    count = 0;
    alert("Answer is " + target);
    while (!stop) {
        guess_text = prompt("I'm thinking of one of these color\n\n" + color.join(", ") + "\n\nWhat color am I thinking of?");
        count++;
        stop = check(guess_text);
    }
}
