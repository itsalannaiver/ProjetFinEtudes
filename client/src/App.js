import { useState, useEffect } from "react";
import DotLoader from "react-spinners/DotLoader";
import HomePage from "./components/pages/HomePage";
import DashBoard from "./components/pages/Dashboard";
import { Switch } from "react-router-dom";
import { RedirectToLoged } from "./components/subComponents/LogIn/PassThroughLogin";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <DotLoader
          color={"#2271E2"}
          loading={loading}
          size={70}
          css={"margin-top: 23%;"}
        />
      ) : (
        <div className="Home">
          <Switch>
            <RedirectToLoged path="/Dashboard" component={DashBoard} />
            <HomePage />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
