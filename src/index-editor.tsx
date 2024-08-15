import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EditorPage from './pages/editor/editorpage';

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
