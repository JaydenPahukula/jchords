import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'src/components/app/app';
import store from 'src/redux/store';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
} else {
  console.error('Could not find root div');
}
