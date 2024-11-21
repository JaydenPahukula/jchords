import { ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';

/*
 * This component is a toolbar button that opens a menu when clicked
 */

interface ToolbarMenuProps {
  renderMenu: (ref: RefObject<HTMLDivElement>) => ReactElement;
  children: ReactNode;
}

export default function ToolbarMenuButton({
  renderMenu,
  children,
}: ToolbarMenuProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // close menu when clicked elsewhere
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        isOpen &&
        !menuRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="toolbar-menu-button">
      <button className="toolbar-button" ref={buttonRef} onClick={toggle}>
        {children}
      </button>
      {isOpen && <div className="toolbar-menu-wrapper">{renderMenu(menuRef)}</div>}
    </div>
  );
}
