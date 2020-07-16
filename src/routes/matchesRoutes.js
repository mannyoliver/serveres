const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const usersMatches = mongoose.model('usersMatches');

//const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

//router.use(AuthRequried);


router.post('/usersMatches', async (req, res) => {

  const { user_id, } = req.body;

  const user = new usersMatches({ user_id: user_id });
  await user.save();

  res.send('message sent');
});


router.patch('/DeleteUserMatch/:userId', async (req, res) => {

  const { userId } = req.params

  const user = await usersMatches.deleteOne({ user_id: userId });
  // console.log(user)
  res.send(user);

});


router.patch('/matchWasDeleted/:userId', async (req, res) => {

  const { userId } = req.params;

  const users = await usersMatches.updateMany({ 'chats.user_id': userId }, {
    $set: {
      'chats.$.imageUrl': 'deleted',
      'chats.$.onlineStatus': false, 'chats.$.indicator': 'Seen', 'chats.$.firstClick': false,
    }
  })
  // console.log(users)
  res.send(users);

});

router.patch('/usersMatches1/:uid/', async (req, res) => {

  const { uid } = req.params;

  // const { cardId } = req.body;

  //  await usersMatches.updateOne({ user_id: uid }, { $set: req.body })

  // await usersMatches.updateOne({ user_id: uid }, { $push: { chats: cardUid } })
  // await usersMatches.updateOne({ user_id: cardId}, { $push: { chats: userId } })

  // const users = await usersMatches.updateOne({ user_id: uid }, { $addToSet: { chats: ObjectId(cardId) } })
  const users = await usersMatches.updateOne({ user_id: uid }, { $addToSet: { chats: req.body } })
  //console.log(users)
  res.send(users);

});


router.patch('/usersMatches2/:cardId', async (req, res) => {

  const { cardId } = req.params;

  //const { userId } = req.body;

  const users = await usersMatches.updateOne({ user_id: cardId }, { $addToSet: { chats: req.body } })

  res.send(users);

});


router.get('/usersMatches/:uid', async (req, res) => {

  const { uid, } = req.params

  // const userss = await usersMatches.find({ user_id: uid}, {[check_value]:1, _id:0});
  //const userss = await usersMatches.find({ user_id: uid, chats: check_value });
  // const userss = await usersMatches.find({ user_id: uid },{[user_id]:1, _id:0}).populate('chats', 'name imageUrl user_id').exec();
  // const userss = await usersMatches.find({ user_id: uid })
  const userss = await usersMatches.aggregate([

    { $match: { "user_id": uid } },
    {
      $project: {
        chats: 1,
        // chats: { $slice: ["$chats", 20] }
      }
    },

    { $sort: { "chats.timeSent": -1 } },

  ])

  res.send(userss);

});


router.get('/NewMatchesMessages/:uid', async (req, res) => {

  const { uid, } = req.params

  //const userss = await usersMatches.find({ user_id: uid}, {[check_value]:1, _id:0});
  //const userss = await usersMatches.find({ user_id: uid, chats: check_value });
  // const userss = await usersMatches.find({ user_id: uid },{[user_id]:1, _id:0}).populate('chats', 'name imageUrl user_id').exec();
  // const userss = await usersMatches.find({ user_id: uid })
  const userss = await usersMatches.aggregate([

    { $match: { "user_id": uid, } },
    // {
    //   $project: {
    //     _id: 0,
    //     chats: {
    //        $filter: {
    //           input: "$chats",
    //           as: "item",
    //         cond: { $eq: [ "$$item.indicator", 'Seen' ] }
    //        }
    //     }
    //   }
    // },
    { $unwind: '$chats' },
    { $match: { 'chats.indicator': { $eq: 'NewMessage' } } },
    { $group: { _id: '$_id', chats: { $push: '$chats.indicator' } } }
  ])
console.log(userss)
  res.send(userss);

});

/* 
router.get('/SecondUsersMatchesFetch/:uid/:count', async (req, res) => {

  const { uid, count } = req.params

  var skipAmount = parseInt(count)

  try {

    const userss = await usersMatches.aggregate([

      { $match: { "user_id": uid } },
      { $project: { chats: 1, _id: 0, chats: { $slice: ["$chats", skipAmount] } } },
      { $sort: { "chats.timeSent": -1 } }

    ])

    if (!userss) {
      //throw new Error()
      console.log('helloooooo')
    }
    res.send(userss)

  } catch (err) {
    return res.send('helloo');
  }
}) */

