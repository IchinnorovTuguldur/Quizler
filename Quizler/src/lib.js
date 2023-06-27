import fs from "fs";
import { prompt } from "inquirer";

export const chooseRandom = (array, numItems) => {
  if (array.length <= 1) {
    return array;
  }
  if (numItems > array.length) {
    numItems = Math.floor(Math.random() * array.length);
  }

  let newArr = [];
  for (let i = 0; i < numItems; i++) {
    let randomItem = Math.floor(Math.random() * array.length) + 1;
    if (newArr.indexOf(newArr[randomItem]) === -1) {
      newArr.push(array[i]);
    }
  }
  return newArr;
};

export const createPrompt = (props) => {
  const { numQuestions = 1, numChoices = 2 } = props || {
    numQuestions: 1,
    numChoices: 2,
  };
  const questions = [];
  for (let questionNum = 1; questionNum <= numQuestions; questionNum++) {
    questions.push({
      type: "input",
      name: `question-${questionNum}`,
      message: `Enter question ${questionNum}`,
    });
    for (let choiceNum = 1; choiceNum <= numChoices; choiceNum++) {
      questions.push({
        type: "input",
        name: `question-${questionNum}-choice-${choiceNum}`,
        message: `Enter answer choice ${choiceNum} for question ${questionNum}`,
      });
    }
  }
  return questions;
};

export const createQuestions = (props) => {
  if (props === undefined || props === null || props === {}) {
    return [];
  }

  let createQuestions = [];
  let currentQuestion = {
    type: "list",
    name: Object.keys(props)[0],
    message: Object.values(props)[0],
    choices: [],
  };
  Object.keys(props).forEach((key) => {
    if (key === currentQuestion.name) {
      return;
    }
    if (key.includes(`${currentQuestion.name}-choice`)) {
      currentQuestion.choices.push(props[key]);
    } else {
      createQuestions.push(currentQuestion);
      currentQuestion = {
        ...currentQuestion,
        name: key,
        message: props[key],
        choices: [],
      };
    }
  });
  if (Object.keys(props).length > 0) {
    createQuestions.push(currentQuestion);
  }
  return createQuestions;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
