import { Mongo } from 'meteor/mongo';

export const Questionnaire = new Mongo.Collection('Questionnaire');
export const Numeric = new Mongo.Collection('Numeric');
export const Text = new Mongo.Collection('Text');
export const Selection = new Mongo.Collection('Selection');
export const AnswerCollection = new Mongo.Collection('AnswerCollection');
export const AnswerSheet = new Mongo.Collection('AnswerSheet');
export const Answer = new Mongo.Collection('Answer');