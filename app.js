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
const methodOverride = require('method-override');
//constructors
const User = mongoose.model('User');
const Post = mongoose.model('Post');

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
app.use(methodOverride('_method'))

//check if user is authenticated
function checkAuthenticated(req,res,next){
	//authenticated
	if (req.isAuthenticated()){
		return next()
	}
	//if not authenticated
	res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
	if (req.isAuthenticated()){
		res.redirect('/')
	}
	next()
}

app.get('/',checkAuthenticated, (req, res) => {
	//res.render('login');
	res.render('home', {name:req.user.username})
});

app.get('/home', checkAuthenticated,(req, res)=>{
	res.render('home');
	
});

app.get('/register', checkNotAuthenticated,(req, res)=>{
	res.render('register');
	
});

app.post('/register', checkNotAuthenticated, async(req, res)=>{
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


app.get('/login', checkNotAuthenticated,(req, res)=>{
	res.render('login');
	
});

app.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
})	
);


app.get('/post', function(req, res){
	res.render('post');
	
});

app.post('/post', function(req, res){
	const newPost = new Post({
		id: Date.now().toString(),
		name: req.body.name,
		post: req.body.description,
		category: req.body.category
	})

	newPost.save((err, savedPost)=>{
		console.log(savedPost, err);
  	})

	res.redirect('/explore');
	//res.render('explore', {newPost:newPost});
	
});

app.get('/explore', function(req, res){
	Post.find({},(err,result)=>{
		res.render('explore', {posts:result});
	})	
});

app.delete('/logout', (req,res)=>{
	req.logOut()
	res.redirect('/login')
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`serving on port ${port}`);