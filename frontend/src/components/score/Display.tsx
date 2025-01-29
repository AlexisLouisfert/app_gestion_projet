import { useScore } from "../../contexts/ScoreContext"

export function Display(){
    const {count} = useScore()
    return (
        <p>La valeur du compteur est: {count}</p>
    )
}