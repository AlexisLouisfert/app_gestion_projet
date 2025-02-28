import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
import type { Project } from '../types';
import ProjectForm from '../component/ProjectForm';

export async function deleteProject (id: string, updateProjects: (id: string) => void) {
  try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
          method: "DELETE",
      });

      if (!response.ok) {
          throw new Error("Erreur lors de la suppression");
      }

      console.log(`Le projet ${id} a bien été supprimé.`);
      updateProjects(id);
  } catch (error) {
      console.error("Erreur lors de la suppression :", error);
  }
}

export default function BackProjects() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [projects, setProjects] = useState([])

  useEffect(() => {
      async function fetchProjects() {
          const data = await fetch("http://localhost:3000/projects")
              .then(res => res.json())
              const formData = data.map((project: any) => ({
                id: project._id,
                name: project.name,
                description: project.description,
                leader: project.leader?.name || "Non défini",
                scrumMaster: project.scrumMaster?.name || "Non défini",
                productOwner: project.productOwner?.name || "Non défini",
                participants: project.participants?.length || 0,
                sprints: project.sprints?.length || 0,
                stories: project.stories?.length || 0,
              }));
              setProjects(formData)
          
      }
      fetchProjects();
      const interval = setInterval(fetchProjects,1000);
      return () => clearInterval(interval);
  }, [])

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom du Projet", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "leader", headerName: "Leader", width: 150 },
    { field: "scrumMaster", headerName: "Scrum Master", width: 150 },
    { field: "productOwner", headerName: "Product Owner", width: 150 },
    { field: "participants", headerName: "Participants", width: 150 },
    { field: "sprints", headerName: "Nombre de Sprints", width: 150 },
    { field: "stories", headerName: "Nombre de Stories", width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const handleEdit = () => {
          setSelectedProject({id: params.row.id, name: params.row.name, description: params.row.description});
          console.log(params.row);
          setIsFormOpen(true);
        };
        const handleDelete = (id: string) => {
          setProjects((prevProjects) =>
            prevProjects.filter((project: any) => project._id !== id)
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
  const handleFormSubmit = (data: Partial<Project>) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedProject(undefined);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedProject(undefined);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Projets</Typography>
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
        >
          Nouveau Projet
        </Button>
      </Box>
      <DataGrid
        rows={projects}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
      />
      <ProjectForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedProject}
      />
    </Box>
  );
}