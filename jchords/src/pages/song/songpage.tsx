import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongId from 'shared/types/songid';
import NotFoundPage from 'src/pages/notfound/notfoundpage';
import { isOnMobile } from 'src/utils/responsiveness';
import './songpage.css';
import SongPageContent from './songpagecontent';
import SongPageDataLayer, { DataState } from './songpagedatalayer';

export default function SongPage() {
  const [state, setState] = useState<DataState>(DataState.Loading);
  const [isContentFull, setContentFull] = useState<boolean>(isOnMobile());

  const songId: SongId | undefined = useParams().id;

  // listen for resize
  useEffect(() => {
    const handleResize = () => {
      setContentFull(isOnMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return songId !== undefined ? (
    <SongPageDataLayer songId={songId} setDataState={setState}>
      <SongPageContent pageState={state} isContentFull={isContentFull} />
    </SongPageDataLayer>
  ) : (
    <NotFoundPage />
  );
}
