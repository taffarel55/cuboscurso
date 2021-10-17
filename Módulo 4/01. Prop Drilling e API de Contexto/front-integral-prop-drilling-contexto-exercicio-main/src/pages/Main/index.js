import UsersList from "../../components/UsersList";
import UsersRegister from "../../components/UsersRegister";
import { UserProvider } from "../../contexts/UserContext";
import "./styles.css";

export default function Main() {
  return (
    <UserProvider>
      <div className="container-main">
        <UsersRegister />
        <UsersList />
      </div>
    </UserProvider>
  );
}


