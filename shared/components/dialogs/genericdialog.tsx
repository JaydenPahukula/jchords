import { ComponentChildren, RefObject } from 'preact';
import XIcon from 'shared/components/icons/xicon';

interface GenericDialogProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children: ComponentChildren;
  closeButton?: boolean;
}

export default function GenericDialog(props: GenericDialogProps) {
  return (
    <dialog
      ref={props.dialogRef}
      class="bg-bg-0 backdrop:bg-dialog-bg z-10 m-auto w-96 max-w-full overflow-x-hidden overflow-y-auto rounded-lg p-6 shadow-md!"
    >
      {props.closeButton && (
        <div
          onClick={() => props.dialogRef.current?.close()}
          tabindex={0}
          class="hover:bg-bg-button active:bg-bg-button-hover w-8 rounded-md p-0.5"
        >
          <XIcon />
        </div>
      )}
      <div class="p-4">{props.children}</div>
    </dialog>
  );
}
