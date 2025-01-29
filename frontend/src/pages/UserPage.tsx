import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  dob: number;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName && values.dob ? values : {},
    errors: !values.firstName || !values.dob
      ? {
          firstName: {
            type: "required",
            message: "First name is required.",
          },
          dob: {
            type: "required",
            message: "Date of birth is required.",
          },
        }
      : {},
  };
};

export default function UserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });


  const onSubmit = (data : FormValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("firstName")} placeholder="John" />
        {errors?.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <input {...register("lastName")} placeholder="Doe" />
      </div>
      <div>
        <input {...register("dob")} placeholder="01-01-2000" type="date" />
        {errors?.dob && <p>{errors.dob.message}</p>}
      </div>

      <input type="submit" />
    </form>
  );
}
