import { ComponentChild } from 'preact';

interface SongHeaderButtonProps {
  children: ComponentChild;
  onClick?: () => void;
}

export default function SongHeaderButton(props: SongHeaderButtonProps) {
  return (
    <button
      class="text-fg-8 hover:bg-fg-8/10 active:bg-fg-8/20 w-10 rounded-md"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
