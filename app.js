require('./views/db.js');
require('./passport-config.js');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
//const users = [];
let user;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
//constructor
const User = mongoose.model('User');

//const initializePassport = require('./passport-config');
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


//check if user is authenticated
function checkAuthenticated(req,res,next){
	//authenticated
	if (req.isAuthenticated()){
		return next()
	}
	//if not authenticated
	res.redirect('/login')
}

app.get('/',checkAuthenticated, (req, res) => {
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
		/* //without mongo
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


app.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/register',
	failureFlash: true
})	
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