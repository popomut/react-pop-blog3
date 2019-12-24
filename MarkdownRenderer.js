import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";

//source page: https://github.com/rexxars/react-markdown
//https://rexxars.github.io/react-markdown/

const input = "# This is a header\n\nAnd this is a paragraph";

class MarkdownRenderer extends Component {
  render() {
    var inputData = this.props.data;

    return (
      <div>
        <ReactMarkdown source={inputData} />
      </div>
    );
  }
}

export default MarkdownRenderer;
