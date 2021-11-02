import { Route, Switch } from "react-router";
import "./App.css";

import HomePage from "./pages/homepage/homePage.component";

const HatsPage = () => (
  <div>
    <h2>HATS PAGE</h2>
  </div>
)

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
