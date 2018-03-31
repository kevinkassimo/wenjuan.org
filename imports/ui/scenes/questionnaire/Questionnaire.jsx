import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Button} from 'reactstrap';

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: null,
      index: -1,
    };
  }

  componentDidMount() {
    const {
      id,
      accessToken,
    } = this.props;

    if (!id && !accessToken) {
      alert('cannot fetch questionnaire: not enough information provided');
      return;
    }

    Meteor.call('questionnaire.prepare', id, accessToken, (err, result) => {
      if (err) {
        alert(`invalid questionnaire fetch: ${err.toString()}`);
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

  renderQuestionnaire() {

  }

  render() {
    const {
      questionnaire,
    } = this.state;

    return (
      <div>
        {this.renderQuestionnaire()}
      </div>
    );
  }
}

Questionnaire.propTypes = {
  id: PropTypes.string,
  accessToken: PropTypes.string,
};