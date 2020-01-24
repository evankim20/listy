/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Group = require("./models/group");
const Item = require("./models/item");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// post an item to a list
// TODO: groupId hard coded, sender info hard coded
router.post("/item", (req, res) => {
  const newItem = new Item({
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    groupId: req.body.groupId,
    content: req.body.content,
    likedBy: [req.user._id],
    dislikedBy: [],
  });
  newItem.save().then((item) => res.send(item));
});

// get all items from a group
router.get("/items", (req, res) => {
  Item.find({ groupId: req.query.groupId }).then((allItems) => {
    res.send(allItems);
  });
});

// update like for a specific post
router.post("/like", (req, res) => {
  Item.findOne({ groupId: req.body.groupId, _id: req.body._id }).then((item) => {
    item.likedBy = item.likedBy.concat([req.user._id]);
    item.save();
  })
});

// remove like by user for a specific post
router.post("/removelike", (req, res) => {
  Item.findOne({ groupId: req.body.groupId, _id: req.body._id }).then((item) => {
    item.likedBy.remove(req.user._id);
    item.save();
  })
});

// update dislikes for a specific post
router.post("/dislike", (req, res) => {
  Item.findOne({ groupId: req.body.groupId, _id: req.body._id }).then((item) => {
    item.dislikedBy = item.dislikedBy.concat([req.user._id]);
    item.save();
  });
});

// remove dislike by user for a specific post
router.post("/removedislike", (req, res) => {
  Item.findOne({ groupId: req.body.groupId, _id: req.body._id }).then((item) => {
    item.dislikedBy.remove(req.user._id);
    item.save();
  })
});

// create a new group
router.post("/group", (req, res) => {
  const newGroup = new Group({
    groupName: req.body.name,
    activiationCode: Math.random().toString(36).replace(/[^a-z]+/g, ''),
    creatorId: req.user._id,
    items: 0,
    users: [req.user._id],
  });
  newGroup.save().then(group => {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.groups = user.groups.concat([group._id]);
      user.save();
    });
    res.send(group);
  });
});

// TODO: test these
// get group information
router.get("/group", (req, res) => {
  Group.findOne({ _id: req.query.groupId }).then((group) => {
    res.send(group);
  });
})

// get all groups user is in
router.get("/user/groups", (req, res) => {
  Group.find({ users: req.user._id}).then((groups) => {
    res.send(groups);
  })
})


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
