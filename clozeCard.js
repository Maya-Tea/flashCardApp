//var ClozeQuestion = require("./clozeQuestions.js");
var ClozeCard = function(text, cloze) {
  this.fullText = text;
  this.cloze = cloze;
  //this.questions = [];
  //this.partial = function(){
  var textArray = text.split(" ");
  //return textArray;
  var partialText = "hi"
  var inside = false;
  var clozeArray = cloze.split(" ");
  var numToSplice = clozeArray.length;
  for (var i = 0; i < textArray.length; i++) {
    if (textArray[i] === clozeArray[0]) {
      //var k=i;
      for (var j = 0; j < clozeArray.length; ++j) {

        if (textArray[(i + j)] !== clozeArray[j]) {
          throw '"' + cloze + '" is not inside "' + text + '"';
        }
        //  k++;
      }
      textArray.splice(i, numToSplice, " ... ");
      var partialText = textArray.join(" ");
      var inside = true;
    }
  }
  if (!inside) {
    throw '"' + cloze + '" is not inside "' + text + '"';
  }
  this.partial = partialText;
  // return partialText;
  //}
};
ClozeCard.prototype.checkAnswer = function(answer) {
  //  this.question.push(new Question(question,answer));
  var isRight = [false, "Wrong!, the correct answer was -"+this.cloze+"-"];
  if (answer === this.cloze) {
    isRight = [true, "Correct!"];
  }
  return isRight;
}
module.exports = ClozeCard;
