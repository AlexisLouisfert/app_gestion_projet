import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useEffect } from 'react';

interface StoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Story>) => void;
  initialData?: Story;
}

interface Story {
  id?: string; // L'ID est optionnel pour la création
  name: string;
  description: string;
}

export default function StoryForm({ open, onClose, onSubmit, initialData }: StoryFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Story>({
    defaultValues: { name: '', description: '' },
  });

  //  Met à jour le formulaire lorsqu'on modifie une story
  useEffect(() => {
    reset(initialData || { name: '', description: '' });
  }, [initialData, reset]);

  const handleFormSubmit = async (data: Story) => {
    try {
      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `http://localhost:3000/stories/${initialData.id}` // Mise à jour avec l'ID
        : "http://localhost:3000/stories/createStory"; // Création

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Erreur ${method === "PUT" ? "mise à jour" : "création"} de la story`);

      console.log(`Story ${method === "PUT" ? "modifiée" : "ajoutée"} :`, await response.json());
      onSubmit(data); // Rafraîchir la liste
      onClose(); // Fermer le formulaire
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Modifier' : 'Créer'} une story</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            {...register('name', { required: "Le titre est requis." })}
            label="Titre"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={onClose} type="submit" variant="contained" color="primary">
            {initialData ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
