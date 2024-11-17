import { ReactElement, useContext } from 'react';
import SearchBar from 'src/components/home/searchbar/searchbar';
import ResponsivenessContext from 'src/contexts/responsiveness';
import './navbar.css';

export default function Navbar(): ReactElement {
  const { isMobile } = useContext(ResponsivenessContext);

  return (
    <div id="navbar">
      <div id="navbar-content">
        {isMobile ? <h1 id="title-small">JC</h1> : <h1 id="title">JChords</h1>}
        <SearchBar />
      </div>
    </div>
  );
}
