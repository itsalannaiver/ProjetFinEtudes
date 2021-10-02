import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { getExercices, removeExercise } from "../../../requests/groupsReq";
import { saveExerciseId } from "../../../actions/dashboardActions";
import StarsIcon from "@material-ui/icons/Stars";

export default function ExerciseList() {
  const { role, idMod, refreshExo } = useSelector((s) => ({
    role: s.auth.role,
    idMod: s.modules.idMod,
    refreshExo: s.modules.refreshExo,
  }));
  const [exercises, setExercises] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let exos = await getExercices(idMod);
      setExercises(exos);
    })();
  }, [idMod, refreshExo]);
  const deleteExercise = (idExo) => {
    removeExercise(idExo);
    setExercises((s) => {
      let x = s.filter((e) => {
        return e._id !== idExo;
      });
      return [...x];
    });
  };
  return (
    <ul className="ExerciseList">
      {exercises.map((val) => {
        return (
          <div className="ExerciceHolder" key={uuid()}>
            <div>
              {role === "Professor" && (
                <IconButton
                  id="iconButton"
                  aria-label="delete"
                  onClick={() => {
                    deleteExercise(val._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
            <div
              key={uuid()}
              className="ExerciceContent"
              onClick={() => {
                dispatch(saveExerciseId(val._id));
              }}
            >
              <Link to="/Dashboard/Module/Exercices/Display">
                <li key={uuid()} className="ListExercises">
                  <div>{val.exam && <StarsIcon id="StarsIcon" />}</div>
                  <div>
                    <h3 className="ExerciseTitle">{val.nom}</h3>
                  </div>
                  <div>
                    {(() => {
                      const date = new Date(val.published);
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
                        <p className="ExerciseDate">
                          {year}/{month}/{dt}
                        </p>
                      );
                    })()}
                  </div>
                  <div>
                    <p className="ExerciseDescrip">{val.description}</p>
                  </div>
                </li>
              </Link>
            </div>
          </div>
        );
      })}
    </ul>
  );
}
