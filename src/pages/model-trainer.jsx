import React, { Component } from "react";
import PageShell from "../components/page/PageShell";
import Editor from "../components/editor/Editor";

class ModelTrainer extends Component {
  render() {
    return (
      <PageShell>
        <Editor />
      </PageShell>
    );
  }
}

export default ModelTrainer;
