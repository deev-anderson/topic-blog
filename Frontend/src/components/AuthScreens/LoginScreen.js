import { useState } from "react";
import axios from "axios";
import "../../Css/Login.css";
import { Link, useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("authToken", data.token);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4500);
    }
  };

  return (
    <div className="Inclusive-login-page">
      <div className="login-big-wrapper">
        <div className="section-wrapper">
          <div className="top-suggest_register">
            <span>Ainda não possui uma conta? </span>
            <a href="/register">Cadastrar</a>
          </div>

          <div className="top-login-explain">
            <h2>Entre na sua conta </h2>

            <p>Informe seu usuário e senha!</p>
          </div>

          <form onSubmit={loginHandler}>
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="exemplo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Senha com mais de 6 caracteres"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">Senha</label>
            </div>
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              {" "}
              Esqueceu a senha?
            </Link>
            <button type="submit">Entrar</button>
          </form>
        </div>

        <div className="login-banner-section">
          <img src="register2.png" alt="banner" width="400px" />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
