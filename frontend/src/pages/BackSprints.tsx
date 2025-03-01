import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography, Chip } from '@mui/material';
import type { Sprint } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SprintForm from '../component/SprintForm';

export default function BackSprints() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | undefined>();
  const [sprints, setSprints] = useState([])

  useEffect(() => {
      async function fetchSprints() {
          const data = await fetch("http://localhost:3000/sprints")
              .then(res => res.json())
              const formData = data.map((sprint : any) => ({
                id: sprint._id,
                startDate: sprint.startDate,
                endDate: sprint.endDate,
              }));
              
              setSprints(formData)
      }
      fetchSprints();
      const interval = setInterval(fetchSprints,1000);
      return () => clearInterval(interval);
  }, [])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    {
      field: 'startDate',
      headerName: 'Date de début',
      flex: 1,
      valueFormatter: (params : any) => 
        format(new Date(params.value), 'dd MMMM yyyy', { locale: fr }),
    },
    {
      field: 'endDate',
      headerName: 'Date de fin',
      flex: 1,
      valueFormatter: (params : any) => 
        format(new Date(params.value), 'dd MMMM yyyy', { locale: fr }),
    },
    {
      field: 'status',
      headerName: 'Statut',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'completed' ? 'success' :
            params.value === 'active' ? 'warning' : 'default'
          }
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const handleEdit = () => {
          setSelectedSprint(params.row);
          setIsFormOpen(true);
        };
  
        return (
          <Box>
            <Button size="small" color="primary" onClick={handleEdit}>Éditer</Button>
            <Button size="small" color="error">Supprimer</Button>
          </Box>
        );
      },
    },
  ];
  
  const handleFormSubmit = (data: Partial<Sprint>) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedSprint(undefined);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedSprint(undefined);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Sprints</Typography>
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
        >
          Nouveau Sprint
        </Button>
      </Box>
      <DataGrid
        rows={sprints}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
      />
      <SprintForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedSprint}
      />
    </Box>
  );
}