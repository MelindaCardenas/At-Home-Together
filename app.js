const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.get('/', function(req, res){
	res.send('Hello World!');
});


app.listen(port);
console.log(`serving on port ${port}`);