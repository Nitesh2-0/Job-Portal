import React from 'react'
import { Button } from './ui/button'

const SetColor = ({ job }) => {
  let setColor = job.status === "Accepted" ? "bg-green-700 hover:bg-green-600" :
    job.status === "Rejected" ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-400"
  return (
    <button className={`${setColor} p-1 text-white px-2 rounded-sm`} > {job.status}</button >
  )
}

export default SetColor