
const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  username: {type: String,required: true},
  email: {type: String,required: true,unique : true},
  password : {type : String,required: true},
  phone: {type: Number} 
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.userByLogin = function(login){
    return new Promise(function(resolve,reject){
        User.findOne({email:login}).exec(function(err,user){
            if(err){
                reject(err)
            }else{
                resolve(user)
            }
        })
    });
};

module.exports.auth = async function(user,pass){
    let result = {};
        return new Promise(function(resolve,reject){
            if(!user){
                resolve({success:false,"msg":"email error"})
            }else{
                bcrypt.compare(pass,user.password,(err,isMatch)=>{
                    if(err){
                        resolve({success:false,"msg":"password maching error"})
                    }else if(!isMatch) {
                         resolve({success:false,"msg":"wrong password"});
                        }else{
                            const token = jwt.sign({user:user},'myhhSecret',{
                                expiresIn :50000
                            });
                            resolve({
                                success : true,
                                token: "JWT "+token,
                                user:{
                                    id: user._id,
                                    login: user.email,
                                    username:user.username
                                    }
                                });
                        }
                    })
                }
        })    
};