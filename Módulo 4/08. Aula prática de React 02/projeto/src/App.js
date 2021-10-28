import {
  BrowserRouter as Router, Redirect, Route,
  Switch
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import useAuth from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
