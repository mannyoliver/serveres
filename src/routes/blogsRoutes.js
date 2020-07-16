const express = require('express');
const mongoose = require('mongoose');
const blogSite = mongoose.model('blogSite');
const cors = require('cors');
const router = express.Router();


router.use(cors());

router.post('/blogPatch', async (req, res) => {

  const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  
  const blog = new blogSite({title:'What is Lorem Ipsums?', text: text, image:'https://i.picsum.photos/id/10/2500/1667.jpg'});

  await blog.save();

  res.send('blog save');

});

router.get('/blogsFetch', async (req, res) => {

  const blog = await blogSite.find();
 // console.log(blog)
  res.send(blog);

});

router.get('/blogFetch/:title', async (req, res) => {

  const { title } = req.params

  const blog = await blogSite.find({title:title});
 // console.log(blog)
  res.send(blog);

});
module.exports = router;
