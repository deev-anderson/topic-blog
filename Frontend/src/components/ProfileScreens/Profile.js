import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../../Css/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../GeneralScreens/Loader";
import { AuthContext } from "../../Context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";

const Profile = () => {
  const { config } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const editDate = (createdAt) => {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const d = new Date(createdAt);
    var datestring =
      d.getDate() +
      " de " +
      monthNames[d.getMonth()] +
      " de " +
      d.getFullYear();
    return datestring;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("/user/profile", config);

        setUser(data.data);

        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };

    getUserProfile();
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Inclusive_profile_page">
          <Link to={"/"}>
            <FiArrowLeft />
          </Link>
          <div className="profile-top-wrap">
            <span>Informarções do usuário</span>
          </div>
          <ul>
            <li>
              <span>Nome</span>
              <div>{user.username}</div>
            </li>
            <li>
              <span>E-mail</span>
              <div>{user.email}</div>
            </li>
            <li>
              <span> Data de criação </span>
              <div>{editDate(user.createdAt)}</div>
            </li>
          </ul>

          <div className="btns_wrap">
            <button className="profileEditBtn">
              <Link to="/edit_profile">Editar perfil</Link>
            </button>
            <button className="changePassBtn">
              <Link to="/change_password">Alterar senha</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
