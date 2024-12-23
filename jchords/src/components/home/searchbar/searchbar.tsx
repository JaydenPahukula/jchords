import { ReactElement } from 'react';
import SearchIcon24 from 'src/components/icons/searchicon24';

export default function SearchBar(): ReactElement {
  return (
    <div id="searchbar">
      <input id="searchbar-input" type="text" placeholder="Search..." size={10}></input>
      <SearchIcon24 />
    </div>
  );
}
