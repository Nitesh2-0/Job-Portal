import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import SetColor from './SetColor'

const AppliedJob = () => {
  const jobApplied = [
    { date: "06-08-2024", role: "MERN Stack Developer", company: "Google", status: "Accepted" },
    { date: "06-08-2024", role: "MERN Stack Developer", company: "Google", status: "Pending" },
    { date: "06-08-2024", role: "MERN Stack Developer", company: "Google", status: "Rejected" },
    { date: "07-08-2024", role: "Backend Developer", company: "Facebook", status: "Pending" },
    { date: "08-08-2024", role: "Frontend Developer", company: "Netflix", status: "Rejected" },
    { date: "09-08-2024", role: "Software Engineer", company: "Microsoft", status: "Pending" },
    { date: "11-08-2024", role: "Database Administrator", company: "Oracle", status: "Accepted" },
    { date: "12-08-2024", role: "System Analyst", company: "IBM", status: "Pending" },
    { date: "13-08-2024", role: "Data Scientist", company: "Tesla", status: "Rejected" },
    { date: "14-08-2024", role: "AI Engineer", company: "OpenAI", status: "Accepted" },
    { date: "15-08-2024", role: "Cybersecurity Specialist", company: "Cisco", status: "Pending" },
    { date: "17-08-2024", role: "IT Support Specialist", company: "Dell", status: "Rejected" }
  ];
  return (
    <Table className="border rounded mt-4">
      <TableCaption>A list of your applied job.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right pr-8">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobApplied.map((job, idx) => (
          <TableRow key={idx}>
            <TableCell >{job.date}</TableCell>
            <TableCell>{job.role}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell className="text-right"><SetColor job={job} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right pr-8">{jobApplied.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default AppliedJob