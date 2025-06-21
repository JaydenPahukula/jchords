import { Box, Dialog, Flex, IconButton } from '@radix-ui/themes';
import { ContentProps } from '@radix-ui/themes/components/dialog';
import { ReactElement } from 'react';
import { XIcon } from 'shared/components/icons/xicon';
import { DialogProps } from 'shared/types/dialog/dialogprops';

interface GenericDialogProps extends ContentProps, DialogProps {
  closeButton?: boolean;
  otherButtons?: [ReactElement, () => void][];
}

export function GenericDialog(props: GenericDialogProps) {
  const { closeButton, otherButtons, changeDialog, close, ...dialogProps } = props;

  function onOpenChange(open: boolean) {
    if (open) changeDialog(props.type);
    else close();
  }

  return (
    <Dialog.Root open={props.open.value} onOpenChange={onOpenChange}>
      <Dialog.Content width="384px" maxWidth="95vw" maxHeight="95vw" {...dialogProps}>
        {otherButtons !== undefined && otherButtons.length > 0 && (
          <Flex mt="-2" ml="-2" gap="2" mb="3">
            {otherButtons.map(([button, onClick], index) => (
              <IconButton key={index} variant="ghost" onClick={onClick}>
                {button}
              </IconButton>
            ))}
          </Flex>
        )}
        {closeButton && (
          <Box position="absolute" top="4" right="4" asChild>
            <Dialog.Close>
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </Dialog.Close>
          </Box>
        )}
        <Box height="100%" width="100%">
          {dialogProps.children}
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
