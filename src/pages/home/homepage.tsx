import React from 'react';
import HeaderComponent from 'src/components/header/header';
import SongListComponent from 'src/components/songlist/songlist';
import './homepage.css';

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
