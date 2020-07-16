const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const usersSwipes = mongoose.model('usersSwipes');


const router = express.Router();


router.post('/usersSiwpes', async (req, res) => {

  const { user_id, } = req.body;

  const user = new usersSwipes({ user_id: user_id });
  await user.save();

  res.send('message sent');
});

router.patch('/usersSiwpes/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await usersSwipes.updateOne({ user_id: uid }, { $set: req.body })

  res.send(users);

});

router.get('/usersSiwpes/:card_id/:check_value', async (req, res) => {

  const { card_id, check_value } = req.params

  //.find({ idss: card_id}, {[user_id]:1, _id:0});
  //check_value in distinict is returning the value only true/false and {user_id: card_id} is the query
  try {
    const user = await usersSwipes.distinct(check_value, { user_id: card_id })
  
     res.send(user) 
       
    //console.log(user)
   // res.send(user)
  } catch (err) {
    return res.status(422).send({ error: 'Someting Went Wrong' });
  }

});

module.exports = router;

