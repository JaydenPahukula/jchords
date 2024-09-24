import { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import SongChart, { emptySongChart } from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo, { emptySongInfo } from 'shared/types/songinfo';
import Editor from 'src/components/editor/editor';
import LeftMenu, { SubmitButtonStatus } from 'src/components/leftmenu/leftmenu';
import './app.css';

export default function App() {
  const [songInfo, setSongInfo] = useState<SongInfo | undefined>();
  const [songInfoChanged, setSongInfoChanged] = useState<boolean>(false);
  const [songChart, setSongChart] = useState<SongChart | undefined>();
  const [songChartChanged, setSongChartChanged] = useState<boolean>(false);
  const [songId, setSongId] = useState<SongId | undefined>();
  const [submitStatus, setSubmitStatus] = useState(SubmitButtonStatus.None);

  useEffect(() => {
    setSongInfoChanged(false);
    setSongChartChanged(false);
    if (songId === '') {
      setSongInfo(emptySongInfo);
      setSongChart(emptySongChart);
    } else if (songId === undefined) {
      setSongInfo(undefined);
      setSongChart(undefined);
      setSubmitStatus(SubmitButtonStatus.None);
    } else {
      Promise.all([
        DBManager.getSongInfo(songId).then(setSongInfo),
        DBManager.getSongChart(songId).then(setSongChart),
      ]);
    }
  }, [songId]);

  function updateSongInfo(info: SongInfo | undefined) {
    setSongInfoChanged(true);
    setSongInfo(info);
  }

  function updateSongChart(chart: SongChart | undefined) {
    setSongChartChanged(true);
    setSongChart(chart);
  }

  function submit() {
    if (songId === undefined || songInfo === undefined || songChart === undefined) return;
    setSubmitStatus(SubmitButtonStatus.Loading);
    if (songId === '') {
      DBManager.createSong(songInfo, songChart)
        .then((newId) => {
          setSongId(newId);
          setSubmitStatus(SubmitButtonStatus.Created);
        })
        .catch(() => {
          setSubmitStatus(SubmitButtonStatus.Failed);
        });
    } else {
      Promise.all([
        songInfoChanged && DBManager.setSongInfo(songInfo),
        songChartChanged && DBManager.setSongChart(songChart),
      ])
        .then(() => {
          setSongInfoChanged(false);
          setSongChartChanged(false);
          setSubmitStatus(SubmitButtonStatus.Updated);
        })
        .catch(() => {
          setSubmitStatus(SubmitButtonStatus.Failed);
        });
    }
  }

  return (
    <div id="app">
      <LeftMenu
        songId={songId}
        setSongId={setSongId}
        songInfo={songInfo}
        setSongInfo={updateSongInfo}
        songChart={songChart}
        setSongChart={updateSongChart}
        submit={submit}
        submitStatus={submitStatus}
      ></LeftMenu>
      <Editor chart={songChart} setChart={updateSongChart}></Editor>
    </div>
  );
}
