import SongInfo, { isSongInfo } from 'shared/types/songinfo';

interface InfoEditorComponentProps {
  info: SongInfo;
  setInfo: (info: SongInfo) => void;
}

export default function InfoEditorComponent(props: InfoEditorComponentProps) {
  function setName(newName: string) {
    props.setInfo({ ...props.info, name: newName });
  }

  function setArtist(newArtist: string) {
    props.setInfo({ ...props.info, artist: newArtist });
  }

  return isSongInfo(props.info) ? (
    <>
      <div>
        <h2>Title:</h2>
        <input value={props.info.name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div>
        <h2>Artist:</h2>
        <input value={props.info.artist} onChange={(e) => setArtist(e.target.value)}></input>
      </div>
    </>
  ) : (
    <></>
  );
}
