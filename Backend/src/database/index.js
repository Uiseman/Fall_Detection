const mongoose = require('mongoose');
require('dotenv').config();


mongoose.Promise = global.Promise;

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then( () => console.log("connected to Data Base."))
.catch( err => console.log(err));

module.exports = mongoose;