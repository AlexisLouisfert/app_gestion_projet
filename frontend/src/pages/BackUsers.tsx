import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography } from '@mui/material';
// import UserForm from '../component/UserForm';
// import { User } from '../types';

export default function BackUsers() {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [users, setUsers] = useState([])

  useEffect(() => {

      async function fetchUsers() {
          const data = await fetch("http://localhost:3000/users")
              .then(res => res.json())
          const formData = data.map((user: any) => ({
            id: user._id,
            username: user.name,
            email: user.email,
            password: "******", 
            accessTokens: user.accessTokens,
            refreshTokens: user.refreshTokens,
            role: user.roles.map((role: any) => role.name), 
    }));
              
          setUsers(formData)
      }
      fetchUsers();
      const interval = setInterval(fetchUsers,1000);
      return () => clearInterval(interval);
  }, [])

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Nom d\'utilisateur', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Rôle', flex: 1 },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   flex: 1,
    //   renderCell: (params) => {
    //     const handleEdit = () => {
    //       setSelectedUser(params.row);
    //       setIsFormOpen(true);
    //     };
  
    //     return (
    //       <Box>
    //         <Button size="small" color="primary" onClick={handleEdit}>Éditer</Button>
    //         <Button size="small" color="error">Supprimer</Button>
    //       </Box>
    //     );
    //   },
    // },
  ];

  // const handleFormSubmit = (data: Partial<User>) => {
  //   console.log('Form submitted:', data);
  //   setIsFormOpen(false);
  //   setSelectedUser(undefined);
  // };

  // const handleFormClose = () => {
  //   setIsFormOpen(false);
  //   setSelectedUser(undefined);
  // };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Utilisateurs</Typography>
        {/* <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
        >
          Nouvel Utilisateur
        </Button> */}
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
      />
      {/* <UserForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={selectedUser}
      /> */}
    </Box>
  );
}