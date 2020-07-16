const admin = require('firebase-admin');
//const authUsers = mongoose.model('authUsers');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer laksjdflaksdjasdfklj'

  if (!authorization) {
    return res.status(404).send({ error: 'You must be logged inn.' });
  }

  const token = authorization.replace('Bearer ', '');
 // console.log(token)
  // token comes from the client app
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      //let uid = decodedToken.uid;
      next();

    }).catch((error) => {
      res.status(401).send({ error: 'You must be logged innn.' });//wrong token or token expire
    });
};

/*
jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
  if (err) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  next();
}); */