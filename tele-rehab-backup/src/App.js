import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DefaultHeader from './components/Header/DefaultHeader';
import FrontPageHeader from './components/Header/FrontPageHeader';
import FrontPage from './components/FrontPage/FrontPage';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <FrontPageHeader />
            <FrontPage />
          </Route>
          <Route path="/log" exact>
            <DefaultHeader />
            <FrontPage />
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
