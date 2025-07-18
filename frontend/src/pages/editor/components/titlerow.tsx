import { Box, Flex, Heading } from '@radix-ui/themes';
import { CSSProperties } from 'react';
import { UserCircle } from 'src/components/usercircle';
import { DialogType } from 'src/enums/dialogtype';
import { TabList } from 'src/pages/editor/components/tablist';
import 'src/pages/editor/components/titlerow.css';
import { showDialog } from 'src/pages/editor/state/functions/showdialog';
import { useStateContext } from 'src/pages/editor/state/statecontext';

const leftGradientStyle: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '16px',
  backgroundImage: 'linear-gradient(90deg,var(--gray-6),transparent)',
};

const rightGradientStyle: CSSProperties = {
  position: 'absolute',
  right: '0',
  height: '100%',
  width: '16px',
  backgroundImage: 'linear-gradient(270deg,var(--gray-6),transparent)',
};

export function TitleRow() {
  const { user } = useStateContext();

  return (
    <Flex height="48px" id="title-row" align="end" width="100%">
      <Box ml="4" mr="1" my="auto" asChild>
        <Heading as="h1" wrap="nowrap" size="7">
          JChords Editor
        </Heading>
      </Box>
      <Flex flexGrow="1" flexShrink="1" align="end" overflowX="hidden" position="relative">
        <div style={leftGradientStyle} />
        <TabList />
        <div style={rightGradientStyle} />
        <Box className="absolute right-0 h-full w-4 bg-[linear-gradient(270deg,var(--color-bg-4),transparent)]" />
      </Flex>
      <UserCircle
        user={user.value ?? null}
        openLoginDialog={() => showDialog(DialogType.Login)}
        width="48px"
      />
    </Flex>
  );
}
