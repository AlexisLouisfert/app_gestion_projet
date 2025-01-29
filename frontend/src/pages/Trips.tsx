import { Planner } from "../Planner";
import "./Trips.css";

export function Trips() {
  return (
    <>
      <h1>Trips:</h1>
      <div className="planner">
        <Planner to="Paris" />
      </div>
      <div className="planner">
        <Planner to="Berlin" />
      </div>
    </>
  );
}
