//source code from : https://www.youtube.com/watch?v=-RCnNyD0L-s
const mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = mongoose.model('User'),
	bcrypt = require('bcrypt');


//below code (w minor alterations) from http://www.passportjs.org/packages/passport-local/
passport.use(new LocalStrategy(

	function(username, password, done){
		let user = User.findOne({username: username}, function(err, user){
			console.log(user);
			
			if (err){
				return done (err)
			}
			if (!user){
				return done(null,false)
			}

			if (!bcrypt.compareSync(password, user.password)){
				console.log("passwords do not match");
				return done(null,false)
			}
			return done(null,user);
		});
	}

));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


