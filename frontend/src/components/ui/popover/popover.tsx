import { Popover as RadixPopover } from 'radix-ui';

function PopoverContent({ className, children, ...props }: RadixPopover.PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        arrowPadding={24}
        collisionPadding={8}
        {...props}
        className={'my-popover ' + className}
      >
        <RadixPopover.Arrow height="8" width="16" className="fill-gray-1" />
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

export const Popover = {
  Root: RadixPopover.Root,
  Trigger: RadixPopover.Trigger,
  Content: PopoverContent,
  Close: RadixPopover.Close,
};
