const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const usersLikes = mongoose.model('usersLikes');

const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

router.use(AuthRequried);

router.post('/usersLikes', async (req, res) => {

  const { user_id, } = req.body;

  const user = new usersLikes({ user_id: user_id });
  await user.save();

  res.send('message sent');
});


router.patch('/usersLikes/:cardId', async (req, res) => {

  const { cardId } = req.params;

  //const { userId } = req.body;

  const users = await usersLikes.updateOne({ user_id: cardId }, { $addToSet: { likes: req.body } })

  res.send(users);

});

router.patch('/usersLikesClick/:uid/:cardId', async (req, res) => {

  // const { cardId } = req.params;

  // //const { userId } = req.body;

  // const users = await usersLikes.updateOne({ user_id: cardId }, { $set: { click: req.body } })

  const { uid, cardId} = req.params;

 // const { name, } = req.body;

  const users = await usersLikes.updateOne({ 'user_id': uid, 'likes.user_id':cardId }, { $set: { 'likes.$.click': false } })

  res.send(users);

});

router.get('/numberOfFetch/:uid', async (req, res) => {

  const { uid } = req.params
  const userss = await usersLikes.aggregate([

    { $match: { "user_id": uid } },
    {
      $project: {
        numberOfLikes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: "NA" } },
      }
    },

  ])

  res.send(userss);

});

router.get('/usersLikesFetch/:uid', async (req, res) => {

  const { uid } = req.params

  const userss = await usersLikes.aggregate([
    { $match: { "user_id": uid } },
    {
      $project: {
        likes: 1, _id: 0,
     //   likes: { $slice: ["$likes", 20] }
      }
    },
    // { $unwind: "$likes" },
    // { "$group": { _id: "$_id", likes: { $push: "$likes" } } },
    { $sort: { "likes.timeLike": -1 } },

  ])
  //console.log(userss)
  // .populate({
  //   path: 'likes',
  //   select: 'name imageUrl user_id',
  //  // options: { sort: { _id: -1 } }
  //   // options: { limit: 3, sort: { _id: -1 } }
  // }).exec();
  res.send(userss);

});


router.get('/SecondUsersLikesFetch/:uid/:count', async (req, res) => {

  const { uid, count } = req.params

  var fetchAmount = parseInt(count)
  //const user = await User.findOne({  "user_id": uid  }, {likes:1, _id:0});
  try {

    const userss = await usersLikes.aggregate([

      { $match: { "user_id": uid } },
     // { $project: { likes: 1, _id: 0, likes: { $slice: ["$likesfetch,20] } } },
     { $project: { likes: 1, _id: 0, likes: { $slice: ["$likes", fetchAmount,] } } },
      // { $unwind: "$likes" },
      // { "$group": { _id: "$_id", likes: { $push: "$likes" } } },
      { $sort: { "likes.timeLike": -1 } }

    ])

    if (!userss) {
      //throw new Error()
      console.log('helloooooo')
    }
    res.send(userss)

  } catch (err) {
    return res.send('helloo');
  }
})


// function printStudents(startValue, nPerPage) {
//   let endValue = null;
//   db.students.find( { _id: { $lt: startValue } } )
//              .sort( { _id: -1 } )
//              .limit( nPerPage )
//              .forEach( student => {
//                print( student.name );
//                endValue = student._id;
//              } );

//   return endValue;

//   function printStudents(pageNumber, nPerPage) {
//     print( "Page: " + pageNumber );
//     db.students.find()
//                .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
//                .limit( nPerPage )
//                .forEach( student => {
//                  print( student.name );
//                } );
//   }

router.patch('/deleteLike/:uid', async (req, res) => {

  const { uid } = req.params;

  const { cardUid } = req.body;
  //console.log(uid)
  const users = await usersLikes.updateOne({ user_id: uid }, { $pull: { likes: { user_id: cardUid } } })

  res.send(users);

});

router.patch('/deleteDuplicatesLikes/:otherID', async (req, res) => {

  const { otherID } = req.params;

  const { uid } = req.body;
  //console.log(uid)
  const users = await usersLikes.updateMany({ user_id: otherID }, { $pull: { likes: { user_id: uid } } })

  res.send(users);

});

router.patch('/updateNameInLikes/:uid', async (req, res) => {

  const { uid } = req.params;

  const { name, } = req.body;

  const users = await usersLikes.updateMany({ 'likes.user_id': uid }, { $set: { 'likes.$.name': name, } })
  // console.log(users)
  res.send(users);

});

router.patch('/updateImageInLikes/:uid', async (req, res) => {

  const { uid } = req.params;

  const { uri } = req.body;

  const users = await usersLikes.updateMany({ 'likes.user_id': uid }, { $set: { 'likes.$.imageUrl': uri, } })
  // console.log(users)
  res.send(users);

});


module.exports = router;
