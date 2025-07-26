import { Popover as RadixPopover } from 'radix-ui';

function PopoverContent({ className, children, ...props }: RadixPopover.PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        {...props}
        className={`bg-gray-1 m-2 mt-0 min-w-[250px] overflow-hidden rounded-md p-4 shadow-[0_12px_60px_#00000030] ${className}`}
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
};
