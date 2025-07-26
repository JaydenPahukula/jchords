import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { GrowlProvider } from 'src/components/growl/growlprovider';
import 'src/index.css';
import { router } from 'src/router';

createRoot(document.body).render(
  <StrictMode>
    <Theme grayColor="slate" accentColor="gray">
      <GrowlProvider>
        <RouterProvider router={router} />
      </GrowlProvider>
    </Theme>
    ,
  </StrictMode>,
);
