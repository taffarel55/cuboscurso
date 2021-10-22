import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";

import Counter from "./components/Counter";

import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import AuthProvider from "./contexts/AuthContext/AuthProvider";
import useAuth from "./hooks/useAuth";

function ProfileProtegido(props) {
  const auth = useAuth();
  return (
    <Route
      render={() => (auth.token ? props.children : <Redirect to="/login" />)}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Counter />
        <Router>
          <nav>
            <NavLink to="/servicos">Servicos</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/contato">Contato</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
          <Switch>
            <Route path="/:page">
              <Page />
            </Route>
          </Switch>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/contato" component={Contato} />
            <Route path="/login" component={Login} />
            <ProfileProtegido>
              <Route path="/profile" component={Profile} />
            </ProfileProtegido>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

function Page() {
  const params = useParams();
  return (
    <div>
      <h3>Página: {params.page}</h3>
    </div>
  );
}

export default App;
