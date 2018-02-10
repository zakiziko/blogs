import axios from 'axios';
var auth = {
    register : function(user){
        return axios.request({
            method : 'POST',
            url : 'http://localhost:5000/register',
            data : user
        }).then(res=>{return res.data}).catch(err=>{console.log('err'+err)});
    },
    login : function(user){
        return axios.request({
            method : 'POST',
            url : 'http://localhost:5000/auth',
            data : user
        }).then(res=>{return res.data}).catch(err=>{console.log('err'+err)});
    }
}
export default auth;