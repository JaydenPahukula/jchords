import { ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsivenessContext from 'src/contexts/responsiveness';
import store from 'src/redux/store';
import checkIfMobile from 'src/utils/checkifmobile';
import HomePage from './components/home/homepage/homepage';
import SongPage from './components/song/songpage/songpage';

export default function App(): ReactElement {
  const [isMobile, setIsMobile] = useState<boolean>(checkIfMobile());

  // add event listener to check if mobile
  useEffect(() => {
    const resizeHandler = () => setIsMobile(checkIfMobile());
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Provider store={store}>
      <ResponsivenessContext.Provider value={{ isMobile: isMobile }}>
        <BrowserRouter>
          <Routes>
            <Route path="/song/:id" element={<SongPage />}></Route>
            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </ResponsivenessContext.Provider>
    </Provider>
  );
}
