const mongoose = require('mongoose');


const ChatsSchema = new mongoose.Schema({

    user_id: { type: String, },


}, { strict: false });
mongoose.model('usersChats', ChatsSchema);

