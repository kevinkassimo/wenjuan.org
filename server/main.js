import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base';

import '/imports/api/user';
import '/imports/api/account';
import '/imports/api/email';
import '/imports/api/image';

import '/imports/api/database';
import '/imports/api/questionnaire';
import '/imports/api/schema';
import '/imports/api/operations';
import '/imports/api/draft'

if (Meteor.isServer) {

}

function insertTestUsers() {
  for (let i = 0; i < 10; i++) {
    let userObject = {
      username: `user${i}`,
      email: `email${i}@test.com`,
      password: `password${i}`,
      profile: {
        name: `name${i}`,
        bio: `bio${i}`,
        avatar: null,
        questionnaires: [],
      }
    }

    Accounts.createUser(userObject);
  }
}

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.remove({});
  insertTestUsers();
});
