import { SAVEID } from "../actions/actionTypes";

let initialState = {
  nom: null,
  prenom: null,
  groupe: null,
  idGroup:null,
  role:'student',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SAVEID:
      return {
        ...state,
        nom: action.nom,
        prenom: action.prenom,
        groupe: action.groupe,
        idGroup:action.idGroup,
        role:action.role
      };
    default:
      return state;
  }
}
