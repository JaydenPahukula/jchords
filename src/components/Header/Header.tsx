import { Link } from 'react-router-dom';
import './Header.css';

export default function HeaderComponent() {
  return (
    <div className="header">
      <h1 className="header-title">This is the header!</h1>
      <Link to="/" className="header-link">
        Home
      </Link>
      <Link to="/test" className="header-link">
        Test
      </Link>
    </div>
  );
}
