import { ReactElement } from 'react';
import DialogHandler from 'src/components/dialogs/dialoghandler';
import Editor from 'src/components/editor/editor';
import TabList from 'src/components/tablist/tablist';
import Toolbar from 'src/components/toolbar/toolbar';
import './app.css';

export default function App(): ReactElement {
  return (
    <div id="app">
      <div id="title-row">
        <h1 id="title">JChords Editor</h1>
        <TabList />
      </div>
      <Toolbar />
      <Editor />
      <DialogHandler />
    </div>
  );
}
