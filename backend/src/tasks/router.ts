import { NextFunction, Request, Router } from "express"
import {DbTask } from "./db/models"
import { StatusCodes } from "http-status-codes"
import { taskSchema } from "./models"

export const createTaskRoutes = () => {
    const TaskRoutes = Router()
    TaskRoutes.post( '/task', ( req, res, next ) => {
            try {
                const taskD = taskSchema.parse(req.body)
                const newTask = new DbTask(taskD)
                newTask.save()
                res.sendStatus(StatusCodes.CREATED)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
      
    TaskRoutes.put( '/:id', async ( req, res, next ) => {
            try {
            console.log("body",req.body);
            const taskD = taskSchema.parse(req.body)
                let task = await DbTask.updateOne({_id:req.params.id},taskD)
                res.sendStatus(StatusCodes.CREATED)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
  
    TaskRoutes.get( '/:id', async ( req, res, next ) => {
            try {
                let task = await DbTask.findById(req.params.id)
                task?.populate('title','status')
                res.json(task)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
  
    TaskRoutes.get( '/', async ( req, res, next ) => {
            try {
                let task = await DbTask.find().limit(20).populate('name','done')
                res.json(task)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
  
    TaskRoutes.delete( '/:id', async ( req, res, next ) => {
            try {
                await DbTask.deleteOne(req.body.id)
                res.sendStatus(StatusCodes.OK)
            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
    return TaskRoutes
}