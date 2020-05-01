const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	username: String,
	password: String,
	followArr: Array

})

const Group = new Schema({
	name: String,
	membersArr: Array,

})

const groups = [];