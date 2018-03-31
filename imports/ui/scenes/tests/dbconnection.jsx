import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Dbconnection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: 0
    };
  }

  componentDidMount() {
    Meteor.call('questionnaire.create', ["1"], "1", (err, result) => {
      if (err) {
        alert('Error creating questionnaire');
        return;
      } else {
        this.setState({res: result});
      }
    })
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}