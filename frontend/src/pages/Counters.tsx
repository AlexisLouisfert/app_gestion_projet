import { Display } from "../components/score/Display";
import { Score } from "../components/score/Score";
import { WithScoreContext } from "../contexts/ScoreContext";

export function Counters() {
  return (
    <>
      <h1>Counters:</h1>
      <WithScoreContext>
        <Score />
        <Display />
      </WithScoreContext>
      
      <WithScoreContext>
        <Score />
        <Display />
      </WithScoreContext>
    </>
  );
}
