import { Table, Text } from '@radix-ui/themes';
import { SongInfo } from 'shared/types/songinfo';
import 'src/pages/editor/components/dialogs/opensongdialogtable.css';

interface OpenSongDialogTable {
  list: SongInfo[];
  selectedIndex: number | undefined;
  onRowClicked: (index: number) => void;
  disabled?: boolean;
}

export function OpenSongDialogTable(props: OpenSongDialogTable) {
  return (
    <Table.Root size="1" variant="ghost" mb="3" style={{ maxHeight: '600px', overflowX: 'auto' }}>
      <Table.Body>
        {props.list.map((info, i) => (
          <Table.Row
            key={info.id}
            onClick={() => props.onRowClicked(i)}
            className={
              props.selectedIndex === i ? 'open-song-dialog-row-selected' : 'open-song-dialog-row'
            }
            align="center"
          >
            <Table.Cell height="10px">
              <Text
                truncate
                size="2"
                style={{ cursor: 'pointer' }}
                dangerouslySetInnerHTML={{ __html: info.title }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
