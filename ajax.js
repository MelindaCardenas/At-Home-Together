//document.addEventListener("DOMContentLoaded", main)

function getPosts() {
  var xhr = new XMLHttpRequest();
  require('./views/db.js');
  const mongoose = require('mongoose');
  const Post = mongoose.model('Post');
  xhr.onreadystatechange= function() {
	  	if(xhr.status >= 200 && xhr.status <400){
			const postDiv = document.getElementById("newPosts");
			
			for(const n of Post){
				const p = document.createElement('p');
				//console.log(n.name);
				p.textContent = n.name + ':' + n.post;
				postDiv.appendChild(p);
			}
		}
	}
  
  xhr.open("GET", "/home", true);
  xhr.send();
}