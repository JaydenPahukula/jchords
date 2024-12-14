import { ForwardedRef, forwardRef } from 'react';

const TransposeMenu = forwardRef<HTMLDivElement>(function TransposeMenu(
  props: {},
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="toolbar-menu" ref={ref}>
      <h2 className="toolbar-menu-header">Transpose</h2>
      <div className="toolbar-menu-section">
        <h3 className="toolbar-menu-section-header">Key</h3>
        <option>{}</option>
      </div>
    </div>
  );
});

export default TransposeMenu;
