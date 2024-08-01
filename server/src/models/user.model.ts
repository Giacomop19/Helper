import mongoose from "mongoose"
import Joi from "joi"
import { KeyObject } from "crypto"


const UserSchema = new mongoose.Schema({
    username: {type : String, required : true},
    date : {type : Date, required : false},
    email : {type : String, required : true},
    password : {type : String, required : true},
    job : {type: String, required :false},
    mobile: {type: String, required: false},
}, {collection : 'user'})

export let validateUser = (user: any) => {
    const schema = Joi.object({
        username : Joi.string().required(),
        date : Joi.date(),
        email : Joi.string(),
        password : Joi.string().required(),
        job : Joi.string(),
        mobile : Joi.string(),
        })
    return schema.validate(user)
}

export const User = mongoose.model('User', UserSchema)
