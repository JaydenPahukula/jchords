import SongInfo from 'src/types/SongInfo';
import './SongListRow.css';

interface SongListRowComponentProps {
  info: SongInfo;
}

export default function SongListRowComponent({
  info,
}: SongListRowComponentProps) {
  return (
    <a key={info.id} href={`/song/${info.id}`} className="song-list-row">
      <p className="song-list-row-text">
        <b>{info.name}</b> ({info.id})
      </p>
    </a>
  );
}
