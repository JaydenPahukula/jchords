import HeaderComponent from 'src/components/header/header';
import SongListComponent from 'src/components/songlist/songlist';
import './home.css';

export default function HomePage() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="home-page">
        This is the home page!
        <SongListComponent></SongListComponent>
      </div>
    </>
  );
}
