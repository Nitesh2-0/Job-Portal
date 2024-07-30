import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name:{
    type:String, 
    require:true,
    trim:true
  },
  description:{
    type:String,
  },
  location:{
    type:String
  },
  website:{
    type:String,
  },
  logo:{
    type:String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true,
  }
},{timestamps:true})

export const Company = mongoose.model('Company',companySchema);