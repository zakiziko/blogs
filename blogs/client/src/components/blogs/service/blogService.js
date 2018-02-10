import axios from 'axios'
var blogs = {
    getAllBlogs : function(){
      return  axios.get('http://localhost:5000/blogs')
        .then(res=>{return res.data})
        .catch(err=>{console.log(err)});
    },
    addBlog : function(blog){
       return axios.request({
            method : 'POST',
            url :'http://localhost:5000/blog',
            data : blog
        }).then(res=>{return res.data}).catch(err=>{console.log(err)});
    }
}

export default blogs;