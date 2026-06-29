const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup controller
async function signup(req, res) {
  try {
    //Collection of data
    const { name, email, password } = req.body;
    //Validation of data
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    //Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    //Hashing of user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Password:", hashedPassword);

    //Creating a user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
}

//login controller
async function login(req, res) {
  try {
    //Collection of data
    const { email, password } = req.body;

    //validation of input data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    //Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Check if passoword matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //Password matched now generation of token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { signup, login };
