const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const cron = require('node-cron');

const cardsSwiped = mongoose.model('cardsSwiped');

const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

router.use(AuthRequried);

cron.schedule('59 59 23 * * *', async () => {

  console.log('running a task every 12:00Am');
 await cardsSwiped.updateMany({ $set: {rightSwipesAmount: 0 }})

 // res.send(user);

});

router.post('/cardsSwiped', async (req, res) => {

  const { user_id, } = req.body;

  const user = new cardsSwiped({ user_id: user_id , swiped: user_id, swipesOnOff: 'off',rightSwipesAmount:0,countDownTime: 1000000000000,});
  await user.save();

  res.send('message sent');
});

router.get('/cardsSwiped/:user_id', async (req, res) => {

  const { user_id } = req.params

  const usersss = await cardsSwiped.findOne({ user_id: user_id });
//,{ swiped: 1, _id: 0 }
  //console.log(user)
  res.send(usersss);

});

router.patch('/DeleteCardsSwiped/:userId', async (req, res) => {

  const { userId} = req.params

  const user = await cardsSwiped.deleteOne({ user_id: userId });
  // console.log(user)
  res.send(user);

});

router.patch('/cardsSwiped/:uid/', async (req, res) => {

  const { uid } = req.params;

  const { swipess,rightSwipesAmount,countDownTime,  } = req.body;
console.log(swipess)
  const users = await cardsSwiped.updateOne({ user_id: uid },
     { $addToSet: { swiped: swipess}, $inc: { rightSwipesAmount: rightSwipesAmount }, countDownTime:countDownTime,  })
  
  res.send(users);

});


router.patch('/cardsSwipedOnOff/:uid/', async (req, res) => {

  const { uid } = req.params;

  const { swipess,rightSwipesAmount,countDownTime,on_off  } = req.body;
//console.log(swipess)
  const users = await cardsSwiped.updateOne({ user_id: uid },
     { $addToSet: { swiped: swipess}, $inc: { rightSwipesAmount: rightSwipesAmount }, countDownTime:countDownTime,swipesOnOff: on_off })
  
  res.send(users);

});

router.patch('/LikeCardsSwiped/:uid/', async (req, res) => {

  const { uid } = req.params;

  const { cardUid, } = req.body;
//console.log(cardUid)
  const users = await cardsSwiped.updateOne({ user_id: uid },{ $addToSet: { swiped: cardUid},})
  
  res.send(users);

});

router.patch('/rightSwipesPerDay/:uid', async (req, res) => {//comment these

  const { uid } = req.params;

  const {rightSwipesAmount, countDownTime } = req.body;

  const user = await cardsSwiped.updateOne({ user_id: uid }, { $inc: { rightSwipesAmount: rightSwipesAmount }, countDownTime:countDownTime })

  res.send(user);

});

router.patch('/rightSwipesOnOff/:uid/', async (req, res) => {

  const { uid } = req.params;

  const { on_off } = req.body;
//console.log(on_off)
  const users = await cardsSwiped.updateOne({ user_id: uid }, { $set: { swipesOnOff: on_off} })
  
  res.send(users);

});

router.patch('/resetRightSwipesPerDay/:uid', async (req, res) => {

    const { uid } = req.params;
  
    const user = await cardsSwiped.updateOne({ user_id: uid }, { $set: {rightSwipesAmount: 0 } });
 // console.log(user)
    res.send(user);
  
  });


router.patch('/superSwipecardsSwiped/:otherId/', async (req, res) => {

  const { otherId } = req.params;

  const { uid } = req.body;
//console.log(uid)
  const users = await cardsSwiped.updateOne({ user_id: otherId }, { $addToSet: { swiped: uid} })
  
  res.send(users);

});


  router.patch('/resetCardsSwiped/:uid', async (req, res) => {

    const { uid } = req.params;
  
    const users = await cardsSwiped.updateOne({ user_id: uid }, { $pull: { swiped: { $nin: uid } } })
  
    res.send(users);
  
  });

  router.patch('/secondlookdeleteCardsSwiped/:uid', async (req, res) => {

    const { uid } = req.params;
  
    const { cardId } = req.body;
    //console.log(uid)
    const users = await usersLikes.updateOne({ user_id: uid }, { $pull: { swiped: ObjectId(cardId) } })
  
    res.send(users);
  
  });

module.exports = router;
