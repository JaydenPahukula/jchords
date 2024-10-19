import { ReactElement } from 'react';
import './editorleftmenu.css';

export default function EditorLeftMenu(): ReactElement {
  return (
    <div id="editor-left-menu">
      <div className="editor-left-menu-section">
        <h3 className="editor-left-menu-section-header">Title:</h3>
        <input className="editor-left-menu-input"></input>
      </div>
    </div>
  );
}
