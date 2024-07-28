import SongInfo from 'src/types/SongInfo';
import './SongListEntry.css';

interface SongListEntryComponentProps {
  info: SongInfo;
}

export default function SongListEntryComponent(
  props: SongListEntryComponentProps,
) {
  const info = props.info;
  return (
    <div key={info.id} className="song-list-row">
      <p>{info.id}:</p>
      <b>{info.name}</b>
    </div>
  );
}
