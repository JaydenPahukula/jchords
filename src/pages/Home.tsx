import React from 'react';
import HeaderComponent from 'src/components/Header/Header';
import SongListComponent from 'src/components/SongList/SongList';
import './page.css';

export default function HomePage() {
  return (
    <React.Fragment>
      <HeaderComponent></HeaderComponent>
      <div className="page">
        This is the home page!
        <SongListComponent></SongListComponent>
      </div>
    </React.Fragment>
  );
}
