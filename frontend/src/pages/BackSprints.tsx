import { useEffect, useState } from "react";

export function BackSprints() {
    const [sprints, setSprints] = useState([]);
    const [newSprint, setNewSprint] = useState({ name: "", duration: 0 });

    useEffect(() => {
        async function fetchSprints() {
            try {
                const data = await fetch("http://localhost:3000/sprints")
                    .then(res => res.json());
                setSprints(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des sprints :", error);
            }
        }
        fetchSprints();
    }, []);

    async function createSprint() {
        try {
            await fetch("http://localhost:3000/sprints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSprint),
            });
            setNewSprint({ name: "", duration: 0 });
        } catch (error) {
            console.error("Erreur lors de la création du sprint :", error);
        }
    }

    return (
        <>
            <h1>Gestion des Sprints</h1>
            <input
                type="text"
                placeholder="Nom du sprint"
                value={newSprint.name}
                onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Durée (jours)"
                value={newSprint.duration}
                onChange={(e) => setNewSprint({ ...newSprint, duration: Number(e.target.value) })}
            />
            <button onClick={createSprint}>Créer un sprint</button>

            <ul>
                {sprints.map((sprint: any) => (
                    <li key={sprint._id}>{sprint.name} - {sprint.duration} jours</li>
                ))}
            </ul>
        </>
    );
}
