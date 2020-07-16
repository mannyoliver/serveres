const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({


    //   user_id: String,
    // name: String,
    //  imageUrl: String,
  //  type: Schema.Types.ObjectId,
   // ref: 'Story'

}, { strict: false });

const MatchesSchema = new mongoose.Schema({

    user_id: { type: String, },

   chats: [pointSchema]
    
 //  chats: [{ type: Schema.Types.ObjectId, ref: 'Users' }]

    // _id: { type: String, },

}, { strict: false, });


module.exports = mongoose.model('usersMatches', MatchesSchema);



    
