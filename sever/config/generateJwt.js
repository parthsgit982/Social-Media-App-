import jwt from "jsonwebtoken";

const generateJwt = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export default generateJwt;
