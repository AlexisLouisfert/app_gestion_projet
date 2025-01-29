import { useScore } from "../../contexts/ScoreContext"

export function Score() {
    
    const {increment,decrement,reset} = useScore()

    function onIncrement() {
        increment()
    }

    function onDecrement() {
        decrement()
    }

    function onReset() {
        reset()
    }

    return (
        <>
        {/* <div>
            count is {count}
        </div> */}
        <div>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={onReset}>Reset</button>
        </div>
        </>
    )
}