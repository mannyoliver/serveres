const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const cardsSwipedSchema = new mongoose.Schema({

    user_id: { type: String, },

    swiped: [{ type: String,  }],

    rightSwipesAmount: { type: Number, },

    countDownTime:{ type: Number, },

    swipesOnOff: { type: String, },
});


mongoose.model('cardsSwiped', cardsSwipedSchema);
