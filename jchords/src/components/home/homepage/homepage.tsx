import { ReactElement } from 'react';
import Navbar from 'src/components/home/navbar/navbar';
import SongList from 'src/components/home/songlist/songlist';

export default function HomePage(): ReactElement {
  return (
    <div id="home-page" className="h-full">
      <Navbar />
      <div id="content">
        <SongList />
      </div>
    </div>
  );
}
