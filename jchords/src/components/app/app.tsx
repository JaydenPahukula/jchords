import Router, { Route } from 'preact-router';
import HomePage from 'src/components/homepage/homepage';
import SongPage from 'src/components/songpage/songpage';
import StateContext from 'src/state/statecontext';
import StateManager from 'src/state/statemanager';

export default function App() {
  const state = new StateManager();

  return (
    <StateContext.Provider value={state}>
      <Router>
        <Route default component={HomePage} />
        <Route path="/song/:id" component={SongPage} />
      </Router>
    </StateContext.Provider>
  );
}
