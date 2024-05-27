import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css";
const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("authToken", data.token);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="Inclusive-register-page">
      <div className="register-big-wrapper">
        <div className="register-banner-section ">
          <img src="register2.png" alt="banner" width="490px" />
        </div>

        <div className="section-wrapper">
          <div className="top-suggest_login">
            <span> Já possui uma conta? </span>
            <a href="/login">Entrar</a>
          </div>

          <div className="top-register-explain">
            <h2>Bem vindo ao TOPIC Blog </h2>

            <p>Compartilhe suas idéias com milhares de usuários.</p>
          </div>

          <form onSubmit={registerHandler}>
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="name"
                placeholder="Insira um nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Nome de usuário</label>
            </div>
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
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirme a senha"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirme a senha</label>
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
