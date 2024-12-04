import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
  },
];

const secretKey = process.env.SECRET_KEY;

app.get("/api/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied, token is missing" });
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    res
      .status(200)
      .json({ message: `Hello ${decoded.username}, this is protected data` });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = users.find((user) => user.username === username);
  if (!user) return res.status(401).json({ message: "User not found" });
  const isPassworsValid = bcrypt.compareSync(password, user.password);
  if (!isPassworsValid)
    return res.status(401).json({ message: "Ivalid credentials" });
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });
  return res.json({ token });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server running on port 5001");
});
