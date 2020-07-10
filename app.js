"use strict";

const STATE_WELCOME = 0;
const STATE_UNANSWERED = 1;
const STATE_ANSWERED = 2;
const STATE_RESULTS = 3;

const createQuestion = (question, answers, rightAnswer)=>{
  return{
    question,
    answers,
    rightAnswer,
  };
};

const store = {
  questions:[
    createQuestion(
      'Where did Katara meet Aang?',
      [
        'South Pole',
        'Kyoshi Island',
        'Whale Tail Island',
        'Ba Sing Se',
      ],
      'South Pole'
    ),
    createQuestion(    
      'Which teacher helped Aang master fire bending?',
      [
        'Jeong Jeong',
        'Iroh',
        'The Twin Dragons',
        'Zuko',
      ],
      'Zuko'
    ),
    createQuestion(    
      'Who taught Toph to earth bend?',
      [
        'Master Yu',
        'The Badger Moles',
        'Xin Fu',
        'King Bumi',
      ],
      'The Badger Moles'
    ),
    createQuestion(
      'In the Avatar cycle, What element follows water?',
      [
        'Earth',
        'Fire',
        'Air',
        'Lightning',
      ],
      'Earth'
    ),
    createQuestion(
      "Why couldn't Iroh teach Zuko to create lightning?",
      [
        'Zuko could not create lightning',
        "Zuko's heart was not pure enough to use lightning",
        "Zuko's inner turmoil made him too tense to create lightning",
        'Iroh did not know how to use lightning',
      ],
      "Zuko's inner turmoil made him too tense to create lightning"
    ),
  ],
  currentState: STATE_WELCOME,
  currentQuestionNumber: 0,
  numberRight: 0,
  numberWrong: 0,
  currentAnswer: 0,
};

const generateWelcomeHtml = () => '<button class="start-button">Start</button>';

const generateQuestionHeaderHtml = (currentQuestionNumber, questionCount, numberRight, numberWrong) => `
  <span>${currentQuestionNumber + 1} of ${questionCount}</span>
  <span>${numberWrong} wrong ${numberRight} right</span>
`;

const generateQuestionHtml = (questionText, answerTexts, rightIndex, wrongIndex) => {
  let classNames = [ '', '', '', '' ];
  if(rightIndex)
    classNames[rightIndex] = "right-answer";
  if(wrongIndex)
    classNames[wrongIndex] = "wrong-answer";
  return `<p>${questionText}${rightIndex ? '<button id="next-button">Next --></button>' : ''}</p>
     <form id="q-form">
         <input class="${classNames[0]}" type="submit" value="${answerTexts[0]}"></input>
         <input class="${classNames[1]}" type="submit" value="${answerTexts[1]}"></input>
         <input class="${classNames[2]}" type="submit" value="${answerTexts[2]}"></input>
         <input class="${classNames[3]}" type="submit" value="${answerTexts[3]}"></input>
     </form>`;
};

const $bodyElement = $('body'), $headerElement = $('header'), $mainElement = $('main');

const render = () =>{
  switch(store.currentState){
    case STATE_WELCOME:
      $bodyElement.attr('class', 'welcome-screen');
      $mainElement.html(generateWelcomeHtml());
      break;
    case STATE_UNANSWERED:
      $bodyElement.attr('class', 'question-screen');
      let q = store.questions[store.currentQuestionNumber];
      $headerElement.attr('class', 'question-header');
      $headerElement.html(
        generateQuestionHeaderHtml(store.currentQuestionNumber, store.questions.length, store.numberRight, store.numberWrong));
      $mainElement.html(generateQuestionHtml(q.question, q.answers));
      break;
    case STATE_ANSWERED:
      //color and disable the answer buttons and add a next button
      break;
    case STATE_RESULTS:
      //replace main with a results message and add a try again button
      break; 

  }
};

const onStart = e => {
  console.log("onStart!");
  store.currentQuestionNumber = 0;
  store.numberRight = store.numberWrong = 0;
  store.currentState = STATE_UNANSWERED;
  render();
};

const onAnswerSelected = e => {
  // check whether the answer is right and move to 
};

const onNextQuestion = e => {
  // move to next question and unanswered state
};

$(() => {
  render();
  $mainElement.on('click', '.start-button', onStart);
  $mainElement.on('submit', '.q-form', onAnswerSelected);
  $mainElement.on('click', '#next-button', onNextQuestion);
});