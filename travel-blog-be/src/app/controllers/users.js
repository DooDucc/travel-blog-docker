const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../../utils/funtions");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory!!!" });
    }
    const user = await User.findOne({ email });
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        const { _id, name, email } = user;
        res.status(200).json({ _id, email, name, token: generateToken(_id) });
      }
    } else {
      res.status(403).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are mandatory!!!" });
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already registered!!!" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match!!!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (user) {
        const { _id, name, email } = user;
        res.status(200).json({ _id, email, name, token: generateToken(_id) });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };
