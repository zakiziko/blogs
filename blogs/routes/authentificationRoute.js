const UserModule = require('../modules/userModule');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const email = require('email-validator');

module.exports = function(app){
    app.post('/register',(req,res)=>{
        if(email.validate(req.body.email)){
            let user = new UserModule({
                email : req.body.email,
                password : req.body.password,
                username : req.body.username,
                phone : req.body.phone
            });
           bcrypt.genSalt(10,(err,salt)=>{
               bcrypt.hash(user.password, salt , (err,hash)=>{
                   if(err) throw err;
                   user.password = hash;
                   user.save((err)=>{
                       if(err)
                        return res.json({state:false,msg:'unvalid email !!'})
                        else
                        return res.json({state:true,user:user});
                   });
                   
               })
           });
        }else{
            return res.json('Please Choose a Valid Email !!')
        }
    })
    app.post('/auth',async function(req,res){
        const login = req.body.login;
        const pass = req.body.password;
        const user = await UserModule.userByLogin(login);
        const access = await UserModule.auth(user,pass);
        return res.json(access);    
        
    })
    app.get('/profile/:token',(req,res)=>{
        let token = req.params.token;
        token = token.substring(4,token.length);
        jwt.verify(token, 'myhhSecret', function(err, decoded) {
            if(err){
                return res.json({state:false,msg:'user auth error'});
            }else{
                 return res.json({state:true,user:decoded});
                }
          });
    })
}