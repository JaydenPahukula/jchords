// @ts-ignore
import { parseSong, renderSong } from 'chord-mark';
import { ChangeEvent, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectCurrSong, updateSongSrc } from 'src/redux/slices/songdata';
import './editor.css';
import EditorLeftMenu from './leftmenu/editorleftmenu';

export default function Editor(): ReactElement {
  const song = useAppSelector(selectCurrSong);
  const dispatch = useAppDispatch();

  const renderedSong = renderSong(parseSong(song.src));

  const updateSrc = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(updateSongSrc({ id: song.info.id, newSrc: e.target.value }));

  return (
    <div id="editor-wrapper">
      <EditorLeftMenu />
      <div id="editor">
        <div id="editor-src-section">
          <div className="editor-header-wrapper">
            <h3 className="editor-header">ChordMark Source</h3>
          </div>
          <textarea
            id="editor-src"
            wrap="off"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={song.src}
            onChange={updateSrc}
          ></textarea>
        </div>
        <div id="editor-preview-section">
          <div className="editor-header-wrapper">
            <h3 className="editor-header">Preview</h3>
          </div>
          <pre id="editor-preview" dangerouslySetInnerHTML={{ __html: renderedSong }}></pre>
        </div>
      </div>
    </div>
  );
}
