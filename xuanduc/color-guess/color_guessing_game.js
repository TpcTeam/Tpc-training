var colors = ["blue","cyan","gold","gray","green","magenta","orange","red","white","yellow"];
var target_index = Math.floor(Math.random()*10) + 1;
var target = colors[target_index];
var guess_input;

function do_game() {

  var correct = false;
  //alert(target);
  var count=0;

while (!correct)
  {
  guess_input = prompt("I am thinking of one of these colors:"
  + "\n" + colors.join(", ") + "\n" + "What color am I thinking of?");
  correct = check_guess();
  count++;
  }

  alert("Well played!!\nIt took you "+count+" guess to finish the game!");

}

function check_guess() {

  if (colors.indexOf(guess_input) == -1)
  {
    alert("Sorry, I don't recognize your color.\nPlease try again.");
    return false;
  }

  if (guess_input < target)
  {
    alert("Sorry, your guess is not correct!\nHint: your color is alphabetically higher than mine.\nPlease try again.");
    return false;
  }

  if (guess_input > target)
  {
    alert("Sorry, your guess is not correct!\nHint: your color is alphabetically lower than mine.\nPlease try again.");
    return false;
  }

  return true;
}
