var BasicCard = function(front, back) {
  this.front = front;
  this.back = back;

};
BasicCard.prototype.checkAnswer = function(answer) {
  //  this.question.push(new Question(question,answer));
  var isRight = [false, "Wrong!, the correct answer was -"+this.back+"-"];
  if (answer === this.back) {
    isRight = [true, "Correct!"];
  }
  return isRight;
}
module.exports = BasicCard;
