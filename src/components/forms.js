import React, { Component } from 'react';
import {
  Form,
  Icon,
  Popup,
} from 'semantic-ui-react';

import './components.css';

class SingleLineAdderV2 extends Component {
  static defaultProps = {
    size: 'large',
    errorPosition: 'left center',
  }

  adderDisabled = () => {
    return (this.props.valid) ? false : true
  }

  iconColor = () => {
    return (this.props.valid) ? 'blue' : null
  }

  isLink = () => {
    return (this.props.valid) ? true : false
  }

  render () {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Field>
          <Popup
            trigger={
              <Form.Input
                name={this.props.name}
                icon={
                  <Icon 
                    name='circle plus'
                    disabled={this.adderDisabled()}
                    color={this.iconColor()}
                    link={this.isLink()}
                    onClick={this.props.onSubmit} 
                  />
                }
                iconPosition='left'
                transparent
                fluid
                error={this.props.error}
                size={this.props.size}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.props.onBlur}
              />
            }
            content={this.props.error}
            open={this.props.error}
            position={this.props.errorPosition}
            size='small'
          />
        </Form.Field>
      </Form>
    )
  }
}

class SingleLineAdder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  static defaultProps = {
    size: 'large',
    onSubmit: () => console.log('default onSubmit')
  };

  handleBlur() {
    this.setState({value: ''})
  }

  handleSubmit() {
    const value = this.state.value
    this.setState({value: ''})
    this.props.onSubmit(value)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyDown(event) {
    //exit on escape
    if (event.keyCode === 27) {
      this.setState({value: ''})
    }
  }

  render () {
    const iconColor = (this.state.value == '') ? null : 'blue'
    const isLink = (this.state.value == '') ? false : true

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            icon={
              <Icon 
                name='circle plus'
                color={iconColor}
                link={isLink}
                onClick={this.handleSubmit} />
            }
            iconPosition='left'
            transparent
            fluid
            size={this.props.size}
            placeholder={this.props.placeholder}
            id='HexDefinitionInput'
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </Form.Field>
      </Form>
    )
  }
}

function HiddenSubmitButton(props) {
  return <input type='submit' style={{visibility: 'hidden', position: 'fixed', bottom: '0rem', left: '0rem'}}/>
}

export { SingleLineAdder, SingleLineAdderV2, HiddenSubmitButton }