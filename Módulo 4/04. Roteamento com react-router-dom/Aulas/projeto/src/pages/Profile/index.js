import { Link,useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const auth = useAuth();
  const history = useHistory();
  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div>
        <Link to="/">Home</Link> {">"} Profile
      </div>
      <p>Olá {auth.token}!</p>
      <button
        onClick={() => auth.deslogar(() => history.push("/home"))}
      >Deslogar</button>
    </div>
  );
}

export default Profile;
