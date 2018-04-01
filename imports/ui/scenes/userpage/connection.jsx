import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {TypeOfQuestions} from "../../../constants/question-types";

export default class Dbconnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ""
    };
  }

  componentDidMount() {
    Meteor.call('draft.save', null, {
      questionObjects: [{
        type: TypeOfQuestions.NUMBER,
        optional: false,
        description: 'This is a test for number',
        body: {
          restriction: {}
        },
      }],
    }, (e, id) => {
      if (e) {
        console.log(e);
        return;
      }
      console.log(`OK: _id of draft: ${id}`);

      Meteor.call('draft.publishById', id, [ 'token' ], (e1, qid) => {
        if (e1) {
          console.log(e1);
          return;
        }
        console.log(`OK: _id of published questionnaire: ${qid}`);

        Meteor.call('questionnaire.download', qid, 'token', (e2, result) => {
          if (e2) {
            console.log(e2);
            return;
          }
          console.log(`OK: questionnaire =`, result);
        })
      });
    });

    /*
    Meteor.call('operations.insert', 'Question', 'numeric', false, 'hi','none', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        this.setState({id: result});
        s2();
      }
    });

    let s2 = () => Meteor.call('operations.find', 'Question', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        s3();
      }
    });

    let s3 = () => Meteor.call('operations.update', 'Question', {_id: this.state.id}, {$set: {type: 'string'}}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        s4();
      }
    });

    let s4 = () => Meteor.call('operations.findOne', 'Question', {_id: this.state.id}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        s5();
      }
    });

    let s5 = () => Meteor.call('operations.remove', 'Question', {_id: this.state.id}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        s6();
      }
    });

    let s6 = () => Meteor.call('operations.fetchAll', 'Question', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    */
  }

  render() {
    return (
      <div>
        {this.state.id}
      </div>
    );
  }
}