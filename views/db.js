const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
let dbconf;

if (process.env.NODE_ENV === 'PRODUCTION'){
  const fs = require('fs');
  const path = require('path');
  const fn = path.join(__dirname, '../config.json');
  const data = fs.readFileSync(fn);
  const conf = JSON.parse(data);
  console.log(conf);
  dbconf = conf.dbconf;
}

else{
  require('dotenv').config()
  dbconf = 'mongodb://localhost/aitfinal';
}

//USER SCHEMA
const UsersSchema = new Schema({
  username: String,
  email: String,
  password: String,
  //if you wanted required it would be username: {type:String, required: true}
});

UsersSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UsersSchema);

//mongoose.model('User', UsersSchema);

//POST SCHEMA 
const PostSchema = new Schema({
  name: String,
  post: String,
  category: String
})

PostSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Post', PostSchema);

//CONNECT TO DATABASE
mongoose.connect(dbconf, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },  (err, database) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('Connected to database'); 
  }
});