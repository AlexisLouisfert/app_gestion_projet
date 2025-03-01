import { useForm, Resolver } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Project>) => void;
  initialData?: Project;
}

type Project = {
  id: string;
  name: string;
  description: string;
  leader?: string;
  scrumMaster?: string;
  productOwner?: string;
};

// Resolver pour valider les champs
const resolver: Resolver<Project> = async (values) => {
  return {
    values: values.name && values.description ? values : {},
    errors: {
      ...( !values.name && { name: { type: "required", message: "Le nom du projet est requis." } }),
      ...( !values.description && { description: { type: "required", message: "La description est requise." } }),
      ...( !values.leader && { leader: { type: "required", message: "Le nom du projet est requis." } }),
      ...( !values.scrumMaster && { scrumMaster: { type: "required", message: "La description est requise." } }),
      ...( !values.productOwner && { productOwner: { type: "required", message: "Le nom du projet est requis." } }),
    },
  };
};

export default function ProjectForm({ open, onClose, initialData }: ProjectFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Project>({
    resolver,
    defaultValues: initialData || {
      name: '',
      description: '',
      leader: '',
      scrumMaster: '',
      productOwner: ''
    }
  });
  const [modified, setmodified] = useState(false);
  useEffect(() => {
    if(initialData) {
      setmodified(true);
    }
    else {
      setmodified(false);
    }
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: Project) => {
    if (modified) {
      // Mise à jour du projet existant
      try {
        const response = await fetch(`http://localhost:3000/projects/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du projet");
        }
        console.log("Projet mis à jour:", await response.json());
        onClose(); // Ferme le formulaire aprés soumission
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
    else {
      try {
        const response = await fetch("http://localhost:3000/projects/createProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi des données");
        }
        console.log("Projet ajouté:", await response.json());
        onClose(); // Ferme le formulaire après soumission
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Modifier' : 'Créer'} un projet</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register('name')}
            label="Nom du projet"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('leader')}
            label="leader"
            fullWidth
            margin="normal"
            error={!!errors.leader}
            helperText={errors.leader?.message}
          />
          <TextField
            {...register('scrumMaster')}
            label="scrumMaster"
            fullWidth
            margin="normal"
            error={!!errors.scrumMaster}
            helperText={errors.scrumMaster?.message}
          />
          <TextField
            {...register('productOwner')}
            label="productOwner"
            fullWidth
            margin="normal"
            error={!!errors.productOwner}
            helperText={errors.productOwner?.message}
          />
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
