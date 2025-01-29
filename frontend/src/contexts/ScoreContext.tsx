import { createContext, Dispatch, useContext, useMemo, useReducer } from "react";
import { ScoreActions, scoreReducer } from "./ScoreReducer";

type ScoreContextType = [
    count: number,
    dispatch : Dispatch<any>
]

export const ScoreContext = createContext<ScoreContextType | null>(null)

export function WithScoreContext({children}:Readonly<{children: React.ReactNode}>) {

    const scoreStore = useReducer(scoreReducer, 0)

    return (
        <ScoreContext.Provider value={useMemo(() => scoreStore, [scoreStore])}>
            {children}
        </ScoreContext.Provider>
    )
}


export function useScore() {
    const [count, dispatch]  = useContext(ScoreContext)!

    function increment() {
        dispatch({type: ScoreActions.INCREMENT})
    }

    function decrement() {
        dispatch({type: ScoreActions.DECREMENT})
    }

    function reset() {
        dispatch({type: ScoreActions.RESET})
    }

    return {count, increment, decrement, reset}
}