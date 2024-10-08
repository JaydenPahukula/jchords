import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'src/components/homepage/homepage';
import NotFoundPage from 'src/components/notfoundpage/notfoundpage';
import SongPage from 'src/components/songpage/songpage';
import './index.css';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/song/:id" element={<SongPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Could not find root div');
}
