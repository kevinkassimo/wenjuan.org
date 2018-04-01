import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Home from '../ui/scenes/home/Home.jsx';
import Dashboard from '../ui/scenes/dashboard/Dashboard.jsx';
import Login from '../ui/scenes/login/Login.jsx';
import Userpage from '../ui/scenes/userpage/Userpage.jsx';
import Dbconnection from '../ui/scenes/userpage/connection.jsx';
import Questionnaire from '../ui/scenes/questionnaire/Questionnaire.jsx';
import Editor from '../ui/scenes/editor/Editor.jsx';

export const renderRoutes = () => (
  <BrowserRouter>
    <div>
      <Route exact
             path="/"
             component={(props) => Meteor.user() ? (<Redirect to="/dashboard" />) : (<Home {...props} />)} />
      <Route path="/dashboard"
             component={(props) => Meteor.user() ? (<Dashboard {...props} />) : (<Redirect to="/login" />)} />
      <Route path="/login"
             component={(props) => Meteor.user() ? (<Dashboard {...props} />) : (<Login {...props} />)}/>
      <Route path="/user/:customUrl" component={(props) => <Userpage {...props} /> } />
      <Route path="/dbtest" component={(props) => <Dbconnection {...props} /> } />
      <Route path="/answer/:_id" component={(props) => <Questionnaire {...props} />} />
      <Route path="/edit/:_id?" component={(props) => <Editor {...props} />} />
    </div>
  </BrowserRouter>
);