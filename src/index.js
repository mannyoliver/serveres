require('./models/Users')
require('./models/usersMatches')
require('./models/usersChats')
require('./models/usersSwipes')
require('./models/usersLikes')
require('./models/cardsSwiped')
require('./models/dailySwipes')
//require('./models/blogSite')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');


//const AuthRequried = require('./middleware/AuthRequried')

const serviceAccount = require('./service_account.json');

//const matchListener = require('./models/usersMatches')

//const blogsRoutes = require('./routes/blogsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const swipesRoutes = require('./routes/usersSwipeRoutes')
const matchesRoutes = require('./routes/matchesRoutes')
const likesRoutes = require('./routes/likesRoutes')
const chatsRoutes = require('./routes/chatsRoutes')
const cardsSwipedRoutes = require('./routes/cardsSwipedRoutes')
const dailySwipesRoutes = require('./routes/dailySwipesRoutes')

//const profileRoutes = require('./routes/profileRoutes')

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(busboy());
app.use(usersRoutes);
app.use(swipesRoutes);
app.use(matchesRoutes);
app.use(likesRoutes);
app.use(chatsRoutes);
app.use(cardsSwipedRoutes);
app.use(dailySwipesRoutes);
//app.use(blogsRoutes);
//app.use(profileRoutes);

const mongoUriii = 'mongodb+srv://admin:star1234@cluster0-bxqmu.mongodb.net/test?retryWrites=true&w=majority'

//mogooese is used to commucate to mongodb and the code below is connecting it
mongoose.connect(mongoUriii, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-1090c.firebaseio.com"
});

//.on means receive
    //.emit means send

//use this snipet of code below to test when not working

// io.on('connection', () => { 
//   console.log('a user connected');
//  io.emit('userConnected');
// }); 

// matchListener.watch({ fullDocument: 'updateLookup' }).on('change', data => {

//   verfiy = data.fullDocument

//   io.emit('changeEvent', (verfiy));

//   //console.log(verfiy)

// });

// messageListener.watch().on('change', data => {


//   io.emit('changeMessage', );
// //  console.log(data)

// });

app.get('/', (req, res) => {
  res.send('hi there');
});

server.listen(3000, () => {
  console.log('listing on port')
});




