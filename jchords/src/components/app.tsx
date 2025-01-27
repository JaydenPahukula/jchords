import Router, { Route } from 'preact-router';
import HomePage from 'src/components/home/homepage';
import SongPage from 'src/components/song/songpage';
import makeUIState from 'src/state/makeuistate';
import state from 'src/state/state';
import UIStateContext from 'src/state/uistatecontext';
import UIState from 'src/types/uistate';

export default function App() {
  const uiState: UIState = makeUIState(state);

  return (
    <UIStateContext.Provider value={uiState}>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/song/:id" component={SongPage} />
      </Router>
    </UIStateContext.Provider>
  );
}
