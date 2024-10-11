import { ForwardedRef, forwardRef } from 'react';
import MenuTransposeSection from './sections/transposesection';
import './songpagemenu.css';

interface SongPageMenuProps {}

const SongPageMenu = forwardRef<HTMLDivElement, SongPageMenuProps>(function SongPageMenu(
  props: SongPageMenuProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="menu" ref={ref}>
      <div className="menu-title-container">
        <h2 className="menu-title">Settings</h2>
      </div>
      <MenuTransposeSection />
    </div>
  );
});

export default SongPageMenu;
