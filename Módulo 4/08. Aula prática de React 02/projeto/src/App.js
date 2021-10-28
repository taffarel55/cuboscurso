import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import AuthProvider from "./contexts/AuthContext/AuthProvider";
import useAuth from "./hooks/useAuth";

function Protegido(props) {
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
      <div className="App full-screen">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Protegido>
              <Route path="/" exact component={Home} />
            </Protegido>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
