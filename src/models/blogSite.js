const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  title: {type: String,},

  text: {type: String,},

  image: {type: String,}
  
});

mongoose.model('blogSite', blogSchema);