const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const usersChats = mongoose.model('usersChats');


const router = express.Router();


router.post('/usersMessage', async (req, res) => {

  const { user_id, } = req.body;

  const user = new usersChats({ user_id: user_id });
  await user.save();

  res.send('message sent');
});


router.patch('/usersmessage1/:uid/:otheruid', async (req, res) => {

  const { uid, otheruid } = req.params;

  // const { text, user, id, createdAt, } = req.body;
  //console.log(req.body)
  const users = await usersChats.updateOne({ user_id: uid }, { $push: { [otheruid]: req.body } })

  res.send(users);

});

router.patch('/usersmessage2/:uid/:otheruid', async (req, res) => {

  const { uid, otheruid } = req.params;

  const userss = await usersChats.updateOne({ user_id: uid }, { $push: { [otheruid]: req.body } })
  //const userss = await usersChats.updateOne({ user_id: uid }, { $addToSet: { messages: req.body } })

  res.send(userss);

});

router.get('/usersmessage/:user_id/:otheruid', async (req, res) => {

  const { user_id, otheruid } = req.params

  const user = await usersChats.find({ user_id: user_id }, { [otheruid]: 1, _id: 0 });
  //console.log(user) .find({ user_id: uid}, {messages:1, _id:0});
  res.send(user);

});

module.exports = router;

