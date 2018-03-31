import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionnaires } from './database';
import { QuestionnaireSchema } from './schema'

function createNewQuestionnaire(questions, root) {
  return {
    questions: questions,
    root: root
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'questionnaire.create': function create(questions, root) {
      check(questions, [String]);
      check(root, String);

      if (!questions || !root) {
        throw new Meteor.Error('There has to be at least one question');
      }

      const questionnaireObject = createNewQuestionnaire(questions, root);
      QuestionnaireSchema.validate(questionnaireObject);

      if (!QuestionnaireSchema.isValid()) {
        throw new Meteor.Error(QuestionnaireSchema.validationErrors());
      }

      return Questionnaires.insert(questionnaireObject);
    },

    'questionnaire.remove': function remove(id) {
      check(id, String);

      if (!id) {
        throw new Meteor.Error('Please specify the id of the questionnaire to delete');
      }

      return Questionnaires.remove({_id: Meteor.Collection.ObjectID(id)});
    },

    'questionnaire.fetchAll': function fetchAll() {
      return Questionnaires.find({}).fetch();
    }
  });
}