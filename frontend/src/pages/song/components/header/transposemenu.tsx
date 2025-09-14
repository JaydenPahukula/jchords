import { Signal } from '@preact/signals-react';
import { Flex, Heading, Select, Separator, Text } from '@radix-ui/themes';
import { JCAccidental, JCKey, JCNote, JCRenderOptions } from 'engine';
import { mod } from 'shared/functions/mod';
import { ParsedSong } from 'shared/types/parsedsong';
import { Popover } from 'src/components/ui/popover/popover';

const majorKeyOptions: [string, JCNote, JCAccidental][] = [
  ['C', JCNote.C, 'sharp'],
  ['C#', JCNote.CSharp, 'sharp'],
  ['Db', JCNote.CSharp, 'flat'],
  ['D', JCNote.D, 'sharp'],
  ['D#', JCNote.DSharp, 'sharp'],
  ['Eb', JCNote.DSharp, 'flat'],
  ['E', JCNote.E, 'sharp'],
  ['F', JCNote.F, 'flat'],
  ['F#', JCNote.FSharp, 'sharp'],
  ['Gb', JCNote.FSharp, 'flat'],
  ['G', JCNote.G, 'sharp'],
  ['G#', JCNote.GSharp, 'sharp'],
  ['Ab', JCNote.GSharp, 'flat'],
  ['A', JCNote.A, 'sharp'],
  ['A#', JCNote.ASharp, 'sharp'],
  ['Bb', JCNote.ASharp, 'flat'],
  ['B', JCNote.B, 'sharp'],
];

const minorKeyOptions: [string, JCNote, JCAccidental][] = majorKeyOptions.map(([s, note, acc]) => [
  s + 'm',
  note,
  acc,
]);

interface TransposeMenuProps {
  song: ParsedSong | undefined;
  renderOptionsSignal: Signal<JCRenderOptions>;
}

export function TransposeMenu(props: TransposeMenuProps) {
  if (props.song === undefined) return <></>;

  const defaultKey: JCKey = props.song.parsed.startingKey ?? new JCKey(JCNote.C, false, 'sharp');
  const defaultKeyString = defaultKey.render();

  const currTransposeVal = mod(props.renderOptionsSignal.value.transpose + 5, 12) - 5; // val is in [-5, 6]
  const currAccidental: JCAccidental =
    props.renderOptionsSignal.value.accidentalPreference === 'original'
      ? (defaultKey.originalAccidental ?? 'sharp')
      : props.renderOptionsSignal.value.accidentalPreference;

  const currKey: JCKey = new JCKey(
    mod(defaultKey.note + currTransposeVal, 12) as JCNote,
    defaultKey.minor,
    currAccidental,
  );

  const keyOptions = defaultKey?.minor ? minorKeyOptions : majorKeyOptions;
  function handleKeyChange(value: string) {
    const result = keyOptions.find(([s]) => s === value);
    if (result === undefined) return;
    const [_, note, acc] = result;
    const transposeVal = mod(note - defaultKey.note, 12);
    props.renderOptionsSignal.value = {
      ...props.renderOptionsSignal.value,
      transpose: transposeVal,
      accidentalPreference: acc,
    };
  }

  const transposeOptions = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  function handleTransposeChange(value: string) {
    const n = parseInt(value);
    if (Number.isNaN(n)) return;
    props.renderOptionsSignal.value = { ...props.renderOptionsSignal.value, transpose: n };
  }

  function handleAccidentalsChange(value: string) {
    if (value === 'flat' || value === 'sharp')
      props.renderOptionsSignal.value = {
        ...props.renderOptionsSignal.value,
        accidentalPreference: value,
      };
  }

  return (
    <Popover.Content width="180px">
      <Heading as="h2" size="5" mb="2">
        Transpose
      </Heading>
      <Separator size="4" mb="2" />
      <Heading as="h3" size="3" weight="medium" mb="1">
        Automatic
      </Heading>
      <Flex align="center" justify="between" gap="2" mb="2">
        <Text as="label" htmlFor="automatic-key-select">
          Key:{' '}
        </Text>
        <Select.Root value={currKey.render()} onValueChange={handleKeyChange}>
          <Select.Trigger id="automatic-key-select" />
          <Select.Content>
            {...keyOptions.map(([s]) => (
              <Select.Item value={s}>{s === defaultKeyString ? s + ' (default)' : s}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Separator size="4" mb="2" />
      <Heading as="h3" size="3" weight="medium" mb="1">
        Manual
      </Heading>
      <Flex align="center" justify="between" gap="2" mb="1">
        <Text as="label" htmlFor="transpose-val-select">
          Transpose:{' '}
        </Text>
        <Select.Root value={currTransposeVal.toString()} onValueChange={handleTransposeChange}>
          <Select.Trigger id="transpose-val-select" />
          <Select.Content>
            {...transposeOptions.map((val) => {
              const s = val.toString();
              return <Select.Item value={s}>{val >= 0 ? '+' + s : s}</Select.Item>;
            })}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex align="center" justify="between" gap="2">
        <Text as="label" htmlFor="transpose-val-select">
          Accidentals:{' '}
        </Text>
        <Select.Root value={currAccidental} onValueChange={handleAccidentalsChange}>
          <Select.Trigger id="transpose-val-select" />
          <Select.Content>
            <Select.Item value={'sharp'}>Sharp</Select.Item>
            <Select.Item value={'flat'}>Flat</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Popover.Content>
  );
}
