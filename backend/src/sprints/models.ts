import {z} from 'zod'

export const sprintSchema = z.lazy(() =>z.object({
    id: z.number(),
    startDate: z.date(),
    endDate: z.date()
}))

export type Sprint = z.infer<typeof sprintSchema>