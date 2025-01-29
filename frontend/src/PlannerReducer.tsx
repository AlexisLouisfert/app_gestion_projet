export const PlannerActions = {
  ADD_TASK: "ADD_TASK",
  TOGGLE_TASK_COMPLETION: "TOGGLE_TASK_COMPLETION",
  DELETE_TASK: "DELETE_TASK",
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
};
export const tasksReducer = (tasks: Task[], action: any) => {
  switch (action.type) {
    case PlannerActions.ADD_TASK:
      return [
        ...tasks,
        { id: "" + tasks.length, title: action.payload, done: false },
      ];
    case PlannerActions.TOGGLE_TASK_COMPLETION:
      return tasks.map((t) =>
        t.id === action.payload.id ? { ...t, done: !t.done } : t
      );
    case PlannerActions.DELETE_TASK:
      return tasks.filter((t) => t.id !== action.payload.id);
    default:
      return tasks;
  }
};
