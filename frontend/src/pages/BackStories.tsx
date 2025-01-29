import { useEffect, useState } from "react";

export function BackStories() {
    const [stories, setStories] = useState([]);
    const [newStory, setNewStory] = useState({ title: "", description: "" });

    useEffect(() => {
        async function fetchStories() {
            try {
                const data = await fetch("http://localhost:3000/stories")
                    .then(res => res.json());
                setStories(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des stories :", error);
            }
        }
        fetchStories();
    }, []);

    async function createStory() {
        try {
            await fetch("http://localhost:3000/stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStory),
            });
            setNewStory({ title: "", description: "" });
        } catch (error) {
            console.error("Erreur lors de la création de la story :", error);
        }
    }

    return (
        <>
            <h1>Gestion des Stories</h1>
            <input
                type="text"
                placeholder="Titre"
                value={newStory.title}
                onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newStory.description}
                onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
            />
            <button onClick={createStory}>Créer une story</button>

            <ul>
                {stories.map((story: any) => (
                    <li key={story._id}>{story.title} - {story.description}</li>
                ))}
            </ul>
        </>
    );
}
