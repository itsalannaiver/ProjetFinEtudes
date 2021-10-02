import {
  SAVEMODULEID,
  SAVEEXOID,
  TIMEOUT,
  REFRESHEXO,
  REFRESHCOURS
} from "../actions/actionTypes";

const initialState = {
  idMod: null,
  idExo: null,
  timedOut: false,
  refreshExo: false,
  refreshCours:false,
};

export default function modulesRecuers(state = initialState, action) {
  switch (action.type) {
    case SAVEMODULEID:
      return { ...state, idMod: action.idMod };
    case SAVEEXOID:
      return { ...state, idExo: action.idExo };
    case TIMEOUT:
      return { ...state, timedOut: action.timedOut };
    case REFRESHEXO:
      return { ...state, refreshExo: !state.refreshExo };
    case REFRESHCOURS:
      return {...state,refreshCours:!state.refreshCours};
    default:
      return state;
  }
}
