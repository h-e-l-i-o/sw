import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Search from './Search'
import Item from './Item'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/item/:type/:id" children={<Item />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
