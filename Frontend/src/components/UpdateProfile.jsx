import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL_FOR_USER } from '../utils/axios';
import { toast } from 'sonner';
import { setUser } from '../redux/authSlice';

const UpdateProfile = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    description: user?.profile?.bio || "",
    file: null
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileEvent = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.description);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${BASE_URL_FOR_USER}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    console.log(input);
  }

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
                id="email"
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
                Phone Number
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
                accept="application/pdf"
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
