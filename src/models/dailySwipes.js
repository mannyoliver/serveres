const mongoose = require('mongoose');


  const dailySwipesSchema = new mongoose.Schema({

    user_id: { type: String, },

    dailySwipesAmount: { type: Number, },


  }, { strict: false });

 mongoose.model('dailySwipes', dailySwipesSchema);
  
