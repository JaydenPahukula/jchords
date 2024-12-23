import { createRoot } from 'react-dom/client';
import App from 'src/app';

const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(<App />);
} else {
  console.error('Could not find root div');
}
