import img_logo from "../../../assets/img_logo.png";
import Loged from "../LogIn/Loged";
import Login from "../LogIn/Login";
import { RedirectToLoged , RedirectToLogin} from "../LogIn/PassThroughLogin";
import { Link, Switch } from "react-router-dom";

function NavBars() {
  return (
    <section className="nav-bar">
      <div className="logo-container">
        <img src={img_logo} alt="Logo" />
      </div>
      <div className="main-menu">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/Actu">Actualités</Link>
          </li>
          <li>
            <Link to="/Propo">A Propos</Link>
          </li>
          <li>
            <Link to="/">Nous Contacter</Link>
          </li>
        </ul>
      </div>
      <div className="tools">
        <Switch>
          <RedirectToLoged path="/Home"  component={Loged} />
          <RedirectToLogin path="/" component={Login} />
        </Switch>
      </div>
    </section>
  );
}

export default NavBars;
