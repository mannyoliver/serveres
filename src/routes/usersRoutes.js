const express = require('express');
//const multer = require('multer');
const mongoose = require('mongoose');

const Users = mongoose.model('Users');
//var busboy = require('connect-busboy');]

const AuthRequried = require('../middleware/AuthRequried')

const router = express.Router();

router.use(AuthRequried);


router.post('/users', async (req, res) => {

  const { user_id, name, gender, city, age, imageUrl,
    genderopposite, ages, click_me, credits, allGender,
    imageName, expiryDate, superSwipe, SuperSwipeCountDownTime, tourModals, ads_number1, ads_number2 } = req.body;

  const user = new Users({
    user_id, name, gender, city, age, imageUrl,
    genderopposite, ages, click_me, credits, allGender,
    imageName, expiryDate, superSwipe, SuperSwipeCountDownTime, tourModals, ads_number1, ads_number2
  });

  await user.save();

  res.send('message sent');
});

router.patch('/DeleteUserProfile/:userId', async (req, res) => {

  const { userId } = req.params

  const user = await Users.deleteOne({ user_id: userId });
  // console.log(user)
  res.send(user);

});

router.get('/users/:gen/:agess/:agesss/:swip/', async (req, res) => {

  const { gen, agess, agesss, swip, } = req.params

  const swipps = swip.split(",")

  // if (gen != 'All') {
  //   CheckValue = "gender"
  // } else {
  //   CheckValue = "allGender";
  // }
  const users = await Users.find({
    user_id: { $nin: swipps },
    // [CheckValue]: gen,
    gender: gen,
    age: { $gte: agess, $lte: agesss },
  }).limit(3) //(30)
  //const users = await Users.find({ user_id: { $nin: swipps }}, {[CheckValue]: gen}, {age: { $gte: agess, $lte: agesss } })
  //  console.log(users)
  res.send(users);

});

router.get('/userProfile/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.find({ user_id: user_id });
  // console.log(user)
  res.send(user);

});


// router.get('/userMinProfile/:user_id', async (req, res) => {

//   const { user_id } = req.params

//   const user = await Users.aggregate([
//     { $match: { "user_id": user_id } },
//     {
//       $project:
//       {
//         name: 1, imageUrl: 1, user_id: 1, expiryDate: 1, credits: 1, _id: 0,
//         imageUrl: { $arrayElemAt: ["$imageUrl", 0] },
//       }
//     }
//   ]);
//   // console.log(user)
//   res.send(user);

// });

router.get('/userMinProfile/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.findOne({ user_id: user_id }, { name: 1, user_id: 1, expiryDate: 1, credits: 1, matches: 1, _id: 0, });
  //  console.log(user)
  res.send(user);

});


router.get('/userProfileForChat/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.findOne({ user_id: user_id }, { name: 1, user_id: 1, _id: 0 });
  //  console.log(user)
  res.send(user);

});


router.get('/userLikeView/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.find({ user_id: user_id });
  //console.log(user)
  res.send(user);

});

router.patch('/updateNotificationToken/:uid', async (req, res) => {

  const { uid } = req.params;

  const { token } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $set: { pushNotificationToken: token } })

  res.send(users);

});


router.patch('/setTourModals/:uid', async (req, res) => {

  const { uid } = req.params;

  const { status } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $set: { tourModals: status } })

  res.send(users);

});


router.patch('/aMatchDeleted/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { matches: -1 } })

  res.send(users);

});

router.patch('/matchesAmount/:uid', async (req, res) => {

  const { uid } = req.params;

  // { uri } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { matches: 1 } })

  res.send(users);

});

router.patch('/profileUpdate/:uid', async (req, res) => {

  const { uid } = req.params;

  const { name, city, about, gender, genderopposite, occupation, age, education, height, heightForSlider } = req.body;

  const users = await Users.updateOne({ user_id: uid }, {
    $set: {
      name: name, city: city, about: about, gender: gender, genderopposite: genderopposite, age: age, occupation: occupation,
      education: education, height: height, heightForSlider: heightForSlider
    }
  })

  res.send(users);

});

router.patch('/filterUpdate/:uid', async (req, res) => {

  const { uid } = req.params;

  const { ages } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $set: { ages: ages } })

  res.send(users);

});

router.patch('/resetSuperSwipe/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $set: { superSwipe: 2 } })

  res.send(users);

});

router.patch('/minusSuperSwipe/:uid', async (req, res) => {

  const { uid } = req.params;

  const { SuperSwipeCountDownTime } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { superSwipe: -1 }, SuperSwipeCountDownTime: SuperSwipeCountDownTime })

  res.send(users);

});

router.patch('/updateExpiryDate/:uid', async (req, res) => {

  const { uid } = req.params;

  const { expiryDate } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $set: { expiryDate: expiryDate } })

  res.send(users);

});

router.patch('/reset_ads_number1/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $set: { ads_number1: 0 } })

  res.send(users);

});

router.patch('/update_ads_number1/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { ads_number1: 1 } })

  res.send(users);

});

router.patch('/reset_ads_number2/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $set: { ads_number2: 0 } })

  res.send(users);

});

router.patch('/update_ads_number2/:uid', async (req, res) => {

  const { uid } = req.params;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { ads_number2: 1 } })

  res.send(users);

});

router.patch('/minusCoins/:uid', async (req, res) => {

  const { uid } = req.params;

  const { credits } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { credits: -credits } })

  res.send(users);

});

router.patch('/updateCoins/:uid', async (req, res) => {

  const { uid } = req.params;

  const { credits } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { credits: credits } })

  res.send(users);

});

router.patch('/updateCoinsTo10My/:uid', async (req, res) => {

  const { uid } = req.params;

  // const { credits } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $inc: { credits: 10 } })

  res.send(users);

});

router.patch('/updateCoinsTo10Card/:cardId', async (req, res) => {

  const { cardId } = req.params;

  // const { credits } = req.body;

  const users = await Users.updateOne({ user_id: cardId }, { $inc: { credits: 10 } })

  res.send(users);

});

router.patch('/ImageUpdate/:uid', async (req, res) => {

  const { uid } = req.params;

  const { images } = req.body;
  //console.log(images)
  const users = await Users.updateOne({ user_id: uid }, { $set: { imageUrl: images } })

  res.send(users);

});

router.patch('/ImageName/:uid', async (req, res) => {

  const { uid } = req.params;

  const { image_id } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $set: { imageName: image_id } })

  res.send(users);

});

router.get('/ImageFetch/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.find({ user_id: user_id }, { imageUrl: 1, _id: 0 });
  //console.log(user)
  res.send(user);

});

router.get('/ImageIdFetch/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.find({ user_id: user_id }, { imageName: 1, _id: 0 });
  //console.log(user)
  res.send(user);

});

router.get('/idForDeleteImageFetch/:user_id', async (req, res) => {

  const { user_id } = req.params

  const user = await Users.find({ user_id: user_id }, { imageName: 1, _id: 0 });
  //console.log(user)
  res.send(user);

});

router.patch('/deleteImage/:uid', async (req, res) => {

  const { uid } = req.params;

  const { item } = req.body;

  const users = await Users.updateOne({ user_id: uid }, { $pull: { imageUrl: item } })

  res.send(users);

});

router.patch('/deleteImageIdName/:uid', async (req, res) => {

  const { uid } = req.params;

  const { un } = req.body;

  //const idImage =  un.toString()

  const users = await Users.updateOne({ user_id: uid }, { $pull: { imageName: un } })

  res.send(users);

});
module.exports = router;
