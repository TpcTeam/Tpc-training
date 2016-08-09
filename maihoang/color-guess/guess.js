function check(number) {
    if (number == random_number) {
        alert("Congrats my number is " + number + "\nYou guess" + count + "times\nYou're fucking noobs");
        return true;
    }
    if (isNaN(number)) {
        alert("Please enter a number!!!");
        return false;
    }
    if (number > 100 || number < 1) {
        alert("Please enter a number in range 1 to 100!!!");
        return false;
    }
    if (number < random_number) {
        alert("Too small, bro");
        return false;
    }
    if (number > random_number) {
        alert("Too large, bro");
        return false;
    }
}

function play() {
    random_number = Math.floor(Math.random() * 100) + 1;
    stop = false;
    count = 0;
    while (!stop) {
        guess_number = prompt("Please enter a number from 1 to 100:");
        count++;
        number = parseInt(guess_number);
        stop = check(number);
    }
}
