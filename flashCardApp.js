var inquirer = require("inquirer");
 var BasicCard = require("./basicCard.js");
 var ClozeCard= require("./clozeCard.js");
//
var rightCount;
var wrongCount;
var cardArray=[];
var questions=[new ClozeCard("In javascript the this keyword can be used to reference a parent or the acted upon element.","this"),new ClozeCard("In javascript the splice method can add or delete elements in an array", "splice method")];
console.log("WELCOME- this is a quiz and flashcard making app!");
// var questions=[{q:"In javascript the this keyword can be used to reference a parent or the acted upon element.",a:"this"},
// {q:"In javascript the splice method can add or delete elements in an array", a:"splice method"}];
// console.log("WELCOME- this is a quiz and flashcard making app!");
initialMenu();
function initialMenu() {

     inquirer.prompt([
  {
  type: "list",
  message: "What would you like to do?",
  choices: ["Use premade javascript flash cards", "Make flashcards", "Quit"],
  name: "initialAction"
}
]).then(function(answer) {
  switch (answer.initialAction) {
          case "Use premade javascript flash cards":
            count=0;
            rightCount=0;
            wrongCount=0;
            askQuestions();
            break;

          case "Make flashcards":
            makeFlashcards();
            break;

            case "Quit":
              console.log("Thank you! Have a good day!");
              break;
        }
    });
//
//   }
//   else {
//     for (var x = 0; x < programmerArray.length; x++) {
//       programmerArray[x].printInfo();
//     }
//   }
 };



var count;

function askQuestions(){

if(count<questions.length){
  // var thisCard=new ClozeCard(questions[count].q, questions[count].a);
  // cardArray.push(thisCard);
  //console.log(thisCard.partial);
  inquirer.prompt([
    {
      name: "answerInput",
      message: questions[count].partial+"---->"
    }

  ]).then(function(answers) {
    var message=questions[count].checkAnswer(answers.answerInput);
    console.log(message[1]);
    if(message[0]){
      rightCount ++}
    else{wrongCount ++};
    count++;
    askQuestions();
  });
}
else {
  console.log("You had "+rightCount+" right answers and "+wrongCount+ " wrong answers! \nWhat would you like to do now?");
  initialMenu();
}
}

var moreQuestions=true;
function makeFlashcards() {
    console.log("These will be fill in the blank flash cards. You will write a statement and then identify the words to omit!");
    inquirer.prompt([
      {
        name: "category",
        message: "What is the category of your quiz?"
      }
    ]).then(function(answers) {

      console.log(answers.category);
      newQuestion();
    });

    function newQuestion(){
    inquirer.prompt([
      {
        name: "question",
        message: "Write a statement"
      }, {
        name: "cloze",
        message: "Which word/words shall we omit?"
      }
    ]).then(function(answers) {

      var thisCard = new ClozeCard(answers.question,
        answers.cloze);
      // pushes newguy object into our array
      cardArray.push(thisCard);
      inquirer.prompt([
        {
          type:"list",
          message: "Would you like to make more flashcards?",
          choices: ["Yes","No"],
          name: "moreQuestions"
        }
      ]).then(function(answer) {
          if(answer.moreQuestions==="No"){
            console.log("no more questions")
            for (var x = 0; x < cardArray.length; x++) {
              console.log(cardArray[x].fullText);
              console.log(cardArray[x].partial);
              console.log(cardArray[x].cloze);
            }
            inquirer.prompt([
              {
                type:"list",
                message: "Would you like a quiz with your questions?",
                choices: ["Yes","No"],
                name: "takeQuiz"
              }
            ]).then(function(answer2) {
              if(answer2.takeQuiz==="Yes"){
                console.log("redirect to quiz function")
              }
              else{
                initialMenu();
              }
            });
          }
          else(newQuestion());
      });

    });

  }

};
