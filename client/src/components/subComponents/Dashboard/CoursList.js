import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {
  getAllCours,
  downloadCour,
  deleteCours,
} from "../../../requests/groupsReq";

export default function CoursList() {
  const [listeDesCours, setListeDesCours] = useState([]);
  const { role, idMod, refreshCours } = useSelector((s) => ({
    role: s.auth.role,
    idMod: s.modules.idMod,
    refreshCours: s.modules.refreshCours,
  }));
  const handledeleteCours = (idCours) => {
    deleteCours(idCours);
    setListeDesCours((s) => {
      let x = s.filter((e) => {
        return e.file !== idCours;
      });
      return [...x];
    });
  };
  useEffect(() => {
    (async () => {
      let courses = await getAllCours(idMod);
      setListeDesCours(courses);
    })();
  }, [idMod, refreshCours]);

  return (
    <ul className="CoursList">
      {listeDesCours.map((val) => {
        return (
          <div className="CoursHolder" key={uuid()}>
            <div>
              {role === "Professor" && (
                <IconButton
                  id="iconButton"
                  aria-label="delete"
                  onClick={() => {
                    handledeleteCours(val.file);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
            <button
              onClick={() => {
                downloadCour(val.file, val.nom, val.ext);
              }}
            >
              <div key={uuid()} className="CoursContent">
                <li key={uuid()} className="ListCours">
                  <h3 className="CoursTitle">{val.nom}</h3>

                  {(() => {
                    const date = new Date(val.date);
                    const year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let dt = date.getDate();

                    if (dt < 10) {
                      dt = "0" + dt;
                    }
                    if (month < 10) {
                      month = "0" + month;
                    }
                    return (
                      <p className="CoursDate">
                        {year}/{month}/{dt}
                      </p>
                    );
                  })()}

                  <p className="CoursDescrip">{val.description}</p>
                  <div id="DownloadIcon">
                    <CloudDownloadIcon />
                  </div>
                </li>
              </div>
            </button>
          </div>
        );
      })}
    </ul>
  );
}
