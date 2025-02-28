import { useForm, Resolver } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { User } from '../types';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  initialData?: User;
}

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Resolver pour valider les champs
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username && values.email && values.password && values.confirmPassword
      ? values
      : {},
    errors: {
      ...( !values.username && { username: { type: "required", message: "Le nom d'utilisateur est requis." } }),
      ...( !values.email && { email: { type: "required", message: "L'email est requis." } }),
      ...( !values.password && { password: { type: "required", message: "Le mot de passe est requis." } }),
      ...( !values.confirmPassword && { confirmPassword: { type: "required", message: "La confirmation est requise." } }),
      ...( values.password !== values.confirmPassword && { confirmPassword: { type: "validate", message: "Les mots de passe ne correspondent pas." } }),
    }
  };
};

export default function UserForm({ open, onClose, initialData }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver,
    defaultValues: initialData || {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }
      const result = await response.json();
      console.log("Utilisateur ajouté:", result);
      onClose(); // Ferme le formulaire après soumission
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Modifier' : 'Ajouter'} un utilisateur</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            {...register('username')}
            label="Nom d'utilisateur"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('password')}
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register('confirmPassword')}
            label="Confirmer le mot de passe"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
