import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { genSalt, hash, compare } from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = sign(
      { user: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "360000" }
    );

    res.cookie("token", token, { httpOnly: true, expiresIn: "360000" });

    const { password: pass, ...rest } = user._doc;

    res
      .status(201)
      .json({ msg: "User Created Successfully", user: rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: user._id
    };

    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '360000' });

    res.cookie('token', token, { httpOnly: true, expiresIn: '360000' });

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ msg: 'User Logged In Successfully', user: rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'User Logged Out Successfully' });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ msg: 'User Found', user: rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    await User.findOneAndUpdate({ _id: userId }, { name, email });

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ msg: 'User Details Updated', user: rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    const salt = await genSalt(10);
    user.password = await hash(newPassword, salt);
    await user.save();

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ msg: 'Password Updated Successfully', user: rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export default {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  deleteUser
};
