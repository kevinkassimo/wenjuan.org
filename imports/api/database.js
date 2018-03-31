import { Mongo } from 'meteor/mongo';

export const Questionnaire = new Mongo.Collection('Questionnaire');
export const Question = new Mongo.Collection('Question');
export const AnswerCollection = new Mongo.Collection('AnswerCollection');
export const AnswerSheet = new Mongo.Collection('AnswerSheet');
export const Answer = new Mongo.Collection('Answer');