import { useSignal } from '@preact/signals-react';
import { filter, FilterOptions } from 'fuzzy';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { SongInfo } from 'shared/types/songinfo';
import { Button } from 'src/components/ui/button/button';
import { MagnifyingGlassIcon } from 'src/components/ui/icons/magnifyingglassicon';
import { PlayIcon } from 'src/components/ui/icons/playicon';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';
import { TextField } from 'src/components/ui/textfield/textfield';
import { apiGetSongList } from 'src/functions/api/endpoints/getsonglist';
import { useDebounce } from 'src/hooks/usedebounce';

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

  useEffect(() => {
    document.title = 'JChords';
    songList.value = 'loading';
    apiGetSongList().then((result) => {
      songList.value = result ?? 'error';
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <TextField
        className="w-full"
        type="search"
        id="song-search-bar"
        placeholder="Search for a song..."
        value={searchText.value}
        onInput={(e) => (searchText.value = e.currentTarget.value)}
        xButton
      />
      {songList.value === 'loading' ? (
        <LoadingSpinner className="mx-auto my-6" />
      ) : songList.value === 'error' ? (
        <p className="fill-red-11 my-4 w-full text-center">
          Error loading songs{/* TODO: make this nicer */}
        </p>
      ) : searchResults.value.length === 0 ? (
        <div className="text-gray-11 flex flex-col items-center p-4">
          <MagnifyingGlassIcon className="mt-8 mb-6 h-12 w-12" />
          <p className="mb-3 text-xl font-medium">No Results Found</p>
          <p>
            This song doesn't exist yet on JChords, try creating it yourself in the{' '}
            <Link to="/editor" className="link">
              editor
            </Link>
            !
          </p>
        </div>
      ) : (
        <ol>
          {searchResults.value.map((info) => (
            <li className="card mb-2 flex items-center p-2" key={info.id}>
              <div className="grow overflow-hidden pl-1">
                <p
                  className="truncate text-base font-medium"
                  dangerouslySetInnerHTML={{ __html: info.title || '*No Title*' }}
                />
                <p className="text-gray-11 truncate text-sm">{info.artist || '*No Artist*'}</p>
              </div>
              <Button asLink to={'/song/' + info.id} variant="secondary">
                <span>Open</span>
                <PlayIcon className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
