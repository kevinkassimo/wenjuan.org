import SimpleSchema from 'simpl-schema';

export const QuestionnaireSchema = new SimpleSchema({
  questions: {
    type: Array
  },
  'questions.$': String, // _id of <Question>
  root: String
});

export const QuestionnaireCreation = function(questions, root) {
  return {
    questions: questions,
    root: root
  }
};

export const QuestionSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['numeric', 'string', 'selection']
  },
  optional: Boolean,
  description: String,
  restriction: String
});

export const QuestionCreation = function(type, optional, desc, restriction) {
  return {
    type: type,
    optional: optional,
    description: desc,
    restriction: restriction
  }
};

export const AnswerCollectionSchema = new SimpleSchema({
  responses: {
    type: Array
  },
  'responses.$': String
});

export const AnswerCollectionCreation = function(responses) {
  return {
    responses: responses
  }
};

export const AnswerSheetSchema = new SimpleSchema({
  questionnaire: String,
  answers: {
    type: Array
  },
  'answers.$': String
});

export const AnswerSheetCreation = function(questionnaire, answers) {
  return {
    questionnaire: questionnaire,
    answers: answers
  }
};

export const AnswerSchema = new SimpleSchema({
  question: String,
  payload: Object
});

export const AnswerCreation = function(question, payload) {
  return {
    question: question,
    payload: payload
  }
};