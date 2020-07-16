const express = require('express');
const mongoose = require('mongoose');
const dailySwipes = mongoose.model('dailySwipes');
//var busboy = require('connect-busboy');
const cron = require('node-cron');

const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

router.use(AuthRequried);

cron.schedule('59 59 23 * * *', async () => {

  console.log('running a task every 12:00Am');
 await dailySwipes.updateMany({ $set: {dailySwipesAmount: 0 }})

 // res.send(user);

});

router.post('/rightSwipesPerDay', async (req, res) => {

  const { user_id } = req.body;

  const user = new dailySwipes({ user_id, dailySwipesAmount:0});

  await user.save();

  res.send('message sent');
});

router.patch('/DeleteDailySwipes/:userId', async (req, res) => {

  const { userId } = req.params

  const user = await dailySwipes.deleteOne({ user_id: userId });
  // console.log(user)
  res.send(user);

});

router.get('/rightSwipesPerDayFetch/:user_id', async (req, res) => {

    const { user_id } = req.params
  
    const user = await dailySwipes.findOne({ user_id: user_id });
    //console.log(user)
    res.send(user);
  
  });

router.patch('/rightSwipesPerDay/:uid', async (req, res) => {

  const { uid } = req.params;

  const {rightSwipesAmount, countDownTime } = req.body;

  const user = await dailySwipes.updateOne({ user_id: uid }, { $inc: { dailySwipesAmount: rightSwipesAmount }, countDownTime:countDownTime })

  res.send(user);

});

router.patch('/rightSwipesOnOff/:uid/', async (req, res) => {

  const { uid } = req.params;

  const { on_off } = req.body;
//console.log(on_off)
  const users = await dailySwipes.updateOne({ user_id: uid }, { $set: { swipesOnOff: on_off} })
  
  res.send(users);

});

router.patch('/resetRightSwipesPerDay/:uid', async (req, res) => {

    const { uid } = req.params;
  
    const user = await dailySwipes.updateOne({ user_id: uid }, { $set: {dailySwipesAmount: 0 } });
 // console.log(user)
    res.send(user);
  
  });
  
module.exports = router;

 