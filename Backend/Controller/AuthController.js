import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
dotenv.config();

export const signUp = async (req, res) => {
  const { RegisterAs, name, email, phone, password } = req.body;

  if (!RegisterAs || !name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await userModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const savedData = await userModel.create(req.body);

    res.status(200).json({
      message: "User created successfully and saved in DB",
      success: true,
      savedData,
    });
  } catch (error) {
    console.log(error.message, `er in finding exist email`);

    res
      .status(500)
      .json({ message: "Internal server error in user registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user does'nt exist", user });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid credential" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    console.log(token, "token generated");

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "login successfull",
      userdetail: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        RegisterAs: user.RegisterAs,
      },
    });
  } catch (error) {
    console.log(error.message, `error in login api`);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    // localStorage.clear

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message, `error in logout api`);
  }
};

export const editUserProfile = async (req, res) => {
  const { name, phone } = req.body;

  const userId = req.params.userId;
  if (!name || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const response = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
      },
      { new: true },
    );
    res.clearCookie("token");

    res
      .status(200)
      .json({ response, message: "User profile updated successfully" });
  } catch (error) {
    console.log(error.message, `error in edit user profile api`);
    res
      .status(500)
      .json({ message: "Internal server error in edit user profile" });
  }
};

export const editUserPassword = async (req, res) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "old password is incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true },
    );

    res.clearCookie("token");

    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in edit user password" });
    console.log(error.message, `error in edit user password api`);
  }
};
