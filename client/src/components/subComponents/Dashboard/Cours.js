import AddCours from "../Dashboard/AddCours";
import CoursList from "../Dashboard/CoursList";

export default function Cours() {
  return (
    <div className="MainContentContainer">
      <div className="ExerciseContainer">
        <AddCours />
        <CoursList />
      </div>
    </div>
  );
}
