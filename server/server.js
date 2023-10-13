const authMiddleware = require("./middleware/authMiddleware");
const admin = require("./firebase/index.js");

const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());

const auth = admin.auth();

app.use(cors());
// app.use("/", authMiddleware);
// router = express.Router();

app.post("/api/register", async (req, res) => {
  try {
    const { email, name, password, profilePic } = req.body;

    const userRecord = await auth
      .createUser({
        email,
        password,
        emailVerified: false,
        disabled: false,
        displayName: name,
        photoURL: profilePic,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { idToken } = req.body;
    // Verify the ID token first.
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((claims) => {
        // ID token is valid and contains the user info
        // You can now use this information to create a session, generate your own token, etc.
        res.status(200).json({ message: "User logged in successfully" });
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Login failed" });
  }
});
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
