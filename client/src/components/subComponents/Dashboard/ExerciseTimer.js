import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import {timeOut} from '../../../actions/dashboardActions'
import Countdown from "react-countdown";

export default function ExerciseTimer(props) {
  const [examTime, setExamTime] = useState(props.duration*1000*60);
  const dispatch=useDispatch();
  useEffect(() => {
    if (props.submited) {
      setExamTime(0);
    }
    return setExamTime((s)=>{return s-1})
  }, [props.submited]);

  return (
    <div className="ExerciceTimer">
      <h1>
        <Countdown
          date={props.date + examTime}
          onComplete={() => {
            dispatch(timeOut(true))
          }}
        />
      </h1>
    </div>
  );
}
