// @ts-ignore
import { parseSong, renderSong } from 'chord-mark';
import { ChangeEvent, ReactElement, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectCurrSong, updateSongSrc } from 'src/redux/slices/songdata';
import './editor.css';
import EditorLeftMenu from './leftmenu/editorleftmenu';

export default function Editor(): ReactElement {
  const srcRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);

  // event listeners to match scrolling
  useEffect(() => {
    const getRatio = (a: HTMLTextAreaElement, b: HTMLPreElement): number =>
      (a.scrollHeight - a.clientHeight) / (b.scrollHeight - b.clientHeight);
    function srcHandler() {
      if (srcRef.current !== null && previewRef.current !== null) {
        previewRef.current.removeEventListener('scroll', previewHandler);
        previewRef.current.scrollTop =
          srcRef.current.scrollTop / getRatio(srcRef.current, previewRef.current);
        window.requestAnimationFrame(() => {
          previewRef.current?.addEventListener('scroll', previewHandler);
        });
      }
    }
    function previewHandler() {
      if (srcRef.current !== null && previewRef.current !== null) {
        srcRef.current.removeEventListener('scroll', srcHandler);
        srcRef.current.scrollTop =
          previewRef.current.scrollTop * getRatio(srcRef.current, previewRef.current);
        window.requestAnimationFrame(() => {
          srcRef.current?.addEventListener('scroll', srcHandler);
        });
      }
    }
    srcRef.current?.addEventListener('scroll', srcHandler);
    previewRef.current?.addEventListener('scroll', previewHandler);
  });

  const song = useAppSelector(selectCurrSong);
  const dispatch = useAppDispatch();

  const renderedSong = renderSong(parseSong(song.src ?? ''));

  const srcOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
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
            ref={srcRef}
            wrap="off"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={song.src}
            onChange={srcOnChange}
          ></textarea>
        </div>
        <div id="editor-preview-section">
          <div className="editor-header-wrapper">
            <h3 className="editor-header">Preview</h3>
          </div>
          <pre
            id="editor-preview"
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: renderedSong }}
          ></pre>
        </div>
      </div>
    </div>
  );
}
