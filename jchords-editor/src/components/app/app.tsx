import { ReactElement } from 'react';
import TabList from 'src/components/tablist/tablist';
import Test from 'src/components/test';
import DialogHandler from '../dialogs/dialoghandler';
import Toolbar from '../toolbar/toolbar';
import './app.css';

export default function App(): ReactElement {
  return (
    <>
      <div id="title-row">
        <h1 id="title">JChords Editor</h1>
        <TabList />
      </div>
      <Toolbar />
      <Test />
      <DialogHandler />
    </>
  );
}
