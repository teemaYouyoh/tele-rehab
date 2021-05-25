import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import FrontPage from './components/FrontPage/FrontPage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PersonArea from './components/PersonArea/PersonArea';
import 'reset-css';
import './style.scss';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <FrontPage />
          </Route>
          <Route path="/personal" exact>
            <PersonArea />
          </Route>
          <Route path="/admin" exact>
            <AdminPanel />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
