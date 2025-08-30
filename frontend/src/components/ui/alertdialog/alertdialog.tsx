import { AlertDialog as RadixAlertDialog } from 'radix-ui';
import 'src/components/ui/alertdialog/alertdialog.css';

type AlertDialogContentProps = Omit<RadixAlertDialog.AlertDialogContentProps, 'asChild'>;

function AlertDialogContent(props: AlertDialogContentProps) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className="my-dialog-bg" />
      <RadixAlertDialog.Content
        role="alertdialog"
        {...props}
        className={'my-dialog my-alert-dialog ' + (props.className ?? '')}
      />
    </RadixAlertDialog.Portal>
  );
}

function AlertDialogTitle({ className, ...props }: RadixAlertDialog.AlertDialogTitleProps) {
  return <RadixAlertDialog.Title className={'my-dialog-title ' + className} {...props} />;
}

function AlertDialogDescription(props: RadixAlertDialog.AlertDialogDescriptionProps) {
  return (
    <RadixAlertDialog.Description
      {...props}
      className={'my-dialog-description ' + (props.className ?? '')}
    />
  );
}

export const AlertDialog = {
  Root: RadixAlertDialog.Root,
  Trigger: RadixAlertDialog.Trigger,
  Content: AlertDialogContent,
  Cancel: RadixAlertDialog.Cancel,
  Action: RadixAlertDialog.Action,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
};
