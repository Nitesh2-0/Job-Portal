import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname:{
    type:String, 
    require:true,
    trim:true
  },
  email:{
    type:String, 
    require:true,
    trim:true,
    unique:true
  },
  phoneNumber:{
    type:Number, 
    require:true,
    trim:true
  },
  password:{
    type:String, 
    require:true,
    trim:true
  },
  role:{
    type:String,
    enum:['student','recruiter'],
    required:true
  },
  profile:{
    bio:{type:String},
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
    profilePhoto:{
      type:String,
      default:""
    }
  }
},{timestamps:true})

export const User = mongoose.model('User',userSchema)