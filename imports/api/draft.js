import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionnaire, Question, Draft } from './database';
import {createNumberQuestion, createOptionQuestion, QuestionnaireSchema, DraftSchema} from './schema';
import {TypeOfQuestions} from "../constants/question-types";

const createQuestionnaire = (d, accessTokens = []) => {
  let q = {
    questions: [],
    accessTokens,
  };

  let questionObjects = d.questionObjects || [];

  QuestionnaireSchema.validate(q);

  let questionnaireId = Questionnaire.insert(q);

  if (Meteor.userId()) {
    Meteor.users.update({ _id: Meteor.userId() }, { $push: { 'profile.questionnaires': questionnaireId } });
  } else {
    console.log('User not logged in');
  }

  let populatedQuestions = [];
  for (let question of questionObjects) {
    const {
      optional,
      description,
      type,
      body,
    } = question;

    const {
      options, // could be undefined
      restriction,
    } = body;

    let createdQuestion;
    switch (type.toString().toLowerCase()) {
      case TypeOfQuestions.NUMBER:
        createdQuestion = createNumberQuestion(optional, description, restriction, questionnaireId);
        break;
      case TypeOfQuestions.STRING:
        createdQuestion = createStringQuestion(optional, description, restriction, questionnaireId);
        break;
      case TypeOfQuestions.OPTION:
        createdQuestion = createOptionQuestion(optional, description, options, restriction, questionnaireId);
        break;
      default:
        throw new Meteor.Error('invalid type');
    }

    let questionId = Question.insert(createdQuestion);
    populatedQuestions.push(questionId);
  }

  Questionnaire.update({ _id: questionnaireId }, { $set: { questions: populatedQuestions } });

  return questionnaireId;
};


if (Meteor.isServer) {
  Meteor.methods({
    'draft.save': function save(_id, draft) {
      check(draft, Object);
      _id = _id ? _id.toString() : null;

      try {
        DraftSchema.validate(draft);
      } catch (e) {
        throw new Meteor.Error(e.toString());
      }

      if (!_id) {
        _id = Draft.insert(draft);
      } else {
        Draft.update({ _id }, { $set: { questionObjects: draft.questionObjects } });
      }
      return _id;
    },
    'draft.publishById': function publish(_id, accessTokens = []) {
      check(_id, String);

      if (!Meteor.userId()) {
        throw new Meteor.Error('Cannot publish draft: not logged in');
      }

      const draft = Draft.findOne({ _id });
      if (!draft) {
        throw new Meteor.Error(`Cannot find Draft by id ${_id}`);
      }

      return createQuestionnaire(draft, accessTokens); // _id of created Questionnaire
    },
    'draft.publish': function publish(draft) {
      check(draft, Object);

      if (!Meteor.userId()) {
        throw new Meteor.Error('Cannot publish draft: not logged in');
      }

      return createQuestionnaire(draft); // _id of created Questionnaire
    },
    'draft.remove': function remove(_id) {
      check(_id, String);
      return Draft.remove({ _id });
    },
    'draft.find': function find(_id) {
      check(_id, String);
      return Draft.findOne({ _id });
    },
  });
}