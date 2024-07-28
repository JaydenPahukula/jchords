interface SongPageProps {
  songID: string;
}

export default function SongPage(props: SongPageProps) {
  return (
    <div>
      <h1>This is the song Page!</h1>
      <p>Song ID is: {props.songID}</p>
    </div>
  );
}
