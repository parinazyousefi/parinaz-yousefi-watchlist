import "./SignUp.scss";
import { useState } from "react";
import { Link} from "react-router-dom";
import Button from "../Button/Button";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="sign-up">
      <h1 className="title">Sign Up</h1>
      <div className="signup-form">
        <form>
          <div className="form-content">
            <div className="form-group">
              <label className="register-lbl">Name</label>
              <label className="register-lbl">Email</label>
              <label className="register-lbl">Password</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={onNameChange}
                className="register-input"
              />
              <input
                type="email"
                value={email}
                onChange={onEmailChange}
                className="register-input"
              />
              <input
                type="password"
                value={password}
                onChange={onPasswordChange}
                className="register-input"
              />
            </div>
          </div>
          <div className="buttons">
            <Button text="Sign up" onClick={handleSignUp} type="submit" />
            <Link to="/login">
              <Button text="Log in" />
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
export default SignUp;
