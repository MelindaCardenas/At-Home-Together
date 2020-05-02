const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
const users = [];

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('login');
	
});

app.get('/home', function(req, res){
	res.render('login');
	
});

app.get('/register', function(req, res){
	res.render('register');
	
});

app.post('/register', async(req, res)=>{
	try{
		const hashedPassword = await bcrypt.has(req.body.password, 10)
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})
		res.redirect('/login')
	}

	catch{
		res.redirect('/register')
	}
	console.log(users);
});

app.get('/login', function(req, res){
	res.render('login');
	
});

app.get('/post', function(req, res){
	res.render('post');
	
});

app.get('/explore', function(req, res){
	res.render('explore');
	
});


app.listen(port);
console.log(`serving on port ${port}`);