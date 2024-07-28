import SongInfo from 'src/types/SongInfo';
import './SongListRow.css';

interface SongListRowComponentProps {
  info: SongInfo;
}

export default function SongListRowComponent(props: SongListRowComponentProps) {
  const song = props.info;
  return (
    <a key={song.id} href={`/song/${song.id}`} className="song-list-row">
      <p className="song-list-row-text">
        <b>{song.name}</b> ({song.id})
      </p>
    </a>
  );
}
