import { ComponentChild } from 'preact';

interface SongHeaderButtonProps {
  icon: ComponentChild;
  onClick?: () => void;
}

export default function SongHeaderButton(props: SongHeaderButtonProps) {
  return (
    <button
      class="w-10 rounded-md text-fg9 hover:bg-[#ffffff20] active:bg-[#ffffff30]"
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
