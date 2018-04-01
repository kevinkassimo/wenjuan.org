import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as Schema from '/imports/api/schema.js';
import update from 'immutability-helper';
import { Button, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {TypeOfStringInputs, TypeOfNumberInputs, TypeOfOptionInputs} from "../../../../../constants/input-types";

export default class EditorBlockSettingsTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

    );
  }
}

EditorBlockSettingsTab.propTypes = {
  createBlockAction: PropTypes.func.isRequired,
};

EditorBlockSettingsTab.defaultProps = {
};