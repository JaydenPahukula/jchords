import { ComponentChild, ComponentChildren, RefObject } from 'preact';
import { XIcon } from 'shared/components/icons/xicon';

interface GenericDialogProps {
  dialogRef: RefObject<HTMLDialogElement>;
  children?: ComponentChildren;
  closeButton?: boolean;
  otherButtons?: ComponentChild[];
  class?: string;
}

export function GenericDialog(props: GenericDialogProps) {
  return (
    <dialog
      ref={props.dialogRef}
      class={
        'bg-bg-0 backdrop:bg-dialog-backdrop z-10 m-auto max-w-full overflow-x-hidden overflow-y-auto rounded-lg p-6 shadow-md! ' +
        props.class
      }
    >
      {props.closeButton && (
        <div
          onClick={() => props.dialogRef.current?.close()}
          tabindex={0}
          class="hover:bg-bg-button active:bg-bg-button-hover float-right h-8 w-8 rounded-md p-[5px]"
        >
          <XIcon />
        </div>
      )}
      <div class="flex min-h-2">
        {props.otherButtons?.map((button) => (
          <div class="hover:bg-bg-button active:bg-bg-button-hover float-right h-8 w-8 rounded-md p-[5px]">
            {button}
          </div>
        ))}
      </div>
      <div class="p-4 pt-2">{props.children}</div>
    </dialog>
  );
}
