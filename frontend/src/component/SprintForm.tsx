import { useForm, Resolver } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { Sprint } from '../types';

interface SprintFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Partial<Sprint>) => void;
  initialData?: Sprint;
}

type FormValues = {
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
};

// Validation et conversion des dates
const resolver: Resolver<FormValues> = async (values) => {
  const parsedStartDate = values.startDate ? new Date(values.startDate) : null;
  const parsedEndDate = values.endDate ? new Date(values.endDate) : null;

  return {
    values: parsedStartDate && parsedEndDate ? { ...values, startDate: parsedStartDate, endDate: parsedEndDate } : {},
    errors: {
      ...( !values.name && { name: { type: "required", message: "Le nom est requis." } }),
      ...( !parsedStartDate && { startDate: { type: "required", message: "La date de début est requise." } }),
      ...( !parsedEndDate && { endDate: { type: "required", message: "La date de fin est requise." } }),
      ...( parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate && {
        endDate: { type: "validate", message: "La date de fin doit être après la date de début." }
      }),
    }
  };
};

export default function SprintForm({ open, onClose, initialData }: SprintFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver,
    defaultValues: initialData
      ? { ...initialData, startDate: new Date(initialData.startDate), endDate: new Date(initialData.endDate) }
      : { name: '', startDate: new Date(), endDate: new Date(), status: 'planned' },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/sprints/createSprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }

      console.log("Sprint ajouté:", await response.json());
      onClose(); // Ferme le formulaire après soumission réussie

    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Modifier' : 'Créer'} un sprint</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register('name')}
            label="Nom"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('startDate', { valueAsDate: true })}
            label="Date de début"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />
          <TextField
            {...register('endDate', { valueAsDate: true })}
            label="Date de fin"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Statut</InputLabel>
            <Select
              {...register('status')}
              label="Statut"
              defaultValue="planned"
            >
              <MenuItem value="planned">Planifié</MenuItem>
              <MenuItem value="active">En cours</MenuItem>
              <MenuItem value="completed">Terminé</MenuItem>
            </Select>
          </FormControl>
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
