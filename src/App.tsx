import HomePage from 'src/pages/Home';
import TestPage from './pages/Test';
import NotFoundPage from './pages/NotFound';

export default function App() {
  switch (location.pathname) {
    case '/':
      return HomePage();
    case '/test':
      return TestPage();
    default:
      return NotFoundPage();
  }
}
