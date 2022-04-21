import c from '../config';

let questions = c.config.questions;
let questionsStack = [];
let currentIndex = -1;

export function init() {
  if (questions.length === 0) {
    return;
  }

  questions[0].isFirst = true;
  questions[questions.length - 1].isLast = true;

  questions.forEach(q => {
    if (q.optionalNext === undefined || q.optionalNext === null) {
      q.nextSelector = _ => q.normalNext;
    }
    else {
      q.nextSelector = (answer) => {
        if (answer || answer === undefined) {
          return q.normalNext;
        } else {
          return q.optionalNext;
        }
      }
    }
  });
}

export function getTotalAmount() {
  if (questions.length === 0)
    return 0;

  return questions[questions.length - 1].questionNumber;
}

export function getNextQuestion(previousAnswer) {
  if (questions.length === 0)
    return null;

  if (currentIndex === -1) {
    return questions[++currentIndex]
  }
  else {
    questionsStack.push(questions[currentIndex])

    const nextIndex = questions[currentIndex].nextSelector(previousAnswer);
    currentIndex = nextIndex;

    if (currentIndex === null)
      return null;

    return questions[currentIndex];
  }
}

export function getFirstQuestion() {
  if (questions.length === 0) {
    return null;
  }

  currentIndex = 0;
  questionsStack = [];
  return questions[0];
}

export function getPreviousQuestion() {
  if (questions.length === 0) {
    return null;
  }

  var previousQuestion = questionsStack.pop();
  currentIndex = previousQuestion.id;
  return previousQuestion;
}