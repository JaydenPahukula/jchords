import Chart from 'src/components/chart/chart';
import SongPageToolbar from 'src/components/songpagetoolbar/songpagetoolbar';
import './songpage.css';
import { DataState } from './songpagedatalayer';

interface SongPageContentProps {
  pageState: DataState;
  isContentFull: boolean;
}

export default function SongPageContent(props: SongPageContentProps) {
  return (
    <div id="song-page">
      <SongPageToolbar></SongPageToolbar>
      <div id={props.isContentFull ? 'song-page-content-full' : 'song-page-content'}>
        {props.pageState === DataState.Loading ? (
          <>loading</>
        ) : props.pageState === DataState.Error ? (
          <>error</>
        ) : (
          <Chart isFull={props.isContentFull}></Chart>
        )}
      </div>
    </div>
  );
}
