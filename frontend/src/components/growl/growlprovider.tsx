import { batch, computed, signal } from '@preact/signals-react';
import { Box, Flex, IconButton } from '@radix-ui/themes';
import { Toast } from 'radix-ui';
import { ReactNode } from 'react';
import 'src/components/growl/growl.css';
import { XIcon } from 'src/components/ui/icons/xicon';
import { Growl } from 'src/types/growl/growl';

// Stores extra information about the growl for the manager
interface GrowlRecord extends Growl {
  id: number;
  close: () => void;
  onOpenChange: (open: boolean) => void;
}

class GrowlManager {
  private nextId = signal(0);
  private growls = signal<GrowlRecord[]>([]);

  constructor() {}

  public growlList = computed(() => this.growls.value);

  public dispatchGrowl(growl: Growl) {
    const id = this.nextId.value;

    const closeSelf = () => {
      this.growls.value = this.growls.value.filter((g) => g.id !== id);
    };

    const record: GrowlRecord = {
      ...growl,
      id: id,
      close: closeSelf,
      onOpenChange: (open: boolean) => !open && closeSelf(),
    };

    // add to growls
    batch(() => {
      this.nextId.value = this.nextId.value + 1;
      this.growls.value = [...this.growls.value, record];
    });
  }
}

const growlManager = new GrowlManager();

export function dispatchGrowl(growl: Growl) {
  growlManager.dispatchGrowl(growl);
}

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
            <Toast.Root duration={5000} key={growl.id} onOpenChange={growl.onOpenChange} asChild>
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
