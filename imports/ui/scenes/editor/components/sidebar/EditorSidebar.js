import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as Schema from '/imports/api/schema.js';
import update from 'immutability-helper';
import { Button, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

export default class EditorSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavIndex: 0,
    };
  }

  render() {
    const {
      navs
    } = this.props;

    return (
      <Nav vertical className="editor__sidebar">
        {navs.map(([navName, navAction], index) => (
          <NavItem key={index}>
            <Button color="primary" onClick={navAction}>{navName}</Button>
          </NavItem>
          ))
        }
      </Nav>
    );
  }
}

EditorSidebar.propTypes = {
  navs: PropTypes.array.isRequired,
};

EditorSidebar.defaultProps = {
  navs: [],
};