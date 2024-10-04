import mongoose from "mongoose"
import bcrypt from 'bcrypt'

export type UserType={
    _id:string,
    email:string,
    password:string,
    firstName:string,
    lastName:string
}


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
}, {timestamps:true})

UserSchema.pre('save' ,async function(next){
    if(!this.isModified("password")) return next()
    this.password =await bcrypt.hash(this.password , 10)
next()

})





const User = mongoose.model<UserType>("User" , UserSchema)

export default User