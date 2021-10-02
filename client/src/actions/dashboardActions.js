import {SAVEMODULEID , SAVEEXOID,TIMEOUT, REFRESHEXO ,REFRESHCOURS,} from './actionTypes';

export const saveModuleId=(idMod)=> dispatch => {
    dispatch({
        type:SAVEMODULEID,
        idMod,
    }
    )
}

export const saveExerciseId=(idExo)=> dispatch=>{
    dispatch({
        type:SAVEEXOID,
        idExo,
    })
}

export const timeOut=(timedOut)=>dispatch=>{
    dispatch({
        type:TIMEOUT,
        timedOut
    })
}

export const refreshExo=()=> dispatch =>{
    dispatch({
        type:REFRESHEXO
    })
}
export const refreshCours=()=>dispatch=>{
    dispatch({
        type:REFRESHCOURS
    })
}