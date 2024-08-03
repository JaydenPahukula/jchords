import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homepage';
import NotFoundPage from './pages/notfound/notfoundpage';
import SongPage from './pages/song/songpage';
import TestPage from './pages/test/testpage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
        <Route path="/song/:id" element={<SongPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
