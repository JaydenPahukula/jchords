import SongInfo from 'src/types/songinfo';
import './songeditorpicker.css';

interface SongEditorPickerComponentProps {
  songs: SongInfo[];
  selectedId: string | undefined;
  onIdSelected: (id: string | undefined) => void;
}

export default function SongEditorPickerComponent(props: SongEditorPickerComponentProps) {
  const disabled = props.selectedId !== undefined;

  function optionClicked(id: string) {
    if (!disabled) {
      props.onIdSelected(id);
    }
  }

  return (
    <div className={`song-editor-picker${disabled ? ' disabled' : ''}`}>
      {[...props.songs, undefined].map((option) => {
        const id = option?.id || '';
        const selected = id === props.selectedId;
        return (
          <div
            className={`song-editor-picker-row${selected ? ' selected' : ''}`}
            key={id}
            onClick={() => optionClicked(id)}
          >
            {id === '' ? 'Create a new song...' : `${option?.name} (${id})`}
          </div>
        );
      })}
    </div>
  );
}
