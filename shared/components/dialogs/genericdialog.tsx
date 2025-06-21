import { Dialog } from '@radix-ui/themes';
import { ContentProps } from '@radix-ui/themes/components/dialog';
import { ComponentChild } from 'preact';
import { DialogProps } from 'shared/types/dialog/dialogprops';

interface GenericDialogProps extends ContentProps, DialogProps {
  closeButton?: boolean;
  otherButtons?: ComponentChild[];
  class?: string;
}

export function GenericDialog(props: GenericDialogProps) {
  function onOpenChange(open: boolean) {
    console.log('onOpenChange', open);
    if (open) props.changeDialog(props.type);
    else props.close();
  }
  return (
    <Dialog.Root open={props.open.value} onOpenChange={onOpenChange} key={props.type}>
      <Dialog.Content {...props}>
        {/* {props.otherButtons !== undefined && props.otherButtons.length > 0 && (
          <div class="mt-[-4px] ml-[-4px] flex gap-2">
            {props.otherButtons.map((button) => (
              <div class="hover:bg-bg-button active:bg-bg-button-hover h-7 w-7 cursor-pointer rounded-sm p-[3px]">
                {button}
              </div>
            ))}
          </div>
        )}
        {props.closeButton && (
          <Dialog.Close class="hover:bg-bg-button active:bg-bg-button-hover absolute top-3 right-3 h-7 w-7 cursor-pointer rounded-sm p-[3px]">
            <XIcon />
          </Dialog.Close>
        )} */}
        <div className="flex h-full flex-col p-2">{props.children}</div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
