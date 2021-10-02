import { useState, useEffect , useRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import ExerciseTimer from "../Dashboard/ExerciseTimer";
import PopOverHint from "../Dashboard/PopOverHint";
import { getOneExercise, postExam } from "../../../requests/groupsReq";
import {useDispatch} from 'react-redux';
import {timeOut} from '../../../actions/dashboardActions'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  reponse: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function DisplayExercise() {
  const dispatch=useDispatch();
  const classes = useStyles();
  const buttonRef=useRef(null);
  const [exercise, setExercise] = useState({ questions: [], duration: false });
  const [submited, setSubmited] = useState(false);
  const [responses, setResponses] = useState([]);
  const [date] = useState(Date.now());
  const { idExo,timedOut } = useSelector((s) => ({ idExo: s.modules.idExo , timedOut:s.modules.timedOut }));
  useEffect(() => {
    (async () => {
      let exo = await getOneExercise(idExo);
      setExercise(exo);
    })();
  }, [idExo]);
  useEffect(()=>{
    if(timedOut){
      buttonRef.current.click()
    }
  },[timedOut])
  useEffect(()=>{
    setSubmited(false)
    dispatch(timeOut(false))
  },[dispatch])
  const handleResponses = ({ v, r }) => {
    setResponses((s) => {
      s[v] = r;
      return [...s];
    });
  };
  const handleSubmit = ({ exam = exercise._id, answers = responses }) => {
    if (exercise.exam) {
      postExam(exam, answers);
      setSubmited(true);
    } else if (!exercise.exam) {
      setSubmited(true);
    }
  };
  return (
    <div className="MainContentContainer">
      <div className="DisplayExerciceContainer">
        <h1>{exercise.nom}</h1>
        {exercise.duration && exercise.exam && (
          <ExerciseTimer
            submited={submited}
            date={date}
            duration={exercise.duration}
          />
        )}
        <div className="DescriptionContainer">
          <p>{exercise.description}</p>
        </div>
        <form>
          {exercise.questions.map((val, key) => {
            return (
              <ul className="QuestionContainer" key={key}>
                <li id="QuestionHint">
                  <p>
                    {key + 1}.{val.question}
                  </p>
                  {!exercise.exam && (
                    <PopOverHint
                      submited={submited}
                      correction={val.correction}
                    />
                  )}
                </li>
                <li>
                  <TextField
                    key={key}
                    label="Réponse"
                    multiline={true}
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    className={classes.reponse}
                    value={responses[key]}
                    onChange={(e) => {
                      e.target.value === ""
                        ? handleResponses({ v: key, r: " " })
                        : handleResponses({ v: key, r: e.target.value });
                    }}
                  />
                </li>
              </ul>
            );
          })}
          <Button
            ref={buttonRef}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckIcon />}
            className={classes.button}
            onClick={handleSubmit}
          >
            VALIDER
          </Button>
        </form>
      </div>
    </div>
  );
}
