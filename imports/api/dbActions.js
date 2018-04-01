import {Questionnaire, Question} from './database';
import { TypeOfQuestions } from "../constants/question-types";
import {
  createNumberQuestion, createOptionQuestion, createQuestionnaire, createQuestionnaireEntry, createStringQuestion,
  QuestionnaireSchema
} from "./schema";

const _createDBQuestionnaireEntry = (question) => {
  let createQuestionFunc;
  try {
    const questionType = question.type.toString().toLowerCase()
    switch (questionType) {
      case TypeOfQuestions.NUMBER:
        createQuestionFunc = createNumberQuestion;
        break;
      case TypeOfQuestions.STRING:
        createQuestionFunc = createStringQuestion;
        break;
      case TypeOfQuestions.OPTION:
        createQuestionFunc = createOptionQuestion;
        break;
      default:
        throw new Meteor.Error(`Bad question type: ${question.type}`);
    }

    const {
      optional,
      description,
      restriction,
    } = question;

    let createdQuestion = createQuestionFunc(optional, description, restriction);
    let questionId = Question.insert(createdQuestion);

    return createQuestionnaireEntry(questionType, questionId);

  } catch (err) {
    throw new Meteor.Error(`Create Questionnaire Entry failed: ${err.toString()}`);
  }
};

export const createDBQuestionnaireRaw = (q) => {
  let questionObjects = {};
  if (q.questionObjects && typeof q.questionObjects === 'object') {
    questionObjects = q.questionObjects;
  }

  delete q.questionObjects;
  delete q.questions;

  q.questions = [];

  for (let question of questionObjects) {
    q.questions.push(_createDBQuestionnaireEntry(question));
  }

  QuestionnaireSchema.validate(q);

  const questionnaireId = Questionnaire.insert(q);

  for (let question of q.questions) {
    Questions.update({ _id: question.entryId }, { $set: { questionnaireId } });
  }

  return q;
};

export const createDBQuestionnaireFromQuestions = (questionObjects, accessToken = {}) => {
  let q = createQuestionnaire([], accessToken);

  for (let question of questionObjects) {
    q.questions.push(_createDBQuestionnaireEntry(question));
  }

  QuestionnaireSchema.validate(q);

  const questionnaireId = Questionnaire.insert(q);

  for (let question of q.questions) {
    Questions.update({ _id: question.entryId }, { $set: { questionnaireId } });
  }

  return q;
};

export const addNewQuestion = (questionnaireId, question) => {
  let questionEntry = _createDBQuestionnaireEntry(question);

  Questionnaire.update({ _id: questionnaireId }, { $push: { questions: questionEntry } });
};

export const updateQuestion = (questionId, question) => {

};