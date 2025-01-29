import { useEffect, useState } from "react";

export function BackProjects() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: "", description: "" });

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await fetch("http://localhost:3000/projects")
                    .then(res => res.json());
                setProjects(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }
        fetchProjects();
    }, []);

    async function createProject() {
        try {
            await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });
            setNewProject({ name: "", description: "" });
        } catch (error) {
            console.error("Erreur lors de la création du projet :", error);
        }
    }

    return (
        <>
            <h1>Création  des Projets</h1>
            <input
                type="text"
                placeholder="Nom du projet"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button onClick={createProject}>Créer un projet</button>

            <ul>
                {projects.map((project: any) => (
                    <li key={project._id}>{project.name} - {project.description}</li>
                ))}
            </ul>
        </>
    );
}
