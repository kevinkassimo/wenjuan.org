import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionnaire, Question } from './database';
import { QuestionnaireSchema } from './schema';
import { createDBQuestionnaireFromQuestions } from './dbActions';

if (Meteor.isServer) {
  Meteor.methods({
    'question.insert': function insert(questionnaireId, question) {
      check(questionnaireId, String);
      check(question, Object);


    }


    'questionnaire.create': function create(questions, root) {
      check(questions, [String]);
      check(root, String);

      if (!questions || !root) {
        throw new Meteor.Error('There has to be at least one question');
      }

      const questionnaireObject = createNewQuestionnaire(questions, root);
      QuestionnaireSchema.validate(questionnaireObject);

      return Questionnaires.insert(questionnaireObject);
    },

    'questionnaire.remove': function remove(id) {
      check(id, String);

      if (!id) {
        throw new Meteor.Error('Please specify the id of the questionnaire to delete');
      }

      return Questionnaires.remove({_id: id});
    },

    'questionnaire.update': function update(sel, mod) {
      return Questionnaires.update(sel, mod, { multi: true });
    },

    'questionnaire.findOne': function findOne(sel) {
      if (sel) {
        return Questionnaires.findOne(sel);
      } else {
        return Questionnaires.findOne();
      }
    },

    'questionnaire.find': function find(sel) {
      if (sel) {
        return Questionnaires.find(sel).fetch();
      } else {
        return Questionnaires.find().fetch();
      }
    },

    'questionnaire.fetchAll': function fetchAll() {
      return Questionnaires.find({}).fetch();
    },

    'questionnaire.upload': function upload(questions, id = null) {
      if (!id) {

      }

      let


        let questionObjects = {};
      if (q.questionObjects) {
        questionObjects = q.questionObjects;
        delete q.questionObjects; // remove this field so that it would not interfere with schema validation
      }

      try {
        QuestionnaireSchema.validate(q);
      } catch (e) {
        throw new Meteor.Error(`Questionnaire failed to validate: ${e.toString()}`);
      }

      Questionnaires.insert()
    },

    'questionnaire.download': function prepare(id, accessToken) {
      check(id, String);

      const currentUser = Meteor.user();
      const profile = currentUser.profile;

      // check if this questionnaire is actually belonging to the user
      if (!(id in profile.questionnaire) && !profile.accessTokens.includes(accessToken)) {
        throw new Meteor.Error('not authorized');
      }

      const q = Questionnaires.findOne({ _id: id });
      if (!q) {
        throw new Meteor.Error('no corresponding questionnaire found');
      }

      // Populate actual questions inside of prop 'questionObjects'
      q.questionObjects = {};

      for (let key of Object.getOwnPropertyNames(q.questions)) {
        const oneQuestion = Question.findOne({ _id: q.questions[key] });
        if (oneQuestion) {
          q.questionObjects[key] = oneQuestion;
        }
      }

      return q;
    },
  });
}