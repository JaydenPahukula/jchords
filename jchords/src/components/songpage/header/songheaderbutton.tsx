import { ComponentChild } from 'preact';

interface SongHeaderButtonProps {
  children: ComponentChild;
  onClick?: () => void;
}

export default function SongHeaderButton(props: SongHeaderButtonProps) {
  return (
    <button
      class="text-fg-9 hover:bg-fg-9/10 active:bg-fg-9/20 w-10 rounded-md"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
