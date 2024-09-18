import React from 'react';
import ReactDOM from 'react-dom/client';
import EditorComponent from 'src/components/editor/editor';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <div className="song-editor-page">
        <EditorComponent></EditorComponent>
      </div>
    </React.StrictMode>,
  );
} else {
  console.error('Could not find root div');
}
