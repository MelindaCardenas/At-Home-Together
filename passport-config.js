//source code from : https://www.youtube.com/watch?v=-RCnNyD0L-s

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername, getUserbyID){
	const authenticateUser = async(username,password,done)=>{
		const user = getUserByUsername(username);
		if (user == null){
			return done(null,false,{message:'No user with that username'})
		}

		try{
			if(await bcrypt.compare(password, user.password)){
				return done(null,user)
			}
			else{
				return done(null,false,{message: 'password incorrect'})
			}
		}

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




