import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as Schema from '/imports/api/schema.js';
import update from 'immutability-helper';

class Number extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>问题描述：</label>
        <input id={this.props.id} type="text" value={this.props.value} onChange={({ target }) => this.props.onChange(target.value)}/>
        <button onClick={this.props.onClick}>删除此问题</button>
      </div>
    );
  }
}

class Text extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>问题描述：</label>
        <input id={this.props.id} type="text" value={this.props.value} onChange={({ target }) => this.props.onChange(target.value)}/>
        <button onClick={this.props.onClick}>删除此问题</button>
      </div>
    );
  }
}

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>问题描述：</label>
        <input id={this.props.id} type="text" value={this.props.value} onChange={({ target }) => this.props.onChange(target.value)}/>
        <button onClick={this.props.onClick}>删除此问题</button>
      </div>
    );
  }
}

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: props.match.params._id,
      draft: {
        _id: null,
        questionObjects: []
      }
    }
  }

  componentWillMount() {
    if (this.state._id) {
      Meteor.call('draft.find', this.state._id, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            draft: res
          });
        }
      });
    }
  }

  render() {
    questions = [(
      <div key="ops">
        <button onClick={() => {
          this.state.draft.questionObjects.push(Schema.createNumberQuestion(false, "", {}));
          this.setState({draft: this.state.draft});
        }}>新数字问题</button>
        <button onClick={() => {
          this.state.draft.questionObjects.push(Schema.createStringQuestion(false, "", {}));
          this.setState({draft: this.state.draft});
        }}>新文字问题</button>
        <button onClick={() => {
          this.state.draft.questionObjects.push(Schema.createOptionQuestion(false, "", [], {}));
          this.setState({draft: this.state.draft});
        }}>新选择问题</button>
      </div>
    )];
    for (let i = 0; i < this.state.draft.questionObjects.length; i++) {
      let ind = i;
      let curr = this.state.draft.questionObjects[i];
      if (curr.type === 'number') {
        questions.push(
          <Number
            id={ind}
            key={ind}
            value={curr.description}
            onChange={(content) => {
              curr.description = content;
              this.setState({draft: this.state.draft});
            }}
            onClick={() => {
              this.setState((prevState) => {
                return update(prevState, {
                  draft: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
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
              this.setState({draft: this.state.draft});
            }}
            onClick={() => {
              this.setState((prevState) => {
                return update(prevState, {
                  draft: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
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
              this.setState({draft: this.state.draft});
            }}
            onClick={() => {
              this.setState((prevState) => {
                return update(prevState, {
                  draft: {
                    questionObjects: {
                      $splice: [[ ind, 1 ]],
                    },
                  },
                });
              });
            }}
            options={curr.options}
          />);
      }
    }
    questions.push((
      <div key="save">
        <button onClick={() => {
          console.log("_id:"+this.state._id);
          console.log(this.state.draft);
          Meteor.call('draft.save', this.state._id, this.state.draft, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(res);
            }
          })
        }}>保存</button>
      </div>
    ))
    return questions;
  }
}