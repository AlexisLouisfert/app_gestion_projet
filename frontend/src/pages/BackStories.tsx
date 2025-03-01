import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import type { Story } from '../types';
import StoryForm from '../component/StoryForm';

export async function deleteProject(id: string, updateStories: (id: string) => void) {
    try {
        const response = await fetch(`http://localhost:3000/stories/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
        }

        console.log(`Le projet ${id} a bien été supprimé.`);
        updateStories(id);
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
}

export default function BackStories() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<Story | undefined>();
    const [stories, setStories] = useState([])

    useEffect(() => {
        async function fetchStories() {
            const data = await fetch("http://localhost:3000/stories")
                .then(res => res.json())
            const formData = data.map((project: any) => ({
                id: project._id,
                name: project.name,
                description: project.description,
            }));
            setStories(formData)

        }
        fetchStories();
        const interval = setInterval(fetchStories, 1000);
        return () => clearInterval(interval);
    }, [])

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nom', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                const handleEdit = () => {
                    setSelectedStory(params.row);
                    setIsFormOpen(true);
                };
                const handleDelete = (id: string) => {
                    setStories((prevStories) =>
                        prevStories.filter((project: any) => project._id !== id)
                    );
                };

                return (
                    <Box>
                        <Button size="small" color="primary" onClick={handleEdit}>Éditer</Button>
                        <Button size="small" color="error" onClick={() => deleteProject(params.row.id, handleDelete)}>Supprimer</Button>
                    </Box>
                );
            },
        },
    ];
    const handleFormSubmit = (data: Partial<Story>) => {
        console.log('Form submitted:', data);
        setIsFormOpen(false);
        setSelectedStory(undefined);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedStory(undefined);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Stories</Typography>
                <Button
                    variant="contained"
                    onClick={() => setIsFormOpen(true)}
                >
                    Nouvelle Story
                </Button>
            </Box>
            <DataGrid
                rows={stories}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                autoHeight
            />
            <StoryForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                initialData={selectedStory}
            />
        </Box>
    );
}