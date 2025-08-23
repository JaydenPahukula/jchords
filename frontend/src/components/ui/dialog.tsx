import { Dialog as RadixDialog } from 'radix-ui';
import { IconButton } from 'src/components/ui/iconbutton';
import { XIcon } from 'src/components/ui/icons/xicon';

interface DialogContentProps extends Omit<RadixDialog.DialogContentProps, 'asChild'> {
  closeButton?: boolean;
}

function DialogContent(props: DialogContentProps) {
  const { closeButton, ...dialogProps } = props;

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="my-dialog-bg" />
      <RadixDialog.Content {...dialogProps} className={'my-dialog ' + dialogProps.className}>
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
  return <RadixDialog.Title className={'my-dialog-title ' + className} {...props} />;
}

function DialogNoDescription() {
  return <RadixDialog.Description aria-describedby={undefined} />;
}

export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: RadixDialog.Description,
  NoDescription: DialogNoDescription,
  Close: RadixDialog.Close,
};
