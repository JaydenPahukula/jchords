import { Box, Flex, IconButton } from '@radix-ui/themes';
import { Dialog as RadixDialog } from 'radix-ui';
import { XIcon } from 'src/components/icons/xicon';

interface DialogContentProps extends RadixDialog.DialogContentProps {
  closeButton?: boolean;
  backButton?: () => void;
}

export function DialogContent(props: DialogContentProps) {
  const { closeButton, backButton, ...dialogProps } = props;

  function onOpenChange(open: boolean) {
    if (open) changeDialog(props.type);
    else close();
  }

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-black/20" />
      <RadixDialog.Content width="384px" maxWidth="95vw" maxHeight="95vw" {...dialogProps}>
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
            <RadixDialog.Close>
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </RadixDialog.Close>
          </Box>
        )}
        <Box height="100%" width="100%">
          {dialogProps.children}
        </Box>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: DialogContent,
  Title: RadixDialog.Title,
  Description: RadixDialog.Description,
  Close: RadixDialog.Close,
};
