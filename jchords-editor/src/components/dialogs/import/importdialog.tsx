// @ts-ignore
import { convert2ChordMark } from 'chord-mark-converters/lib/chord-mark-converters.js';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { closeImportDialog } from 'src/redux/slices/dialog';
import { openSong } from 'src/redux/slices/songdata';
import Song from 'src/types/song';
import generateTmpId from 'src/utils/generatetmpid';
import matchScrollEffect from 'src/utils/matchscrolleffect';
import './importdialog.css';

enum InputFormat {
  Auto = 'auto',
  ChordPro = 'chordPro',
  ChordsOverLyrics = 'chordsOverLyrics',
}

const dropDownText = (fmt: InputFormat): string =>
  fmt === InputFormat.Auto
    ? 'Auto-detect'
    : fmt === InputFormat.ChordPro
      ? 'ChordPro'
      : 'Chords over lyrics';

export default function ImportDialog(): ReactElement {
  const [src, setSrc] = useState<string>('');
  const [inputFmt, setInputFmt] = useState<string>(InputFormat.Auto);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (textareaRef.current !== null && previewRef.current !== null)
      matchScrollEffect(textareaRef.current, previewRef.current);
  });

  const dispatch = useAppDispatch();

  const inputFormatOnChange = (e: ChangeEvent<HTMLSelectElement>) => setInputFmt(e.target.value);

  const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => setSrc(e.target.value);

  const convertedSrc = convert2ChordMark(src, { inputFormat: inputFmt });

  const submit = () => {
    const newSong: Song = {
      src: convertedSrc,
      info: {
        id: generateTmpId(),
        title: 'Imported Song',
        artist: '',
      },
    };
    dispatch(openSong({ song: newSong, isNew: true }));
    close();
  };

  const close = () => dispatch(closeImportDialog());

  return (
    <div id="import-dialog" className="dialog">
      <h2>Import a song</h2>
      <div className="dialog-row">
        <label>Input format:</label>
        <select onChange={inputFormatOnChange}>
          {Object.values(InputFormat).map((fmt) => (
            <option key={fmt} value={fmt}>
              {dropDownText(fmt)}
            </option>
          ))}
        </select>
      </div>
      <div id="import-dialog-editor-labels">
        <h2>Paste here:</h2>
        <h2>ChordMark Preview:</h2>
      </div>
      <div id="import-dialog-editor">
        <textarea
          id="import-dialog-editor-textarea"
          ref={textareaRef}
          wrap="off"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={src}
          onChange={textareaOnChange}
        ></textarea>
        <pre id="import-dialog-editor-preview" ref={previewRef}>
          {convertedSrc}
        </pre>
      </div>
      <div className="dialog-footer">
        <button className="dialog-footer-button" onClick={close}>
          Cancel
        </button>
        <button className="dialog-footer-button" disabled={src === ''} onClick={submit}>
          Import
        </button>
      </div>
    </div>
  );
}
