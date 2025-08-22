import { Dialog as RadixDialog } from 'radix-ui';
import { IconButton } from 'src/components/ui/iconbutton';
import { XIcon } from 'src/components/ui/icons/xicon';

interface DialogContentProps extends Omit<RadixDialog.DialogContentProps, 'asChild'> {
  closeButton?: boolean;
}

function DialogContent(props: DialogContentProps) {
  const { closeButton, className, ...dialogProps } = props;

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fade-in fixed inset-0 bg-black/25" />
      <RadixDialog.Content
        className={`pop-in bg-gray-1 fixed top-1/2 left-1/2 max-h-[95vh] w-sm max-w-[95vw] -translate-1/2 overflow-hidden rounded-2xl p-8 focus:outline-none ${className}`}
        {...dialogProps}
      >
        {closeButton && (
          <RadixDialog.Close asChild>
            <IconButton variant="subtle" className="fixed top-4 right-4" icon={XIcon} />
          </RadixDialog.Close>
        )}
        {dialogProps.children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

function DialogTitle({ className, ...props }: RadixDialog.DialogTitleProps) {
  return <RadixDialog.Title className={`mb-1 text-2xl font-bold ${className}`} {...props} />;
}

export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: RadixDialog.Description,
  Close: RadixDialog.Close,
};
