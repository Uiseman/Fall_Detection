const mongoose=require('../database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema= new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },

  phoneNumber: {
    type: String,
  },
  userID: {
      type: String,
      require: true,
  } ,


  emergencyContacts:[String]

});

const User= mongoose.model('User',UserSchema);
module.exports=User;