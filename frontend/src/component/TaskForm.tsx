import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useEffect } from 'react';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Task>) => void;
  initialData?: Task;
}

interface Task {
  id?: string;
  name: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

export default function TaskForm({ open, onClose, onSubmit, initialData }: TaskFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Task>({
    defaultValues: { name: '', description: '', status: 'todo' },
  });

  // Met à jour le formulaire lorsqu'on modifie une tâche
  useEffect(() => {
    reset(initialData || { name: '', description: '', status: 'todo' });
  }, [initialData, reset]);

  const handleFormSubmit = async (data: Task) => {
    try {
      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `http://localhost:3000/tasks/${initialData.id}` // Mise à jour avec l'ID
        : "http://localhost:3000/tasks/createTask"; // Création

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Erreur ${method === "PUT" ? "mise à jour" : "création"} de la tâche`);

      console.log(`Task ${method === "PUT" ? "modifiée" : "ajoutée"} :`, await response.json());
      onSubmit(data); // Rafraîchir la liste
      onClose(); // Fermer le formulaire
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Modifier' : 'Créer'} une tâche</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            {...register('name', { required: "Le nom est requis." })}
            label="Nom"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description', { required: "La description est requise." })}
            label="Description"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('status', { required: "Le statut est requis." })}
            label="Statut"
            select
            fullWidth
            margin="normal"
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="todo">À faire</MenuItem>
            <MenuItem value="in-progress">En cours</MenuItem>
            <MenuItem value="done">Terminée</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
