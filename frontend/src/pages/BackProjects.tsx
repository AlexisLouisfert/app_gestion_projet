import { useEffect, useState } from "react";

export function BackProjects() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        leader: "",
        scrumMaster: "",
        productOwner: "",
        participants: [],
        sprints: [],
        stories: []
    });

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await fetch("http://localhost:3000/projects").then(res => res.json());
                setProjects(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des projets :", error);
            }
        }
        fetchProjects();
    }, []);

    async function createProject() {
        try {
            const response = await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création du projet");
            }

            // Rafraîchir la liste des projets après l'ajout
            const updatedProjects = await fetch("http://localhost:3000/projects").then(res => res.json());
            setProjects(updatedProjects);

            // Réinitialiser le formulaire
            setNewProject({
                name: "",
                description: "",
                leader: "",
                scrumMaster: "",
                productOwner: "",
                participants: [],
                sprints: [],
                stories: []
            });
        } catch (error) {
            console.error("Erreur lors de la création du projet :", error);
        }
    }

    return (
        <>
            <h1>Création des Projets</h1>
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
            <input
                type="text"
                placeholder="Leader (ID utilisateur)"
                value={newProject.leader}
                onChange={(e) => setNewProject({ ...newProject, leader: e.target.value })}
            />
            <input
                type="text"
                placeholder="Scrum Master (ID utilisateur)"
                value={newProject.scrumMaster}
                onChange={(e) => setNewProject({ ...newProject, scrumMaster: e.target.value })}
            />
            <input
                type="text"
                placeholder="Product Owner (ID utilisateur)"
                value={newProject.productOwner}
                onChange={(e) => setNewProject({ ...newProject, productOwner: e.target.value })}
            />
            <button onClick={createProject}>Créer un projet</button>

            <ul>
                {projects.map((project: any) => (
                    <li key={project._id}>
                        {project.name} - {project.description}
                        <br />
                        Leader: {project.leader?.email} | 
                        Scrum Master: {project.scrumMaster?.email} | 
                        Product Owner: {project.productOwner?.email}
                    </li>
                ))}
            </ul>
        </>
    );
}
