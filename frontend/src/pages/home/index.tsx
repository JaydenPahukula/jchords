import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { GrowlProvider } from 'src/components/growl/growlprovider';
import { AccountPage } from 'src/pages/home/components/accountpage';
import { HomeLayout } from 'src/pages/home/components/homelayout';
import { HomePage } from 'src/pages/home/components/homepage';
import 'src/style/theme.css';

createRoot(document.body).render(
  <StrictMode>
    <Theme grayColor="slate" accentColor="gray">
      <GrowlProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GrowlProvider>
    </Theme>
  </StrictMode>,
);
