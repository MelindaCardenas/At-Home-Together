const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername){
	const authenticateUser = async(email,password,done)=>{
		const user = getUser(username);
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
	passport.deserializeUser((id,done)=> done(null,getUserbyID))
}

module.exports = initialize