router.get('/numberOfMatchesFetch/:uid', async (req, res) => {

  const { uid } = req.params
  const userss = await usersMatches.aggregate([

    { $match: { "user_id": uid } },
    {
      $project: {
        numberOfMatches: { $cond: { if: { $isArray: "$chats" }, then: { $size: "$chats" }, else: "NA" } },
      }
    },

  ])

  res.send(userss);

});


router.get('/matchesSearch', async (req, res) => {

  //const { user_id } = req.params

  const user = await usersMatches.find({ $text: { $search: "barbara", $caseSensitive: true } });
  //  console.log(user)
  res.send(user);

});



router.patch('/userstext1/:uid/:cardId', async (req, res) => {

  const { uid, cardId } = req.params;

  const { timeSent, matchMessage } = req.body

  const users = await usersMatches.updateOne({ "user_id": uid, "chats.user_id": cardId }, { $set: { "chats.$.matchMessage": matchMessage, "chats.$.timeSent": timeSent } })

  res.send(users);

});

router.patch('/userstext2/:cardId/:uid', async (req, res) => {

  const { cardId, uid } = req.params;

  const { timeSent, matchMessage } = req.body
  //console.log(matchMessage)
  const users = await usersMatches.updateOne({ "user_id": cardId, "chats.user_id": uid }, { $set: { "chats.$.matchMessage": matchMessage, "chats.$.timeSent": timeSent, } })
  res.send(users);

});

router.patch('/newMessageFromChat/:cardId/:uid', async (req, res) => {

  const { cardId, uid } = req.params;

  const { indicator } = req.body
  //console.log(indicator)
  const users = await usersMatches.updateOne({ "user_id": cardId, "chats.user_id": uid }, { $set: { "chats.$.indicator": indicator } })
  res.send(users);

});

router.patch('/seenNewMessage/:uid/:cardId', async (req, res) => {

  const { uid, cardId } = req.params;

  const { indicator } = req.body

  const users = await usersMatches.updateOne({ "user_id": uid, "chats.user_id": cardId }, { $set: { "chats.$.indicator": indicator } })
  res.send(users);

});

router.patch('/matchFirstClick/:uid/:cardId', async (req, res) => {

  const { uid, cardId } = req.params;

  const { firstClick } = req.body

  const users = await usersMatches.updateOne({ "user_id": uid, "chats.user_id": cardId }, { $set: { "chats.$.firstClick": firstClick } })
  res.send(users);

});

router.patch('/updateMatchesNotificationToken/:uid', async (req, res) => {

  const { uid } = req.params;

  const { token, } = req.body;

  const users = await usersMatches.updateMany({ 'chats.user_id': uid }, { $set: { 'chats.$.pushNotificationToken': token, } })
  // console.log(users)
  res.send(users);

});

router.patch('/updateMatchesOnlineStatus/:uid', async (req, res) => {

  const { uid } = req.params;

  const { onlineStatus, } = req.body;

  const users = await usersMatches.updateMany({ 'chats.user_id': uid }, { $set: { 'chats.$.onlineStatus': onlineStatus, } })
  // console.log(users)
  res.send(users);

});

router.patch('/updateNameInMatches/:uid', async (req, res) => {

  const { uid } = req.params;

  const { name, } = req.body;

  const users = await usersMatches.updateMany({ 'chats.user_id': uid }, { $set: { 'chats.$.name': name, } })
  // console.log(users)
  res.send(users);

});

router.patch('/updateImageInMatches/:uid', async (req, res) => {

  const { uid } = req.params;

  const { match_uri } = req.body;
  //console.log(match_uri)
  const users = await usersMatches.updateMany({ 'chats.user_id': uid }, { $set: { 'chats.$.imageUrl': match_uri, } })
  //  console.log(users)
  res.send(users);

});

router.patch('/deleteAmatch1/:uid', async (req, res) => {// for too when createting delting duplictes

  const { uid } = req.params;

  const { cardUid } = req.body;
  //console.log(uid)
  const users = await usersMatches.updateOne({ user_id: uid }, { $pull: { chats: { user_id: cardUid } } })

  res.send(users);

});

router.patch('/deleteAmatch2/:cardUid', async (req, res) => { //for too when createting delting duplictes

  const { cardUid } = req.params;

  const { userId } = req.body;
  //console.log(uid)
  const users = await usersMatches.updateOne({ user_id: cardUid }, { $pull: { chats: { user_id: userId } } })

  res.send(users);

});

module.exports = router;
