//import './App.css';
import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';
import FilteredMultiSelect from 'react-filtered-multiselect'



export const TextField = class TextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: '',
        };
    }

    componentDidUpdate() {
        this.props.onStateChange(this.state);
    }

    render() {
        const {
            inputText,
        } = this.state;
    
        const {
            title,
        } = this.props;

        if(this.props.type === "email") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input email
                    </Alert>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Please entre your email here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "text") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input text
                    </Alert>
                    <Input type="text" name="text" id="exampleName" placeholder="Please entre your text here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "date") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input date
                    </Alert>
                    <Input type="date" name="date" id="exampleDate" placeholder="Please entre the date here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "time") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input time
                    </Alert>
                    <Input type="time" name="time" id="exampleTime" placeholder="Please entre the time here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "paragraph") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input paragraph
                    </Alert>
                    <Input type="textarea" name="paragraph" id="exampleParagraph" placeholder="Please entre your paragraph here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "password") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input password
                    </Alert>
                    <Input type="password" name="password" id="examplePassword" placeholder="Please entre your password here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "file") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: choose a file to upload
                    </Alert>
                    <Input type="file" name="file" id="exampleFile" placeholder="Please choose your file" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <FormText color="muted" />
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "url") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input a url
                    </Alert>
                    <Input type="url" name="url" id="exampleUrl" placeholder="Please input a url" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}/>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
        else if(this.props.type === "rate") {
            return (
                <div>
                    <Alert color="warning">
                        {title}: choose your rating
                    </Alert>
                    <ButtonGroup>
                        <Button color="light" onClick={() => this.setState({ inputText: 0 })}>0</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 1 })}>1</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 2 })}>2</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 3 })}>3</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 4 })}>4</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 5 })}>5</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 6 })}>6</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 7 })}>7</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 8 })}>8</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 9 })}>9</Button>
                        <Button color="light" onClick={() => this.setState({ inputText: 10 })}>10</Button>
                    </ButtonGroup>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </div>
            );
        }
        else if(this.props.type === "select") {
            return (
                <Form>
                    <Alert color="warning">
                        {title}: input your choice
                    </Alert>
                    <Input type="select" name="select" id="exampleSelect" placeholder="Please make your choice here" value={inputText}
                    onChange={({ target }) => {
                        this.setState({ inputText: target.value })}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    <br/>
                    <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                    <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
                </Form>
            );
        }
    }
}

export const MultiSelection = class MultiSelection extends Component {
    constructor(props) { 
        super(props);
    
        this.state = {
            selectedShips: [],
        };
    }  
    /*
    const CULTURE_SHIPS = [
        {id: 1, name: 'option 1'},
        {id: 2, name: 'option 2'},
    // ...
        {id: 249, name: 'option *'},
        {id: 250, name: 'option /'}
    ]
    for(int i = 1; i <= this.props.)
    choices.map((str) => {CULTURE_SHIPS.push{id=, name={str}}
                        )})
*/




 
    handleDeselect(index) {
        var selectedShips = this.state.selectedShips.slice()
        selectedShips.splice(index, 1)
        this.setState({selectedShips})
    }
 
    handleSelectionChange = (selectedShips) => {
        this.setState({selectedShips})
    }

    render() {
        const {
            title,
            onStateChange,
            choices,
        } = this.props;

        var CULTURE_SHIPS = [];
        for (var i = 1; i <= choices.length; i++) {
            CULTURE_SHIPS.push({id: i, name: choices[i]});
        }

        var {selectedShips} = this.state;
        return (
            <div>
                <Alert color="warning">
                        {title}: select more than one option
                </Alert>
                <FilteredMultiSelect
                    onChange={this.handleSelectionChange}
                    options={CULTURE_SHIPS}
                    selectedOptions={selectedShips}
                    textProp="name"
                    valueProp="id"
                    showFilter={false}
                    size={4}
                />
                {selectedShips.length === 0 && <p>(nothing selected yet)</p>}
                {selectedShips.length > 0 && 
                    <ul>
                        {selectedShips.map((ship, i) => 
                            <li key={ship.id} >
                                {`${ship.name} `}
                                <Button  color="warning" onClick={() => this.handleDeselect(i)}> 
                                    &times; 
                                </Button> 
                            </li>)
                        }
                    </ul>
                }
                <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
            </div>
        );
    }
}

export const Selection = class Selection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: '',
        };
    }

    componentDidUpdate() {
        this.props.onStateChange(this.state); 
    }

    render() {
        const {
            inputText, 
        } = this.state;
    
        const {
            title,
            onStateChange,
            choices,
        } = this.props;

        return (
            <form>
                <Alert color="warning">
                        {title}: select all the options
                </Alert>
                <FormGroup tag="fieldset">
                    <legend>Choose From Following Options</legend>
                    {
                        choices.map((str) => {return (
                            <FormGroup check key={str}>
                                <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                        {str}
                                </Label>
                            </FormGroup>
                        )})
                    }
                </FormGroup>
                <Button color="warning" onClick={() => this.props.notifyParent()}>prev</Button>{` `}
                <Button color="warning" onClick={() => this.props.notifyParent()}>next</Button>
            </form>
        );
    }
}

class Wrapper extends Component {
    render() {
        return (
            <div>
                <TextField type="email" title="Question 1" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="text" title="Question 2" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="password" title="Question 3" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="select" title="Question 4" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="paragraph" title="Question 5" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="file" title="Question 6" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="rate" title="Question 7" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="url" title="Question 8" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="date" title="Question 9" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <TextField type="time" title="Question 10" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <MultiSelection title="Question 11" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
                <br/>
                <Selection title="Question 12" notifyParent={() => console.log('Notified')} onStateChange={(childState) => console.log(childState)} />
            </div>
        )
    }
}

export default Wrapper;