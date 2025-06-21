import { Box, Flex, IconButton } from '@radix-ui/themes';
import { Toast } from 'radix-ui';
import { ReactNode } from 'react';
import { growlManager } from 'shared/classes/growlmanager';
import { XIcon } from 'shared/components/icons/xicon';

interface GrowlProviderProps {
  children: ReactNode;
}

export function GrowlProvider(props: GrowlProviderProps) {
  return (
    <Toast.Provider>
      {props.children}
      <Toast.Viewport asChild>
        <Flex direction="column" position="fixed" bottom="0" right="0" p="7" gap="5">
          {growlManager.growlList.value.map((growl) => (
            <Toast.Root duration={10000} key={growl.id} onOpenChange={growl.onOpenChange} asChild>
              <Flex className="growl" align="center" p="4" pl="5" gap="4">
                <Box>
                  <Toast.Title>{growl.title}</Toast.Title>
                  <Toast.Description>{growl.description}</Toast.Description>
                </Box>
                {(growl.closeButton ?? true) && (
                  <Toast.Close asChild>
                    <IconButton variant="ghost">
                      <XIcon />
                    </IconButton>
                  </Toast.Close>
                )}
              </Flex>
            </Toast.Root>
          ))}
        </Flex>
      </Toast.Viewport>
    </Toast.Provider>
  );
}
