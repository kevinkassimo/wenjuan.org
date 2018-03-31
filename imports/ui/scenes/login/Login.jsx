import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignup: false,
      username: '',
      email: '',
      password: '',
    };
  }

  handleLoginSubmit = e => {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        alert(err);
        return;
      }
      this.props.history.push('/');
    });
  };

  shouldButtonDisable = (isLogin = true) => {
    const {
      username,
      email,
      password,
    } = this.state;
    return !email || !password || (!isLogin && !username);
  };

  handleSignupSubmit = e => {
    e.preventDefault();

    const {
      username,
      email,
      password,
    } = this.state;

    Meteor.call('account.create', username, email, password, (err) => {
        if (err) {
          alert(err);
        } else {
          alert('Sign up successful!');
          this.props.history.push('/dashboard');
        }
      });
  };

  setSignup = () => {
    this.setState({
      isSignup: true,
    });
  };

  setLogin = () => {
    this.setState({
      isSignup: false,
    });
  };

  render() {
    const {
      isSignup,
      username,
      email,
      password,
    } = this.state;

    return (
      <div>
        {!isSignup ?
          (<div>
            <h5>Login</h5>
            <Form>
              <FormGroup>
                <Label htmlFor="l-email">Email:</Label>
                <Input type="email"
                       placeholder="Your email"
                       value={email}
                       onChange={({target}) => this.setState({email: target.value})}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="l-password">Password:</Label>
                <Input type="password"
                       placeholder="Your password"
                       value={password}
                       onChange={({target}) => this.setState({password: target.value})}/>
              </FormGroup>
              <Button disabled={this.shouldButtonDisable()} onClick={this.handleLoginSubmit}>Login</Button>
            </Form>
          </div>) :
          (<div>
              <h5>Sign Up</h5>
              <Form>
                <FormGroup>
                  <Label htmlFor="s-username">Username:</Label>
                  <Input type="text"
                         placeholder="Your username"
                         value={username}
                         onChange={({target}) => this.setState({username: target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="s-email">Email:</Label>
                  <Input type="text"
                         placeholder="Your username"
                         value={email}
                         onChange={({target}) => this.setState({email: target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="s-password">Password:</Label>
                  <Input type="password"
                         placeholder="Your password"
                         value={password}
                         onChange={({target}) => this.setState({password: target.value})}/>
                </FormGroup>
                <Button disabled={this.shouldButtonDisable(false)} onClick={this.handleSignupSubmit}>Sign Up</Button>
              </Form>
            </div>
          )
        }
        {isSignup ?
          <p>Has an account? <Button onClick={this.setLogin}>Log In!</Button></p> :
          <p>Not yet a user? <Button onClick={this.setSignup}>Sign Up!</Button></p>
        }
      </div>
    );
  }
}