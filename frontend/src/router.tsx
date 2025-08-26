import { createBrowserRouter } from 'react-router';
import { EditorPage } from 'src/pages/editor/components/editorpage';
import { AccountPage } from 'src/pages/home/components/accountpage/accountpage';
import { HomeLayout } from 'src/pages/home/components/homelayout';
import { HomePage } from 'src/pages/home/components/homepage/homepage';
import { SongPage } from 'src/pages/song/components/songpage';

export const router = createBrowserRouter(
  [
    {
      path: '/song/:id',
      Component: SongPage,
    },
    {
      path: '/editor',
      Component: EditorPage,
    },
    {
      path: '/',
      Component: HomeLayout,
      children: [
        {
          index: true,
          Component: HomePage,
        },
        {
          path: '/account',
          Component: AccountPage,
        },
      ],
    },
  ],
  {},
);
