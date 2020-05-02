if (process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const users = [];
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');

initializePassport(
	passport,
	username =>users.find(user => user.username === username),
	id =>users.find(user => user.id === id)
);



app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
	//SESSION_SECRET is in env
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//check if user is authenticated
function checkAuthenticated(req,res,next){
	if (req.isAuthenticated()){
		return next()
	}

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
		users.push({
			id: Date.now().toString(),
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		})
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
	//list of options of things to modify
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
})
	
);

app.get('/post', function(req, res){
	res.render('post');
	
});

app.get('/explore', function(req, res){
	res.render('explore');
	
});


app.listen(port);
console.log(`serving on port ${port}`);