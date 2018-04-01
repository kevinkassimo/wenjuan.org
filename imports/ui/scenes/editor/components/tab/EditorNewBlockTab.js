import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as Schema from '/imports/api/schema.js';
import update from 'immutability-helper';
import { Button, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {TypeOfStringInputs, TypeOfNumberInputs, TypeOfOptionInputs} from "../../../../../constants/input-types";

export default class EditorNewBlockTab extends Component {
  constructor(props) {
    super(props);
  }

  renderNavItem(name, action) {
    return (
      <NavItem>
        <Button onClick={action}>{name}</Button>
      </NavItem>
    );
  }

  render() {
    const {
      createBlockAction,
    } = this.props;

    return (
      <Nav>
        {this.renderNavItem('Text', createBlockAction(TypeOfStringInputs.TEXT))}
        {this.renderNavItem('Paragraph', createBlockAction(TypeOfStringInputs.PARAGRAPH))}
        {this.renderNavItem('Password', createBlockAction(TypeOfStringInputs.PASSWORD))}
      </Nav>
    );
  }
}

EditorNewBlockTab.propTypes = {
  createBlockAction: PropTypes.func.isRequired,
};

EditorNewBlockTab.defaultProps = {
};