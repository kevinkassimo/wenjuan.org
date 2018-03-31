import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import * as DB from './database';
import * as Schema from './schema';

function checkDB(db) {
  check(db, String);
  allDBs = ['Questionnaire', 'Numeric', 'Text', 'Selection', 'AnswerCollection', 'AnswerSheet', 'Answer'];
  if (!allDBs.includes(db)) {
    throw new Meteor.Error(`specified DB ${db} does not exist.`);
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    'operations.insert': function insert(db, ...params) {
      checkDB(db);

      const newObject = Schema[db+'Creation'](...params);
      Schema[db+'Schema'].validate(newObject);

      return DB[db].insert(newObject);
    },

    'operations.remove': function remove(db, sel) {
      checkDB(db);

      if (!sel) {
        throw new Meteor.Error('You can not remove everything from this command');
      } else {
        return DB[db].remove(sel);
      }
    },

    'operations.update': function update(db, sel, mod) {
      checkDB(db);
      return DB[db].update(sel, mod, { multi: true });
    },

    'operations.findOne': function findOne(db, sel) {
      checkDB(db);
      if (sel) {
        return DB[db].findOne(sel);
      } else {
        return DB[db].findOne();
      }
    },

    'operations.find': function find(db, sel) {
      checkDB(db);
      if (sel) {
        return DB[db].find(sel).fetch();
      } else {
        return DB[db].find().fetch();
      }
    },

    'operations.fetchAll': function fetchAll(db) {
      checkDB(db);
      return DB[db].find({}).fetch();
    }
  });
}
