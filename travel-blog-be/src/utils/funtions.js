const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT_TOKEN, {
    expiresIn: "30d",
  });
};

const validateToken = async (req, res, next) => {
  try {
    if (req.headers?.authorization) {
      const token = req.headers?.authorization?.split(" ")[1];
      if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT_TOKEN);
        req.userId = decodedToken?.id;
      } else {
        res.status(401).json({ message: "Unauthenticated!!" });
      }
      next();
    } else {
      res.status(401).json({ message: "Unauthenticated!!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateToken, validateToken };
