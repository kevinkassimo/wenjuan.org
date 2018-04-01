import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionnaire, Question } from './database';
import { QuestionnaireSchema } from './schema';
import { inspect } from 'util';

if (Meteor.isServer) {
  Meteor.methods({
    'questionnaire.creatorAuth': function auth(_id) {
      check(_id, String);

      const currentUser = Meteor.user();
      if (!currentUser) {
        return false; // not logged in
      }

      const profile = currentUser.profile;
      if (!profile || !profile.questionnaires) {
        return false; // bad profile
      }

      return profile.questionnaires.includes(_id);
    },
    'questionnaire.accessAuth': function auth(_id, accessToken) {
      check(_id, String);
      check(accessToken, String);

      const q = Questionnaire.findOne({ _id });
      if (!q) return false;

      return q.accessTokens.includes(accessToken);
    },

    'questionnaire.auth': function auth(_id, accessToken = null) {
      check(_id, String);
      accessToken = accessToken ? accessToken.toString() : null;

      if (Meteor.call('questionnaire.creatorAuth', _id)) {
        return true;
      }

      return accessToken && Meteor.call('questionnaire.accessAuth', _id, accessToken);
    },

    'questionnaire.create': function create(questions) {
      check(questions, [String]);

      if (!questions) {
        throw new Meteor.Error('There has to be at least one question');
      }

      const questionnaireObject = createNewQuestionnaire(questions, root);
      QuestionnaireSchema.validate(questionnaireObject);

      return Questionnaire.insert(questionnaireObject);
    },

    'questionnaire.remove': function remove(id) {
      check(id, String);
      if (!Meteor.call('questionnaire.creatorAuth', id)) {
        throw new Meteor.Error('not authorized');
      }

      return Questionnaire.remove({_id: id});
    },

    'questionnaire.download': function prepare(_id, accessToken = null) {
      check(_id, String);
      accessToken = accessToken ? accessToken.toString() : null;

      if (!Meteor.call('questionnaire.auth', _id, accessToken)) {
        throw new Meteor.Error('not authorized');
      }

      const q = Questionnaire.findOne({ _id });
      if (!q) {
        throw new Meteor.Error('no corresponding questionnaire found');
      }

      // Populate actual questions inside of prop 'questionObjects'
      q.questionObjects = [];

      for (let questionId of q.questions) {
        const oneQuestion = Question.findOne({ _id: questionId });
        if (oneQuestion) {
          q.questionObjects.push(oneQuestion);
        }
      }

      return q;
    },
  });
}