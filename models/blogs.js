const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const db = mongojs('mongodb://lam:lam@ds161262.mlab.com:61262/gamingblog', ['blogs']);

// Blog Schema
const BlogSchema = mongoose.Schema({
	title: {
		type: String
	},
	review: {
		type: String
	},
	URL: {
		type: String
	},
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);
