import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SongPage } from 'src/pages/song/components/songpage';
import 'src/style/theme.css';

createRoot(document.body).render(
  <StrictMode>
    <Theme grayColor="slate" accentColor="gray">
      <SongPage />
    </Theme>
  </StrictMode>,
);
