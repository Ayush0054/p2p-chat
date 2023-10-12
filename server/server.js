const authMiddleware = require("./middleware/authMiddleware");
const admin = require("./firebase/index.js");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
const auth = admin.auth();

app.use(cors());
app.use("/", authMiddleware);
// router = express.Router();

app.post("/api/register", async (req, res) => {
  try {
    const { email, name, password, profilePic } = req.body;

    const userRecord = await auth.createUser({
      email,
      password,
    });

    await auth.updateUser(userRecord.uid, {
      displayName: name,
      photoURL: profilePic,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with email and password
    await auth.signInWithEmailAndPassword(email, password);

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Login failed" });
  }
});
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
