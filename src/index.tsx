import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App';
import 'src/index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Could not find root div');
}
