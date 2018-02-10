const mongoose = require('mongoose');
const db = require('../config/db');

const BlogSchema = mongoose.Schema({
  title: {type: String,required: true},
  content: {type: String,required: true,unique : true},
  creator : {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

const Blog = module.exports = mongoose.model('Blog',BlogSchema);
