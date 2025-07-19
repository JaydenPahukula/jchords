import { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';

interface HomePageChunk {
  HomeLayout: ComponentType;
  HomePage: ComponentType;
  AccountPage: ComponentType;
}

let homePageChunk: HomePageChunk | undefined = undefined;

async function getHomePageChunk(): Promise<HomePageChunk> {
  if (homePageChunk === undefined) {
    homePageChunk = {
      HomeLayout: (await import('src/pages/home/components/homelayout')).HomeLayout,
      HomePage: (await import('src/pages/home/components/homepage')).HomePage,
      AccountPage: (await import('src/pages/home/components/accountpage/accountpage')).AccountPage,
    };
  }
  return homePageChunk;
}

export const router = createBrowserRouter(
  [
    {
      path: '/song/:id',
      hydrateFallbackElement: <></>,
      lazy: {
        Component: async () => (await import('src/pages/song/components/songpage')).SongPage,
      },
    },
    {
      path: '/editor',
      hydrateFallbackElement: <></>,
      lazy: {
        Component: async () => (await import('src/pages/editor/components/editorpage')).EditorPage,
      },
    },
    {
      path: '/',
      hydrateFallbackElement: <></>,
      lazy: {
        Component: async () => (await getHomePageChunk()).HomeLayout,
      },
      children: [
        {
          index: true,
          lazy: {
            Component: async () => (await getHomePageChunk()).HomePage,
          },
        },
        {
          path: '/account',
          lazy: {
            Component: async () => (await getHomePageChunk()).AccountPage,
          },
        },
      ],
    },
  ],
  {},
);
