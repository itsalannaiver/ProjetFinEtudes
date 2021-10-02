import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import DashboardLoged from "../LogIn/DashboardLoged";
import Cookies from "js-cookie";
import { getModules } from "../../../requests/groupsReq";
import { saveModuleId } from "../../../actions/dashboardActions";
import { saveId } from "../../../actions/authAction";
import { getStudentInfo } from "../../../requests/studentReq";

const SideBarContent = async () => {
  let moduleList = await getModules();

  moduleList.map((mod) => {
    return (mod["display"] = "none");
  });
  return moduleList;
};

export default function SideBar() {
  const [content, setContent] = useState([]);
  const { nom, prenom, groupe } = useSelector((s) => ({
    nom: s.auth.nom,
    prenom: s.auth.prenom,
    groupe: s.auth.groupe,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let modules = await SideBarContent();
      setContent(modules);
    })();
    (async () => {
      const user = await getStudentInfo();
      dispatch(
        saveId(user.nom, user.prenom, user.groupe, user.idGroup, user.role)
      );
    })();
  }, [dispatch]);
  const displaySubMenu = (item) => {
    setContent(
      content.map((val) => {
        if (val === item) {
          if (val.display === "none") {
            return { ...val, display: "block" };
          } else if (val.display === "block") {
            return { ...val, display: "none" };
          }
        }
        return val;
      })
    );
  };

  const logOut = () => {
    Cookies.remove("connect.sid", { path: "" });
  };

  return (
    <div className="SideBar">
      <DashboardLoged nom={nom} prenom={prenom} groupe={groupe} />
      <ul className="SideBarList">
        {content.map((val) => {
          return (
            <li
              onClick={() => {
                displaySubMenu(val);
              }}
              key={uuid()}
              className="item"
            >
              <div>
                <h1>{val.nom}</h1>
              </div>
              <ul className="subMenu" style={{ display: `${val.display}` }}>
                <Link
                  onClick={() => {
                    dispatch(saveModuleId(val["_id"]));
                  }}
                  to={`/Dashboard/Module/Cours/`}
                  key={uuid()}
                >
                  <li className="subList">
                    <h2 className="LinkTo">Cours</h2>
                  </li>
                </Link>
                <Link
                  onClick={() => {
                    dispatch(saveModuleId(val["_id"]));
                  }}
                  to="/Dashboard/Module/Exercices"
                  key={uuid()}
                >
                  <li className="subList">
                    <h2 className="LinkTo">Exercices</h2>
                  </li>
                </Link>
              </ul>
            </li>
          );
        })}
      </ul>
      <Link id="DashboardlogoutButton" onClick={logOut} to="/">
        <button className="DashboardlogOut">Déconnexion</button>
      </Link>
    </div>
  );
}
