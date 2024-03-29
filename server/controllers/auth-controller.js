const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome using router from nishant");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      msg: "registration Sucessfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).json({ msg: "page not found" });
  }
};

// userlogin logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "login Sucessfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

// user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route${error}`);
  }
};
module.exports = { home, register, login, user };
