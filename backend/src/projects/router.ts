import { NextFunction, Request, Router } from "express"
import { DbProject, dbProjectSchema } from "./db/models"
import { StatusCodes } from "http-status-codes"
import { projectSchema } from "./models"

export const createProjectRoutes = () => {
    const projectRoutes = Router()
    projectRoutes.post('/', (req, res, next) => {
        try {
          const projectD = projectSchema.parse(req.body)
          const newProject = new DbProject(projectD)
          newProject.save()
          res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
          console.log(error);
          next(error)
        }
      }
    )

    projectRoutes.put('/:id', async (req, res, next) => {
        try {
          console.log('body',req.body);
          const projectD = projectSchema.parse(req.body)
          let project = await DbProject.updateOne({_id:req.params.id},projectD)
          res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
          console.log(error);
          next(error)
        }
      }
    )

    projectRoutes.get('/:id', async (req, res, next) => {
        try {
            let project = await DbProject.findById(req.params.id)
            project?.populate('leader')
            res.json(project)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    projectRoutes.get('/', async (req, res, next) => {
        try {
            let projects = await DbProject.find().limit(20).populate('leader','_id name email')
            res.json(projects)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    projectRoutes.delete('/:id', async (req, res, next) => {
        try {
            await DbProject.deleteOne(req.body.id)
            res.sendStatus(StatusCodes.OK)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
    return projectRoutes
}