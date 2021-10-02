import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector , useDispatch } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import { uploadCour } from "../../../requests/groupsReq";
import {refreshCours} from "../../../actions/dashboardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    marginBottom: 25,
  },
}));

export default function AddCours(props) {
  const dispatch= useDispatch();
  const classes = useStyles();
  const { role, idMod } = useSelector((s) => ({
    role: s.auth.role,
    idMod: s.modules.idMod,
  }));

  const [addExercise, setAddExercise] = useState({ display: "none" });
  const [file, setFile] = useState("");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const addCourse = (cours, nom, description, module) => {
    uploadCour(cours, nom, description, module);
    setTimeout(()=>{
      dispatch(refreshCours())
    },1000)
    handleAddExercise()
     
  };
  const handleAddExercise = () => {
    addExercise.display === "none"
      ? setAddExercise({ display: "Block" })
      : setAddExercise({ display: "none" });
  };

  return (
    <div className="addExercise">
      <div>
        {role === "Professor" && (
          <Fab
            color="primary"
            aria-label="add"
            id="AddButton"
            onClick={handleAddExercise}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
      <div
        className="AddExerciceForm"
        style={{ display: `${addExercise.display}` }}
      >
        <form>
          <ul>
            <li>
              <TextField
                className={classes.formControl}
                id="outlined-basic"
                label="Titre"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                value={nom}
              />
            </li>
            <li>
              <TextField
                label="Description"
                multiline={true}
                variant="outlined"
                fullWidth={true}
                size="small"
                rows="10"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </li>
            <li id="LesQuestions">
              <input
                id="contained-button-file"
                multiple
                type="file"
                name="filename"
                onChange={(e) => {
                  onChangeFile(e);
                }}
              />
            </li>
            <li id="ButtonValiderCours">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CheckIcon />}
                className={classes.button}
                onClick={() => {
                  addCourse(file, nom, description, idMod);
                }}
              >
                VALIDER
              </Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
