import { Link, useParams } from 'react-router-dom';
import ChartComponent from 'src/components/Chart/Chart';
import NotFoundPage from '../NotFound/NotFoundPage';
import './SongPage.css';

export default function SongPage() {
  const songId = useParams().id;
  return songId ? (
    <div className="song-page">
      <Link to="/">&lt;- Home</Link>
      <ChartComponent songId={songId}></ChartComponent>
    </div>
  ) : (
    <NotFoundPage />
  );
}
