import Router, { Route } from 'preact-router';
import HomePage from 'src/components/homepage/homepage';
import app from 'src/shared/firebase/app';
import createState from 'src/state/createstate';
import StateContext from 'src/state/statecontext';
import StateManager from 'src/state/statemanager';

export default function App() {
  const state = new StateManager(createState());

  console.log(app);

  return (
    <StateContext.Provider value={state}>
      <Router>
        <Route path="/" component={HomePage} />
      </Router>
    </StateContext.Provider>
  );
}
