const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({

 //   user_id: String,
    // name: String,
    // imageUrl: String,

}, { strict: false });

const LikesSchema = new mongoose.Schema({

    user_id: { type: String, },
    likes: [pointSchema]
   // likes: [{ type: Schema.Types.ObjectId, ref: 'Users' }]

}, { strict: false });


mongoose.model('usersLikes', LikesSchema);
