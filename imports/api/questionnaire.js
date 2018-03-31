import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionnaires } from './database';

export const createNewQuestionnaire = function createNewQuestionnaire(questions, root) {
  return {
    questions: questions,
    root: root
  }
};

