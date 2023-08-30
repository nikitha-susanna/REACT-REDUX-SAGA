const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/usersList", (req, res) => {
  res.json(users);
});

app.delete("/deleteUser", (req, res) => {
  const removeUserId = req.query.userId;
  const itemIndex = users.findIndex(i => i.id === parseInt(removeUserId));
  if (itemIndex !== -1) {
    users.splice(itemIndex, 1);
  }
  const data = {
    message: "Successfully deleted"
  };
  res.json(data);
});

app.post("/addUser", (req, res) => {
  const newUser = req.body;
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  const newUserWithId = { id: maxId + 1, ...newUser };
  users.push(newUserWithId);
  const data = {
    message: "Successfully add a new user"
  };
  res.json(data);
});

app.put("/updateUser", (req, res) => {
  const userId = parseInt(req.query.userId); 
  const { name, userName, email, salesStat } = req.body; 

  const userToUpdate = users.find(user => user.id === userId);

  if (!userToUpdate) {
    return res.status(404).json({ error: "User not found" });
  }

  userToUpdate.name = name || userToUpdate.name;
  userToUpdate.userName = userName || userToUpdate.userName;
  userToUpdate.email = email || userToUpdate.email;
  userToUpdate.salesStat = salesStat || userToUpdate.salesStat;

  res.json({ message: "User updated successfully", user: userToUpdate });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});