import { NextFunction, Request, Router } from "express"
import { DbSprint, dbSprintSchema } from "./db/models"
import { StatusCodes } from "http-status-codes"
import { sprintSchema } from "./models"

export const createSprintRoutes = () => {
    const sprintRoutes = Router()
    sprintRoutes.post('/', (req, res, next) => {
        try {
          const sprintD = sprintSchema.parse(req.body)
          const newSprint = new DbSprint(sprintD)
          newSprint.save()
          res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
          console.log(error);
          next(error)
        }
      }
    )

    sprintRoutes.put('/:id', async (req, res, next) => {
        try {
          console.log('body',req.body);
          const sprintD = sprintSchema.parse(req.body)
          let sprint = await DbSprint.updateOne({_id:req.params.id},sprintD)
          res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
          console.log(error);
          next(error)
        }
      }
    )

    sprintRoutes.get('/:id', async (req, res, next) => {
        try {
            let sprint = await DbSprint.findById(req.params.id)
            sprint?.populate('leader')
            res.json(sprint)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    sprintRoutes.get('/', async (req, res, next) => {
        try {
            let sprints = await DbSprint.find().limit(20).populate('leader','_id name email')
            res.json(sprints)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    sprintRoutes.delete('/:id', async (req, res, next) => {
        try {
            await DbSprint.deleteOne(req.body.id)
            res.sendStatus(StatusCodes.OK)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
    return sprintRoutes
}