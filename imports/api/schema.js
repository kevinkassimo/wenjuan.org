import SimpleSchema from 'simpl-schema';
import { TypeOfQuestions, allTypesOfQuestions } from '../constants/question-types';

export const QuestionnaireSchema = new SimpleSchema({
  questions: {
    type: Array
  },
  'questions.$': String,

  accessTokens: {
    type: Array,
    optional: true,
  },
  'accessTokens.$': String,
});

export const createQuestionnaire = (questions, accessTokens) => {
  let ret = {
    questions,
    accessTokens,
  };

  QuestionnaireSchema.validate(ret);

  return ret;
};

export const QuestionSchema = new SimpleSchema({
  questionnaireId: {
    type: String,
    optional: true,
  },
  type: {
    type: String,
    allowedValues: allTypesOfQuestions,
  },
  optional: Boolean,
  description: String,
});

const NumberRestrictionSchema = new SimpleSchema({});
const NumberBodySchema = new SimpleSchema({
  restriction: NumberRestrictionSchema,
});
const NumberQuestionSchema = new SimpleSchema({
  body: NumberBodySchema,
});
NumberQuestionSchema.extend(QuestionSchema);

const StringRestrictionSchema = new SimpleSchema({});
const StringBodySchema = new SimpleSchema({
  restriction: StringRestrictionSchema,
});
const StringQuestionSchema = new SimpleSchema({
  body: StringBodySchema,
});
StringQuestionSchema.extend(QuestionSchema);

const OptionRestrictionSchema = new SimpleSchema({
  unique: {
    type: Boolean,
    optional: true,
  },
  minSelectCount: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  maxSelectCount: {
    type: SimpleSchema.Integer,
    optional: true
  },
});
const OptionBodySchema = new SimpleSchema({
  restriction: OptionRestrictionSchema,
  options: {
    type: Array,
    optional: true,
  },
  'options.$': String,
});
const OptionQuestionSchema = new SimpleSchema({
  body: OptionBodySchema,
});
OptionQuestionSchema.extend(QuestionSchema);

export { NumberQuestionSchema, StringQuestionSchema, OptionQuestionSchema };

export const validateQuestion = function(question) {
  let validator;
  switch (question.type.toString().toLowerCase()) {
    case TypeOfQuestions.NUMBER:
      validator = NumberQuestionSchema;
      break;
    case TypeOfQuestions.STRING:
      validator = StringQuestionSchema;
      break;
    case TypeOfQuestions.OPTION:
      validator = OptionQuestionSchema;
      break;
    default:
      return false
  }

  try {
    validator.validate(question);
    return true;
  } catch (_) {
    return false;
  }
};

export const createNumberQuestion = function(optional, description, restriction, questionnaireId = null) {
  const ret = {
    type: TypeOfQuestions.NUMBER,
    optional,
    description,
    body: {
      restriction,
    },
  };
  if (questionnaireId) {
    ret.questionnaireId = questionnaireId;
  }
  NumberQuestionSchema.validate(ret);
  return ret;
};

export const createStringQuestion = function(optional, description, restriction, questionnaireId = null) {
  const ret = {
    type: TypeOfQuestions.STRING,
    optional,
    description,
    body: {
      restriction,
    },
  };
  if (questionnaireId) {
    ret.questionnaireId = questionnaireId;
  }
  StringQuestionSchema.validate(ret);
  return ret;
};

export const createOptionQuestion = function(optional, description, options, restriction, questionnaireId = null) {
  const ret = {
    type: TypeOfQuestions.OPTION,
    optional,
    description,
    body: {
      options,
      restriction,
    },
  };
  if (questionnaireId) {
    ret.questionnaireId = questionnaireId;
  }
  OptionQuestionSchema.validate(ret);
  return ret;
};

export const DraftSchema = new SimpleSchema({
  questionObjects: {
    type: Array,
  },
  'questionObjects.$': {
    type: SimpleSchema.oneOf(NumberQuestionSchema, StringQuestionSchema, OptionQuestionSchema)
  },
});

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