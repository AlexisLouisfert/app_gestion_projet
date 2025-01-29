import {z} from 'zod'

export const taskSchema = z.lazy(() => z.object({
    id: z.number(),
    name: z.string(),
    done: z.boolean()
}))

export type Task = z.infer<typeof taskSchema>