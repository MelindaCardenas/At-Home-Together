require('./views/db.js');
require('./passport-config.js');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
//const users = [];
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


//const initializePassport = require('./passport-config');

//constructor
const User = mongoose.model('User');
/*
initializePassport(
	passport,		
	username => users.find(user => user.username === username),
	id => users.find(user => user.id === id)
);
*/

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
	//SESSION_SECRET is in environment variable
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/

//check if user is authenticated
function checkAuthenticated(req,res,next){
	//authenticated
	if (req.isAuthenticated()){
		return next()
	}
	//if not authenticated
	res.redirect('/login')
}

app.get('/', checkAuthenticated,(req, res) => {
	//res.render('login');
	res.render('home', {name:req.user.username})
});

app.get('/home', function(req, res){
	res.render('login');
	
});

app.get('/register', function(req, res){
	res.render('register');
	
});

app.post('/register', async(req, res)=>{
	try{
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const newUser = new User({
			id: Date.now().toString(),
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})
		newUser.save((err, savedUser)=>{
			console.log(savedUser);
  		})
		/*
		users.push({
			id: Date.now().toString(),
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		})
		*/
		res.redirect('/login')
	}

	catch{
		res.redirect('/register')
	}
	console.log('users: ', users);
});


app.get('/login', function(req, res){
	res.render('login');
	
});

/*
app.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/register',
	failureFlash: true
})	
);
*/

//AUTHENTICATION WITH BCRYPT -- WORKS, BUT TROUBLE MAKING IT WORK W checkAuthenticated FUNCTION ABOVE

app.post('/login', async (req,res)=>{
	//(edited) code from https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
	try {
        let user = await User.findOne({ username: req.body.username }).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!await bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        //success redirect - problem : '/' send user back to login
        //res.redirect('/')
        res.send({ message: "The username and password combination is correct!" });
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}
);



app.get('/post', function(req, res){
	res.render('post');
	
});

app.get('/explore', function(req, res){
	res.render('explore');
	
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`serving on port ${port}`);