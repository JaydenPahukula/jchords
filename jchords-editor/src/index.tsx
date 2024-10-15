import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <div>hello</div>
    </React.StrictMode>,
  );
} else {
  console.error('Could not find root div');
}
