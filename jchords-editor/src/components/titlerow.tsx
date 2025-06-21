import { Box, Flex, Heading } from '@radix-ui/themes';
import { useContext } from 'react';
import { UserCircle } from 'shared/components/usercircle/usercircle';
import { TabList } from 'src/components/tablist';
import { showDialog } from 'src/state/functions/showdialog';
import { StateContext } from 'src/state/statecontext';

export function TitleRow() {
  const { user } = useContext(StateContext);

  return (
    <Flex id="title-row" align="end">
      <Box mx="4" my="auto" asChild>
        <Heading as="h1" wrap="nowrap" size="7">
          JChords Editor
        </Heading>
      </Box>
      <Flex flexGrow="1" flexShrink="1" align="end">
        <Box className="absolute h-full w-4 bg-[linear-gradient(90deg,var(--color-bg-4),transparent)]" />
        <TabList />
        <Box className="absolute right-0 h-full w-4 bg-[linear-gradient(270deg,var(--color-bg-4),transparent)]" />
      </Flex>
      <Box flexShrink="0" width="48px" height="48px">
        <UserCircle user={user.value} showDialog={showDialog} />
      </Box>
    </Flex>
  );
}
