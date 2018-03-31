import SimpleSchema from 'simpl-schema';

export const QuestionnaireSchema = new SimpleSchema({
  questions: {
    type: Array
  },
  'questions.$': String, // _id of <Question>
  root: String
});

export const QuestionSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['numeric', 'string', 'selection']
  },
  optional: Boolean,
  description: String,
  restriction: String
});

export const AnswerCollectionSchema = new SimpleSchema({
  responses: {
    type: Array
  },
  'responses.$': String
});

export const AnswerSheetSchema = new SimpleSchema({
  questionnaire: String,
  answers: {
    type: Array
  },
  'answers.$': String
});

export AnswerSchema = new SimpleSchema({
      question: String,    payload: Object
});