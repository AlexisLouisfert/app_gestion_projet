export const ScoreActions = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    RESET: "RESET"
}

export const scoreReducer = (count: number, action: any) => {
    switch (action.type) {
        case ScoreActions.INCREMENT:
            return count + 1
        case ScoreActions.DECREMENT:
            return count - 1
        case ScoreActions.RESET:
            return 0
        default:
            return count
    }
}