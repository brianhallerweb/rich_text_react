import React, { Component } from "react";
import "./App.css";
import "whatwg-fetch";
import { convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.initialContentState = contentState;
    this.state = {
      contentState
    };
  }

  onContentStateChange: Function = contentState => {
    this.setState({
      contentState
    });
  };

  render() {
    return (
      <div className="grid">
        <header>
          <h1>React Rich Text Editor by jyopur</h1>
        </header>

        <div className="targetAll">
          <Editor
            editorClassName="targetEditor"
            onContentStateChange={this.onContentStateChange}
            placeholder={"Enter your rich text"}
            spellCheck={true}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list"
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true }
            }}
          />
        </div>
        <div
          className="richText"
          dangerouslySetInnerHTML={{
            __html: draftToHtml(this.state.contentState)
          }}
        />
      </div>
    );
  }
}

export default App;
