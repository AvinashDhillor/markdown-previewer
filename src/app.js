import React from 'react';
import marked from 'marked';
import './App.css';

marked.setOptions({
  breaks: true
});
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState(() => {
      return {
        markdown: val
      };
    });
  }

  render() {
    return (
      <div>
        <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        <Preview markdown={this.state.markdown} />
      </div>
    );
  }
}

const Editor = props => {
  return (
    <textarea
      class="form-control mt-5"
      rows="5"
      id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"
    />
  );
};

const Preview = props => {
  return (
    <div
      id="preview"
      className="border border-primary p-5 m-5"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
    />
  );
};

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default Display;
