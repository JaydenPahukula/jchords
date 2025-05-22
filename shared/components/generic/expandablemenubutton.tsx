import { ComponentChild } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

interface ExpandableMenuButtonProps {
  children: ComponentChild;
  menu: ComponentChild;
  ljust?: boolean;
}

export function ExpandableMenuButton(props: ExpandableMenuButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        isOpen &&
        !menuContainerRef.current?.contains(e.target as Node) &&
        !buttonContainerRef.current?.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      class={
        'expandable-menu-button flex items-end ' + (props.ljust ? 'flex-row-reverse' : 'flex-row')
      }
    >
      <div class="flex h-full w-full" ref={buttonContainerRef} onClick={toggle}>
        {props.children}
      </div>
      {isOpen && (
        <div class="relative h-0 w-0">
          <div
            ref={menuContainerRef}
            class={'absolute top-[3px] ' + (props.ljust ? 'left-0' : 'right-0')}
          >
            {props.menu}
          </div>
        </div>
      )}
    </div>
  );
}
