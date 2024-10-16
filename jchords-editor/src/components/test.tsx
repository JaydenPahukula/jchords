import { useAppSelector } from 'src/redux/hooks';
import { selectCurrSong } from 'src/redux/slices/songdata';
import Song from 'src/types/song';

export default function Test() {
  const song: Song = useAppSelector(selectCurrSong);

  return <div>{song.src}</div>;
}
