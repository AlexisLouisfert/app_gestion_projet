import { useEffect, useState } from "react";

export function BackTasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", status: "To Do" });

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await fetch("http://localhost:3000/tasks")
                    .then(res => res.json());
                setTasks(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches :", error);
            }
        }
        fetchTasks();
    }, []);

    async function createTask() {
        try {
            await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });
            setNewTask({ title: "", status: "To Do" });
        } catch (error) {
            console.error("Erreur lors de la création de la tâche :", error);
        }
    }

    return (
        <>
            <h1>Gestion des Tâches</h1>
            <input
                type="text"
                placeholder="Titre de la tâche"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button onClick={createTask}>Créer une tâche</button>

            <ul>
                {tasks.map((task: any) => (
                    <li key={task._id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </>
    );
}
