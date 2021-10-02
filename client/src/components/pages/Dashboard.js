import SideBar from "../subComponents/Dashboard/SideBar";
import { RedirectToLoged as Route } from "../subComponents/LogIn/PassThroughLogin";
import Exercices from "../subComponents/Dashboard/Exercises";
import Cours from "../subComponents/Dashboard/Cours";
import DisplayExcercise from "../subComponents/Dashboard/DisplayExercise";

function Dashboard() {
  return (
    <div>
      <SideBar />
      <Route component={Cours} path={`/Dashboard/Module/Cours/`} exact />
      <Route
        path="/Dashboard/Module/Exercices/Display"
        component={DisplayExcercise}
      />
      <Route component={Exercices} path="/Dashboard/Module/exercices" exact />
    </div>
  );
}

export default Dashboard;
