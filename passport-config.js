//source code from : https://www.youtube.com/watch?v=-RCnNyD0L-s
const mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = mongoose.model('User'),
	bcrypt = require('bcrypt');
	//

passport.use(new LocalStrategy(User.authenticate()));

/*
veryifyPassword(password){
	try{
		if(await bcrypt.compare(password, user.password)){
			//no error, return user
			return done(null,user)
		}
		else{
			//no error, no user, msg
			return done(null,false,{message: 'password incorrect'})
			}
	}
	//error
	catch(e){
		return done(e)
	}
}
//below code from http://www.passportjs.org/packages/passport-local/
passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: username}, function(err, user){
			if (err){
				return done (err)
			}
			if (!user){
				return done(null,false)
			}
			if (!user.verifyPassword(password)){
				return done(null,false)
			}
			return done(null,user);
		});
	}
));
	//User.authenticate()));

*/

//WHAT I USED WHEN I WAS USING AN ARRAY TO STORE USERS
/*
function initialize(passport, getUserByUsername, getUserbyID){
	const authenticateUser = async(username,password,done)=>{
		const user = getUserByUsername(username);
		if (user == null){
			//error on server, no user, message
			return done(null,false,{message:'No user with that username'})
		}

		try{
			if(await bcrypt.compare(password, user.password)){
				//no error, return user
				return done(null,user)
			}
			else{
				//no error, no user, msg
				return done(null,false,{message: 'password incorrect'})
			}
		}
		//error
		catch(e){
			return done(e)
		}

	}

	passport.use(new LocalStrategy({usernameField:'username'},
	authenticateUser))
	//serialize user to store in session
	passport.serializeUser((user,done)=> done(null, user.id))
	//deserialize 
	passport.deserializeUser((id,done)=> {
		return done(null,getUserbyID(id))
	})
}

module.exports = initialize

*/




passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


