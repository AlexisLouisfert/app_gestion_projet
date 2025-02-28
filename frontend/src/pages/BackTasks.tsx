import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography, Chip } from '@mui/material';
import type { Task } from '../types';
import TaskForm from '../component/TaskForm';

export default function BackTasks() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            const data = await fetch("http://localhost:3000/tasks")
                .then(res => res.json());
            const formattedData = data.map((task: any) => ({
                id: task._id,
                name: task.name,
                description: task.description,
                status: task.status,
            }));
            setTasks(formattedData);
        }
        fetchTasks();
        const interval = setInterval(fetchTasks, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Erreur de suppression");
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nom', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        {
            field: 'status',
            headerName: 'Statut',
            flex: 1,
            renderCell: (params) => {
                const statusColors: Record<string, "default" | "primary" | "warning" | "success"> = {
                    "todo": "default",
                    "in-progress": "warning",
                    "done": "success"
                };
                return <Chip label={params.value} color={statusColors[params.value] || "default"} />;
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button size="small" color="primary" onClick={() => {
                            setSelectedTask(params.row);
                            setIsFormOpen(true);
                        }}>
                            Éditer
                        </Button>
                        <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>
                            Supprimer
                        </Button>
                    </Box>
                );
            },
        },
    ];

    const handleFormSubmit = (data: Partial<Task>) => {
        console.log('Form submitted:', data);
        setIsFormOpen(false);
        setSelectedTask(undefined);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedTask(undefined);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Tasks</Typography>
                <Button variant="contained" onClick={() => setIsFormOpen(true)}>
                    Nouvelle Task
                </Button>
            </Box>
            <DataGrid
                rows={tasks}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                autoHeight
            />
            <TaskForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                initialData={selectedTask}
            />
        </Box>
    );
}
