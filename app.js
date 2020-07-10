"use strict";


const STATE_WELCOME = 0;
const STATE_UNANSWERED = 1;
const STATE_RIGHT = 2;
const STATE_WRONG = 3;
const STATE_RESULTS = 4



const createQuestion = (question, answers, rightAnswer)=>{
  return{
    question,
    answers,
    rightAnswer,
   }
}
const store = {

 questions:[ createQuestion(
    
     'Where did Katara meet Aang?',
       [
        'South Pole',
        'Kyoshi Island',
        'Whale Tail Island',
        'Ba Sing Se',
       ],
       'South Pole',
    ),
   createQuestion(
    
     'Which teacher helped Aang master fire bending?',
       [
        'Jeong Jeong',
        'Iroh',
        'The Twin Dragons',
        'Zuko',
       ],
       'Zuko',
    ),
 createQuestion(
    
     'Who taught Toph to earth bend?',
       [
        'Master Yu',
        'The Badger Moles',
        'Xin Fu',
        'King Bumi',
       ],
       'The Badger Moles',
    ),
   createQuestion(
    
     'In the Avatar cycle, What element follows water?',
       [
        'Earth',
        'Fire',
        'Air',
        'Lightning',
       ],
       'Earth',
    ),
    createQuestion(
    
     "Why couldn't Iroh teach Zuko to create lightning?",
       [
        'Zuko could not create lightning',
        "Zuko's heart was not pure enough to use lightning",
        "Zuko's inner turmoil made him too tense to create lightning",
        'Iroh did not know how to use lightning',
       ],
       "Zuko's inner turmoil made him too tense to create lightning",
    ),
      ],
  currentState: STATE_WELCOME,
  currentQuestionNumber: 0,
  numberRight: 0,
  numberWrong: 0,
  currentAnswer: 0,
};



const render = () =>{
  switch(store.currentState){
    case STATE_WELCOME:
      //replace main with a start button
    break;
    case STATE_UNANSWERED:
      //replace main with a question and four answers, add question header, and hide the h1
    break;
    case STATE_RIGHT:
      //color green  and disable the answer buttons and add a next button
    break;
    case STATE_WRONG:
      //color red and disable the answer buttons and add a next button
    break;
    case STATE_RESULTS:
      //replace main with a results message and add a try again button
    break
  }
}

const generateQuestionHTML = (questionText, answerTexts, ) => {
     return `<p>${questionText}</p>
     <div>
         <button>${answerTexts[0]}</button>
         <button>${answerTexts[0]}</button>
         <button>${answerTexts[0]}</button>
         <button>${answerTexts[0]}</button>
     </div>`
}

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)