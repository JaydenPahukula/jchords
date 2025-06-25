import { useComputed } from '@preact/signals-react';
import { Box, Button, ButtonProps, Flex } from '@radix-ui/themes';
import { OpenFolderIcon } from 'shared/components/icons/openfoldericon';
import { PlusCircleIcon } from 'shared/components/icons/pluscircleicon';
import { TrashIcon } from 'shared/components/icons/trashicon';
import { UploadIcon } from 'shared/components/icons/uploadicon';
import { DialogType } from 'shared/enums/dialogtype';
import { showDialog } from 'src/state/functions/showdialog';
import { newTab } from 'src/state/functions/tabs';
import { useStateContext } from 'src/state/statecontext';

const ToolbarButton = (props: ButtonProps) => (
  <Box height="28px" px="2" asChild>
    <Button className="toolbar-button" {...props}>
      {props.children}
    </Button>
  </Box>
);

export function Toolbar() {
  const state = useStateContext();

  const deleteButtonDisabled = useComputed(
    () => state.isCurrSongNew.value || state.currSong.value.info.author !== state.user.value?.uid,
  );

  return (
    <Flex height="40px" gap="2" align="center" px="2" style={{ borderBottom: 'var(--border)' }}>
      <ToolbarButton onClick={() => newTab()}>
        <PlusCircleIcon />
        <p className="mr-2 whitespace-nowrap">New Song</p>
      </ToolbarButton>
      <ToolbarButton onClick={() => showDialog(DialogType.OpenSong)}>
        <OpenFolderIcon />
        <p className="mr-2 whitespace-nowrap">Open Song</p>
      </ToolbarButton>
      <ToolbarButton onClick={() => showDialog(DialogType.Import)}>
        <UploadIcon />
        <p className="mr-2 whitespace-nowrap">Import</p>
      </ToolbarButton>
      <ToolbarButton
        disabled={deleteButtonDisabled.value}
        onClick={() => showDialog(DialogType.DialogConfirmation)}
      >
        <TrashIcon />
        <p className="mr-2 whitespace-nowrap">Delete</p>
      </ToolbarButton>
    </Flex>
  );
}
