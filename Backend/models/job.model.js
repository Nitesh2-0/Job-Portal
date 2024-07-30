import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
    trim:true
  },
  description:{
    type:String,
    require:true,
    trim:true
  },
  requirements:[{
    type:String,
    trim:true
  }],
  salary:{
    type:String,
    require:true
  },
  location:{
    Type:String,
    require:true
  },
  jobType:{
    type:String,
    require:true
  },
  openings:{
    type:Number,
    require:true
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    require:true
  },
  created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true
  },
  applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Application',
  }]
},{timestamps:true})

export const Job = mongoose.model('Job',jobSchema);