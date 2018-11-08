import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
const showdown = require('showdown');
const converter = new showdown.Converter();

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.contentInput = this.contentInput.bind(this);
  }

  contentInput(e) {
    let value = e.target.value;
    this.setState(() => {
      return { content: value };
    });
  }

  contentOut() {
    return converter.makeHtml(this.state.content);
  }

  render() {
    return (
      <div>
        <textarea onChange={this.contentInput} />
        <div
          dangerouslySetInnerHTML={{
            __html: this.contentOut()
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<Display />, document.getElementById('app'));
