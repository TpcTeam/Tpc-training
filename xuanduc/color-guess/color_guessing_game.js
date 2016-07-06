var colors = ["blue","cyan","gold","gray","green","magenta","orange","red","white","yellow"];
var targetIndex = Math.floor(Math.random()*10) + 1;
var target = colors[targetIndex];
var guessInput;

function doGame() {

  var correct = false;
  //alert(target);
  var count=0;

while (!correct){
  guessInput = prompt("I am thinking of one of these colors:"
  + "\n" + colors.join(", ") + "\n" + "What color am I thinking of?");
  correct = checkGuess();
  count++;
  }

  alert("Well played!!\nIt took you "+count+" guess to finish the game!");

}

function checkGuess() {

  if (colors.indexOf(guessInput) == -1)
  {
    alert("Sorry, I don't recognize your color.\nPlease try again.");
    return false;
  }

  if (guessInput < target)
  {
    alert("Sorry, your guess is not correct!\nHint: your color is alphabetically higher than mine.\nPlease try again.");
    return false;
  }

  if (guessInput > target)
  {
    alert("Sorry, your guess is not correct!\nHint: your color is alphabetically lower than mine.\nPlease try again.");
    return false;
  }

  return true;
}
