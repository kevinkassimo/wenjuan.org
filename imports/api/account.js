import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { isEmailAddress } from './util';

export const createNewProfileObject = function createNewProfileObject() {
  return {
    name: '(Name of set)',
    bio: '(Bio not set)',
    avatar: null,
    url: null,
    contacts: [],
    messages: [],
  }
};

export const createNewUserObject = function createNewUserObject(username, email, password) {
  return {
    username: username,
    email: email,
    password: password,
    profile: createNewProfileObject(),
  };
};

if (Meteor.isServer) {
  Meteor.methods({
    // Create a new user account
    'account.create': function create(username, email, password) {
      check(username, String);
      check(email, String);
      check(password, String);

      if (!username || !email || !password) {
        throw new Meteor.Error('Username, email or password cannot be empty');
      }

      if (!isEmailAddress(email)) {
        throw new Meteor.Error('Email must be of email format');
      }

      if (Meteor.users.findOne({ 'profile.url': url })) {
        throw new Meteor.Error('URL has been used by someone else');
      }

      const userObject = createNewUserObject(username, email, password);

      return Accounts.createUser(userObject);
    },

    'account.getAllUsers': function getAllUsers() {
      return Meteor.users.find({}).fetch();
    }
  });
}