import SongInfo from 'shared/types/songinfo';
import './songpicker.css';

interface SongPickerComponentProps {
  songs: SongInfo[];
  selectedId: string | undefined;
  onIdSelected: (id: string | undefined) => void;
}

export default function SongPickerComponent(props: SongPickerComponentProps) {
  const disabled = props.selectedId !== undefined;

  function onClick(id: string) {
    if (!disabled) {
      props.onIdSelected(id);
    }
  }

  return (
    <div className={`editor-picker${disabled ? ' disabled' : ''}`}>
      {[...props.songs, undefined].map((option) => {
        const id = option?.id || '';
        return (
          <div
            className={`editor-picker-row${id === props.selectedId ? '-selected' : ''}`}
            key={id}
            onClick={() => onClick(id)}
          >
            {id === '' ? 'Create a new song...' : `${option?.name} (${id})`}
          </div>
        );
      })}
    </div>
  );
}
