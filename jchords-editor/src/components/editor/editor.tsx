import { ReactElement } from 'react';
import './editor.css';
import EditorLeftMenu from './leftmenu/editorleftmenu';

export default function Editor(): ReactElement {
  return (
    <div id="editor-wrapper">
      <EditorLeftMenu />
      <div id="editor">
        <div id="editor-src"></div>
        <div id="editor-preview"></div>
      </div>
    </div>
  );
}
