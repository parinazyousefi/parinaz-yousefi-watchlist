import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from '../Button/Button';
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // const loginRes = await axios.post('some_backend_server/login', { username, password })
    // const loginRes = {
    //   status: 200,
    //   data: {
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImtldmluIiwiaWF0IjoxNTE2MjM5MDIyfQ.c_VbOvn5RyeQpEC5Tnk-V2aT2dy4T8fgArO_P7-8jjI'
    //   }
    // }

    // if (loginRes.status === 200) {
    //   localStorage.setItem('authToken', loginRes.data.token)
    //   navigate('/profile')
    // } else {
    //   // Handle login error
    // }
  };

  return (
    <main className="log-in">
      <h1 className="title">Log in</h1>
      <div className="login-form">
        <form>
          <div className="form-content">
            <div className="form-group">
              <label className="register-lbl">Email</label>
              <label className="register-lbl">Password</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="register-input"
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="register-input"
              />
            </div>
          </div>
          <div className="buttons">
            <Button text="Log in" onClick={handleLogin} type="submit" />
            <Link to="/signup">
              <Button text="Sign Up" />
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Login;
