import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { GrowlProvider } from 'shared/components/growls/growlprovider';
import { HomeLayout } from 'src/components/homepage/homelayout';
import { HomePage } from 'src/components/homepage/homepage';
import { SongPage } from 'src/components/songpage/songpage';

export function App() {
  return (
    <StrictMode>
      <Theme grayColor="slate" accentColor="gray">
        <GrowlProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/song/:songId" element={<SongPage />} />
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GrowlProvider>
      </Theme>
    </StrictMode>
  );
}
