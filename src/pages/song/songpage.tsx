import { Link, useParams } from 'react-router-dom';
import ChartComponent from 'src/components/chart/chart';
import NotFoundPage from '../notfound/notfoundpage';
import './songpage.css';

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
