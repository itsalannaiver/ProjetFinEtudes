import { SAVEID } from "./actionTypes";

export const saveId = (nom, prenom, groupe,idGroup,role) => (dispatch) => {
  dispatch({
    type: SAVEID,
    nom,
    prenom,
    groupe,
    idGroup,
    role
  });
};
