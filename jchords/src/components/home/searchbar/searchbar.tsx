import { ReactElement } from 'react';
import SearchIcon18 from 'src/components/icons/searchicon18';
import './searchbar.css';

export default function SearchBar(): ReactElement {
  return (
    <div id="searchbar">
      <input id="searchbar-input" type="text" placeholder="Search..." size={15}></input>
      <SearchIcon18 />
    </div>
  );
}
