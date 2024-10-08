import { Link } from 'react-router-dom';
import XIcon16 from 'shared/icons/leftarrow';
import './songpagenavbar.css';

interface SongPageNavbarProps {
  title: string;
}

export default function SongPageNavbar(props: SongPageNavbarProps) {
  return (
    <div id="navbar">
      <div id="navbar-left-buttons">
        <Link to="/" id="navbar-home-button">
          <XIcon16 />
        </Link>
      </div>
      <div id="navbar-title-container">
        <h1 id="navbar-title">{props.title}</h1>
      </div>
      <div id="navbar-right-buttons"></div>
    </div>
  );
}
