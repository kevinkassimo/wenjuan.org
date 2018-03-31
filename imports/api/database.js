import { Mongo } from 'meteor/mongo';

export const Questionnaires = new Mongo.Collection('Questionnaire');
export const Questions = new Mongo.Collection('Question');
export const AnswerCollections = new Mongo.Collection('AnswerCollection');
export const AnswerSheets = new Mongo.Collection('AnswerSheet');
export const Answers = new Mongo.Collection('Answer');