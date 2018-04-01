import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Button} from 'reactstrap';
import {MultiSelection, Selection, TextField} from '/imports/ui/scenes/questionnaire/questionModel.js';


class Number extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField type="text" title={this.props.value} notifyParent={() => console.log('Notified')} onStateChange={({ target }) => this.props.onChange(target.value)} />
    );
  }
}

class Text extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField type="paragraph" title={this.props.value} notifyParent={() => console.log('Notified')} onStateChange={({ target }) => this.props.onChange(target.value)} />
    );
  }
}

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Selection title={this.props.value} notifyParent={() => console.log('Notified')} onStateChange={({ target }) => this.props.onChange(target.value)} choices={this.props.choices}/>
    );
  }
}

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: {
        questionObjects: []
      },
      //index: -1,
    };
  }

  componentWillMount() {
    const {
      _id,
    } = this.props.match.params;

    accessToken = "token";

    if (!_id) {
      alert('cannot fetch questionnaire: not enough information provided');
      return;
    }

    Meteor.call('questionnaire.download', _id, accessToken, (err, result) => {
      console.log(result);
      if (err) {
        console.log(`invalid questionnaire fetch: ${err.toString()}`);
        return;
      }

      this.setState({
        questionnaire: result,
      });
    });
  }

  handleLogin = e => {
    this.props.history.push('/login');
  };

  render() {
    var questions = [];
    console.log(this.state);
    for (var i = 0; i < this.state.questionnaire.questionObjects.length; i++) {
      let ind = i;
      var curr = this.state.questionnaire.questionObjects[i];
      if (curr.type === 'number') {
        questions.push(
          <Number
            id={ind}
            key={ind}
            value={curr.description}
            onChange={(content) => {
              curr.description = content;
              this.setState({questionnaire: this.state.questionnaire});
            }}
            onClick={() => {
              this.setState((prevState) => {
                const newState = update(prevState, {
                  questionnaire: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
                return newState;
              });
            }}
          />);
      } else if (curr.type === 'string') {
        questions.push(
          <Text
            id={ind}
            key={ind}
            value={curr.description}
            onChange={(content) => {
              curr.description = content;
              this.setState({questionnaire: this.state.questionnaire});
            }}
            onClick={() => {
              this.setState((prevState) => {
                const newState = update(prevState, {
                  questionnaire: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
                return newState;
              });
            }}
          />);
      } else {
        questions.push(
          <Option
            id={ind}
            key={ind}
            value={curr.description}
            onChange={(content) => {
              curr.description = content;
              this.setState({questionnaire: this.state.questionnaire});
            }}
            choices={curr.body.options}
            onClick={() => {
              this.setState((prevState) => {
                const newState = update(prevState, {
                  questionnaire: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
                return newState;
              });
            }}
          />);
      }
    }
    return questions;
  }
/*
  render() {
    return (
      <div>
        {this.renderQuestionnaire()}
      </div>
    );
  }
  */
}

Questionnaire.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
};