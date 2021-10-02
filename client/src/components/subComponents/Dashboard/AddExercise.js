import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector , useDispatch} from "react-redux";
import { addNewExerciceToModule } from "../../../requests/groupsReq";
import {refreshExo} from '../../../actions/dashboardActions';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
    minHeight: 60,
  },
  inputControl: {
    minHeight: 10,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  question: {
    marginTop: theme.spacing(2),
  },
  timeControl: {
    marginLeft: theme.spacing(35),
  },
}));

export default function AddExercise() {
  const classes = useStyles();
  const [type, setType] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const { role, mod } = useSelector((s) => ({
    role: s.auth.role,
    mod: s.modules.idMod,
  }));
  const [qstContent, setQstContent] = useState([0, { q: "", r: "" }]);
  const [question, setQuestion] = useState([1]);
  const dispatch= useDispatch()

  //Afficher
  const [addExercise, setAddExercise] = useState({ display: "none" });
  const handleAddExercise = () => {
    addExercise.display === "none"
      ? setAddExercise({ display: "Block" })
      : setAddExercise({ display: "none" });
  };

  const submitExercise = () => {
    let qs = qstContent
      .map((e) => {
        if (e !== 0) {
          return { question: e.q, correction: e.r };
        }
        return { question: "null", correction: "null" };
      })
      .slice(1);
    addNewExerciceToModule({
      mod: mod,
      nom: nom,
      description: description,
      questions: qs,
      exam: type,
      duration: duration,
    });
    dispatch(refreshExo())
    handleAddExercise()
  };
  //Ajouter
  const addQuestion = () => {
    const questionLength = question.length;
    setQstContent((s) => {
      s[questionLength + 1] = { r: "", q: "" };
      return [...s];
    });
    setQuestion((s) => {
      s[questionLength] = questionLength + 1;
      return [...s];
    });
  };

  //Supprimer
  const removeQuestionn = (val) => {
    const questionLength = question.length - 1;
    const questionList = [1];
    let n = -1;
    const newqst =
      questionLength >= 1
        ? qstContent.filter((v) => {
            n++;
            return n !== val;
          })
        : qstContent;
    for (let i = 2; i <= questionLength; i++) {
      questionList.push(i);
    }
    setQstContent(newqst);
    setQuestion(questionList);
  };

  //
  const holdQuestions = ({ v, r, q }) => {
    setQstContent((s) => {
      s[v] = { r: r || s[v].r, q: q || s[v].q };
      return [...s];
    });
  };

  //
  const handleType = (event) => {
    setType(event.target.value);
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
              <FormControl
                variant="outlined"
                className={classes.formControl}
                size="small"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type
                </InputLabel>
                <Select native value={type} onChange={handleType} label="Type">
                  <option aria-label="None" value="" />
                  <option value={false}>Exercice</option>
                  <option value={true}>Examen</option>
                </Select>
              </FormControl>
              <TextField
                className={classes.timeControl}
                type="number"
                id="outlined-basic"
                label="Temps /minute"
                variant="outlined"
                size="small"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </li>
            <li>
              <TextField
                className={classes.formControl}
                type="text"
                id="outlined-basic"
                label="Titre"
                variant="outlined"
                size="small"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
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
              {question.map((val) => {
                return (
                  <div key={val}>
                    <fieldset title="Suup" className="ProfQuestionContainer">
                      <legend>{"Question " + val}</legend>
                      <TextField
                        key={val + 1}
                        label="Question"
                        multiline={true}
                        variant="outlined"
                        fullWidth={true}
                        size="small"
                        className={classes.question}
                        onChange={(e) => {
                          e.target.value === ""
                            ? holdQuestions({ v: val, q: " " })
                            : holdQuestions({ v: val, q: e.target.value });
                        }}
                        value={qstContent[val].q}
                      />
                      <TextField
                        key={val + 2}
                        label="Réponse"
                        multiline={true}
                        variant="outlined"
                        fullWidth={true}
                        size="small"
                        className={classes.question}
                        onChange={(e) => {
                          e.target.value === ""
                            ? holdQuestions({ v: val, r: " " })
                            : holdQuestions({ v: val, r: e.target.value });
                        }}
                        value={qstContent[val].r}
                      />
                    </fieldset>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="add"
                      className={classes.margin}
                      id="DeleteQuestion"
                      onClick={removeQuestionn.bind(this, val)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </div>
                );
              })}
            </li>
            <li id="AddQuestionButton">
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                className={classes.margin}
                onClick={addQuestion}
              >
                <AddIcon />
              </Fab>
            </li>
            <li>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CheckIcon />}
                className={classes.button}
                onClick={submitExercise}
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
