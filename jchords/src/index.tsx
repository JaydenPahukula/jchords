import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'src/pages/home/homepage';
import SongPage from 'src/pages/song/songpage';
import store from 'src/redux/store';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/song/:id" element={<SongPage />}></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
} else {
  console.error('Could not find root div');
}
