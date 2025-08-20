import { useSignal } from '@preact/signals-react';
import { Box, Button, Card, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import { filter, FilterOptions } from 'fuzzy';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { SongInfo } from 'shared/types/songinfo';
import { MagnifyingGlassIcon } from 'src/components/icons/magnifyingglassicon';
import { PlayIcon } from 'src/components/icons/playicon';
import { Size } from 'src/enums/size';
import { apiGetSongList } from 'src/functions/api/endpoints/getsonglist';
import { useDebounce } from 'src/hooks/usedebounce';
import { useSizeSignal } from 'src/hooks/usesizesignal';

const fuzzyOptions: FilterOptions<SongInfo> = {
  extract: (info) => info.title,
  pre: '<mark>',
  post: '</mark>',
};

export function HomePage() {
  const searchText = useSignal('');

  const songList = useSignal<SongInfo[] | 'loading' | 'error'>('loading');
  const searchResults = useSignal<SongInfo[]>([]);

  const updateSearchResults = useDebounce(() => {
    const list = songList.value;
    if (list === 'loading' || list === 'error' || searchText.value.length === 0) return;
    const matches = filter(searchText.value, list, fuzzyOptions);
    searchResults.value = matches.map(({ original, string }) => ({ ...original, title: string }));
  }, 200);

  useEffect(() => {
    const list = songList.value;
    if (list === 'loading' || list === 'error') {
      searchResults.value = [];
    } else if (searchText.value.length === 0) {
      searchResults.value = list;
    } else {
      updateSearchResults();
    }
  }, [songList.value, searchText.value]);

  const sizeSignal = useSizeSignal();

  useEffect(() => {
    document.title = 'JChords';
    songList.value = 'loading';
    apiGetSongList().then((result) => {
      songList.value = result ?? 'error';
    });
  }, []);

  return (
    <>
      <Box width="100%" mb="4" asChild>
        <TextField.Root
          placeholder="Search for a song..."
          size="3"
          value={searchText.value}
          onInput={(e) => (searchText.value = e.currentTarget.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      {songList.value === 'loading' ? (
        <Spinner mx="auto" my="6" size="3" />
      ) : songList.value === 'error' ? (
        <Box width="100%" asChild>
          <Text align="center" my="4" color="red">
            Error loading songs{/* TODO: make this nicer */}
          </Text>
        </Box>
      ) : searchResults.value.length === 0 ? (
        <Flex direction="column" align="center" style={{ color: 'var(--gray-11)' }} p="4">
          <Box mb="6" mt="8" asChild>
            <MagnifyingGlassIcon className="h-12 w-12" />
          </Box>
          <Text size="5" weight="medium" mb="3">
            No Results Found
          </Text>
          <Text size="3" align="center">
            This song doesn't exist yet on JChords, try creating it yourself in the{' '}
            <Link to="/editor" className="link">
              editor
            </Link>
            !
          </Text>
        </Flex>
      ) : (
        searchResults.value.map((info) => (
          <Card key={info.id} mb="2" asChild>
            <Box p="2">
              <Flex align="center">
                <Box flexGrow="1" overflow="hidden" pl="1">
                  <Text
                    truncate
                    as="p"
                    weight="medium"
                    size="3"
                    dangerouslySetInnerHTML={{ __html: info.title || '*No Title*' }}
                  />
                  <Text truncate as="p" size="2" color="gray">
                    {info.artist || '*No Artist*'}
                  </Text>
                </Box>
                <Box p={{ initial: '3', sm: '4' }} asChild>
                  <Button size="3" variant="outline" asChild>
                    <Link to={'/song/' + info.id}>
                      {sizeSignal.value >= Size.sm && 'Open'}
                      <PlayIcon height="20px" width="20px" />
                    </Link>
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Card>
        ))
      )}
    </>
  );
}
