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
  wrongAnswerIndex: undefined
};

const generateResultsHtml = () => '<button class="start-button">Try Again</button>';

const generateResultsHeaderHtml = (numberRight, numberWrong ) => {
  let total= numberRight + numberWrong;
  return `  <h2>Your Results</h2>
  <p>You scored ${100*numberRight/total}% (${numberRight} out of ${total})</p>`;
};

const generateWelcomeHtml = () => '<button class="start-button">Start</button>';

const generateQuestionHeaderHtml = (currentQuestionNumber, questionCount, numberRight, numberWrong) => `
  <span>${currentQuestionNumber + 1} of ${questionCount}</span>
  <span>${numberWrong} wrong ${numberRight} right</span>
`;

const generateQuestionHtml = (questionText, answerTexts, rightIndex, wrongIndex) => {
  let classNames = [ '', '', '', '' ];
  let answered = (rightIndex !== undefined);  
  let answersEnabled = answered ? 'disabled' : '';
  let nextEnabled = answered ? '' : 'disabled';
  if(answered) {
    classNames[rightIndex] = "right-answer";
  }
  if(wrongIndex !== undefined)
    classNames[wrongIndex] = "wrong-answer";
  return `<p>${questionText}<button id="next-button" ${nextEnabled}>Next →</button></p>
     <form id="q-form">
         <input class="${classNames[0]}" type="submit" ${answersEnabled} value="${answerTexts[0]}"></input>
         <input class="${classNames[1]}" type="submit" ${answersEnabled} value="${answerTexts[1]}"></input>
         <input class="${classNames[2]}" type="submit" ${answersEnabled} value="${answerTexts[2]}"></input>
         <input class="${classNames[3]}" type="submit" ${answersEnabled} value="${answerTexts[3]}"></input>
     </form>`;
};


const $bodyElement = $('body'), $headerElement = $('header'), $mainElement = $('main');

const render = () => {
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
    case STATE_ANSWERED: {
      let q = store.questions[store.currentQuestionNumber];
      let rightIndex = q.answers.indexOf(q.rightAnswer);    
      $headerElement.html(
        generateQuestionHeaderHtml(store.currentQuestionNumber, store.questions.length, store.numberRight, store.numberWrong));
      $mainElement.html(generateQuestionHtml(q.question, q.answers, rightIndex, store.wrongAnswerIndex));
      break;
    };
    case STATE_RESULTS:
      $bodyElement.attr('class', 'results-screen');
      $headerElement.attr('class', '');
      $headerElement.html(generateResultsHeaderHtml(store.numberRight, store.numberWrong));
      $mainElement.html(generateResultsHtml());
      break; 
  }
};

const onStart = e => {
  store.questions.sort(() => (Math.random() < 0.5) ? -1 : 1);
  store.currentQuestionNumber = 0;
  store.numberRight = store.numberWrong = 0;
  store.currentState = STATE_UNANSWERED;
  render();
};

const onAnswerSelected = e => {
  let selectedAnswer =$(":focus").val();
  let q = store.questions[store.currentQuestionNumber];
  if(q.rightAnswer === selectedAnswer) {
    store.numberRight++;
    store.wrongAnswerIndex = undefined;
  } else {
    store.numberWrong++;
    store.wrongAnswerIndex = q.answers.indexOf(selectedAnswer);
  }
  store.currentState = STATE_ANSWERED;
  render();
};

const onNextQuestion = e => {
  if(++store.currentQuestionNumber >= store.questions.length){
               store.currentState = STATE_RESULTS
  }
  else store.currentState = STATE_UNANSWERED;
  render()
};

$(() => {
  render();
  $mainElement.on('click', '.start-button', onStart);
  $mainElement.on('submit', '#q-form', e => {e.preventDefault(); onAnswerSelected(e)});
  $mainElement.on('click', '#next-button', onNextQuestion);
});