import "./App.css";
import Header from "./components/Header";
import { UserProvider } from "./contexts/UserContext";
import Main from "./pages/Main";

function App() {
  return (
    <UserProvider>
      <Header />
      <Main />
    </UserProvider>
  );
}

export default App;
