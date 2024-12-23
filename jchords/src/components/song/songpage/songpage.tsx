import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'src/components/song/chart/chart';
import Toolbar from 'src/components/song/toolbar/toolbar';
import ResponsivenessContext from 'src/contexts/responsiveness';
import { getSongInfo, getSongSrc } from 'src/db/functions';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateRenderSettings } from 'src/redux/slices/rendersettings';
import {
  selectSongData,
  setCurrId,
  setSongsLoading,
  setSrc,
  setSrcLoading,
  updateSongs,
} from 'src/redux/slices/songdata';
import keyToAccidental from 'src/utils/keytoaccidentals';
import parseKey from 'src/utils/parsekey';

export default function SongPage(): ReactElement {
  const { isMobile } = useContext(ResponsivenessContext);
  const dispatch = useAppDispatch();
  const { songs, currId, src } = useAppSelector(selectSongData);

  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id !== undefined) {
      // load info if needed
      if (songs[id] === undefined) {
        dispatch(setSongsLoading(true));
        getSongInfo(id).then((info) => {
          if (info !== undefined) dispatch(updateSongs({ [id]: info }));
          dispatch(setSongsLoading(false));
        });
      }
      // load src if needed
      if (id !== currId || src === undefined) {
        dispatch(setCurrId(id));
        dispatch(setSrcLoading(true));
        getSongSrc(id).then((src) => {
          dispatch(setSrc(src));
          dispatch(setSrcLoading(false));
          // automatically set the accidentals type (defaults to sharp)
          dispatch(
            updateRenderSettings({ accidentalsType: keyToAccidental(parseKey(src ?? '') ?? 'C') }),
          );
        });
      }
    }
  }, [id]);

  return (
    <div className="bg-bg3 h-full flex-col overflow-hidden">
      <Toolbar />
      <div className="pad sm: flex-grow flex-col items-center overflow-y-auto overflow-x-hidden p-3 sm:p-0">
        <Chart />
      </div>
    </div>
  );
}
