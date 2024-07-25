import mongoose from "mongoose"
import Joi from "joi"


const UserSchema = new mongoose.Schema({
    name: {type : String, required : true},
    date : {type : Date, required : false},
    email : {type : String, required : true},
    password : {type : String, required : true},
}, {collection : 'user'})

export let validateUser = (user: any) => {
    const schema = Joi.object({
        name : Joi.string().required(),
        date : Joi.date(),
        email : Joi.string().required(),
        password : Joi.string().required(),
        })
    return schema.validate(user)
}

export const User = mongoose.model('User', UserSchema)
