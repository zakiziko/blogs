
var blogModule = require('../modules/blogModule');
var jwt = require('jsonwebtoken');

module.exports = function(app){
    app.post('/blog',(req,res)=>{
        let token = req.body.token;
        token = token.substring(4,token.length);
        jwt.verify(token, 'myhhSecret', function(err, decoded) {
            if(err){
                return res.json({state:false,msg:'user auth error'});
            }else{
                let blog = new blogModule({
                    title : req.body.title,
                    content : req.body.content,
                    creator : decoded.user._id
                });
                 blog.save();
                 return res.json({state:true,msg:'blog saveded'});
                }
          });
    });
    app.get('/blogs',(req,res)=>{
        blogModule.find({}).populate('creator')
        .exec(function(err,blogs){
            if(err){
                throw err
            }else{
                return res.json(blogs)
            }
        })
    })

}