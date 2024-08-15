import React from 'react';
import ReactDOM from 'react-dom/client';
import EditorPage from 'src/pages/editor/editorpage';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <EditorPage />
    </React.StrictMode>,
  );
} else {
  console.error('Could not find root div');
}
