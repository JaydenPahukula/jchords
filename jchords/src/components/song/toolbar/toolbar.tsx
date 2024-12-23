import { ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GearIcon32 from 'src/components/icons/gearicon32';
import LeftArrowIcon32 from 'src/components/icons/leftarrowicon32';
import MusicNoteIcon32 from 'src/components/icons/musicnoteicon32';
import { useAppSelector } from 'src/redux/hooks';
import { selectCurrSongInfo } from 'src/redux/slices/songdata';
import TransposeMenu from './transposemenu/transposemenu';

const toolbarButtonClasses =
  'padding-0 text-bg1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-none bg-transparent outline-none hover:bg-bg8 active:bg-bg7';

function ToolbarMenuButton({
  renderMenu,
  children,
}: {
  renderMenu: (ref: RefObject<HTMLDivElement>) => ReactElement;
  children: ReactNode;
}): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // close menu when clicked elsewhere
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isOpen &&
        !menuRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  return (
    <div>
      <button className={toolbarButtonClasses} ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        {children}
      </button>
      {isOpen && <div className="relative h-0 w-0 self-end">{renderMenu(menuRef)}</div>}
    </div>
  );
}

export default function Toolbar(): ReactElement {
  const title = useAppSelector(selectCurrSongInfo)?.title ?? '';

  return (
    <div className="bg-bg9 text-bg1 flex h-12 items-center justify-start">
      <div className="flex flex-shrink flex-grow items-center gap-1.5">
        <Link to="/" className={toolbarButtonClasses}>
          <LeftArrowIcon32 />
        </Link>
      </div>
      <h1 className="flex flex-grow overflow-hidden text-nowrap text-xl font-semibold">{title}</h1>
      <div className="flex-shrinkflex-grow flex items-center justify-end gap-1.5">
        <ToolbarMenuButton renderMenu={(ref) => <TransposeMenu ref={ref} />}>
          <MusicNoteIcon32 />
        </ToolbarMenuButton>
        <button className={toolbarButtonClasses}>
          <GearIcon32 />
        </button>
      </div>
    </div>
  );
}
