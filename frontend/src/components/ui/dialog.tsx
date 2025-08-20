import { Dialog as RadixDialog } from 'radix-ui';
import { ArrowLeftIcon } from 'src/components/icons/arrowlefticon';
import { XIcon } from 'src/components/icons/xicon';
import { IconButton } from 'src/components/ui/iconbutton';

interface DialogContentProps extends RadixDialog.DialogContentProps {
  closeButton?: boolean;
  backButton?: () => void;
}

function DialogContent(props: DialogContentProps) {
  const { closeButton, backButton, ...dialogProps } = props;

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fade-in fixed inset-0 bg-black/25" />
      <RadixDialog.Content
        className="pop-in bg-gray-1 fixed top-1/2 left-1/2 max-h-[95vh] w-sm max-w-[95vw] -translate-1/2 rounded-2xl p-8"
        {...dialogProps}
      >
        {backButton && (
          <button className="mt-[-2] mb-3 ml-[-2]">
            <ArrowLeftIcon />
          </button>
        )}
        {closeButton && (
          <RadixDialog.Close asChild>
            <IconButton className="float-right -mt-2 -mr-2" icon={XIcon} />
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
