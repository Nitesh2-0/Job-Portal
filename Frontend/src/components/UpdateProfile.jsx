import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

const UpdateProfile = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    skills: "",
    description: "",
    file: null
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileEvent = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <i className="ri-pencil-line font-semibold"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Fill out the information below. Separate skills with commas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <textarea
                id="skills"
                type="text"
                name="skills"
                value={input.skills}
                onChange={handleChange}
                className="col-span-3 rounded border p-1"
                placeholder="Add skills, e.g., React, JavaScript, Node"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <textarea
                id="bio"
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
                className="col-span-3 rounded border p-1"
                placeholder="Write a short bio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Picture
              </Label>
              <Input
                id="picture"
                type="file"
                name="file"
                accept="file/*"
                onChange={handleFileEvent}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
