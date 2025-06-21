import { Box, Flex, Heading } from '@radix-ui/themes';
import { CSSProperties, useContext } from 'react';
import { UserCircle } from 'shared/components/usercircle/usercircle';
import { TabList } from 'src/components/tablist';
import { showDialog } from 'src/state/functions/showdialog';
import { StateContext } from 'src/state/statecontext';

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
  const { user } = useContext(StateContext);

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
      <UserCircle user={user.value} showDialog={showDialog} />
    </Flex>
  );
}
