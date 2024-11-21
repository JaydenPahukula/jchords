import { ForwardedRef, forwardRef } from 'react';

const TransposeMenu = forwardRef<HTMLDivElement>(function TransposeMenu(
  props: {},
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="toolbar-menu" ref={ref}>
      transpose
    </div>
  );
});

export default TransposeMenu;
