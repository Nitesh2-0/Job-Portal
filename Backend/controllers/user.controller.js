import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;
    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "something is missing! 👿",
        success: false
      })
    }
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
      phoneNumber
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
        message: "something is missing! 👿",
        success: false
      })
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.❌",
        success: false,
      })
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.❌",
        success: false,
      })
    }

    if (!(user.role === role)) {
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Select Currect role.❌",
          success: false,
        })
      }
    }

    const tokenData = {
      userId: user._id
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile
    }

    return res.status(200).cookie('token', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict'
    }).json({
      message: `Welcome Back 🎊 ${user.fullname}`,
      user,
      success: true
    });

  } catch (error) {
    console.log("👿 " + error);
  }

}

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
    const file = req.file

    //cloudnary for file update

    let skillsArray
    if (skills) { skillsArray = skills.split(',') }
    const userId = req.id //get from middleware 
    let user = await User.findById(userId);

    if (fullName) user.fullname = fullName
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.skills = skillsArray

    // something for resume 
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