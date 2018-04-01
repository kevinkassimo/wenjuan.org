import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import * as Schema from '/imports/api/schema.js';
import update from 'immutability-helper';
import uuid from 'uuid/v4';
import { Nav, NavItem, Button, Card, Form, FormGroup, Input, Label } from 'reactstrap';
import EditorSidebar from "./components/sidebar/EditorSidebar";
import EditorNewBlockTab from "./components/tab/EditorNewBlockTab";
import {createNumberQuestion, createStringQuestion, createOptionQuestion} from "../../../api/schema";
import {
  TypeOfNumberInputs, TypeOfStringInputs, TypeOfOptionInputs,
  allTypesOfStringInputs
} from "../../../constants/input-types";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/*
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

export class SuperEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
}

*/

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draftId: this.props.match.params._id || null,
      selectedTabIndex: 0,
      questionObjects: [],
      selectedQuestionIndex: -1,
      accessTokens: [],
    };

    console.log(this.state.draftId);

    this.tabs = [
      ['New Blocks', this.updateSelectedTabIndex(0)],
      ['Block Settings', this.updateSelectedTabIndex(1)],
      ['Token Settings', this.updateSelectedTabIndex(2)],
    ];
  }

  componentDidMount() {
    const {
      draftId
    } = this.state;

    if (draftId) {
      Meteor.call('draft.find', draftId, (err, res) => {
        if (err) {
          alert(`cannot find of id: ${draftId}`);
          this.setState({
            draftId: null,
          });
          return;
        }
        this.setState({
          accessTokens: res.accessTokens || [],
          questionObjects: res.questionObjects,
        });
      });
    }
  }

  updateSelectedTabIndex = (index) => () => {
    this.setState({
      selectedTabIndex: index,
    });
  };

  createBlockAction = (blockType) => () => {
    this.setState(({ questionObjects: oldQuestionObjects }) => {
      let newQuestion;
      if (allTypesOfStringInputs.includes(blockType)) {
        newQuestion = createStringQuestion(blockType, false, "", {});
      } else {
        // TODO: implement this
        alert('not implemented');
      }

      oldQuestionObjects.push(newQuestion);
      return {
        questionObjects: oldQuestionObjects,
      };
    });
  };

  renderTabs() {
    const {
      selectedTabIndex,
    } = this.state;

    let tabs = [
      <EditorNewBlockTab createBlockAction={this.createBlockAction} />,
      <div>TAB 2</div>,
      this.renderAccessTokenSettings(),
    ];

    return tabs.map((e, index) => index === selectedTabIndex ?
      <div className="editor__tab" key={`editor-tab-${index}`}>{e}</div> : null
    );
  }

  renderStringCard(e, i) {
    return (
      <Card body onClick={() => this.setState({ selectedQuestionIndex: i })}>
        <Button onClick={() => {
          this.setState((prevState) => {
            prevState.questionObjects.splice(i, 1);
            return {
              questionObjects: prevState.questionObjects,
            };
          })
        }}>Delete</Button>
        <Form>
          <FormGroup>
            <Label for={`s-${i}`}>{capitalizeFirstLetter(e.subtype)}</Label>
            <Input type="text" value={this.state.questionObjects[i].description} onChange={({ target }) => {
              this.setState((prevState) => {
                prevState.questionObjects[i].description = target.value;
                return {
                  questionObjects: prevState.questionObjects,
                };
              })
            }} />
          </FormGroup>
        </Form>
      </Card>
    );
  }

  renderEditFields() {
    return (
      <div className="editor__editTab">
        {this.state.questionObjects.map((e, i) => {
          if (allTypesOfStringInputs.includes(e.subtype)) {
            return this.renderStringCard(e, i);
          }
          // TODO: implement me
          alert(`not implemented: ${e.subtype}`);
        })}
      </div>
    )
  }

  renderAccessTokenSettings() {
    const {
      accessTokens,
    } = this.state;

    return (
      <Nav vertical className="editor__tab">
        {accessTokens.map((e, i) => {
          return (
            <NavItem>
              <FormGroup>
                <Input type="text" value={e} onChange={({ target }) => {
                    this.setState((prevState) => {
                      prevState.accessTokens[i] = target.value;
                      return {
                        accessTokens: prevState.accessTokens,
                      }
                    });
                  }
                }/>
                <Button onClick={() => {
                    this.setState((prevState) => {
                      prevState.accessTokens.splice(i, 1);
                      return {
                        accessTokens: prevState.accessTokens,
                      }
                    });
                  }
                }>Delete</Button>
              </FormGroup>
            </NavItem>
          )
        })}
        <NavItem>
          <Button color="primary" onClick={() => {
            this.setState((prevState) => {
              prevState.accessTokens.push(uuid());
              return {
                accessTokens: prevState.accessTokens,
              };
            })
          }}>Add New</Button>
        </NavItem>
      </Nav>
    );
  }

  saveDraft = () => {
    const {
      draftId,
      questionObjects,
      accessTokens,
    } = this.state;

    Meteor.call('draft.save', draftId, { accessTokens, questionObjects }, (err, result) => {
      console.log(questionObjects);

      if (err) {
        alert(`ERROR: save failed: ${err}`);
        return;
      }
      alert(`SAVED! _id: ${result}`);

      if (!draftId) {
        this.props.history.push(`/edit/${result}`);
      }
    });
  };

  publishQuestionnaire = () => {
    const {
      questionObjects,
      accessTokens,
    } = this.state;

    Meteor.call('draft.publish', { questionObjects }, accessTokens, (err, result) => {
      console.log(questionObjects);

      if (err) {
        alert(`ERROR: published failed: ${err}`);
        return;
      }
      alert(`PUBLISHED! _id: ${result}`);

      this.props.history.push(`/`);
    });
  };

  render() {
    return (
      <div>
        <EditorSidebar navs={this.tabs} />
        {this.renderTabs()}
        {this.renderEditFields()}
        <Button className="editor__publish" color="primary" onClick={this.publishQuestionnaire}>Publish</Button>
        <Button className="editor__save" color="primary" onClick={this.saveDraft}>Save</Button>
      </div>
    );
  }
}