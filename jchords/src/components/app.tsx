import Router, { Route } from 'preact-router';
import CreateAccountPage from 'src/components/homepage/createaccountpage';
import HomePage from 'src/components/homepage/homepage';
import LoginPage from 'src/components/homepage/loginpage';
import SongPage from 'src/components/songpage/songpage';
import calcSize from 'src/responsiveness/calcsize';
import makeUIState from 'src/state/makeuistate';
import state from 'src/state/state';
import UIStateContext from 'src/state/uistatecontext';
import UIState from 'src/types/uistate';

export default function App() {
  const uiState: UIState = makeUIState(state);

  window.onresize = () => {
    state.size.value = calcSize();
  };

  return (
    <UIStateContext.Provider value={uiState}>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/song/:id" component={SongPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/createaccount" component={CreateAccountPage} />
      </Router>
    </UIStateContext.Provider>
  );
}
