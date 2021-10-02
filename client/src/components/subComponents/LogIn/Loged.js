import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { saveId } from "../../../actions/authAction";
import img_userPic from "../../../assets/img_userPic.png";
import { getStudentInfo } from "../../../requests/studentReq";
import { useEffect } from "react";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";

function Loged(props) {
  const userInfo = useSelector((s) => ({
    nom: s.auth.nom,
    prenom: s.auth.prenom,
    groupe: s.auth.groupe,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const user = await getStudentInfo();
      dispatch(saveId(user.nom, user.prenom, user.groupe , user.idGroup,user.role));
    })();
  }, [dispatch]);
  const logOut = () => {
    Cookies.remove("connect.sid", { path: "" });
  };

  let [logedPage, setLogedPage] = useState({ display: "none" });
  let handleDisplayLoged = () => {
    logedPage.display === "none"
      ? setLogedPage({ display: "Block" })
      : setLogedPage({ display: "none" });
  };

  return (
    <div className="LogedDash">
      <div className="logedInfo">
        <div className="userInfo">
          <img src={img_userPic} alt=""></img>
          <div className="nameGroupe">
            <div style={{display:'flex', flexDirection:'row', width:"100%",justifyContent:'space-between'}}>
              <h1 id="userNames">{userInfo.prenom}</h1><h1 id="userNames">{userInfo.nom}</h1>
            </div>
            
            <h2 id="userGroup">{userInfo.groupe}</h2>
          </div>
          <ArrowDropDownCircleOutlinedIcon
            id="ArrowDropDownCircleOutlinedIcon"
            onClick={handleDisplayLoged}
          />
        </div>
      </div>
      <div className="logOut" style={{ display: `${logedPage.display}` }}>
        <ul className="loginMenu">
          <li className="logoutButton">
            <Link id="userMenu" to="/Dashboard">
              Dashboard
            </Link>
          </li>
          <li className="logoutButton">
            <Link id="logoutButton" onClick={logOut} to="/">
              Déconnection
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Loged;
