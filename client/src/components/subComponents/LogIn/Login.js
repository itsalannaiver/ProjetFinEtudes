import { useState, useEffect } from "react";
import { connectStudent } from "../../../requests/studentReq";
import { FaUserAlt } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  TextInput: {
    margin: theme.spacing(3),
    height: "2.7vw",
  },
  SubmitInput: {
    marginTop: theme.spacing(4),
    height: "3.5vw",
    width: "24.1vw",
    marginLeft: "1.7vw",
  },
}));

function Login(props) {
  const classes = useStyles();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [user, setUser] = useState(null);
  let [logPage, setLogPage] = useState({ display: "none" });
  let [logedUser, setLogedUser] = useState(null);
  const dispatch = useDispatch();

  let handleDisplayLogin = () => {
    logPage.display === "none"
      ? setLogPage({ display: "Block" })
      : setLogPage({ display: "none" });
  };

  useEffect(() => {
    if (user) {
      if (user === "Wrong Email") {
        console.log(user);
      } else if (user === "Wrong Password") {
        console.log(user);
      } else if (typeof user === "object") {
        setLogedUser(true);
      } else {
        console.log("error occured");
      }
    }
  }, [user, dispatch]);

  const handleStudentLog = async () => {
    setUser(await connectStudent(email, password));
  };

  return (
    <div>
      <div className="log-in" onClick={handleDisplayLogin}>
        <FaUserAlt id="icon_login" color="black" />
      </div>
      <div className="Login">
        <div className="userLogin" style={{ display: `${logPage.display}` }}>
          <h1>Connexion</h1>
          <form>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(v) => setEmail(v.target.value)}
              className={classes.TextInput}
              size="medium"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(v) => setPassword(v.target.value)}
              className={classes.TextInput}
              size="medium"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStudentLog}
              className={classes.SubmitInput}
            >
              Connexion
            </Button>
          </form>
          {logedUser && <Redirect to="/Home" />}
        </div>
      </div>
    </div>
  );
}

export default Login;
