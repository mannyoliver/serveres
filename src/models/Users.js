const mongoose = require('mongoose');


  const userSchema = new mongoose.Schema({

    user_id: { type: String, },

    name: { type: String, },

    gender: { type: String, },

    city: { type: String, },

    age: { type: Number },

    credits: { type: Number },

    superSwipe: { type: Number },

    SuperSwipeCountDownTime: { type: Number },

    tourModals: { type: Number },

    ages: { type: Array },

    imageUrl: { type: Array },

    genderopposite: { type: String },

    click_me: { type: String },

    occupation: { type: String },

    about: { type: String },

    education: { type: String },

    height: { type: String },

    heightForSlider: { type: Number },

    imageName: { type: Array },

    dailySwipes: { type: Number },

    pushNoticationtoken: { type: String },

    allGender: { type: String },

    notifiy: { type: Number },

    //////expiryDate: { type: Double }

    // images:{type: Buffer }

  }
    , { timestamps: true, strict: false });

 mongoose.model('Users', userSchema);


    

  // // Insert a doc, will trigger the change stream handler above
  // console.log(new Date(), 'Inserting doc');
  
