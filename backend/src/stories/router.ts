import { NextFunction, Request, Router } from "express"
import {DbStory } from "./db/models"
import { StatusCodes } from "http-status-codes"
import { storySchema } from "./models"

export const createStoryRoutes = () => {
    const StoryRoutes = Router()
    StoryRoutes.post( '/story', ( req, res, next ) => {
        try {
            const storyD = storySchema.parse(req.body)
            const newStory = new DbStory(storyD)
            newStory.save()
            res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

      
    StoryRoutes.put( '/:id', async ( req, res, next ) => {
          try {
            console.log("body",req.body);
            const storyD = storySchema.parse(req.body)
              let story = await DbStory.updateOne({_id:req.params.id},storyD)
              res.sendStatus(StatusCodes.CREATED)
          } catch (error) {
              console.log(error);
              next(error)
          }
        }
      )
  
    StoryRoutes.get( '/:id', async ( req, res, next ) => {
        try {
            let story = await DbStory.findById(req.params.id)
            story?.populate('name')
            res.json(story)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
  
    StoryRoutes.get( '/', async ( req, res, next ) => {
        try {
            let story = await DbStory.find().limit(20).populate('name')
            res.json(story)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
  
    StoryRoutes.delete( '/:id', async ( req, res, next ) => {
        try {
            await DbStory.deleteOne(req.body.id)
            res.sendStatus(StatusCodes.OK)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
    return StoryRoutes
}