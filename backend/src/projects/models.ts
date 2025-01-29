import { z } from "zod";


export const projectSchema = z.lazy(() => z.object({
    name: z.string(),
    description: z.string(),
    leader: z.string(),
    scrumMaster: z.string(),
    productOwner: z.string(),
    participants: z.array(z.string()),
    sprints: z.array(z.object({
        id: z.number(),
        startDate: z.date(),
        endDate: z.date()
    })),
    stories: z.array(z.object({
        story: z.string(),
        assignees: z.array(z.object({
            user: z.string(),
            tasks: z.array(z.number())
        }))
    }))
}))
export type Project = z.infer<typeof projectSchema>