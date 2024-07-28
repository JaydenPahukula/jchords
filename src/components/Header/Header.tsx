import './Header.css';

export default function HeaderComponent() {
  return (
    <div className="header">
      <h1 className="header-title">This is the header!</h1>
      <a className="header-link" href="/">
        Home
      </a>
      <a className="header-link" href="/test">
        Test
      </a>
    </div>
  );
}
