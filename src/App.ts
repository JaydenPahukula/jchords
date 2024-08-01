import HomePage from 'src/pages/Home/HomePage';
import NotFoundPage from 'src/pages/NotFound/NotFoundPage';
import TestPage from 'src/pages/Test/TestPage';
import SongPage from './pages/Song/SongPage';

export default function App() {
  const path = location.pathname;
  if (path === '/') return HomePage();
  if (path === '/test') return TestPage();
  if (/^\/song\/.+/.test(path)) return SongPage({ songID: path.replace('/song/', '') });
  return NotFoundPage();
}
