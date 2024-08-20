import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;
    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "something is missing! ",
        success: false
      })
    }
    //cloudnary for file update
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist with this email.💡"
      })
    }
    User.create({
      fullname: fullName,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      phoneNumber,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      }

    })
    return res.status(201).json({
      message: "Account created successfully! 🎉🎉",
      success: true,
    })
  } catch (error) {
    console.log("👿 " + error);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Incorrect role selected.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile
    };

    return res.status(200).cookie('token', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    }).json({
      message: `Welcome back 🎊 ${user.fullname}`,
      user,
      success: true,
      token: token
    });

  } catch (error) {
    console.log("👿 " + error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully. 👍",
      success: true
    })
  } catch (error) {
    console.log("👿 " + error);
  }
}

export const profileUpdate = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    //cloudnary for file update
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(',').map(skill => skill.trim());
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (fullName) user.fullname = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray && skillsArray.length > 0) user.profile.skills = skillsArray;

    console.log(skillsArray);


    // something for resume 
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url
      user.profile.resumeOriginalName = file.originalname
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile
    }

    return res.status(200).json({
      message: "profile updated successfully. 🎉🎉",
      user,
      success: true
    })

  } catch (error) {
    console.log("👿 " + error);
  }
}