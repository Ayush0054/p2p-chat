const authMiddleware = require("./middleware/authMiddleware");
const admin = require("./firebase/index.js");

const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());

const auth = admin.auth();
var db = admin.database();
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

app.get("/api/listusers", authMiddleware, async (req, res) => {
  try {
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }));
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user list" });
  }
});
//////////////////////////////////////
app.post("/api/create-chat", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    const uid = req.user.uid;

    if (!userId) {
      console.log("userId not provided.");
      return res.sendStatus(400).json({ error: "User ID not provided" });
    }

    // Create a reference to your Firebase Realtime Database
    const db = admin.database();
    const chatRef = db.ref("chats");

    // Check if a chat already exists for the given users
    const chatQuery = chatRef
      .orderByChild(`users/${userId}`)
      .equalTo(true)
      .limitToFirst(1);

    chatQuery.once("value", (snapshot) => {
      const chat = snapshot.val();
      if (chat) {
        // Chat exists, return it
        res.status(200).json(chat);
      } else {
        // Chat doesn't exist, create a new chat
        const newChat = {
          users: {
            [uid]: true,
            [userId]: true,
          },
          messages: [],
        };

        // Push the new chat to the "chats" node in your Firebase Realtime Database
        const newChatRef = chatRef.push(newChat, (error) => {
          if (error) {
            res.status(500).json({ error: "Error creating chat" });
          } else {
            // Retrieve the unique ID generated for the new chat
            const chatId = newChatRef.key;
            // Add the chatId to the chat object
            newChat.chatId = chatId;

            // Update the chat in the database with the chatId
            chatRef.child(chatId).set(newChat, (updateError) => {
              if (updateError) {
                res.status(500).json({ error: "Error updating chat" });
              } else {
                const messageRef = db.ref("messages");
                const latestMessageQuery = messageRef
                  .orderByChild("chat")
                  .equalTo(chatId)
                  .limitToLast(1);

                latestMessageQuery.once("value", (messageSnapshot) => {
                  const message = messageSnapshot.val();
                  if (message) {
                    newChat.messages.push(message);
                  }
                  // res.status(201).json(newChat);

                  // Fetch the full chat with users data (excluding passwords)
                  chatRef.child(chatId).once("value", async (chatSnapshot) => {
                    const chatData = chatSnapshot.val();
                    if (chatData) {
                      const users = chatData.users;
                      const usersArray = Object.keys(users);
                      const fullChat = {
                        ...chatData,
                        users: usersArray,
                      };
                      console.log(fullChat);
                      res.status(201).json(fullChat);
                    } else {
                      res.status(404).json({ error: "Chat not found" });
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/send-message", authMiddleware, async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const userId = req.user.uid;
    if (!content || !chatId || !userId) {
      console.log("Invalid data passed into the request");
      return res.status(400).json({ error: "Invalid data" });
    }

    // Create a new message object
    const newMessage = {
      sender: userId, // Use the sender's user ID
      content: content,
      chat: chatId,
    };

    // Create a reference to your Firebase Realtime Database
    const db = admin.database();
    const messageRef = db.ref("messages");
    const chatRef = db.ref("chats");
    // Push the new message to the messages node
    const newMessageRef = messageRef.push(newMessage, (error) => {
      if (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ error: "Error creating message" });
      } else {
        // Retrieve the unique ID generated for the new message
        const messageId = newMessageRef.key;
        newMessage.messageId = messageId; // Associate the messageId with the message

        // Update the message in the database with the messageId
        messageRef.child(messageId).set(newMessage, (updateError) => {
          if (updateError) {
            res.status(500).json({ error: "Error updating message" });
          } else {
            // Fetch the newly created message using the generated ID
            messageRef.child(messageId).once("value", (snapshot) => {
              const message = snapshot.val();
              console.log(message);
              chatRef.child(chatId).update({ latestMessage: message });
              res.status(201).json(message);
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all messages for a given chat
app.get("/api/messages/:chatId", authMiddleware, async (req, res) => {
  try {
    const chatId = req.params.chatId;

    // Query the messages for the specified chat
    const messageRef = db.ref("messages");
    const messageQuery = messageRef.orderByChild("chat").equalTo(chatId);

    messageQuery.once("value", (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        // Convert the messages to an array and send them as a response
        // const messagesArray = Object.values(messages);
        console.log(messages);
        res.status(200).json(messages);
      } else {
        res.status(404).json({ message: "No messages found for this chat" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// const getUserInfo = async (uid) => {
//   try {
//     const userRecord = await admin.auth().getUser(uid);
//     const { displayName, photoURL } = userRecord;
//     return { name: displayName, profilePic: photoURL };
//   } catch (error) {
//     throw error;
//   }
// };
// app.get("/api/fetchchat/:uid", async (req, res) => {
//   try {
//     const uid = req.params.uid;

//     const userInfo = await getUserInfo(uid);

//     res.status(200).json(userInfo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/api/fetchChats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid; // Replace with how you identify users

    const chatRef = db.ref("chats");

    chatRef
      .orderByChild(`users/${userId}`)
      .equalTo(true)
      .once("value", async (snapshot) => {
        const chatIds = [];
        snapshot.forEach((childSnapshot) => {
          chatIds.push(childSnapshot.key);
        });

        const chats = [];

        for (const chatId of chatIds) {
          const chatSnapshot = await chatRef.child(chatId).once("value");

          const chat = chatSnapshot.val();

          // You can modify this section to populate users, latestMessage, etc.
          // You'll need to structure your data accordingly in Firebase Realtime Database
          // and fetch the relevant information.

          chats.push(chat);
        }

        res.status(200).json(chats);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
