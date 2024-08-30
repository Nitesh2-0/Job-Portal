import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import SetColor from './SetColor'
import { useSelector } from 'react-redux'

const AppliedJob = () => {
  const { user } = useSelector(store => store.auth);

  const appliedJobs = [
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

  const postedJobs = [
    { date: "01-08-2024", role: "Frontend Developer", company: "Google", applications: 45 },
    { date: "02-08-2024", role: "Backend Developer", company: "Facebook", applications: 30 },
    { date: "03-08-2024", role: "Full Stack Developer", company: "Netflix", applications: 25 },
    { date: "04-08-2024", role: "Data Scientist", company: "Tesla", applications: 40 },
    { date: "05-08-2024", role: "Cybersecurity Specialist", company: "Cisco", applications: 35 },
  ];

  const dataToDisplay = user?.role === 'recruiter' ? postedJobs : appliedJobs;

  return (
    <div className="overflow-x-auto mt-4">
      <div className="max-h-96 overflow-y-auto"> 
        <Table className="min-w-full border rounded">
          <TableCaption>
            {user?.role !== 'recruiter' ? "A list of your applied jobs." : "A list of posted jobs."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">
                {user?.role !== 'recruiter' ? "Status" : "Applicants"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToDisplay.map((job, idx) => (
              <TableRow key={idx}>
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell className="text-right">
                  {user?.role !== 'recruiter' ? <SetColor job={job} /> : job.applications}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right pr-8">{dataToDisplay.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJob;
