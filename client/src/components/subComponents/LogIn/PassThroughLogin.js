import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { checkLoged } from "../../../requests/studentReq";

export function RedirectToLogin({ component: Component, ...config }) {
  const [compo, setCompo] = useState(null);
  useEffect(() => {
    let user
    (async () => {
      user = await checkLoged();
      if (!user.loged) {
        setCompo(<Component />);
      } else if (user.loged) {
        setCompo(<Redirect to="/Home" />);
      }
    })();
  }, []);
  
  return (
    <Route
      {...config}
      render={() => compo }
    
    />
  );
}

export function RedirectToLoged({ component: Component, ...config }) {
  const [compo, setCompo] = useState(null);
  useEffect(() => {
    let user
    (async () => {
      user = await checkLoged();
      if (user.loged) {
        setCompo(<Component />);
      } else if (!user.loged) {
        setCompo(<Redirect to="/" />);
      }
    })();
  }, []);

  return (
    <Route
      {...config}
      render={()=>compo}
    />
  );
}
