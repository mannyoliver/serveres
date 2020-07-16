const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  
  card_id: String,
  swiped: Boolean,
    
});

const SwipesSchema = new mongoose.Schema({
  
 // swipes: { type: Map, },

 user_id: { type: String, },

 // swipes: [pointSchema],

 // card_id: String,
  //swiped: Boolean,

 // _id: { type: String, },
  
}, {strict: false});// this make the model dymaic to hold field


mongoose.model('usersSwipes', SwipesSchema);
