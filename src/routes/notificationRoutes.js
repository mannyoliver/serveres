const express = require('express');
//const multer = require('multer');
const mongoose = require('mongoose');

const Users = mongoose.model('Users');
//var busboy = require('connect-busboy');]

const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

router.use(AuthRequried);


router.get('/notifyFetch/:user_id', async (req, res) => {

    const { user_id } = req.params
  
    const user = await Users.find({ user_id: user_id }, { notifiy: 1, _id: 0 });
    //console.log(user)
    res.send(user);
  
  });
  
  router.patch('/updatelikeNotification/:uid', async (req, res) => {
  
    const { uid } = req.params;
  
    const users = await Users.updateOne({ user_id: uid }, { $set: { notifiy: 5 } })
  
    res.send(users);
  
  });

  router.patch('/updatelikeNotification/:uid', async (req, res) => {
  
    const { uid } = req.params;
  
    const users = await Users.updateOne({ user_id: uid }, { $set: { notifiy: 5 } })
  
    res.send(users);
  
  });