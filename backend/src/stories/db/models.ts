import mongoose, { model, Schema } from 'mongoose'
import uniqueValidator from "mongoose-unique-validator"
import httpErrors from "mongoose-errors"

const dbStorySchema = new Schema({
  name : {type:String,unique:true},
  description : String,
  tasks : [{id:Number,name:String,done:Boolean}]
})
dbStorySchema.plugin(uniqueValidator)
dbStorySchema.plugin(httpErrors)

const DbStory = model('Story',dbStorySchema)

export { DbStory,dbStorySchema }
