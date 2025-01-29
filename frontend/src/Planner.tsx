import { useEffect, useReducer, useState } from "react";
import { PlannerActions, Task, tasksReducer } from "./PlannerReducer";

export function Planner({ to }: { to: string }) {

  
  const [newTask, setNewTask] = useState("");
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  
  console.log("tasks", tasks);
  useEffect(() => {
    console.log("update taches!");
    // fetch("https://mon-backend.com",{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(tasks)
    // })
  },[tasks])

  function addTask(e: any) {
    e.preventDefault();
    dispatch({ type: PlannerActions.ADD_TASK, payload: newTask });
    setNewTask("");
  }

  function toggleTaskCompletion(task: Task) {
    dispatch({ type: PlannerActions.TOGGLE_TASK_COMPLETION, payload: task });
  }

  function deleteTask(task: Task) {
    dispatch({ type: PlannerActions.DELETE_TASK, payload: task });
  }
  return (
    <>
      <div>Voyage à {to}</div>
      <div>
        <form onSubmit={addTask}>
          <input onChange={(e) => setNewTask(e.target.value)} value={newTask} />
          <input type="submit" value="Add" />
        </form>
      </div>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label htmlFor={task.id}>
                <input
                  type="checkbox"
                  name={task.id}
                  id={task.id}
                  checked={task.done}
                  onChange={() => toggleTaskCompletion(task)}
                />
                {task.title}
              </label>
              <button onClick={() => deleteTask(task)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
