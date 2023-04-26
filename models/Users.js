const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 3 },
  password:{
    type:String,
    required:true,
    min:8
},
  
});

module.exports = mongoose.model('Users', usersSchema);
