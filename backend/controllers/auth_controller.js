const generateTokenAndSetCookie = require("../utils/generateToken");
const User = require("./../models/user_model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password don't match",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const genderForImage = gender === "male" ? "boy" : "girl";
    const image = `https://avatar.iran.liara.run/public/${genderForImage}?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: image,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "Signup success!",
        data: newUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Login success!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      success: true,
      message: "Logout success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signup, login, logout };
