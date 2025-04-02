import Router, { Route } from 'preact-router';
import DialogManager from 'shared/components/dialogs/dialogmanager';
import dialogManifest from 'src/components/dialogs/dialogmanifest';
import HomePage from 'src/components/homepage/homepage';
import SongPage from 'src/components/songpage/songpage';
import calcSize from 'src/responsiveness/calcsize';
import initListeners from 'src/state/functions/initlisteners';
import state from 'src/state/state';
import UIStateContext from 'src/state/statecontext';

export default function App() {
  initListeners();

  window.onresize = () => {
    state.size.value = calcSize();
  };

  return (
    <>
      <DialogManager signal={state.dialog} manifest={dialogManifest} />
      <UIStateContext.Provider value={state}>
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/song/:id" component={SongPage} />
        </Router>
      </UIStateContext.Provider>
    </>
  );
}
