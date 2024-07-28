import ChartComponent from 'src/components/Chart/Chart';

interface SongPageProps {
  songID: string;
}

export default function SongPage({ songID }: SongPageProps) {
  return (
    <div>
      <h1>This is the song Page!</h1>
      <p>Song ID is: {songID}</p>
      <ChartComponent songID={songID}></ChartComponent>
    </div>
  );
}
