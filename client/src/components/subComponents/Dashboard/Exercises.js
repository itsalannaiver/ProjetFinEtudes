import AddExercise from "../Dashboard/AddExercise";
import ExerciseList from "../Dashboard/ExerciseList";

export default function Exercises() {
 return (
    <div className="MainContentContainer">
      <div className="ExerciseContainer">
        <AddExercise />
        <ExerciseList />
      </div> 
    </div>
  );
}
