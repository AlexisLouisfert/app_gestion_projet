import {z} from 'zod'

export const storySchema = z.object({
    name: z.string(),
    description: z.string(),
    tasks: z.array(z.object({
        id: z.number(),
        name: z.string(),
        done: z.boolean()
    }))
})