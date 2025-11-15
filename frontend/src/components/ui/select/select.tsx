import { Select as RadixSelect } from 'radix-ui';

export type SelectItemList = {
  value: string;
  name?: string;
}[];

interface SelectProps extends RadixSelect.SelectProps {
  value?: string;
  onValueChange?: (val: string) => void;
  items?: SelectItemList;
}

export function Select(props: SelectProps) {
  return (
    <RadixSelect.Root value={props.value} onValueChange={props.onValueChange}>
      <RadixSelect.Trigger>
        <RadixSelect.Value />
        <RadixSelect.Icon />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton />
          {props.items?.map(({ value, name }) => (
            <RadixSelect.Item value={value}>
              <RadixSelect.ItemText>{name ?? value}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator />
            </RadixSelect.Item>
          ))}
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

// export const Select = {
//   Root: RadixSelect.Root,
//   Trigger: RadixSelect.Trigger,
//   Content: PopoverContent,
//   Close: RadixSelect.Close,
// };
